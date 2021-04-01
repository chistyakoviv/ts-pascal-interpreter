export enum TokenType {
    NONE    = 0x00000000,
    EOF     = 0x00000001,
    NUMBER  = 0x00000010,
    PLUS    = 0x00000100,
    MINUS   = 0x00001000,
}

export type TokenValue = string | number | null;

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
