# Custom JSON Coder for Codebee communication between the front and backend
# Takes a tree of Block classes from blocks.py and converts it to JSOn or reads
# JSON and converts it to Block classes.

import json, logging, sys
import blocks

class Decoder(json.JSONDecoder):

    # Supported stmt blocks
    _STMTBLOCKS = ('program', 'scope', 'assignment')
    # Supported expr blocks
    _EXPRBLOCKS = ('literal', 'variable', 'binop', 'unop')

    def __init__(self, *args, **kwargs):
        logging.info("Start Decode")

        for implemented in blocks.IMPLEMENTED:
            if implemented not in Decoder._STMTBLOCKS + Decoder._EXPRBLOCKS:
                logging.warning('unimplemented JSON block: ' + str(implemented))

        json.JSONDecoder.__init__(self, object_hook=self.object_hook, *args, **kwargs)

        logging.info('Finished Decode')

    def object_hook(self, dct):
        result = None
        if 'block' in dct:
            # Check Stmts
            if dct['block'] in Decoder._STMTBLOCKS:
                result = Decoder._loadStmt(dct)

            elif dct['block'] in Decoder._EXPRBLOCKS:
                result = Decoder._loadExpr(dct)

            else:
                logging.critical('Unknown block: ' + str(dct['block']))
                sys.exit(1)

        else:
            logging.critical('Unknown element: ' + str(dct))
            sys.exit(1)

        # Catch misassigned blocks - TODO make cleaner or remove when confident
        if result.block == 'program' and type(result) != blocks.ProgramBlock:
            logging.critical('Misassigned program block'); sys.exit(1)
        elif result.block == 'scope' and type(result) != blocks.ScopeBlock:
            logging.critical('Misassigned scope block'); sys.exit(1)
        elif result.block == 'assignment' and type(result) != blocks.AssignmentBlock:
            logging.critical('Misassigned assignment block'); sys.exit(1)
        elif result.block == 'variable' and type(result) != blocks.VariableBlock:
            logging.critical('Misassigned variable block'); sys.exit(1)
        elif result.block == 'literal' and type(result) != blocks.LiteralBlock:
            logging.critical('Misassigned literal block'); sys.exit(1)
        elif result.block == 'binop' and type(result) != blocks.BinOpBlock:
            logging.critical('Misassigned binop block'); sys.exit(1)
        elif result.block == 'unop' and type(result) != blocks.UnOpBlock:
            logging.critical('Misassigned unop block'); sys.exit(1)
        else:
            return result

    @staticmethod
    def _loadVariable(dct):
        ident = dct['ident']

        logging.debug('Finished Variable Block Load')
        return blocks.VariableBlock(ident)

    @staticmethod
    def _loadLiteral(dct):
        typ = dct['type']
        value = dct['value']

        logging.debug('Finished Literal Block Load')
        return blocks.LiteralBlock(typ,value)

    @staticmethod
    def _loadBinOp(dct):
        oper = dct['oper']
        expr1 = dct['expr1']
        expr2 = dct['expr2']

        logging.debug('Finished BinOp Block Load')
        return blocks.BinOpBlock(oper,expr1,expr2)

    @staticmethod
    def _loadUnOp(dct):
        oper = dct['oper']
        expr1 = dct['expr1']

        logging.debug('Finished UnOp Block Load')
        return blocks.UnOpBlock(oper,expr1)

    @staticmethod
    def _loadAssignment(dct):
        ident = dct['ident'] # Decoder._loadVariable(dct['ident'])
        expr = dct['expr'] # Decoder._loadExpr(dct['expr'])

        logging.debug('Finished Assignment Block Load')
        return blocks.AssignmentBlock(ident,expr)

    @staticmethod
    def _loadProgram(dct):
        ident = dct['ident'] # Decoder._loadVariable(dct['ident'])
        body = dct['body'] # Decoder._loadStmt(dct['body'])
        param = None # Not implemented

        logging.debug('Finished Program Block Load')
        return blocks.ProgramBlock(ident,body,param)

    @staticmethod
    def _loadScope(dct):
        stmts = dct['stmts'] # []
        # for stmt in dct['stmts']:
        #     stmts.append(Decoder._loadStmt(stmt))

        logging.debug('Finished Scope Block Load')
        return blocks.ScopeBlock(stmts)


    @staticmethod
    def _loadExpr(dct):
        if dct['block'] == 'literal':
            return Decoder._loadLiteral(dct)

        elif dct['block'] == 'variable':
            return Decoder._loadVariable(dct)

        elif dct['block'] == 'binop':
            return Decoder._loadBinOp(dct)

        elif dct['block'] == 'unop':
            return Decoder._loadUnOp(dct)

        else:
            logging.critical('Unknown expr block: ' + str(dct['block']))
            sys.exit(1)

    @staticmethod
    def _loadStmt(dct):
        if dct['block'] == 'assignment':
            return Decoder._loadAssignment(dct)

        elif dct['block'] == 'scope':
            return Decoder._loadScope(dct)

        elif dct['block'] == 'program':
            return Decoder._loadProgram(dct)

        else:
            logging.critical('Unknown stmt block: ' + str(dct['block']))
            sys.exit(1)

def _coder_test():
    logging.basicConfig(filename='log_coder.txt', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    logging.info("Starting Encoding/ Decoding Clone Test")
    filename = 'sample_prog.json'

    progname = blocks.VariableBlock('testProg')
    var1 = blocks.VariableBlock('var1')
    var2 = blocks.VariableBlock('var2')
    param = blocks.VariableBlock('param1')
    res = blocks.BinOpBlock('+',blocks.LiteralBlock('int','8'),param)

    body = blocks.ScopeBlock([
        blocks.AssignmentBlock(var1,blocks.UnOpBlock("--",param)),
        blocks.AssignmentBlock(var2,res)
    ])

    prog = blocks.ProgramBlock(progname,body,param) # Object Version
    prog_original_json = prog.get_json() # JSON Version

    with open(filename, 'w') as openFile:
        # Convert to text & save it
        openFile.write( json.dumps(prog.get_json(), indent=2, sort_keys=True) )
        logging.info('Encode Success')

    with open(filename, 'r') as openFile:
        # Read file text and convert to Block classes
        prog_read = json.load(openFile, cls=Decoder)
        logging.info('Decode Success')

    prog_read_json = prog_read.get_json()

    # Rewrite file at end of last - should be the exact same
    # with open(filename, 'a') as openFile:
    #     openFile.write( '\n\n\n' )
    #     prog_read_json = prog_read.get_json()
    #     openFile.write( json.dumps(prog_read_json, indent=2, sort_keys=True) )
    #     logging.info('Encode Clone Success')

    if not (prog_original_json == prog_read_json):
        logging.error('Incorrect reconstruction')
    logging.shutdown()


if __name__ == '__main__':
    _coder_test()
