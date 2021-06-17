import AST from './ast/ast';

export default abstract class NodeVisitor {
    visit(node: AST): number {
        const method = `visit${node.getName()}`;

        if (!(this as any)[method])
            throw new Error(`No ${method} method`);

        return (this as any)[method](node);
    }
}
