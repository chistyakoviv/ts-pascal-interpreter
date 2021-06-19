import Token, { TokenType } from "../token";
import BaseError, { ErrorCode } from "./base_error";

export default class NameError extends BaseError {
    constructor(varName: string) {
        super(ErrorCode.NONE, new Token(TokenType.NONE, null), `Unexpected token ${varName}`);
    }
}
