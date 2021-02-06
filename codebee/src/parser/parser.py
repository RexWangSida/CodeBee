# Parser for Bee Blocks from blocks.py
import json, logging, sys
import blocks, state, coder

def readJSON(filename):
    with open(filename, 'r') as openFile:
        # Get block class implementation
        prog = json.load(openFile, cls=coder.Decoder)

    logging.debug('Successful JSON read')
    return prog

def writeJSON(filename, result):
    '''str_json is a string json from the json module'''

    with open(filename, 'w') as openFile:
        # Write JSON representation of blocks
        openFile.write( json.dumps(result, indent=2, sort_keys=True) )

    logging.debug('Successful JSON write')

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

    for stmt in struct.stmts:
        ParseBlockStmt(stmt)

def ParseBlockAssignment(struct):
    if type(struct) != blocks.AssignmentBlock:
        logging.critical('Attempt to parse '+struct.block+' as Assignment')
        sys.exit(1)

    store = ParseBlockExpr(struct.expr)
    state.setSym(struct.ident.ident,store)

def ParseBlockLiteral(struct):
    if type(struct) != blocks.LiteralBlock:
        logging.critical('Attempt to parse '+struct.block+' as Literal')
        sys.exit(1)

    if struct.type == 'int':
        return int(struct.value)
    elif struct.type == 'str':
        return str(struct.value)
    elif struct.type == 'float':
        return float(struct.value)
    elif struct.type == 'bool':
        return bool(struct.value)

    logging.error('Unknown literal type: '+struct.type)
    sys.exit(1)

def ParseBlockVariable(struct):
    if type(struct) != blocks.VariableBlock:
        logging.critical('Attempt to parse '+struct.block+' as Variable')
        sys.exit(1)

    if not state.isSym(struct.ident):
        logging.critical('missing identifier: '+str(struct.ident))
        sys.exit(1)

    value = state.getSym(struct.ident)
    return value

def ParseBlockBinOp(struct):
    if type(struct) != blocks.BinOpBlock:
        logging.critical('Attempt to parse '+struct.block+' as BinOp')
        sys.exit(1)

    expr1 = ParseBlockExpr(struct.expr1)
    expr2 = ParseBlockExpr(struct.expr2)

    if struct.oper == '+':
        return expr1 + expr2
    elif struct.oper == '-':
        return expr1 - expr2
    elif struct.oper == '*':
        return expr1 * expr2
    elif struct.oper == '/':
        return expr1 / expr2
    elif struct.oper == '%':
        return expr1 % expr2

def ParseBlockUnOp(struct):
    if type(struct) != blocks.UnOpBlock:
        logging.critical('Attempt to parse '+struct.block+' as UnOp')
        sys.exit(1)

    expr1 = ParseBlockExpr(struct.expr1)

    if struct.oper == '+':
        return expr1
    elif struct.oper == '-':
        return - expr1
    elif struct.oper == '++':
        return expr1 + 1
    elif struct.oper == '--':
        return expr1 - 1
    elif struct.oper == 'int':
        return int(expr1)
    elif struct.oper == 'str':
        return str(expr1)
    elif struct.oper == 'float':
        return float(expr1)
    elif struct.oper == 'bool':
        return bool(expr1)

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

    return result

def parse():
    readfile = 'sample_prog.json'
    writefile = 'response_prog.json'

    logging.basicConfig(filename='log_parser.txt', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("===Start Parse===")
    logging.info('JSON Read : ' + readfile)
    logging.info('JSON Write: ' + writefile)

    struct = readJSON(readfile) # Read JSON and convert to blocks

    ParseBlockProgram(struct)

    writeJSON(writefile, state.getState()) # Write internal state to JSON



if __name__ == '__main__':
    parse()
