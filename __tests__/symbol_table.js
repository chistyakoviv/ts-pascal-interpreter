const SemanticAnalyzer = require('../dist/cjs/visitors/semantic_analyzer.js').default;
const Parser = require('../dist/cjs/parser.js').default;
const Lexer = require('../dist/cjs/lexer.js').default;
// const NameError = require('../dist/cjs/errors/name_error.js').default;

describe('symbol table', () => {

    const createSemanticAnalyzer = (text) => {
        return function() {
            const lexer = new Lexer(text);
            const parser = new Parser(lexer);
            const semanticAnalyzer = new SemanticAnalyzer();
            const tree = parser.parse();
            return semanticAnalyzer.visit(tree);
        };
    };

    it(`throws the parsing error 'Unexpected token b' when b is used in an expression`, () => {
        // arrange
        const src = `
            PROGRAM NameError1;
            VAR
               a : INTEGER;

            BEGIN
               a := 2 + b;
            END.
        `;
        const runSemanticAnalyzer = createSemanticAnalyzer(src);

        // act
        // assert
        expect(runSemanticAnalyzer).toThrow(Error);
        expect(runSemanticAnalyzer).toThrow('Unexpected token b');
    });

    it(`throws the parsing error 'Unexpected token a' when assigning an expression to a`, () => {
        // arrange
        const src = `
            PROGRAM NameError2;
            VAR
                b : INTEGER;

            BEGIN
                b := 1;
                a := b + 2;
            END.
        `;
        const runSemanticAnalyzer = createSemanticAnalyzer(src);

        // act
        // assert
        expect(runSemanticAnalyzer).toThrow(Error);
        expect(runSemanticAnalyzer).toThrow('Unexpected token a');
    });
});
