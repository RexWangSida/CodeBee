# Parser for Bee Blocks from blocks.py
import json, logging, sys
import blocks, state, coder

def readFile(filename):
    '''Reads raw json and converts it to blocks'''
    with open(filename, 'r') as openFile:
        logging.debug('start JSON parse')
        prog = json.load(openFile, cls=coder.Decoder)
        logging.debug('finished JSON parse')

    logging.debug('Successful file read')
    return prog

def writeFile(filename, state):
    '''Converts state dictionary to json and writes it to file'''
    text = json.dumps(state, indent=2, sort_keys=True)
    with open(filename, 'w') as openFile:
        openFile.write(text)

    logging.debug('Successful file write')

def ParseBlockProgram(struct):
    if type(struct) != blocks.ProgramBlock:
        logging.critical('Attempt to parse '+struct.block+' as Program')
        sys.exit(1)

    state.stateSym('program',struct.ident.ident)

    ParseBlockStmt(struct.body)

def ParseBlockScope(struct):
    if type(struct) != blocks.ScopeBlock:
        logging.critical('Attempt to parse '+struct.block+' as Scope')
        sys.exit(1)

    logging.debug('open stmt scope')
    for stmt in struct.stmts:
        ParseBlockStmt(stmt)
    logging.debug('close stmt scope')

def ParseBlockAssignment(struct):
    if type(struct) != blocks.AssignmentBlock:
        logging.critical('Attempt to parse '+struct.block+' as Assignment')
        sys.exit(1)

    name = struct.ident.ident # one ident gets a variable block
    store = ParseBlockExpr(struct.expr) # (type, value)

    logging.debug('assigned variable '+name+' to '+str(store))
    state.setSym(name,store)

def ParseBlockLiteral(struct):
    if type(struct) != blocks.LiteralBlock:
        logging.critical('Attempt to parse '+struct.block+' as Literal')
        sys.exit(1)

    try:
        if struct.type == 'int':
            int(struct.value)
        elif struct.type == 'str':
            str(struct.value)
        elif struct.type == 'float':
            float(struct.value)
        elif struct.type == 'bool':
            bool(struct.value)
        else:
            logging.error('Unknown literal type: '+struct.type)
            sys.exit(1)
    except ValueError:
        logging.critical('invalid literal type-value pair: ('+struct.type+','+struct.value+')')
        sys.exit(1)

    logging.debug('loaded literal ('+struct.type+','+struct.value+')')
    return (struct.type,struct.value)

def ParseBlockVariable(struct):
    if type(struct) != blocks.VariableBlock:
        logging.critical('Attempt to parse '+struct.block+' as Variable')
        sys.exit(1)

    name = struct.ident

    if not state.isSym(name):
        logging.critical('missing identifier: '+str(name))
        sys.exit(1)

    value = state.getSym(name)
    logging.debug('loaded variable '+name+' '+str(value))
    return value

def ParseBlockBinOp(struct):
    if type(struct) != blocks.BinOpBlock:
        logging.critical('Attempt to parse '+struct.block+' as BinOp')
        sys.exit(1)

    type1,value1 = ParseBlockExpr(struct.expr1) # index 0: type, index 1: value
    type2,value2 = ParseBlockExpr(struct.expr2)

    if type1 == 'int':
        value1 = int(value1)
    elif type1 == 'float':
        value1 = float(value1)
    elif type1 == 'str':
        value1 = str(value1)
    elif type1 == 'bool':
        value1 = bool(value1)

    if type2 == 'int':
        value2 = int(value2)
    elif type2 == 'float':
        value2 = float(value2)
    elif type2 == 'str':
        value2 = str(value2)
    elif type2 == 'bool':
        value2 = bool(value2)

    try:
        if struct.oper == '+':
            value3 = value1 + value2
        elif struct.oper == '-':
            value3 = value1 - value2
        elif struct.oper == '*':
            value3 = value1 * value2
        elif struct.oper == '/':
            value3 = value1 / value2
        elif struct.oper == '%':
            value3 = value1 % value2
        else:
            logging.critical('unknown operator '+struct.oper)
            sys.exit(1)
    except TypeError:
        logging.critical('incompatible types for '+struct.oper+': '+str(value1)+', '+str(value2))
        sys.exit(1)

    testtype = type(value3)

    if testtype == int:
        type3 = 'int'
    elif testtype == float:
        type3 = 'float'
    elif testtype == str:
        type3 = 'str'
    elif testtype == bool:
        type3 = 'bool'

    logging.debug('calculated '+str(value1)+struct.oper+str(value2)+'='+str(value3))
    packet = (type3, str(value3))
    return packet

