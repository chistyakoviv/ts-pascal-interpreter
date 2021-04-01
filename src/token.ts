export enum TokenType {
    NONE = 'NONE',
    EOF = 'EOF',
    NUMBER = 'NUMBER',
    PLUS = '+',
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
