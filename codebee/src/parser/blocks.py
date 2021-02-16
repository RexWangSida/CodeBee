# Implements the structure of Bee blocks
import json, logging, sys

EXPR_TYPE = set(('literal', 'variable', 'binop', 'unop'))
STMT_TYPE = set(('program', 'scope', 'assignment', 'ifelse', 'while', 'output'))
IMPLEMENTED = STMT_TYPE | EXPR_TYPE

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

        if not isinstance(ident,VariableBlock) or not hasattr(body,'block') or body.block not in STMT_TYPE:
            raise ValueError

        self.ident = ident # Variable block
        self.body = body # stmt type

        # At this stage, parameters are not needed
        # if type(param) == list: self.param =  param
        # elif param != None:     self.param = [param]
        # else:                   self.param = [     ]


    def __eq__(self,other):
        if (isinstance(other,ProgramBlock) and self.block == other.block):
            return self.ident == other.ident and self.body == other.block
        return False

class ScopeBlock(_Block):
    def __init__(self, stmts = None):
        self.block = 'scope'
        self.stmts = [] # stmt type

        for stmt in stmts:
            if not hasattr(stmt,'block') or stmt.block not in STMT_TYPE:
                raise ValueError
            self.stmts.append(stmt)

    def __eq__(self,other):
        if (isinstance(other,ScopeBlock) and self.block == other.block):
            for self_expr in self.stmts:
                for other_expr in other.stmts:
                    if self_expr != other_expr: return False
            return True
        return False

class AssignmentBlock(_Block):
    def __init__(self, ident, expr):
        self.block = 'assignment'

        if not isinstance(ident,VariableBlock) or not hasattr(expr,'block') or not expr.block in EXPR_TYPE:
            raise ValueError

        self.ident = ident # variable block
        self.expr = expr # expr type

    def __eq__(self,other):
        if (isinstance(other,AssignmentBlock) and self.block == other.block):
            return self.ident == other.ident and self.expr == other.expr
        return False

class IfElseBlock(_Block):
    def __init__(self, cond, true, false = None):
        self.block = 'ifelse'

        if not (hasattr(cond,'block') and hasattr(true,'block')) or cond.block not in EXPR_TYPE or true.block not in STMT_TYPE:
            raise ValueError
        elif false != None and not (hasattr(false,'block') and false.block in STMT_TYPE):
            raise ValueError

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

        if not (hasattr(cond,'block') and hasattr(body,'block')) or cond.block not in EXPR_TYPE or body.block not in STMT_TYPE:
            raise ValueError

        self.cond = cond # expr type
        self.body = body # stmt type

    def __eq__(self,other):
        if (isinstance(other,WhileBlock) and self.block == other.block):
            return self.cond == other.cond and self.body == other.block
        return False

class OutputBlock(_Block):
    def __init__(self, expr):
        self.block = 'output'

        if not hasattr(expr,'block') or expr.block not in EXPR_TYPE:
            raise ValueError

        self.expr = expr # expr type

    def __eq__(self,other):
        if (isinstance(other,OutputBlock) and self.block == other.block):
            return self.expr == other.expr
        return False

class LiteralBlock(_Block):
    def __init__(self, typ, value):
        self.block = 'literal'

        if type(typ) != str or type(value) != str:
            raise ValueError

        # Available types are int, float, str, bool
        self.type = typ # str
        # value for bool is 'True' for true and 'False' for false
        self.value = value # str

    def __eq__(self,other):
        if (isinstance(other,LiteralBlock) and self.block == other.block):
            return self.type == other.type and self.value == other.value
        return False

class VariableBlock(_Block):
    def __init__(self, ident):
        self.block = 'variable'

        if type(ident) != str:
            raise ValueError

        self.ident = ident

    def __eq__(self,other):
        if (isinstance(other,VariableBlock) and self.block == other.block):
            return self.ident == other.ident
        return False

class BinOpBlock(_Block):
    def __init__(self, oper, expr1, expr2):
        self.block = 'binop'

        if type(oper) != str or not (hasattr(expr1,'block') and hasattr(expr2,'block')) or expr1.block not in EXPR_TYPE or expr2.block not in EXPR_TYPE:
            raise ValueError

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

        if type(oper) != str or not hasattr(expr1,'block') or expr1.block not in EXPR_TYPE:
            raise ValueError

        self.oper = oper # str
        self.expr1 = expr1 # expr type

    def __eq__(self,other):
        if (isinstance(other,UnOpBlock) and self.block == other.block):
            return self.oper == other.oper and self.expr1 == other.expr1
        return False
