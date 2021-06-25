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
import ProcedureCall from './ast/procedure_call';
import CallStack from './containers/call_stack';
import ActivationRecord, { ARType } from './containers/activation_record';
import ProcedureSymbol from './symbols/procedure_symbol';
import AST from './ast/ast';

export default class Interpreter extends NodeVisitor {
    private tree: AST;
    private callStack: CallStack<ActivationRecord>;

    constructor(tree: AST) {
        super();

        this.tree = tree;
        this.callStack = new CallStack<ActivationRecord>();
    }

    getCallStack(): CallStack<ActivationRecord> {
        return this.callStack;
    }

    visitProgram(node: Program): void {
        const progName = node.getName();

        this.callStack.push(new ActivationRecord(progName, ARType.PROGRAM, 1));
        this.visit(node.getBlock());
        this.callStack.pop();
    }

    visitBlock(node: Block): void {
        node.getDeclarations()
            .forEach(decl => Array.isArray(decl) ? decl.forEach(node => this.visit(node)) : this.visit(decl));

        this.visit(node.getCompoundStatement());
    }

    visitVarDecl(node: VarDecl): void {}

    visitProcedureDecl(node: ProcedureDecl): void {}

    visitProcedureCall(node: ProcedureCall): void {
        const procSymbol = node.getProcSymbol() as ProcedureSymbol;
        const ar = new ActivationRecord(node.getProcName(), ARType.PROCEDURE, procSymbol.getScopeLevel() + 1);
        const formalParams = procSymbol.getParams();
        const actualParams = node.getActualParams();

        formalParams.forEach((param, idx) => ar.set(param.getName(), this.visit(actualParams[idx])));

        this.callStack.push(ar);
        this.visit(procSymbol.getBlock() as Block);
        this.callStack.pop();
    }

    visitType(node: Type): void {}

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

        throw new Error(`The operation type ${node.getOp().getType()} is not supported`);
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

        throw new Error(`The operation type ${node.getOp().getType()} is not supported`);
    }

    visitCompound(node: Compound): void {
        node.getChildren().forEach(child => this.visit(child));
    }

    visitAssign(node: Assign): void {
        const varName = node.getLeft().getValue() as string;
        const varValue = this.visit(node.getRight());
        const activationRecord = this.callStack.peek();

        activationRecord?.set(varName, varValue);
    }

    visitVar(node: Var): number {
        const varName = node.getValue() as string;
        const activationRecord = this.callStack.peek();
        const varValue = activationRecord?.get(varName);

        if (varValue === undefined)
            throw new NameError(varName);

        return varValue;
    }

    visitNoOp(node: NoOp): void {}

    interpret(): TokenValue {
        return this.visit(this.tree);
    }
}
