import Token, { TokenType } from './token';
import { isNumber, isSpace, isDot, isAlNum, isAlpha } from './utils';
import { CharType } from './types';
import ParseError from './errors/parse_error';

const RESERVED_KEYWORDS: {[key: string]: Token} = {
    'PROGRAM': new Token(TokenType.PROGRAM, 'PROGRAM'),
    'VAR': new Token(TokenType.VAR, 'VAR'),
    'DIV': new Token(TokenType.INTEGER_DIV, 'DIV'),
    'INTEGER': new Token(TokenType.INTEGER, 'INTEGER'),
    'REAL': new Token(TokenType.REAL, 'REAL'),
    'BEGIN': new Token(TokenType.BEGIN, 'BEGIN'),
    'END': new Token(TokenType.END, 'END'),
    'PROCEDURE': new Token(TokenType.PROCEDURE, 'PROCEDURE'),
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

    skipComment(): void {
        while (this.currentChar !== '}')
            this.advance();
        this.advance();
    }

    number(): Token {
        let result = '';

        while (isNumber(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        if (isDot(this.currentChar)) {
            result += this.currentChar;
            this.advance();

            while (isNumber(this.currentChar)) {
                result += this.currentChar;
                this.advance();
            }

            return new Token(TokenType.REAL_CONST, Number(result));
        }

        return new Token(TokenType.INTEGER_CONST, Number(result));
    }

    id(): Token {
        let result = '';

        while (isAlNum(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        if (RESERVED_KEYWORDS[result.toUpperCase()])
            return RESERVED_KEYWORDS[result.toUpperCase()];

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

            if (isNumber(this.currentChar))
                return this.number();

            if (this.currentChar === ':' && this.peek() === '=') {
                this.advance();
                this.advance();
                return new Token(TokenType.ASSIGN, ':=');
            }

            if (this.currentChar === '{') {
                this.advance();
                this.skipComment();
                continue;
            }

            if (this.currentChar === ':') {
                this.advance();
                return new Token(TokenType.COLON, ':');
            }

            if (this.currentChar === ',') {
                this.advance();
                return new Token(TokenType.COMMA, ',');
            }

            if (this.currentChar === '/') {
                this.advance();
                return new Token(TokenType.FLOAT_DIV, '/');
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
