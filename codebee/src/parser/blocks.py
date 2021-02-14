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

    def __eq__(self,other):
        return False

class ProgramBlock(_Block):
    def __init__(self, ident, body, param = None):
        self.block = 'program'
        self.ident = ident # Variable block

        # At this stage, parameters are not needed
        # if type(param) == list: self.param =  param
        # elif param != None:     self.param = [param]
        # else:                   self.param = [     ]

        self.body = body # stmt type

    def __eq__(self,other):
        if (isinstance(other,ProgramBlock) and self.block == other.block):
            return self.ident == other.ident and self.body == other.block
        return False

class ScopeBlock(_Block):
    def __init__(self, stmts = None):
        self.block = 'scope'
        self.stmts = [] # stmt type
        if type(stmts) == list:
            for stmt in stmts: self.stmts.append(stmt)

    def __eq__(self,other):
        if (isinstance(other,ScopeBlock) and self.block == other.block):
            for self_expr in self.stmts:
                for other_expr in other.stmts:
                    if self_expr != other_expr: return False
            return True
        return False

class AssignmentBlock(_Block):
    def __init__(self, ident, expression):
        self.block = 'assignment'
        self.ident = ident # variable block
        self.expr = expression # expr type

    def __eq__(self,other):
        if (isinstance(other,AssignmentBlock) and self.block == other.block):
            return self.ident == other.ident and self.expr == other.expr
        return False

class IfElseBlock(_Block):
    def __init__(self, cond, true, false = None):
        self.block = 'ifelse'
        self.cond = cond # expr type
        self.true = true # stmt type
        self.false = false # stmt type or None

    def __eq__(self,other):
        if (isinstance(other,IfElseBlock) and self.block == other.block):
            return self.cond == other.cond and self.true == other.true and self.false == other.false
        return False

class WhileBlock(_Block):
    def __init__(self, cond, body):
        self.block = 'while'
        self.cond = cond # expr type
        self.body = body # stmt type

    def __eq__(self,other):
        if (isinstance(other,WhileBlock) and self.block == other.block):
            return self.cond == other.cond and self.body == other.block
        return False

class LiteralBlock(_Block):
    def __init__(self, type, value):
        self.block = 'literal'
        # Available types are int, float, str, bool
        self.type = str(type) # str
        # value for bool is 'True' for true and 'False' for false
        self.value = str(value) # str

    def __eq__(self,other):
        if (isinstance(other,LiteralBlock) and self.block == other.block):
            return self.type == other.type and self.value == other.value
        return False

class VariableBlock(_Block):
    def __init__(self, ident):
        self.block = 'variable'
        self.ident = ident

    def __eq__(self,other):
        if (isinstance(other,VariableBlock) and self.block == other.block):
            return self.ident == other.ident
        return False

class BinOpBlock(_Block):
    def __init__(self, oper, expr1, expr2):
        self.block = 'binop'
        self.oper = oper # str
        self.expr1 = expr1 # expr type
        self.expr2 = expr2 # expr type

    def __eq__(self,other):
        if (isinstance(other,BinOpBlock) and self.block == other.block):
            return self.oper == other.oper and self.expr1 == other.expr1 and self.expr2 == other.expr2
        return False

class UnOpBlock(_Block):
    def __init__(self, oper, expr1):
        self.block = 'unop'
        self.oper = oper # str
        self.expr1 = expr1 # expr type

    def __eq__(self,other):
        if (isinstance(other,UnOpBlock) and self.block == other.block):
            return self.oper == other.oper and self.expr1 == other.expr1
        return False
