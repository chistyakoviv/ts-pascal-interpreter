import AST from './ast';

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
