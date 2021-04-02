import Token, { TokenType } from './token.js';
import { isNumber, isSpace, isDot } from './utils.js';
import { CharType } from './types.js';
import ParseError from './errors/parse_error.js';

export default class Lexer {
    private text: string;
    private pos: number;
    private currentChar: CharType;

    constructor(text: string) {debugger;
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos];
    }

    advance(): void {
        this.pos++;

        if (this.pos > this.text.length - 1)
            this.currentChar = null;
        else
            this.currentChar = this.text[this.pos];
    }

    skipWhitespace(): void {
        while (this.currentChar !== null && isSpace(this.currentChar))
            this.advance();
    }

    integer(): number {
        const result = [];

        while (this.currentChar !== null && (isNumber(this.currentChar) || isDot(this.currentChar))) {
            result.push(this.currentChar);
            this.advance();
        }

        const num = result.join('');

        if (!isNumber(num))
            throw new ParseError();

        return Number(num);
    }

    getNextToken(): Token {
        while (this.currentChar !== null) {
            if (isSpace(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (isNumber(this.currentChar) || isDot(this.currentChar))
                return new Token(TokenType.NUMBER, this.integer());

            if (this.currentChar === '+') {
                this.advance();
                return new Token(TokenType.PLUS, '+');
            }

            if (this.currentChar === '-') {
                this.advance();
                return new Token(TokenType.MINUS, '-');
            }

            if (this.currentChar === '*') {
                this.advance();
                return new Token(TokenType.MULT, '*');
            }

            if (this.currentChar === '/') {
                this.advance();
                return new Token(TokenType.DIV, '/');
            }

            throw new ParseError();
        }

        return new Token(TokenType.EOF, null);
    }
}
