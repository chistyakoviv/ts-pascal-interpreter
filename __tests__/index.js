const Interpreter = require('../dist/interpreter.js').default;
const Lexer = require('../dist/lexer.js').default;

describe('interpreter', () => {
    it('checks the correctness of evaluating an expression', () => {
        // arrange
        const expresseion = '14 + 2 * 3 - 6 / 2';
        const interpreter = new Interpreter(new Lexer(expresseion));

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(17);
    });
});
