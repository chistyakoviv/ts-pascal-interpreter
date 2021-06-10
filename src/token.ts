import { bit } from './utils.js';
import { TokenValue } from './types.js';

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
