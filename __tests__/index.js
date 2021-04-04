const Interpreter = require('../dist/interpreter.js').default;
const Lexer = require('../dist/lexer.js').default;

describe('interpreter', () => {
    it('checks the correctness of evaluating an expression', () => {
        // arrange
        const expression = '14 + 2 * 3 - 6 / 2';
        const lexer = new Lexer(expression);
        const interpreter = new Interpreter(lexer);

        // act
        const result = interpreter.expr();

        // assert
        expect(result).toBe(17);
    });
});
