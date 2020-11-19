
PLUS = 1; # +
MINUS = 2; # -
INCC = 3; # ++
DECC = 4; # --
MULT = 5; # *
DIV = 6; # /
MOD = 7; # %
AND = 8; # and
OR = 9; # or
NOT = 10; # not | !
EQ = 11; # =
NE = 12; # !=
LT = 13; # <
GT = 14; # >
LE = 15; # <=
GE = 16; # >=
BECOMES = 17; # :=
LINEEND = 18; # \n
LPAREN = 19; # (
RPAREN = 20; # )
LBRAK = 21; # [
RBRAK = 22; # ]
LCURLY = 21; # {
RCURLY = 22; # }
COMMA = 23; # ,

INTEGER = 30; # `val` holds corresponding number
REAL = 31; # `val` holds corresponding number
STRING_LITERAL = 32; # `val` holds string contents
IDENT = 33; # `val` holds string identifier

INT = 40 # int
FLOAT = 41 # float
STRING = 42 # str
BOOL = 43 # bool

DO = 50; # do
END = 51; # end
IF = 52; # if
THEN = 53; # then
ELSE = 54; # else
WHILE = 55; # while
PROGRAM = 55; # program
FUNCTION = 56; # define
RETURN = 57; # return
OUTPUT = 58; # output

COLON = 80; # :

EOF = 99;

KEYWORDS = {'int': INT, 'real': FLOAT, 'str': STRING, 'bool': BOOL, 'if': IF,
    'then': THEN, 'else': ELSE, 'do': DO, 'end': END,  'while': WHILE,
    'and': AND, 'or': OR, 'not': NOT, 'program': PROGRAM, 'define': FUNCTION,
    'return': RETURN, 'output': OUTPUT}

def init(file : str, src : str) -> None:
    # Initializes scanner for new source code
    global line, lastline, errline, pos, lastpos, errpos, filename
    global sym, val, error, source, index, lastsym, lastval
    line, lastline, errline = 0, 0, 0
    pos, lastpos, errpos = 0, 0, 0
    sym, val, error = None, None, False
    lastsym, lastval = None, None
    source, index, filename = src, 0, file
    getChar(); getSym()

def getChar():
    global line, lastline, pos, lastpos, ch, index
    if index == len(source): ch = chr(0)
    else:
        ch, index = source[index], index + 1
        lastpos = pos
        if ch == '\n':
            pos, line = 0, line + 1
        else:
            lastline, pos = line, pos + 1

def mark(msg):
    global errline, errpos, error, filename, sym
    if not error or lastline > errline or lastpos > errpos:
        print('file',filename,'error: line', lastline+1, 'pos', lastpos, msg,'<last sym',str(sym)+'>')
    error = True
    errline, errpos = lastline, lastpos

def number():
    global sym, val
    sym, val, frac, div, lastval = INTEGER, 0, 0, 10, val
    while '0' <= ch <= '9':
        val = 10 * val + int(ch)
        getChar()
    if ch == '.':
        getChar()
        val = REAL
        while '0' <= ch <= '9':
            val =  val + int(ch) / div
            getChar(); div /= 10

    if val >= 2**31:
        mark('number too large'); val = 0

def raw_string(open : str):
    global sym, val, lastval
    getChar()
    start = index - 1
    while chr(0) != ch != open: getChar()
    if ch == chr(0): mark('string not terminated'); sym = None;
    else:
        sym = STRING_LITERAL
        val, lastval = source[start:index-1], val
        getChar(); # Get rid of terminating '

def identKW():
    global sym, val, lastval
    start = index - 1
    while ('A' <= ch <= 'Z') or ('a' <= ch <= 'z') or ('0' <= ch <= '9') or (ch == '_'): getChar()
    val, lastval = source[start:index-1], val
    sym = KEYWORDS[val] if val in KEYWORDS else IDENT # (USRFUNC if val in usrfunc else IDENT)

def blockcomment():
    while chr(0) != ch:
        if ch == '*':
            getChar()
            if ch == '/':
                 getChar(); break
        else:
            getChar()
    if ch == chr(0): mark('comment not terminated')
    else: getChar()

# Keeps taking inputs until a newline or EOF is found
def linecomment():
    while chr(0) != ch != '\n': getChar()

# Determines the next symbol in the input
def getSym():
    global sym, lastsym

    lastsym = sym

    while chr(0) < ch <= ' ' and ch != '\n':
        getChar()

    if 'A' <= ch <= 'Z' or 'a' <= ch <= 'z': identKW()
    elif '0' <= ch <= '9': number()
    elif ch == "'" or ch == '"': raw_string(ch)

    elif ch == '\n': getChar(); sym = LINEEND
    elif ch == '+':
        getChar();
        if ch == '+': getChar(); sym = INCC
        else: sym = PLUS
    elif ch == '-':
        getChar();
        if ch == '-': getChar(); sym = DECC
        else: sym = MINUS
    elif ch == '*': getChar(); sym = MULT
    elif ch == '/':
        getChar();
        if ch == '/': linecomment()
        else: sym = DIV
    elif ch == '%': getChar(); sym = MOD
    elif ch == ':':
        getChar();
        if ch == '=': getChar(); sym = BECOMES
        else: sym = COLON
    elif ch == '=': getChar(); sym = EQ
    elif ch == '!':
        getChar();
        if ch == '=': getChar(); sym = NE
        # FOR SIMPLER WRITING
        else: sym = NOT
    elif ch == '<':
        getChar();
        if ch == '=': getChar(); sym = LE
        else: sym = LT
    elif ch == '>':
        getChar();
        if ch == '=': getChar(); sym = GE
        else: sym = GT
    elif ch == ';': getChar(); sym = LINEEND
    elif ch == '\n': getChar(); sym = LINEEND
    elif ch == ',': getChar(); sym = COMMA
    elif ch == '(': getChar(); sym = LPAREN
    elif ch == ')': getChar(); sym = RPAREN
    elif ch == '[': getChar(); sym = LBRAK
    elif ch == ']': getChar(); sym = RBRAK

    # FOR SIMPLER WRITING
    elif ch == '{': getChar(); sym = DO # LCURLY
    elif ch == '}': getChar(); sym = END # RCURLY
    elif ch == ';': getChar(); sym = LINEEND

    elif ch == chr(0): sym = EOF
    else: mark('illegal character: '+ch); getChar(); sym = None
