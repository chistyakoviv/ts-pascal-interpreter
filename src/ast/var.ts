import AST from './ast';
import Token from '../token';
import { TokenValue } from '../types';

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
