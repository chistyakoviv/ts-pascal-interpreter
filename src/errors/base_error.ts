import Token, { TokenType } from '../token';

export enum ErrorCode {
    NONE             = '',
    UNEXPECTED_TOKEN = 'Unexpected token',
    ID_NOT_FOUND     = 'Identifier not found',
    DUPLICATE_ID     = 'Duplicate id found'
}

export default class BaseError {
    public code: ErrorCode;
    public token: Token;
    public message: string;

    constructor(code: ErrorCode = ErrorCode.NONE, token: Token = new Token(TokenType.NONE, null), message: string = '') {
        this.code = code;
        this.token = token;
        this.message = message;
    }
}
