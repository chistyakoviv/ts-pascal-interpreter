import Token, { TokenType } from './token.js';
import { isNumber } from './utils.js';

export default class Interpreter {
    private text: string;
    private pos: number;
    private currentToken: Token = new Token(TokenType.NONE, "");

    constructor(text: string) {
        this.text = text;
        this.pos = 0;
    }

    getNextToken(): Token {
        this.skipWhitespaces();

        if (this.pos > this.text.length - 1)
            return new Token(TokenType.EOF, null);

        const currentChar: string = this.text[this.pos];

        if (isNumber(currentChar)) {
            let end = this.pos + 1;

            while (isNumber(this.text.slice(this.pos, end)) && end < this.text.length + 1)
                end++;

            const token = new Token(TokenType.NUMBER, Number(this.text.slice(this.pos, --end)));
            this.pos = end;
            return token;
        }

        if (currentChar === '+') {
            const token = new Token(TokenType.PLUS, currentChar);
            this.pos++;
            return token;
        }

        if (currentChar === '-') {
            const token = new Token(TokenType.MINUS, currentChar);
            this.pos++;
            return token;
        }

        throw new Error('Error parsing input');
    }

    skipWhitespaces(): void {
        while (this.text[this.pos] === " " && this.pos < this.text.length - 1)
            this.pos++;
    }

    eat(tokenType: TokenType): void {
        if (!(this.currentToken.getType() & tokenType))
            throw new Error('Error parsing input');

        this.currentToken = this.getNextToken();
    }

    expr(): number {
        this.currentToken = this.getNextToken();

        const left: Token = this.currentToken;
        this.eat(TokenType.NUMBER);

        const op: Token = this.currentToken;
        this.eat(TokenType.PLUS | TokenType.MINUS);

        const right: Token = this.currentToken;
        this.eat(TokenType.NUMBER);

        let result: any;

        switch (op.getType()) {
            case TokenType.PLUS:
                result = (left.getValue() as number) + (right.getValue() as number);
                break;
            case TokenType.MINUS:
                result = (left.getValue() as number) - (right.getValue() as number);
                break;
        }
        return result;
    }
}
