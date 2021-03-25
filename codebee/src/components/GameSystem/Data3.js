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
      name: 'var_1',
      type:'var',
      ddd: '2'
    },
    {
      name: 'var_2',
      type:'var',
      ddd: '3'
    },
    {
      name: '+',
      type:'exp',
      ddd: '4'
    },
    {
        name: '=',
        type:'exp',
        ddd: '5'
      },
      {
        name: '=',
        type:'exp',
        ddd: '6'
      },
    {
      name: '<=',
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