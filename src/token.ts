import { bit } from './utils.js';
import { TokenValue } from './types.js';

export enum TokenType {
    NONE            = bit(0),
    EOF             = bit(1),
    PLUS            = bit(2),
    MINUS           = bit(3),
    MULT            = bit(4),
    DIV             = bit(5),
    LPAREN          = bit(6),
    RPAREN          = bit(7),
    ID              = bit(8),
    ASSIGN          = bit(9),
    BEGIN           = bit(10),
    END             = bit(11),
    SEMI            = bit(12),
    DOT             = bit(13),
    PROGRAM         = bit(14),
    VAR             = bit(15),
    INTEGER         = bit(16),
    REAL            = bit(17),
    INTEGER_CONST   = bit(18),
    REAL_CONST      = bit(19),
    INTEGER_DIV     = bit(20),
    FLOAT_DIV       = bit(21),
    COLON           = bit(22),
    COMMA           = bit(23),
}

export default class Token {
    private type: TokenType;
    private value: TokenValue;

    constructor(type: TokenType, value: TokenValue) {
        this.type = type;
        this.value = value;
    }

    getType(): TokenType {
        return this.type;
    }

    getValue(): TokenValue {
        return this.value;
    }

    toString(): string {
        return `Token(${this.type}, ${this.value})`;
    }
}
