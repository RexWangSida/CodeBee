from blocks import *

def makeOp(oper,var1,var2=None):

    if type(var1) == int:       var1 = LiteralBlock('int',var1)
    elif type(var1) == str:     var1 = LiteralBlock('str',var1)

    if type(var2) == int:       var2 = LiteralBlock('int',var2)
    elif type(var2) == str:     var2 = LiteralBlock('str',var2)

    if var2 == None:            return UnOpBlock(oper,var1)
    else:                       return BinOpBlock(oper,var1,var2)

def makeAssign(var3,value):
    if type(var3) == str:   var3 = VariableBlock(var3)

    return AssignmentBlock(var3,value)

def test_literal():
    typ, val = 'int', '1'
    block = LiteralBlock(typ, val)

    assert 'literal' == block.block
    assert typ == block.type
    assert val == block.value

def test_variable():
    name = "var3"
    block = VariableBlock(name)

    assert 'variable' == block.block
    assert name == block.ident

def test_binop():
    oper = "+"
    var1 = VariableBlock('var1')
    var2 = VariableBlock('var2')
    block = BinOpBlock(oper,var1,var2)

    assert 'binop' == block.block
    assert oper == block.oper
    assert var1 == block.expr1
    assert var2 == block.expr2

def test_unop():
    oper = "+"
    var1 = VariableBlock('var1')
    block = UnOpBlock(oper,var1)

    assert 'unop' == block.block
    assert oper == block.oper
    assert var1 == block.expr1

def test_program():
    name = VariableBlock('prog')
    assignment = makeAssign('var3',makeOp('+','var1',2))
    block = ProgramBlock(name,assignment)

    assert 'program' == block.block
    assert name == block.ident
    assert assignment == block.body

def test_scope():
    var1, var2 = VariableBlock('var1'), VariableBlock('var2')
    stmts = [   makeAssign('var1',makeOp('+',3,2)),makeAssign('var2',makeOp('*',2,2)),
                makeAssign('var3',makeOp('-',3,var1)),makeAssign('var3',makeOp('+',var1,var2))]

    block = ScopeBlock(stmts)

    assert 'scope' == block.block
    for i in range(len(stmts)):
        assert stmts[i] == block.stmts[i]

def test_assignment():
    var1, lit1 = VariableBlock('prog'), LiteralBlock('int','2')
    block = AssignmentBlock(var1,lit1)

    assert 'assignment' == block.block
    assert var1 == block.ident
    assert lit1 == block.expr

def test_ifelse():

    condition = makeOp('>',1,4)
    true_body = makeAssign('var1',1)
    false_body = makeAssign('var2',0)
    block = IfElseBlock(condition,true_body,false_body)

    assert 'ifelse' == block.block
    assert condition == block.cond
    assert true_body == block.true
    assert false_body == block.false

def test_ifelse():
    var = VariableBlock('var1')
    condition = makeOp('>',var,4)
    body = makeAssign(var,makeOp('+',var,1))
    block = WhileBlock(condition,body)

    assert 'while' == block.block
    assert condition == block.cond
    assert body == block.body

if __name__ == '__main__':
    test_ifelse()
