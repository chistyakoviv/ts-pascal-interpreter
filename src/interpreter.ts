import Assign from './ast/assign';
import BinOp from './ast/binop';
import Compound from './ast/compound';
import Num from './ast/num';
import Var from './ast/var';
import UnaryOp from './ast/unaryop';
import ParseError from './errors/parse_error';
import NameError from './errors/name_error';
import NodeVisitor from './node_visitor';
import Parser from './parser';
import { TokenType } from './token';
import { TokenValue } from './types';
import NoOp from './ast/noop';
import Program from './ast/program';
import Block from './ast/block';
import VarDecl from './ast/var_decl';
import Type from './ast/type';
import ProcedureDecl from './ast/procedure_decl';

export default class Interpreter extends NodeVisitor {
    private parser: Parser;
    private globalScope: {[key: string]: number} = {};

    constructor(parser: Parser) {
        super();

        this.parser = parser;
    }

    getGlobalScope(): {[key: string]: number} {
        return this.globalScope;
    }

    visitProgram(node: Program): void {
        this.visit(node.getBlock());
    }

    visitBlock(node: Block): void {
        node.getDeclarations()
            .forEach(decl => Array.isArray(decl) ? decl.forEach(node => this.visit(node)) : this.visit(decl));

        this.visit(node.getCompoundStatement());
    }

    visitVarDecl(node: VarDecl) {}

    visitProcedureDecl(node: ProcedureDecl) {}

    visitType(node: Type) {}

    visitBinOp(node: BinOp): number {
        switch (node.getOp().getType()) {
            case TokenType.PLUS:
                return this.visit(node.getLeft()) + this.visit(node.getRight());
            case TokenType.MINUS:
                return this.visit(node.getLeft()) - this.visit(node.getRight());
            case TokenType.MULT:
                return this.visit(node.getLeft()) * this.visit(node.getRight());
            case TokenType.INTEGER_DIV:
                return Math.floor(this.visit(node.getLeft()) / this.visit(node.getRight()));
            case TokenType.FLOAT_DIV:
                return this.visit(node.getLeft()) / this.visit(node.getRight());
        }

        throw new ParseError();
    }

    visitNum(node: Num): number {
        return node.getValue() as number;
    }

    visitUnaryOp(node: UnaryOp): number {
        switch (node.getOp().getType()) {
            case TokenType.PLUS:
                return +this.visit(node.getNode());
            case TokenType.MINUS:
                return -this.visit(node.getNode());
        }

        throw new ParseError();
    }

    visitCompound(node: Compound): void {
        node.getChildren().forEach(child => this.visit(child));
    }

    visitAssign(node: Assign): void {
        this.globalScope[node.getLeft().getValue() as string] = this.visit(node.getRight());
    }

    visitVar(node: Var): number {
        const varName = node.getValue() as string;
        const val = this.globalScope[varName];

        if (!val)
            throw new NameError(varName as string);

        return val;
    }

    visitNoOp(node: NoOp): void {}

    interpret(): TokenValue {
        const tree = this.parser.parse();
        return this.visit(tree);
    }
}
