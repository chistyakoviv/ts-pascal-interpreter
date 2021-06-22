import Token, { TokenMap, TokenType } from './token';
import { isNumber, isSpace, isDot, isAlNum, isAlpha } from './utils';
import { CharType } from './types';
import LexerError from './errors/lexer_error';

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
    private pos: number = 0;
    private currentChar: CharType;
    private lineno: number = 1;
    private column: number = 1;

    constructor(text: string) {
        this.text = text;
        this.currentChar = this.text[this.pos];
    }

    advance(): void {
        this.pos++;

        if (this.currentChar == '\n') {
            this.lineno++;
            this.column = 0;
        }

        if (this.pos > this.text.length - 1) {
            this.currentChar = null;
        } else {
            this.currentChar = this.text[this.pos];
            this.column++;
        }
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

            return new Token(TokenType.REAL_CONST, Number(result), this.lineno, this.column);
        }

        return new Token(TokenType.INTEGER_CONST, Number(result), this.lineno, this.column);
    }

    id(): Token {
        let result = '';

        while (isAlNum(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        if (RESERVED_KEYWORDS[result.toUpperCase()])
            return RESERVED_KEYWORDS[result.toUpperCase()];

        return new Token(TokenType.ID, result, this.lineno, this.column);
    }

    getCurrentChar(): CharType {
        return this.currentChar;
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

            if (this.currentChar === '{') {
                this.advance();
                this.skipComment();
                continue;
            }

            if (this.currentChar === ':' && this.peek() === '=') {
                this.advance();
                this.advance();
                return new Token(TokenType.ASSIGN, ':=', this.lineno, this.column);
            }

            const char = this.currentChar;

            if (TokenMap[char] !== undefined) {
                this.advance();
                return new Token(TokenMap[char], char, this.lineno, this.column);
            }

            throw new LexerError(`Lexer error on '${this.currentChar}' line: ${this.lineno} column: ${this.column}`);
        }

        return new Token(TokenType.EOF, null, this.lineno, this.column);
    }
}
