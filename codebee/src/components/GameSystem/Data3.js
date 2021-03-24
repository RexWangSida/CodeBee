export const ATTRS = {
    VAR: 'var',
    EXP: 'exp',
    VAL: 'val',
    STATE: 'state'
  };
  
  export const BLOCKS = [
    {
      name: 'while',
      type: 'state',
      ddd: '0'
    },
    {
      name: 'condition',
      type:"state",
      ddd: '1'
    },
    {
      name: 'variable_num1',
      type:'var',
      ddd: '2'
    },
    {
      name: 'variable_num2',
      type:'var',
      ddd: '3'
    },
    {
      name: '+_operator',
      type:'exp',
      ddd: '4'
    },
    {
        name: '=_operator',
        type:'exp',
        ddd: '5'
      },
      {
        name: '=_operator',
        type:'exp',
        ddd: '6'
      },
    {
      name: '<=_operator',
      type:'exp',
      ddd: '7'
    },
    {
        name: 'num_1',
        type: 'val',
        ddd: '8'
      },
      {
        name: 'num_2',
        type: 'val',
        ddd: '9'
      },
      {
        name: 'num_9',
        type: 'val',
        ddd: '10'
      },

  ];