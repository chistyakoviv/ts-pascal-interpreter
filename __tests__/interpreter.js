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
            const interpreter = createInterpreter('BEGIN _a := %expr% END.'.replace('%expr%', expr));

            interpreter.interpret();
            const globalScope = interpreter.getGlobalScope();
            expect(globalScope._a).toBe(result);
        });
    });

    it(`evaluates symbol table to equal {'a': 2, 'x': 11, 'c': 27, 'b': 25, 'number': 2}`, () => {
        // arrange
        const src = `
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
});
