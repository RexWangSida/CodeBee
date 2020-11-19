
import proof_scanner as SC
from proof_scanner import PLUS, MINUS, INCC, DECC, MULT, DIV, MOD, AND, OR, NOT, EQ, NE, LT, GT, LE, GE, BECOMES, LINEEND, COMMA, LPAREN, RPAREN, LBRAK, RBRAK, LCURLY, RCURLY, COLON, INTEGER, REAL, STRING_LITERAL, IDENT, INT, FLOAT, STRING, BOOL, DO, END, IF, THEN, ELSE, WHILE, PROGRAM, FUNCTION, RETURN, OUTPUT, EOF, mark, getSym

# ALL BINARY OPERATIONS
BINARYOP  = {PLUS, MINUS, MULT, DIV, MOD, AND, OR, EQ, NE, LT, GT, LE, GE}

# ALL UNARY OPERATIONS
UNARYOP  = {PLUS, MINUS, NOT, INCC, DECC}

FIRSTPARAMS  = {LPAREN}
FOLLOWPARAMS = {RPAREN}

FIRSTSELECTOR  = {LBRAK}
FOLLOWSELECTOR = {RBRAK}

FIRSTPRIME_EXPR  = {IDENT, INTEGER, REAL, STRING_LITERAL} | FIRSTPARAMS | FIRSTSELECTOR
FOLLOWPRIME_EXPR = {IDENT, INTEGER, REAL, STRING_LITERAL} | FOLLOWPARAMS | FOLLOWSELECTOR

FIRSTPOST_EXPR  = FIRSTPRIME_EXPR
FOLLOWPOST_EXPR = {INCC, DECC} | FOLLOWSELECTOR | FOLLOWPRIME_EXPR

FIRSTUNARY_EXPR  = {PLUS, MINUS, NOT} | FIRSTPOST_EXPR
FOLLOWUNARY_EXPR = FOLLOWPOST_EXPR

FIRSTCAST_EXPR  = {INT, FLOAT, STRING, BOOL} | FIRSTUNARY_EXPR
FOLLOWCAST_EXPR = {RPAREN} | FOLLOWUNARY_EXPR

FIRSTMULT_EXPR  = FIRSTCAST_EXPR
FOLLOWMULT_EXPR = FOLLOWCAST_EXPR

FIRSTADD_EXPR  = FIRSTMULT_EXPR
FOLLOWADD_EXPR = FOLLOWMULT_EXPR

FIRSTRLTN_EXPR  = FIRSTADD_EXPR
FOLLOWRLTN_EXPR = FOLLOWADD_EXPR

FIRSTEQLTY_EXPR  = FIRSTRLTN_EXPR
FOLLOWEQLTY_EXPR = FOLLOWRLTN_EXPR

FIRSTAND_EXPR  = FIRSTEQLTY_EXPR
FOLLOWAND_EXPR = FOLLOWEQLTY_EXPR

FIRSTEXPR  = FIRSTAND_EXPR
FOLLOWEXPR = FOLLOWAND_EXPR

FIRSTEXPR  = FIRSTPOST_EXPR | FIRSTEXPR
FOLLOWEXPR = FOLLOWEXPR

# REQUIRED ENUMERATION TO PREVENT LOOP
FIRSTSTMT  = {DO, WHILE, IF, FUNCTION, RETURN, OUTPUT} | FIRSTEXPR
FOLLOWSTMT = {LINEEND}

FIRSTEXPR_STMT  = {LINEEND} | FIRSTEXPR
FOLLOWEXPR_STMT = {LINEEND}

FIRSTITER_STMT  = {WHILE}
FOLLOWITER_STMT = FOLLOWSTMT

FIRSTSLCT_STMT  = {IF}
FOLLOWSLCT_STMT = FOLLOWSTMT

# NOT REAL STATEMENT; JUST WAY TO REPEAT STATEMENTS
FIRSTSTMT_LIST  = {LINEEND} | FIRSTSTMT
FOLLOWSTMT_LIST = FOLLOWSTMT

FIRSTCPLX_STMT  = {DO}
FOLLOWCPLX_STMT = {LINEEND}

FIRSTFUNC_STMT  = {FUNCTION}
FOLLOWFUNC_STMT = FOLLOWSTMT

FIRSTRETN_STMT  = {RETURN}
FOLLOWRETN_STMT = {RETURN, RPAREN}

FIRSTOUTP_STMT  = {OUTPUT}
FOLLOWOUTP_STMT = {RPAREN}

# DON'T REQUIRE NEWLINE AT FILE END
FIRSTPROGRAM  = {PROGRAM}
FOLLOWPROGRAM = {EOF} | FOLLOWSTMT

def program():
    if SC.sym not in FIRSTPROGRAM:
        mark('invalid program first token')

    if SC.sym == PROGRAM: getSym()
    else: mark("expected 'program'")

    if SC.sym == IDENT: getSym()
    else: mark("expected identifier")

    if SC.sym in FIRSTPARAMS: params()
    else: mark("expected parameters")

    if SC.sym in FIRSTSTMT: stmt()
    else: mark("expected statement")

