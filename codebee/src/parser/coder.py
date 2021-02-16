# Custom JSON Coder for Codebee communication between the front and backend
# Takes a tree of Block classes from blocks.py and converts it to JSOn or reads
# JSON and converts it to Block classes.

import json, logging, sys
import blocks

class Decoder(json.JSONDecoder):

    # Supported stmt blocks
    _STMTBLOCKS = set(('program', 'scope', 'assignment', 'ifelse', 'while', 'output'))
    # Supported expr blocks
    _EXPRBLOCKS = set(('literal', 'variable', 'binop', 'unop'))

    def __init__(self, *args, **kwargs):

        for missing in  blocks.IMPLEMENTED - (Decoder._STMTBLOCKS | Decoder._EXPRBLOCKS):
            logging.warning('unimplemented JSON block: ' + str(missing))

        json.JSONDecoder.__init__(self, object_hook=self.object_hook, *args, **kwargs)

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

        return result

    @staticmethod
    def _loadExpr(dct):
        if dct['block'] == 'literal':
            typ = dct['type']
            value = dct['value']

            logging.debug('Finished Literal Block Load')
            return blocks.LiteralBlock(typ,value)


        elif dct['block'] == 'variable':
            ident = dct['ident']

            logging.debug('Finished Variable Block Load')
            return blocks.VariableBlock(ident)

        elif dct['block'] == 'binop':
            oper = dct['oper']
            expr1 = dct['expr1']
            expr2 = dct['expr2']

            logging.debug('Finished BinOp Block Load')
            return blocks.BinOpBlock(oper,expr1,expr2)

        elif dct['block'] == 'unop':
            oper = dct['oper']
            expr1 = dct['expr1']

            logging.debug('Finished UnOp Block Load')
            return blocks.UnOpBlock(oper,expr1)

        else:
            logging.critical('Unknown expr block: ' + str(dct['block']))
            sys.exit(1)

    @staticmethod
    def _loadStmt(dct):
        if dct['block'] == 'assignment':
            ident = dct['ident'] # Decoder._loadVariable(dct['ident'])
            expr = dct['expr'] # Decoder._loadExpr(dct['expr'])

            logging.debug('Finished Assignment Block Load')
            return blocks.AssignmentBlock(ident,expr)

        elif dct['block'] == 'scope':
            stmts = dct['stmts'] # []
            # for stmt in dct['stmts']:
            #     stmts.append(Decoder._loadStmt(stmt))

            logging.debug('Finished Scope Block Load')
            return blocks.ScopeBlock(stmts)

        elif dct['block'] == 'program':
            ident = dct['ident'] # Decoder._loadVariable(dct['ident'])
            body = dct['body'] # Decoder._loadStmt(dct['body'])
            param = None # Not implemented

            logging.debug('Finished Program Block Load')
            return blocks.ProgramBlock(ident,body,param)

        elif dct['block'] == 'ifelse':
            cond = dct['cond']
            true = dct['true']
            false = dct['false']

            logging.debug('Finished IfElse Block Load')
            return blocks.IfElseBlock(cond,true,false)

        elif dct['block'] == 'while':
            cond = dct['cond']
            body = dct['body']

            logging.debug('Finished While Block Load')
            return blocks.WhileBlock(cond,body)

        elif dct['block'] == 'output':
            expr = dct['expr']

            logging.debug('Finished Output Block Load')
            return blocks.OutputBlock(expr)

        else:
            logging.critical('Unknown stmt block: ' + str(dct['block']))
            sys.exit(1)

def _coder_test():
    logging.basicConfig(filename='log_coder.txt', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    logging.info("Starting Encoding/ Decoding Clone Test")
    filename = 'sample_prog.json'

    def ass(var,val):
        return blocks.AssignmentBlock(var,val)
    def sco(stm):
        return blocks.ScopeBlock(stm)
    def pro(stm):
        return blocks.ScopeBlock(stm)
    def ife(con,tru,fls=None):
        return blocks.IfElseBlock(con,tru,fls)
    def whi(con,bod):
        return blocks.WhileBlock(con,bod)

    def bo(op,v1,v2):
        return blocks.BinOpBlock(op,v1,v2)
    def uo(op,v1):
        return blocks.UnOpBlock(op,v1)
    def li(ty,vl):
        return blocks.LiteralBlock(ty,vl)
    def va(nm):
        return blocks.VariableBlock(nm)


    progname = va('testProg')
    var1 = va('iter')
    var2 = va('max')
    var3 = va('cond')

    body = sco([
        ass(var1, li('int','0')),
        ass(var2, li('int','10')),
        whi(bo('<=',var1,var2),ass(var1,bo('+',var1,li('int','1')))),
        ife(bo('<',var1,var2),ass(var3,li('bool','True')),ass(var3,li('bool','False')))
    ])

    prog = blocks.ProgramBlock(progname,body) # Object Version
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
