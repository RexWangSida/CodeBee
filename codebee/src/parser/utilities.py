# Testing utility functions

from blocks import *

def makeLiteral(value):
    if type(value) == int:      return LiteralBlock('int', str(value))
    elif type(value) == str:    return LiteralBlock('str', str(value))
    elif type(value) == bool:   return LiteralBlock('bool',str(value))
    return value

def makeOp(oper,val1,val2=None):

    if type(val1) in (int,str):
        val1 = makeLiteral(val1)
    if type(val2) in (int,str):
        val2 = makeLiteral(val2)

    if val2 == None:            return UnOpBlock(oper,val1)
    else:                       return BinOpBlock(oper,val1,val2)

def makeAssign(var1,val1):
    if type(var1) == str:       var1 = makeVar(var1)

    if type(val1) in (int,str,bool):
        val1 = makeLiteral(val1)

    return AssignmentBlock(var1,val1)

def makeVar(name):
    return VariableBlock(name)

def makeProgram(name,body):
    if type(name) == str:   name = makeVar(name)

    return ProgramBlock(name,body)
