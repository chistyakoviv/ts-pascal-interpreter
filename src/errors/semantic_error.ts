import Token, { TokenType } from "../token";
import BaseError, { ErrorCode } from "./base_error";

export default class SemanticError extends BaseError {
    constructor(code: ErrorCode, token: Token, message: string) {
        super(code, token, `SemanticError: ${message}`);
    }
}
