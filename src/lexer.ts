import Token, { TokenType } from './token.js';
import { isNumber, isSpace, isDot, isAlNum, isAlpha } from './utils.js';
import { CharType } from './types.js';
import ParseError from './errors/parse_error.js';

const RESERVED_KEYWORDS: {[key: string]: Token} = {
    'BEGIN': new Token(TokenType.BEGIN, 'BEGIN'),
    'END': new Token(TokenType.END, 'END'),
};

export default class Lexer {
    private text: string;
    private pos: number;
    private currentChar: CharType;

    constructor(text: string) {
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

    peek(): string | null {
        const pos: number = this.pos + 1;

        if (this.pos > this.text.length - 1)
            return null;

        return this.text[pos];
    }

    skipWhitespace(): void {
        while (isSpace(this.currentChar))
            this.advance();
    }

    integer(): number {
        let result = '';

        while (isNumber(this.currentChar)/* || isDot(this.currentChar)*/) {
            result += this.currentChar;
            this.advance();
        }

        if (!isNumber(result))
            throw new ParseError();

        return Number(result);
    }

    id(): Token {
        let result = '';

        while (isAlNum(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        if (RESERVED_KEYWORDS[result])
            return RESERVED_KEYWORDS[result];

        return new Token(TokenType.ID, result);
    }

    getNextToken(): Token {
        while (this.currentChar !== null) {
            if (isSpace(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (isAlpha(this.currentChar))
                return this.id();

            if (isNumber(this.currentChar)/* || isDot(this.currentChar)*/)
                return new Token(TokenType.NUMBER, this.integer());

            if (this.currentChar === ':' && this.peek() === '=') {
                this.advance();
                this.advance();
                return new Token(TokenType.ASSIGN, ':=');
            }

            if (this.currentChar === ';') {
                this.advance();
                return new Token(TokenType.SEMI, ';');
            }

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

            if (this.currentChar === '(') {
                this.advance();
                return new Token(TokenType.LPAREN, '(');
            }

            if (this.currentChar === ')') {
                this.advance();
                return new Token(TokenType.RPAREN, ')');
            }

            if (this.currentChar === '.') {
                this.advance();
                return new Token(TokenType.DOT, '.');
            }

            throw new ParseError();
        }

        return new Token(TokenType.EOF, null);
    }
}
