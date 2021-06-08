const { default: Lexer } = require('../dist/cjs/lexer.js');
const { TokenType, default: Token } = require('../dist/cjs/token.js');

describe('lexer', () => {

    const createLexer = (text) => new Lexer(text);

    it(`evaluates '123' to equal to TokenType.NUMBER`, () => {
        const lexer = createLexer('123');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.NUMBER);
        expect(token.getValue()).toBe(123);
    });

    it(`evaluates '*' to equal to TokenType.MULT`, () => {
        const lexer = createLexer('*');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.MULT);
        expect(token.getValue()).toBe('*');
    });

    it(`evaluates '/' to equal to TokenType.DIV`, () => {
        const lexer = createLexer('/');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.DIV);
        expect(token.getValue()).toBe('/');
    });

    it(`evaluates '+' to equal to TokenType.PLUS`, () => {
        const lexer = createLexer('+');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.PLUS);
        expect(token.getValue()).toBe('+');
    });

    it(`evaluates '-' to equal to TokenType.MINUS`, () => {
        const lexer = createLexer('-');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.MINUS);
        expect(token.getValue()).toBe('-');
    });

    it(`evaluates '(' to equal to TokenType.LPAREN`, () => {
        const lexer = createLexer('(');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.LPAREN);
        expect(token.getValue()).toBe('(');
    });

    it(`evaluates ')' to equal to TokenType.RPAREN`, () => {
        const lexer = createLexer(')');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.RPAREN);
        expect(token.getValue()).toBe(')');
    });

    it(`evaluates ':=' to equal to TokenType.ASSIGN`, () => {
        const lexer = createLexer(':=');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.ASSIGN);
        expect(token.getValue()).toBe(':=');
    });

    it(`evaluates '.' to equal to TokenType.DOT`, () => {
        const lexer = createLexer('.');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.DOT);
        expect(token.getValue()).toBe('.');
    });

    it(`evaluates 'number' to equal to TokenType.ID`, () => {
        const lexer = createLexer('number');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.ID);
        expect(token.getValue()).toBe('number');
    });

    it(`evaluates ';' to equal to TokenType.SEMI`, () => {
        const lexer = createLexer(';');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.SEMI);
        expect(token.getValue()).toBe(';');
    });

    it(`evaluates 'BEGIN' to equal to TokenType.BEGIN`, () => {
        const lexer = createLexer('BEGIN');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.BEGIN);
        expect(token.getValue()).toBe('BEGIN');
    });

    it(`evaluates 'END' to equal to TokenType.END`, () => {
        const lexer = createLexer('END');
        const token = lexer.getNextToken();

        expect(token.getType()).toBe(TokenType.END);
        expect(token.getValue()).toBe('END');
    });

});
