# Implements the structure of Bee blocks
import json, logging, sys

IMPLEMENTED = ('program', 'scope', 'assignment', 'ifelse', 'while', 'literal', 'variable', 'binop', 'unop')

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
        self.ident = ident # Variable block

        # At this stage, parameters are not needed
        # if type(param) == list: self.param =  param
        # elif param != None:     self.param = [param]
        # else:                   self.param = [     ]

        self.body = body # stmt type

class ScopeBlock(_Block):
    def __init__(self, stmts = None):
        self.block = 'scope'
        self.stmts = [] # stmt type
        if type(stmts) == list:
            for stmt in stmts: self.stmts.append(stmt)

class AssignmentBlock(_Block):
    def __init__(self, ident, expression):
        self.block = 'assignment'
        self.ident = ident # variable block
        self.expr = expression # expr type

class IfElseBlock(_Block):
    def __init__(self, cond, true, false = None):
        self.block = 'ifelse'
        self.cond = cond # expr type
        self.true = true # stmt type
        self.false = false # stmt type or None

class WhileBlock(_Block):
    def __init__(self, cond, body):
        self.block = 'while'
        self.cond = cond # expr type
        self.body = body # stmt type

class LiteralBlock(_Block):
    def __init__(self, type, value):
        self.block = 'literal'
        # Available types are int, float, str, bool
        self.type = type # str
        # value for bool is 'True' for true and 'False' for false
        self.value = value # str

class VariableBlock(_Block):
    def __init__(self, ident):
        self.block = 'variable'
        self.ident = ident

class BinOpBlock(_Block):
    def __init__(self, oper, expr1, expr2):
        self.block = 'binop'
        self.oper = oper # str
        self.expr1 = expr1 # expr type
        self.expr2 = expr2 # expr type

class UnOpBlock(_Block):
    def __init__(self, oper, expr1):
        self.block = 'unop'
        self.oper = oper # str
        self.expr1 = expr1 # expr type
