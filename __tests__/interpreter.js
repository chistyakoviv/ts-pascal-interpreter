const Interpreter = require('../dist/cjs/interpreter.js').default;
const Parser = require('../dist/cjs/parser.js').default;
const Lexer = require('../dist/cjs/lexer.js').default;

describe('interpreter', () => {

    const createInterpreter = (text) => {
        const lexer = new Lexer(text);
        const parser = new Parser(lexer);
        const interpreter = new Interpreter(parser);

        return interpreter;
    };

    it('checks expressions evaluaton', () => {
        [
            ['3', 3],
            ['2 + 7 * 4', 30],
            ['7 - 8 / 4', 5],
            ['14 + 2 * 3 - 6 / 2', 17],
            ['7 + 3 * (10 / (12 / (3 + 1) - 1))', 22],
            ['7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8)', 10],
            ['7 + (((3 + 2)))', 12],
            ['- 3', -3],
            ['+ 3', 3],
            ['5 - - - + - 3', 8],
            ['5 - - - + - (3 + 4) - +2', 10],
        ].forEach((test) => {
            const [expr, result] = test;
            const interpreter = createInterpreter('PROGRAM test; BEGIN _a := %expr% END.'.replace('%expr%', expr));

            interpreter.interpret();
            const globalScope = interpreter.getGlobalScope();
            expect(globalScope._a).toBe(result);
        });
    });

    it(`evaluates symbol table to equal {'a': 2, 'x': 11, 'c': 27, 'b': 25, 'number': 2}`, () => {
        // arrange
        const src = `
            PROGRAM Test;

            VAR
                a, b, c, x : INTEGER;

            BEGIN

                BEGIN
                    number := 2;
                    a := number;
                    b := 10 * a + 10 * number / 4;
                    c := a - - b
                END;

                x := 11;
            END.
        `;
        const interpreter = createInterpreter(src);

        // act
        const result = interpreter.interpret();
        const table = interpreter.getGlobalScope();

        // assert
        expect(table).toStrictEqual({'a': 2, 'x': 11, 'c': 27, 'b': 25, 'number': 2});
    });

    it(`evaluates symbol table to equal {'a': 2, 'b': 25, 'y': 5.997142857142857}`, () => {
        // arrange
        const src = `
            PROGRAM Part10AST;

            VAR
                a, b : INTEGER;
                y    : REAL;

            BEGIN {Part10AST}
                a := 2;
                b := 10 * a + 10 * a DIV 4;
                y := 20 / 7 + 3.14;
            END.  {Part10AST}
        `;
        const interpreter = createInterpreter(src);

        // act
        const result = interpreter.interpret();
        const table = interpreter.getGlobalScope();

        // assert
        expect(table).toStrictEqual({'a': 2, 'b': 25, 'y': 5.997142857142857});
    });
});
