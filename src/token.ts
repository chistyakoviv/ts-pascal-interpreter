import { bit } from './utils.js';
import { TokenValue } from './types.js';

export enum TokenType {
    NONE    = bit(0),
    EOF     = bit(1),
    NUMBER  = bit(2),
    PLUS    = bit(3),
    MINUS   = bit(4),
    MULT    = bit(5),
    DIV     = bit(6),
    LPAREN  = bit(7),
    RPAREN  = bit(8),
    ID      = bit(9),
    ASSIGN  = bit(10),
    BEGIN   = bit(11),
    END     = bit(12),
    SEMI    = bit(13),
    DOT     = bit(14),
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
