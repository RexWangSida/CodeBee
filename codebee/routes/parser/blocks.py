# Implements the structure of Bee blocks
import json, logging, sys

# logging.basicConfig(filename='log_blocks.txt', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

IMPLEMENTED = ('program', 'scope', 'assignment', 'literal', 'variable', 'binop', 'unop')

class _Block:
    '''Implements trans-block functionality, like JSON functions'''
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
        self.ident = ident # Name of program - Stored as variable block

        # At this stage, parameters are not needed
        # if type(param) == list: self.param =  param
        # elif param != None:     self.param = [param]
        # else:                   self.param = [     ]

        self.body = body # Body of program.

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
        # Available types are int, float, str, bool
        self.type = type
        # value for bool is '1' for true and '' for false
        self.value = value

class VariableBlock(_Block):
    def __init__(self, ident):
        self.block = 'variable'
        self.ident = ident

class BinOpBlock(_Block):
    def __init__(self, oper, expr1, expr2):
        self.block = 'binop'
        self.oper = oper
        self.expr1 = expr1
        self.expr2 = expr2

class UnOpBlock(_Block):
    def __init__(self, oper, expr1):
        self.block = 'unop'
        self.oper = oper
        self.expr1 = expr1
