import { BLOCKS as BLOCKS1 } from './Data';
import { BLOCKS as BLOCKS2 } from './Data2';
import { BLOCKS as BLOCKS3 } from './Data3';

var BLOCKSS = BLOCKS1.concat(BLOCKS2).concat(BLOCKS3);
for (var i = 0; i < BLOCKSS.length; i++) {
    BLOCKSS[i].ddd = i.toString();
}
export const ATTRS = {
    VAR: 'var',
    OP: 'op',
    VAL: 'val',
    STATE: 'state'
};
export const BLOCKS = BLOCKSS;