import Token, { TokenType } from "../token";
import BaseError, { ErrorCode } from "./base_error";

export default class ParseError extends BaseError {
    constructor(message: string = 'Error parsing input') {
        super(ErrorCode.NONE, new Token(TokenType.NONE, null), message);
    }
}
