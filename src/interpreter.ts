import Token, { TokenType } from './token.js';
import { TokenValue } from './types.js';
import ParseError from './errors/parse_error.js';
import Lexer from './lexer.js';

export default class Interpreter {
    private lexer: Lexer;
    private currentToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    eat(tokenType: TokenType): void {
        if (!(this.currentToken.getType() & tokenType))
            throw new ParseError();

        this.currentToken = this.lexer.getNextToken();
    }

    factor(): TokenValue {
        const token = this.currentToken;
        this.eat(TokenType.NUMBER);
        return token.getValue();
    }

    expr(): TokenValue {
        let result: TokenValue = this.factor();

        while (this.currentToken.getType() & (TokenType.PLUS | TokenType.MINUS | TokenType.MULT | TokenType.DIV)) {
            switch (this.currentToken.getType()) {
                case TokenType.PLUS:
                    this.eat(TokenType.PLUS);
                    result = (result as number) + (this.factor() as number);
                    break;
                case TokenType.MINUS:
                    this.eat(TokenType.MINUS);
                    result = (result as number) - (this.factor() as number);
                    break;
                case TokenType.MULT:
                    this.eat(TokenType.MULT);
                    result = (result as number) * (this.factor() as number);
                    break;
                case TokenType.DIV:
                    this.eat(TokenType.DIV);
                    result = (result as number) / (this.factor() as number);
                    break;
            }
        }

        return result;
    }
}
