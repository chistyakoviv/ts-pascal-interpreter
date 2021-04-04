import Token from '../token';
import { TokenValue } from '../types';
import AST from './ast';

export default class Num extends AST {
    private token: Token;

    constructor(token: Token) {
        super('Num');

        this.token = token;
    }

    getValue(): TokenValue {
        return this.token.getValue();
    }
}
