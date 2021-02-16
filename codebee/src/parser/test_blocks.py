from utilities import *
from blocks import *

def test_literal():
    typ, val = 'int', '1'
    block = LiteralBlock(typ, val)

    assert 'literal' == block.block
    assert typ == block.type
    assert val == block.value

def test_literal_comparison():
    typ, val = 'int', '1'
    block1 = LiteralBlock(typ, val)
    block2 = LiteralBlock(typ, val)     # Should be the same
    block3 = LiteralBlock('str', val)   # Wrong type
    block4 = LiteralBlock(typ, '2')     # Wrong value
    block5 = LiteralBlock('bool', 'True')     # Wrong value and type

    assert block1 == block2
    assert block1 != block3
    assert block1 != block4
    assert block1 != block5

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
    false_body = makeAssign('var1',0)
    block = IfElseBlock(condition,true_body,false_body)

    assert 'ifelse' == block.block
    assert condition == block.cond
    assert true_body == block.true
    assert false_body == block.false

def test_while():
    var = VariableBlock('var1')
    condition = makeOp('>',var,4)
    body = makeAssign(var,makeOp('+',var,1))
    block = WhileBlock(condition,body)

    assert 'while' == block.block
    assert condition == block.cond
    assert body == block.body


def test_malformed_literal():
    typ, val = 'int', 1

    try:
        block = LiteralBlock(typ, val)
        assert False
    except ValueError:
        pass

def test_malformed_variable():
    name = 1
    try:
        block = VariableBlock(name)
        assert False
    except ValueError:
        pass

def test_malformed_binop():
    oper, var1, var2 = True, VariableBlock('var1'), VariableBlock('var2')
    try:
        block = BinOpBlock(oper,var1,var2)
        assert False
    except ValueError:
        pass

    oper, var1, var2 = '+', VariableBlock('var1'), 1
    try:
        block = BinOpBlock(oper,var1,var2)
        assert False
    except ValueError:
        pass

def test_malformed_unop():
    oper, var1 = True, VariableBlock('var1')
    try:
        block = UnOpBlock(oper,var1)
        assert False
    except ValueError:
        pass

    oper, var1 = '+', 1
    try:
        block = UnOpBlock(oper,var1)
        assert False
    except ValueError:
        pass

def test_malformed_program():
    assignment = makeAssign('var3',makeOp('+','var1',2))
    try:
        block = ProgramBlock('prog',assignment)
        assert False
    except ValueError:
        pass

    name, assignment = VariableBlock('var1'), makeOp('+','var1',2)
    try:
        block = ProgramBlock(name,assignment)
        assert False
    except ValueError:
        pass

def test_malformed_scope():
    stmts = [makeOp('+',3,2)]
    try:
        block = ScopeBlock(stmts)
        assert False
    except ValueError:
        pass

def test_malformed_assignment():
    var1, lit1 = VariableBlock('prog'), LiteralBlock('int','2')
    try:
        block = AssignmentBlock('var1',lit1)
        assert False
    except ValueError:
        pass


    try:
        block = AssignmentBlock(var1,1)
        assert False
    except ValueError:
        pass

def test_ifelse():
    pass

def test_while():
    pass

if __name__ == '__main__':
    test_ifelse()
