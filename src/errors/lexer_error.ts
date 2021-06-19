import Token, { TokenType } from "../token";
import BaseError, { ErrorCode } from "./base_error";

export default class LexerError extends BaseError {
    constructor(message: string = 'Lexical error') {
        super(ErrorCode.NONE, new Token(TokenType.NONE, null), message);
    }
}
