import Token, { TokenType } from "../token";
import BaseError, { ErrorCode } from "./base_error";

export default class SemanticError extends BaseError {
    constructor(message: string = 'Semantic error') {
        super(ErrorCode.NONE, new Token(TokenType.NONE, null), message);
    }
}
