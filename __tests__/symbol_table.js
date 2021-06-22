const { default: SemanticAnalyzer } = require('../dist/cjs/visitors/semantic_analyzer');
const { default: Parser } = require('../dist/cjs/parser');
const { default: Lexer } = require('../dist/cjs/lexer');
const { default: ParseError } = require('../dist/cjs/errors/parse_error');
const { default: NameError } = require('../dist/cjs/errors/name_error');
const { default: SemanticError } = require('../dist/cjs/errors/semantic_error');

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
        expect(runSemanticAnalyzer).toThrow(SemanticError);
        expect(runSemanticAnalyzer).toThrow('SemanticError: Identifier not found -> Token(128, b, position=7:26');
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

    it(`throws the parsing error 'SemanticError: Duplicate id found -> Token(128, a, position=7:26)'`, () => {
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
        expect(runSemanticAnalyzer).toThrow(SemanticError);
        expect(runSemanticAnalyzer).toThrow('SemanticError: Duplicate id found -> Token(128, a, position=7:26)');
    });

    it(`tests parsing a procedure call with a large number of actual parameters`, () => {
        // arrange
        const src = `
            program Main;

            procedure Alpha(a : integer; b : integer);
            var x : integer;
            begin
                x := (a + b ) * 2;
            end;

            begin { Main }

                Alpha(5, 7, 8);  { procedure call }

            end.  { Main }
        `;
        const runSemanticAnalyzer = createSemanticAnalyzer(src);

        // act
        // assert
        expect(runSemanticAnalyzer).toThrow(Error);
        expect(runSemanticAnalyzer).toThrow('The number of formal and actual parameters doesn\'t match');
    });

    it(`tests parsing a procedure call with fewer actual parameters`, () => {
        // arrange
        const src = `
            program Main;

            procedure Alpha(a : integer; b : integer);
            var x : integer;
            begin
                x := (a + b ) * 2;
            end;

            begin { Main }

                Alpha();  { procedure call }

            end.  { Main }
        `;
        const runSemanticAnalyzer = createSemanticAnalyzer(src);

        // act
        // assert
        expect(runSemanticAnalyzer).toThrow(Error);
        expect(runSemanticAnalyzer).toThrow('The number of formal and actual parameters doesn\'t match');
    });
});
