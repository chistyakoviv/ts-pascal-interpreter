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