def params():
    if SC.sym not in FIRSTPARAMS:
        mark('invalid selector first token')

    if SC.sym == LPAREN: getSym()
    else: mark("expected '('")

    if SC.sym in FIRSTEXPR:
        expr()
        while SC.sym == COMMA:
            getSym()
            if SC.sym in FIRSTEXPR: expr()
            else: mark("expected expression")

    if SC.sym == RPAREN: getSym()
    else: mark("expected ')'")

def selector():
    if SC.sym not in FIRSTSELECTOR:
        mark('invalid selector first token')

    if SC.sym == LBRAK: getSym()
    else: mark("expected '['")

    if SC.sym in FIRSTEXPR:
        expr()
        while SC.sym == COMMA:
            getSym()
            if SC.sym in FIRSTEXPR: expr()
            else: mark("expected expression")

    if SC.sym == RBRAK: getSym()
    else: mark("expected ']'")

def stmt():
    if SC.sym not in FIRSTSTMT:
        mark('invalid stmt first token')

    if SC.sym in FIRSTCPLX_STMT:
        cplx_stmt()
    elif SC.sym in FIRSTEXPR_STMT:
        expr_stmt()
    elif SC.sym in FIRSTITER_STMT:
        iter_stmt()
    elif SC.sym in FIRSTSLCT_STMT:
        slct_stmt()
    elif SC.sym in FIRSTFUNC_STMT:
        func_stmt()
    elif SC.sym in FIRSTRETN_STMT:
        retn_stmt()
    elif SC.sym in FIRSTOUTP_STMT:
        outp_stmt()

def cplx_stmt():
    if SC.sym not in FIRSTCPLX_STMT:
        mark('invalid cplx_stmt first token')

    if SC.sym == DO: getSym()
    else: mark("expected 'do'")

    if SC.sym == LINEEND: getSym()
    else: mark("expected newline")

    stmt_list()

    if SC.sym == END: getSym()
    else: mark("expected 'end'")

def slct_stmt():
    if SC.sym not in FIRSTSLCT_STMT:
        mark('invalid slct_stmt first token')

    if SC.sym == IF: getSym()
    else: mark("expected 'if'")

    if SC.sym == LPAREN: getSym()
    else: mark("if statement expectes '('")

    if SC.sym in FIRSTEXPR: expr()
    else: mark("expected expression")

    if SC.sym == RPAREN: getSym()
    else: mark("expected ')'")

    if SC.sym == LINEEND: getSym()
    else:
        if SC.sym in FIRSTSTMT: mark("expected stmt on newline")
        else: mark("expected newline")

    stmt()

    if SC.sym == LINEEND: getSym()
    else: mark('expected newline')

    if SC.sym == ELSE:
        getSym()

        if SC.sym == LINEEND: getSym()
        else:
            if SC.sym in FIRSTSTMT: mark("expected stmt on newline")
            else: mark("expected newline")

        if SC.sym in FIRSTSTMT: stmt()
        else: mark("expected statement")

def iter_stmt():
    if SC.sym not in FIRSTITER_STMT:
        mark('invalid iter_stmt first token')

    if SC.sym == WHILE: getSym()
    else: mark("expected 'while'")

    if SC.sym == LPAREN: getSym()
    else: mark("while statement expectes '('")

    if SC.sym in FIRSTEXPR: expr()
    else: mark("expected expression")

    if SC.sym == RPAREN: getSym()
    else: mark("expected ')'")

    if SC.sym == LINEEND: getSym()
    else:
        if SC.sym in FIRSTSTMT: mark("expected stmt on newline")
        else: mark("expected newline")

    stmt()

def expr_stmt():
    if SC.sym not in FIRSTEXPR_STMT:
        mark('invalid expr_stmt first token')

    assignment = False
    if SC.sym in FIRSTPOST_EXPR:
        post_expr()

        if SC.sym == BECOMES:
            getSym()
            assignment = True

    if assignment:
        expr()
    else:
        if SC.sym in BINARYOP:
            # MIDWAY THROUGH EXPR, NEED TO PICKUP
            if SC.sym in {OR}:
                expr()
            elif SC.sym in {AND}:
                and_expr()
            elif SC.sym in {EQ, NE}:
                eqlty_expr()
            elif SC.sym in {LT, GT, LE, GE}:
                rltn_expr()
            elif SC.sym in {PLUS, MINUS}:
                add_expr()
            elif SC.sym in {MULT, DIV, MOD}:
                mult_expr()
            else:
                mark('expected binary operator')

        elif SC.sym == LINEEND:
            # IF EXPRESSION IS A PRIME_EXPR w/ POSTFIX
            pass

        else:
            mark('unknown expression end')

