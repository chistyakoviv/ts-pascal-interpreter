import NodeVisitor from '../node_visitor';
import ScopedSymbolTable from '../scoped_symbol_table';
import VarSymbol from '../symbols/var_symbol';
import Symb from '../symbols/symbol';

import Assign from '../ast/assign';
import BinOp from '../ast/binop';
import Compound from '../ast/compound';
import Num from '../ast/num';
import Var from '../ast/var';
import UnaryOp from '../ast/unaryop';
import { TokenType } from '../token';
import { TokenValue } from '../types';
import NoOp from '../ast/noop';
import Program from '../ast/program';
import Block from '../ast/block';
import VarDecl from '../ast/var_decl';
import Type from '../ast/type';
import NameError from '../errors/name_error';
import ProcedureDecl from '../ast/procedure_decl';
import ProcedureCall from '../ast/procedure_call';
import ProcedureSymbol from '../symbols/procedure_symbol';
import ParseError from '../errors/parse_error';
import SemanticError from '../errors/semantic_error';
import { ErrorCode } from '../errors/base_error';

export default class SemanticAnalyzer extends NodeVisitor {
    private currentScope: ScopedSymbolTable | undefined;

    constructor() {
        super();

        this.currentScope = new ScopedSymbolTable('global', 1);
    }

    visitBlock(node: Block): void {
        node.getDeclarations()
            .forEach(decl => Array.isArray(decl) ? decl.forEach(node => this.visit(node)) : this.visit(decl));

        this.visit(node.getCompoundStatement());
    }

    visitProgram(node: Program): void {
        this.visit(node.getBlock());
        this.currentScope = this.currentScope?.getEnclosingScope();
    }

    visitBinOp(node: BinOp): void {
        this.visit(node.getLeft());
        this.visit(node.getRight());
    }

    visitNum(node: Num): void {}

    visitUnaryOp(node: UnaryOp): void {
        this.visit(node.getNode());
    }

    visitCompound(node: Compound): void {
        node.getChildren().forEach(child => this.visit(child));
    }

    visitNoOp(node: NoOp): void {}

    visitVarDecl(node: VarDecl): void {
        const typeName = node.getTypeNode().getValue() as string;
        const typeSymbol = this.currentScope?.lookup(typeName) as Symb;
        const varName = node.getVarNode().getValue() as string;
        const varSymbol = new VarSymbol(varName, typeSymbol);

        if (this.currentScope?.lookup(varName, true) !== null)
            throw new SemanticError(ErrorCode.DUPLICATE_ID, node.getVarNode().getToken(), `${ErrorCode.DUPLICATE_ID} -> ${node.getVarNode().getToken()}`);

        this.currentScope.insert(varSymbol);
    }

    visitProcedureCall(node: ProcedureCall): void {
        const procSymb = this.currentScope?.lookup(node.getProcName()) as ProcedureSymbol;

        if (!procSymb)
            throw new Error('No such procedure');

        const paramsCount = procSymb.getParams().length;

        if (paramsCount !== node.getActualParams().length)
            throw new Error('The number of formal and actual parameters doesn\'t match');

        node.setProcSymbol(procSymb);

        node.getActualParams()
            .forEach(param => this.visit(param));
    }

    visitProcedureDecl(node: ProcedureDecl): void {
        const procName = node.getProcName();
        const procSymbol = new ProcedureSymbol(procName);

        this.currentScope?.insert(procSymbol);

        const procedureScope = new ScopedSymbolTable(procName, this.currentScope?.getLevel() as number + 1, this.currentScope);

        this.currentScope = procedureScope;

        node.getParams()
            .forEach(param => {
                const paramType = this.currentScope?.lookup(param.getTypeNode().getValue() as string) as Symb;
                const paramName = param.getVarNode().getValue() as string;
                const varSymbol = new VarSymbol(paramName, paramType);

                this.currentScope?.insert(varSymbol);
                procSymbol.addParam(varSymbol);
            });

        this.visit(node.getBlock());
        this.currentScope = this.currentScope.getEnclosingScope();

        procSymbol.setBlock(node.getBlock());
    }

    visitAssign(node: Assign): void {
        const varName = node.getLeft().getValue() as string;
        const varSymbol = this.currentScope?.lookup(varName);

        if (!varSymbol)
            throw new NameError(varName);

        this.visit(node.getRight());
    }

    visitVar(node: Var): void {
        const varName = node.getValue() as string;
        const varSymbol = this.currentScope?.lookup(varName);

        if (varSymbol === null)
            throw new SemanticError(ErrorCode.ID_NOT_FOUND, node.getToken(), `${ErrorCode.ID_NOT_FOUND} -> ${node.getToken()}`);
    }
}
