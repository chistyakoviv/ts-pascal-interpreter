const { default: SemanticAnalyzer } = require('../dist/cjs/visitors/semantic_analyzer.js');
const { default: Parser } = require('../dist/cjs/parser.js');
const { default: Lexer } = require('../dist/cjs/lexer.js');
const { default: ParseError } = require('../dist/cjs/errors/parse_error.js');
const { default: NameError } = require('../dist/cjs/errors/name_error.js');

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
        expect(runSemanticAnalyzer).toThrow(NameError);
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
        expect(runSemanticAnalyzer).toThrow(NameError);
        expect(runSemanticAnalyzer).toThrow('Unexpected token a');
    });

    it(`throws the parsing error 'Duplicate identifier a found'`, () => {
        // arrange
        const src = `
            program Main;
                var x, y: real;

                procedure Alpha(a : integer);
                    var y : integer;
                    var a : real;  { ERROR here! }
                begin
                    x := a + x + y;
                end;

            begin { Main }

            end.  { Main }
        `;
        const runSemanticAnalyzer = createSemanticAnalyzer(src);

        // act
        // assert
        expect(runSemanticAnalyzer).toThrow(ParseError);
        expect(runSemanticAnalyzer).toThrow('Duplicate identifier a found');
    });
});
