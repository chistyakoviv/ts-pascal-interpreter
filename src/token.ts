import { bit } from './utils';
import { TokenValue } from './types';

export enum TokenType {
    NONE            = bit(0),
    EOF             = bit(1),
    PLUS            = bit(2),
    MINUS           = bit(3),
    MULT            = bit(4),
    LPAREN          = bit(5),
    RPAREN          = bit(6),
    ID              = bit(7),
    ASSIGN          = bit(8),
    BEGIN           = bit(9),
    END             = bit(10),
    SEMI            = bit(11),
    DOT             = bit(12),
    PROGRAM         = bit(13),
    VAR             = bit(14),
    INTEGER         = bit(15),
    REAL            = bit(16),
    INTEGER_CONST   = bit(17),
    REAL_CONST      = bit(18),
    INTEGER_DIV     = bit(19),
    FLOAT_DIV       = bit(20),
    COLON           = bit(21),
    COMMA           = bit(22),
    PROCEDURE       = bit(23),
}

export const TokenMap: {[key: string]: TokenType} = {
    '+': TokenType.PLUS,
    '-': TokenType.MINUS,
    '*': TokenType.MULT,
    '(': TokenType.LPAREN,
    ')': TokenType.RPAREN,
    ';': TokenType.SEMI,
    '.': TokenType.DOT,
    ':': TokenType.COLON,
    ',': TokenType.COMMA,
    '/': TokenType.FLOAT_DIV,
}

export default class Token {
    private type: TokenType;
    private value: TokenValue;
    private lineno: number;
    private column: number;

    constructor(type: TokenType, value: TokenValue, lineno: number = 0, column: number = 0) {
        this.type = type;
        this.value = value;
        this.lineno = lineno;
        this.column = column;
    }

    getType(): TokenType {
        return this.type;
    }

    getValue(): TokenValue {
        return this.value;
    }

    getLineno(): number {
        return this.lineno;
    }

    getColumn(): number {
        return this.column;
    }

    toString(): string {
        return `Token(${this.type}, ${this.value}, position=${this.lineno}:${this.column})`;
    }
}
