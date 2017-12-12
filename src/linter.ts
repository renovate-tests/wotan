import * as ts from 'typescript';
import { EffectiveConfig } from './configuration';
import { Failure } from './types';
import { applyFixes } from './fix';
import { findRule } from './rule-loader';

export function lint(file: ts.SourceFile, config: EffectiveConfig, program?: ts.Program): Failure[] {
    return getFailures(file, config, program);
}

export interface LintAndFixResult {
    fixes: number;
    failures: Failure[];
}

export interface UpdateFileResult {
    file: ts.SourceFile;
    program?: ts.Program;
}

export type UpdateFileCallback = (content: string, range: ts.TextChangeRange) => UpdateFileResult;

export function lintAndFix(
    file: ts.SourceFile,
    config: EffectiveConfig,
    updateFile: UpdateFileCallback,
    iterations: number = 10,
    program?: ts.Program,
): LintAndFixResult {
    let totalFixes = 0;
    let failures = getFailures(file, config, program);
    for (let i = 0; i < iterations; ++i) {
        if (failures.length === 0)
            break;
        const fixes = failures.map((f) => f.fix).filter(<T>(f: T | undefined): f is T => f !== undefined);
        if (fixes.length === 0)
            break;
        const fixed = applyFixes(file.text, fixes);
        if (fixed.fixed === 0)
            break;
        totalFixes += fixed.fixed;
        ({program, file} = updateFile(fixed.result, fixed.range));
        failures = getFailures(file, config, program);
    }
    return {
        failures,
        fixes: totalFixes,
    };
}

function getFailures(file: ts.SourceFile, config: EffectiveConfig, program: ts.Program | undefined) {
    const result: Failure[] = [];
    for (const [ruleName, {severity, options}] of config.rules) {
        if (severity === 'off')
            continue;
        const ctor = findRule(ruleName, config.rulesDirectories);
        if (program === undefined && ctor.requiresTypeInformation) {
            console.warn(`'${ruleName}' requires type information.`);
            continue;
        }
        const rule = new ctor(file, options, config.settings, program);
        rule.apply();
        for (const failure of rule.getFailures())
            result.push({
                ruleName,
                severity: severity === 'warn' ? 'warning' : severity,
                message: failure.message,
                start: {
                    position: failure.start,
                    ...ts.getLineAndCharacterOfPosition(file, failure.start),
                },
                end: {
                    position: failure.end,
                    ...ts.getLineAndCharacterOfPosition(file, failure.end),
                },
                fileName: file.fileName,
                fix: failure.fix === undefined
                    ? undefined
                    : !Array.isArray(failure.fix)
                        ? {replacements: [failure.fix]}
                        : failure.fix.length === 0
                            ? undefined
                            : {replacements: failure.fix},
            });
    }
    return result;
}
