import AST from './ast.js';
import Token from '../token.js';
import { TokenValue } from '../types.js';

export default class Var extends AST {
    private token: Token;

    constructor(token: Token) {
        super('Var');

        this.token = token;
    }

    getToken(): Token {
        return this.token;
    }

    getValue(): TokenValue {
        return this.token.getValue();
    }
}
