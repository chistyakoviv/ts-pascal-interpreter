const Interpreter = require('../dist/interpreter.js').default;
const Lexer = require('../dist/lexer.js').default;

describe('interpreter', () => {

    const getInterpreter = (text) => {
        const lexer = new Lexer(text);
        const interpreter = new Interpreter(lexer);

        return interpreter;
    };

    it('evaluates 3 to equal 3', () => {
        // arrange
        const expression = '3';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(3);
    });

    it('evaluates 2 + 7 * 4 to equal 30', () => {
        // arrange
        const expression = '2 + 7 * 4';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(30);
    });

    it('evaluates 7 - 8 / 4 to equal 5', () => {
        // arrange
        const expression = '7 - 8 / 4';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(5);
    });

    it('evaluates 14 + 2 * 3 - 6 / 2 to equal 17', () => {
        // arrange
        const expression = '14 + 2 * 3 - 6 / 2';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(17);
    });

    it('evaluates 7 + 3 * (10 / (12 / (3 + 1) - 1)) to equal 22', () => {
        // arrange
        const expression = '7 + 3 * (10 / (12 / (3 + 1) - 1))';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(22);
    });

    it('evaluates 7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8) to equal 10', () => {
        // arrange
        const expression = '7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8)';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(10);
    });

    it('evaluates 7 + (((3 + 2))) to equal 12', () => {
        // arrange
        const expression = '7 + (((3 + 2)))';
        const interpreter = getInterpreter(expression);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(12);
    });
});
