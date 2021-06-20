import Token, { TokenType } from "../token";
import BaseError, { ErrorCode } from "./base_error";

export default class ParseError extends BaseError {
    constructor(code: ErrorCode, token: Token, message: string) {
        super(code, token, `ParseError: ${message}`);
    }
}