def func_stmt():
    if SC.sym not in FIRSTFUNC_STMT:
        mark('invalid func_stmt first token')

    if SC.sym == FUNCTION: getSym()
    else: mark("expected 'define'")

    if SC.sym == IDENT: getSym()
    else: mark("expected identifier")

    if SC.sym in FIRSTPARAMS: params()
    else: mark("expected parameters")

    if SC.sym in FIRSTSTMT: stmt()
    else: mark("expected statement")

def retn_stmt():
    if SC.sym not in FIRSTRETN_STMT:
        mark('invalid retn_stmt first token')

    if SC.sym == RETURN: getSym()
    else: mark("expected 'return'")

    if SC.sym == LPAREN:
        getSym()

        if SC.sym in FIRSTEXPR: expr()
        else: mark("expected expression")

        if SC.sym == RPAREN: getSym()
        else: mark("expected ')'")
    elif SC.sym != LINEEND:
        mark('return bracketed expression or none')

def outp_stmt():
    if SC.sym not in FIRSTOUTP_STMT:
        mark('invalid outp_stmt first token')

    if SC.sym == OUTPUT: getSym()
    else: mark("expected 'output'")

    if SC.sym == LPAREN: getSym()
    else: mark("return statement expectes '('")

    if SC.sym in FIRSTEXPR: expr()
    else: mark("expected expression")

    if SC.sym == RPAREN: getSym()
    else: mark("expected ')'")

def stmt_list():
    if SC.sym not in FIRSTSTMT_LIST:
        mark('invalid stmt_list first token')

    while SC.sym in {LINEEND} | FIRSTSTMT:
        if SC.sym in FIRSTSTMT:
            stmt()

        if SC.sym == LINEEND: getSym()
        else:
            mark('expected newline')
            # BREAK OUT OF POTENTIAL INFINITE LOOPS
            while SC.sym != LINEEND: getSym()

def expr():
    if SC.sym not in FIRSTEXPR:
        mark('invalid expr first token')

    and_expr()

    while SC.sym == OR:
        getSym()
        and_expr()

def and_expr():
    if SC.sym not in FIRSTAND_EXPR:
        mark('invalid and_expr first token')

    eqlty_expr()

    while SC.sym == AND:
        getSym()
        eqlty_expr()

def eqlty_expr():
    if SC.sym not in FIRSTEQLTY_EXPR:
        mark('invalid eqlty_expr first token')

    rltn_expr()

    while SC.sym in {EQ, NE}:
        getSym()
        rltn_expr()

def rltn_expr():
    if SC.sym not in FIRSTRLTN_EXPR:
        mark('invalid rltn_expr first token')

    add_expr()

    while SC.sym in {LT, GT, LE, GE}:
        getSym()
        add_expr()

def add_expr():
    if SC.sym not in FIRSTADD_EXPR:
        mark('invalid add_expr first token')

    mult_expr()

    while SC.sym in {PLUS, MINUS}:
        getSym()
        mult_expr()

def mult_expr():
    if SC.sym not in FIRSTMULT_EXPR:
        mark('invalid mult_expr first token')

    cast_expr()

    while SC.sym in {MULT, DIV, MOD}:
        getSym()
        cast_expr()

def cast_expr():
    if SC.sym not in FIRSTCAST_EXPR:
        mark('invalid cast_expr first token')

    if SC.sym in {INT, FLOAT, STRING, BOOL}:
        getSym()

        if SC.sym == COLON: getSym()
        else: mark("cast expectes ':'")

    unary_expr()

def unary_expr():
    if SC.sym not in FIRSTUNARY_EXPR:
        mark('invalid unary_expr first token')

    if SC.sym in {PLUS, MINUS, NOT}:
        getSym()

    post_expr()

def post_expr():
    if SC.sym not in FIRSTPOST_EXPR:
        mark('invalid post_expr first token')

    prime_expr()

    while SC.sym in {INCC, DECC} | FIRSTPARAMS | FIRSTSELECTOR:
        if SC.sym in {INCC, DECC}:
            getSym()
        elif SC.sym in FIRSTPARAMS:
            params()
        elif SC.sym in FIRSTSELECTOR:
            selector()

def prime_expr():
    if SC.sym not in FIRSTPRIME_EXPR:
        mark('invalid prime_expr first token')

    if SC.sym == IDENT:
        getSym()
    elif SC.sym == INTEGER:
        getSym()
    elif SC.sym == REAL:
        getSym()
    elif SC.sym == STRING_LITERAL:
        getSym()
    elif SC.sym == LPAREN:
        getSym()

        expr()

        if SC.sym == COMMA:
            getSym()
            expr()

        if SC.sym == RPAREN: getSym()
        else: mark("expected ')'")

    else:
        mark('expected expression')

def _readsource(fname):
    src = ''
    with open(fname,'r') as reader:
        for line in reader.readlines():
            src += line
    return src

if __name__ == '__main__':
    fname = 'proof_file'
    src = _readsource(fname)

    SC.init(fname, src)
    program()

    if SC.error:
        print('=parsed unsuccessfully=')
    else:
        print('=parsed successfully=')
