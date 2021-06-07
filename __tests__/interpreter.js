const Interpreter = require('../dist/interpreter.js').default;
const Parser = require('../dist/parser.js').default;
const Lexer = require('../dist/lexer.js').default;

describe('interpreter', () => {

    const getInterpreter = (text) => {
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
        const interpreter = getInterpreter(src);

        // act
        const result = interpreter.interpret();
        const table = interpreter.getGlobalScope();

        // assert
        expect(table).toBe({'a': 2, 'x': 11, 'c': 27, 'b': 25, 'number': 2});
    });

    // it('evaluates 3 to equal 3', () => {
    //     // arrange
    //     const expression = '3';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(3);
    // });

    // it('evaluates 2 + 7 * 4 to equal 30', () => {
    //     // arrange
    //     const expression = '2 + 7 * 4';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(30);
    // });

    // it('evaluates 7 - 8 / 4 to equal 5', () => {
    //     // arrange
    //     const expression = '7 - 8 / 4';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(5);
    // });

    // it('evaluates 14 + 2 * 3 - 6 / 2 to equal 17', () => {
    //     // arrange
    //     const expression = '14 + 2 * 3 - 6 / 2';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(17);
    // });

    // it('evaluates 7 + 3 * (10 / (12 / (3 + 1) - 1)) to equal 22', () => {
    //     // arrange
    //     const expression = '7 + 3 * (10 / (12 / (3 + 1) - 1))';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(22);
    // });

    // it('evaluates 7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8) to equal 10', () => {
    //     // arrange
    //     const expression = '7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8)';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(10);
    // });

    // it('evaluates 7 + (((3 + 2))) to equal 12', () => {
    //     // arrange
    //     const expression = '7 + (((3 + 2)))';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(12);
    // });

    // it('evaluates - 3 to equal -3', () => {
    //     // arrange
    //     const expression = '- 3';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(-3);
    // });

    // it('evaluates + 3 to equal 3', () => {
    //     // arrange
    //     const expression = '+ 3';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(3);
    // });

    // it('evaluates 5 - - - + - 3 to equal 8', () => {
    //     // arrange
    //     const expression = '5 - - - + - 3';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(8);
    // });

    // it('evaluates 5 - - - + - (3 + 4) - +2 to equal 10', () => {
    //     // arrange
    //     const expression = '5 - - - + - (3 + 4) - +2';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe(10);
    // });
});
