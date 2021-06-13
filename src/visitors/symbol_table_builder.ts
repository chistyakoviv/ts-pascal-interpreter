import NodeVisitor from '../node_visitor.js';
import SymbolTable from '../symbol_table.js';
import VarSymbol from '../symbols/var_symbol.js';
import Symb from '../symbols/symbol.js';

import Assign from '../ast/assign.js';
import BinOp from '../ast/binop.js';
import Compound from '../ast/compound.js';
import Num from '../ast/num.js';
import Var from '../ast/var.js';
import UnaryOp from '../ast/unaryop.js';
import { TokenType } from '../token.js';
import { TokenValue } from '../types.js';
import NoOp from '../ast/noop.js';
import Program from '../ast/program.js';
import Block from '../ast/block.js';
import VarDecl from '../ast/var_decl.js';
import Type from '../ast/type.js';
import NameError from '../errors/name_error.js';
import ProcedureDecl from '../ast/procedure_decl.js';

export default class SymbolTableBuilder extends NodeVisitor {
    private symtab: SymbolTable;

    constructor() {
        super();

        this.symtab = new SymbolTable();
    }

    visitBlock(node: Block): void {
        node.getDeclarations()
            .forEach(decl => Array.isArray(decl) ? decl.forEach(node => this.visit(node)) : this.visit(decl));

        this.visit(node.getCompoundStatement());
    }

    visitProgram(node: Program): void {
        this.visit(node.getBlock());
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

    visitVarDecl(node: VarDecl) {
        const typeName = node.getTypeNode().getValue() as string;
        const typeSymbol = this.symtab.lookup(typeName) as Symb;
        const varName = node.getVarNode().getValue() as string;
        const varSymbol = new VarSymbol(varName, typeSymbol);
        this.symtab.define(varSymbol);
    }

    visitProcedureDecl(node: ProcedureDecl) {}

    visitAssign(node: Assign): void {
        const varName = node.getLeft().getValue() as string;
        const varSymbol = this.symtab.lookup(varName);

        if (!varSymbol)
            throw new NameError(varName);

        this.visit(node.getRight());
    }

    visitVar(node: Var): void {
        const varName = node.getValue() as string;
        const varSymbol = this.symtab.lookup(varName);

        if (!varSymbol)
            throw new NameError(varName);
    }
}
