# Snapshot report for `packages/wotan/test/baseline.spec.js`

The actual snapshot is saved in `baseline.spec.js.snap`.

Generated by [AVA](https://ava.li).

## createBaseline CRLF

    `foo;␍␊
    ~~~~ [error rule: some message]␊
    bar;␍␊
    `

## createBaseline mixed

    `export {};␊
    ~~~~~~~~~~␊
     ~nil      [warning rule: where is my squiggly tail]␊
     ~nil      [error rule: where is my squiggly tail]␊
     ~~~~~~~~~␊
    let foo = 'foo';␊
    ~~~~~~~~~~~~~~~~␊
    ~~~~             [warning other: two lines]␊
    ~~~~~~~~~~~~~~~~␊
    let bar = foo;␊
    ~~~~~~~~~~~~~~ [error multiline: I am groot]␊
    ~~~~           [error another: other two lines]␊
    `

## createBaseline multiline

    `export {};␊
    ~~~~~~~~~~␊
    let foo = 'foo';␊
    ~~~~~~~~~~~~~~~~␊
    let bar = foo;␊
    ~~~~~~~~~~~~~~ [error multiline: I am groot]␊
    `

## createBaseline no eofline

    `let foo;␊
     ~nil    [warning rule: where is my squiggly tail]`

## createBaseline valid

    `export {};␊
    let foo = 'foo';␊
    let bar = foo;␊
    `

## createBaseline zero length

    `export {};␊
     ~nil      [warning rule: where is my squiggly tail]␊
    let foo = 'foo';␊
    let bar = foo;␊
    `