# converter.py
# Contains JSON decoder and compatible block classes capable of saving to a JSON
# file and reconstructing back into Python classes
import json

DEBUG = False
filename = 'sample.json'

class Decoder(json.JSONDecoder):
    def __init__(self, *args, **kwargs):
        json.JSONDecoder.__init__(self, object_hook=self.object_hook, *args, **kwargs)
    def object_hook(self, dct):
        result = None
        if 'block' in dct:
            # Check Stmts
            if dct['block'] == 'program':
                result = Decoder._loadProgram(dct)
                if DEBUG: print('Program Finished')

            elif dct['block'] == 'scope':
                result = Decoder._loadScope(dct)
                if DEBUG: print('Scope Finished')

            elif dct['block'] == 'assignment':
                result = Decoder._loadAssignment(dct)
                if DEBUG: print('Assignment Finished')

            # Check Expr
            elif dct['block'] == 'literal':
                result = Decoder._loadLiteral(dct)
                if DEBUG: print('Literal Finished')

            elif dct['block'] == 'variable':
                result = Decoder._loadVariable(dct)
                if DEBUG: print('Variable Finished')

            else:
                print('Unknown block:', dct['block'])

        else:
            print('Unknown element:', dct)

        return result

    @staticmethod
    def _loadVariable(dct):
        ident = dct['ident']
        return VariableBlock(ident)

    @staticmethod
    def _loadLiteral(dct):
        typ = dct['type']
        value = dct['value']
        return LiteralBlock(typ,value)

    @staticmethod
    def _loadAssignment(dct):
        ident = dct['ident'] # Decoder._loadVariable(dct['ident'])
        expr = dct['expr'] # Decoder._loadExpr(dct['expr'])
        return AssignmentBlock(ident,expr)

    @staticmethod
    def _loadProgram(dct):
        ident = dct['ident'] # Decoder._loadVariable(dct['ident'])
        body = dct['body'] # Decoder._loadStmt(dct['body'])
        param = None # Not implemented
        return ProgramBlock(ident,body,param)

    @staticmethod
    def _loadScope(dct):
        stmts = dct['stmts'] # []
        # for stmt in dct['stmts']:
        #     stmts.append(Decoder._loadStmt(stmt))
        return ScopeBlock(stmts)


    @staticmethod
    def _loadExpr(dct):
        if dct['block'] == 'literal':
            return Decoder._loadLiteral(dct)

        elif dct['block'] == 'variable':
            return Decoder._loadVariable(dct)

        else:
            print('Unknown Expr \'block\':',dct['block'])
            return None

    @staticmethod
    def _loadStmt(dct):
        if dct['block'] == 'assignment':
            return Decoder._loadAssignment(dct)

        elif dct['block'] == 'scope':
            return Decoder._loadScope(dct)

        elif dct['block'] == 'program':
            return Decoder._loadProgram(dct)

        else:
            print('Unknown Stmt \'block\':',dct['block'])
            return None

class _Block:
    '''Implements trans-block functionality, like JSON'''
    def get_json(self):
        '''Returns a json formatted dictionary representation of the block'''
        # from: https://stackoverflow.com/questions/1036409/recursively-convert-python-object-graph-to-dictionary
        return json.loads(
            json.dumps(self, default=lambda o: getattr(o, '__dict__', str(o)))
        )

    def pstr_json(self):
        '''Returns a json formatted string representation of the block'''
        # from: https://stackoverflow.com/questions/1036409/recursively-convert-python-object-graph-to-dictionary
        return json.dumps( self.get_json() )

    def str_json(self):
        '''Returns a json formatted string representation of the block'''
        # from: https://stackoverflow.com/questions/1036409/recursively-convert-python-object-graph-to-dictionary
        return json.dumps( self.get_json(), indent=2, sort_keys=True )

class ProgramBlock(_Block):
    def __init__(self, ident, body, param = None):
        self.block = 'program'
        self.ident = ident

        # if type(param) == list: self.param =  param
        # elif param != None:     self.param = [param]
        # else:                   self.param = [     ]

        self.body = body

class ScopeBlock(_Block):
    def __init__(self, stmts = None):
        self.block = 'scope'
        self.stmts = []
        if type(stmts) == list:
            for stmt in stmts: self.stmts.append(stmt)

class AssignmentBlock(_Block):
    def __init__(self, ident, expression):
        self.block = 'assignment'
        self.ident = ident
        self.expr = expression

class LiteralBlock(_Block):
    def __init__(self, type, value):
        self.block = 'literal'
        self.type = type
        self.value = value

class VariableBlock(_Block):
    def __init__(self, ident):
        self.block = 'variable'
        self.ident = ident

if __name__ == '__main__':
    progname = VariableBlock('testProg')
    var1 = VariableBlock('var1')
    var2 = VariableBlock('var2')
    param = VariableBlock('param1')

    body = ScopeBlock([
        AssignmentBlock(var1,param),
        AssignmentBlock(var2,LiteralBlock('int','8'))
    ])
    prog = ProgramBlock(progname,body,param) # Object Version

    prog_original_json = prog.get_json() # JSON Version

    with open(filename, 'w') as openFile:
        openFile.write( json.dumps(prog_original_json, indent=4, sort_keys=True) )
        if DEBUG: print('Write Original Success')

    with open(filename, 'r') as openFile:
        prog_read = json.load(openFile, cls=Decoder)
        if DEBUG: print('Decode Success')
        # prog_read_json = json.loads(openFile.read())

    # print( prog_original_json )
    print( prog )
    print( prog_read )

    # Rewrite file
    with open(filename, 'a') as openFile:
        openFile.write( '\n\n\n' )
        prog_read_json = prog_read.get_json()
        openFile.write( json.dumps(prog_read_json, indent=4, sort_keys=True) )
        if DEBUG: print('Write Clone Success')

    # print(prog_original_json == prog_read_json)
    # print(type(prog_original_json), type(prog_read_json))
