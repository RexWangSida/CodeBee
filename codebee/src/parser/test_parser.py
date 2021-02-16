import json

from utilities import *
from blocks import *
from parser import parse, parse_output
from coder import Decoder


def test_simple():
    body = makeAssign('var1',makeOp('+',1,1))
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())

    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['int', '2']
    assert state['error'] == False
    assert state['program'] == 'prog'
    assert state['output'] == []


    body = ScopeBlock([ makeAssign('var1',makeOp('+',3,1)),
        makeAssign('var2',makeOp('-',3,1)),
        makeAssign('var3',makeOp('*',makeVar('var1'),makeVar('var2')))])
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['int', '4']
    assert state['ident']['var2'] == ['int', '2']
    assert state['ident']['var3'] == ['int', '8']
    assert state['error'] == False
    assert state['program'] == 'prog'
    assert state['output'] == []

def test_ifelse():
    body = ScopeBlock([ makeAssign('var1',makeOp('+',3,1)),
        IfElseBlock(makeOp('>',makeVar('var1'),1),makeAssign('var1',1))])
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['int', '1']
    assert state['error'] == False
    assert state['program'] == 'prog'
    assert state['output'] == []


    body = ScopeBlock([ makeAssign('var1',makeOp('+',-3,1)),
        IfElseBlock(makeOp('>',makeVar('var1'),1),makeAssign('var1',1))])
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['int', '-2']
    assert state['error'] == False
    assert state['program'] == 'prog'
    assert state['output'] == []

def test_loop():
    body = ScopeBlock([ makeAssign('var1',0),
        WhileBlock( makeOp('<',makeVar('var1'),10),
                    makeAssign('var1',makeOp('+',makeVar('var1'),1))
        )
    ])
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['int', '10']
    assert state['error'] == False
    assert state['program'] == 'prog'
    assert state['output'] == []


    body = ScopeBlock([ makeAssign('var1',15),
        WhileBlock( makeOp('<',makeVar('var1'),10),
                    makeAssign('var1',makeOp('+',makeVar('var1'),1))
        )
    ])
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['int', '15']
    assert state['error'] == False
    assert state['program'] == 'prog'
    assert state['output'] == []



    body = ScopeBlock([ makeAssign('var1',0),
        WhileBlock( makeOp('>=',makeVar('var1'),0),
                    makeAssign('var1',makeOp('+',makeVar('var1'),1))
        )
    ])
    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    try:
        state = json.loads(parse(struct))
    except ValueError:
        state = json.loads(parse_output())

    assert state['error'] == True
    assert state['program'] == 'prog'
    assert state['output'] == []

    try:
        body = makeAssign('var1',makeAssign('var1',1))
        prog = makeProgram('prog',body)
        struct = json.dumps(prog.get_json())
        state = json.loads(parse(struct))
    except ValueError:
        state = json.loads(parse_output())

    assert state['error'] == True
    assert state['program'] == 'prog'
    assert state['output'] == []

def test_path():
    body = ScopeBlock([
        makeAssign('var1',makeOp('+',4,2)), # var1 = 6
        makeAssign('var2',makeOp('/',6,2)), # var2 = 3
        IfElseBlock(makeOp('>',makeVar('var1'),makeVar('var2')), # var1 > var2
            makeAssign('var1',makeOp('/',makeVar('var1'),makeVar('var1'))), # var1 = var1 / var1
            makeAssign('var1',makeOp('*',makeVar('var1'),makeVar('var2'))), # var1 = var1 * var2
        ),
        IfElseBlock(makeOp('>=',makeVar('var1'),makeVar('var2')), # var1 >= var2
            makeAssign('var2',True),    # var1 = True
            makeAssign('var2',False),   # var2 = False
        ),
    ])

    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['float', '1.0']
    assert state['ident']['var2'] == ['bool','False']
    assert state['error'] == False


    body = ScopeBlock([
        makeAssign('var1',1), # var1 = 1
        makeAssign('var2',makeOp('/',6,2)), # var2 = 3
        IfElseBlock(makeOp('>',makeVar('var1'),makeVar('var2')), # var1 > var2
            makeAssign('var1',makeOp('/',makeVar('var1'),makeVar('var1'))), # var1 = var1 / var2
            makeAssign('var1',makeOp('*',makeVar('var1'),makeVar('var2'))), # var1 = var1 * var2
        ),
        IfElseBlock(makeOp('>=',makeVar('var1'),makeVar('var2')), # var1 >= var2
            makeAssign('var2',True),    # var1 = True
            makeAssign('var2',False),   # var2 = False
        ),
    ])

    prog = makeProgram('prog',body)

    struct = json.dumps(prog.get_json())
    state = json.loads(parse(struct))

    assert state['ident']['var1'] == ['float', '3.0']
    assert state['ident']['var2'] == ['bool','True']
    assert state['error'] == False

if __name__ == '__main__':
    pass