def ParseBlockUnOp(struct):
    if type(struct) != blocks.UnOpBlock:
        logging.critical('Attempt to parse '+struct.block+' as UnOp')
        sys.exit(1)

    type1,value1 = ParseBlockExpr(struct.expr1) # index 0: type, index 1: value

    if type1 == 'int':
        value1 = int(value1)
    elif type1 == 'float':
        value1 = float(value1)
    elif type1 == 'str':
        value1 = str(value1)
    elif type1 == 'bool':
        value1 = bool(value1)

    try:
        if struct.oper == '+':
            value2 = + value1
        elif struct.oper == '-':
            value2 = - value1
        elif struct.oper == '++':
            value2 = value1 - 1
        elif struct.oper == '--':
            value2 = value1 - 1
        elif struct.oper == 'int':
            value2 = int(value1)
        elif struct.oper == 'float':
            value2 = float(value1)
        elif struct.oper == 'str':
            value2 = str(value1)
        elif struct.oper == 'bool':
            value2 = bool(value1)
        else:
            logging.critical('unknown operator '+struct.oper)
            sys.exit(1)
    except TypeError:
        logging.critical('incompatible type for '+struct.oper+': '+str(expr1[0]))
        sys.exit(1)
    except ValueError:
        logging.critical('incompatible value for '+struct.oper+': '+str(expr1[0]))
        sys.exit(1)

    testtype = type(value2)
    if testtype == int:
        type2 = 'int'
    elif testtype == float:
        type2 = 'float'
    elif testtype == str:
        type2 = 'str'
    elif testtype == bool:
        type2 = 'bool'

    logging.debug('calculated '+struct.oper+str(value1)+'='+str(value2))
    packet = (type2, str(value2))
    return packet

def ParseBlockStmt(struct):
    if type(struct) == blocks.ProgramBlock:
        ParseBlockProgram(struct)
    elif type(struct) == blocks.ScopeBlock:
        ParseBlockScope(struct)
    elif type(struct) == blocks.AssignmentBlock:
        ParseBlockAssignment(struct)

def ParseBlockExpr(struct):
    '''Expects a struct to be a tree of expression type classes and evaluates to a single value'''
    result = None

    if type(struct) == blocks.VariableBlock:
        result = ParseBlockVariable(struct)
    elif type(struct) == blocks.LiteralBlock:
        result = ParseBlockLiteral(struct)
    elif type(struct) == blocks.BinOpBlock:
        result = ParseBlockBinOp(struct)
    elif type(struct) == blocks.UnOpBlock:
        result = ParseBlockUnOp(struct)

    if not result:
        logging.warning('unassigned result')
    return result

def file_parse():
    '''Parses from and writes to a file'''
    readfile = 'sample_prog.json'
    writefile = 'response_prog.json'

    logging.basicConfig(filename='log_parser.txt', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("===Start File Parse===")
    logging.info('JSON Read : ' + readfile)
    logging.info('JSON Write: ' + writefile)

    struct = readFile(readfile) # Read JSON and convert to blocks

    ParseBlockProgram(struct)

    writeFile(writefile, state.getState()) # Write internal state to JSON

def parse(str_json):
    '''Takes a string json as input and returns a string json'''
    logging.basicConfig(filename='log_parser.txt', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("===Start Arg Parse===")

    struct = json.loads(str_json, cls=coder.Decoder)

    ParseBlockProgram(struct)
    print(json.dumps(state.getState(), indent=2, sort_keys=True))


if __name__ == '__main__':
    # with open('sample_prog.json','r') as openFile:
    #     text = openFile.read()
    if(len(sys.argv) > 1):
        parse(sys.argv[1])