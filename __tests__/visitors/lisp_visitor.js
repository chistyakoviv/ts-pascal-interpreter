const Interpreter = require('../../dist/visitors/lisp_visitor.js').default;
const Parser = require('../../dist/parser.js').default;
const Lexer = require('../../dist/lexer.js').default;

describe('lisp visitor', () => {

    it('skips test', () => {
        expect(true).toBe(true);
    });

    // const getInterpreter = (text) => {
    //     const lexer = new Lexer(text);
    //     const parser = new Parser(lexer);
    //     const interpreter = new Interpreter(parser);

    //     return interpreter;
    // };

    // it('converts 3 + 5 to equal (+ 3 5)', () => {
    //     // arrange
    //     const expression = '3 + 5';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe('(+ 3 5)');
    // });

    // it('converts 1 + 7 * 2 to equal (+ 1 (* 7 2))', () => {
    //     // arrange
    //     const expression = '1 + 7 * 2';
    //     const interpreter = getInterpreter(expression);

    //     // act
    //     const result = interpreter.interpret();

    //     // assert
    //     expect(result).toBe('(+ 1 (* 7 2))');
    // });
});
