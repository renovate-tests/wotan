async function testForAwait<T extends AsyncIterable<string>>(param?: T) {
    if (param) {
        for await (const _ of param) {}
    } else {
        for await (const _ of param) {}
    }
    for await (const _ of param) {} // don't care to add failure in positions where the compiler already complains
    for await (const _ of get<any>()) {}
    for await (const _ of get<AsyncIterable<string>>()) {}
    for await (const _ of get<string | AsyncIterable<string>>()) {}
    for await (const _ of get<AsyncIterableIterator<string> & {foo: string}>()) {}
    for await (const _ of get<Array<string> | AsyncIterable<string>>()) {}
    for await (const _ of get<{[Symbol.asyncIterator](): any}>()) {}
    for await (const _ of get<{[Symbol.asyncIterator]: any}>()) {}
    for await (const _ of get<{[Symbol.asyncIterator]: string}>()) {}
    for await (const _ of get<{[Symbol.asyncIterator](): AsyncIterator<string>}>()) {}
    for await (const _ of get<{[Symbol.asyncIterator](): {next(): Promise<{value: any, done: boolean}>}}>()) {}
    for await (const _ of get<{[Symbol.asyncIterator](): Iterator<string>}>()) {}
    for await (const _ of get<{[Symbol.asyncIterator](): string}>()) {}
    for await (const _ of get<{[Symbol.iterator](): Iterator<string>}>()) {}
    for await (const _ of get<Iterable<string>>()) {}
    for await (const _ of get<Array<Promise<IteratorResult<string>>>>()) {}
    for await (const _ of get<string>()) {}
    for await (const _ of get<string | Array<string>>()) {}
    for await (const _ of get<AsyncIterator<string>>()) {}
    for /* await */ await (const _ of get<string>()) {}
}

async function testForAwaitIterable<T extends PromiseLike<any>, U extends Iterable<T>, V extends U | string[], W extends Iterator<T>, X extends IteratorResult<T>, Y extends () => X>(a: T, b: U, c: V, d: W, e: X, f: Y) {
    for await (const _ of [a]) {}
    for await (const _ of b) {}
    for await (const _ of c) {}
    for await (const _ of get<Array<Promise<any>>>()) {}
    for await (const _ of get<Array<any>>()) {}
    for await (const _ of get<Array<string>>()) {}
    for await (const _ of get<Array<string | PromiseLike<string>>>()) {}
    for await (const _ of get<Iterable<PromiseLike<string>>>()) {}
    for await (const _ of get<{[Symbol.iterator]: any}>()) {}
    for await (const _ of get<{[Symbol.iterator](): any}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next: any}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next(): any}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next(): {value: any, done: boolean}}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next(): {value: PromiseLike<any>, done: boolean}}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next(): {value: string, done: boolean}}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next(): {value: T, done: boolean}}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): W}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next: Y}}>()) {}
    for await (const _ of get<{[Symbol.iterator](): {next(): X}}>()) {}
}
