import AST from './ast.js';

export default class Compound extends AST {
    private children: AST[] = [];

    constructor() {
        super('Compound');
    }

    push(el: AST): void {
        this.children.push(el);
    }

    getChildren(): AST[] {
        return this.children;
    }
}
