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
