export const ATTRS = {
  VAR: 'var',
  EXP: 'exp',
  VAL: 'val',
  STATE: 'state'
};

export const BLOCKS = [
  {
    name: 'x',
    type: 'var',
    ddd: '0'
  },
  {
    name: '=',
    type:"exp",
    ddd: '1'
  },
  {
    name: 'c',
    type:'var',
    ddd: '2'
  },
  {
    name: 'if',
    type:'state',
    ddd: '3'
  },
  {
    name: '+',
    type:'exp',
    ddd: '5'
  },
  {
    name: 'a + b',
    attr1: 'assignment',
    attr2: 'variable',
    attr3: 'literal',
    ddd: '6'
  },
  {
    name: 'while',
    type:'state',
    ddd: "7"
  }
];