# A class to control the state of the parser
# Consists of a hashtable-like structure

import json, logging, sys

# Set initial state of symtab
    # program is program name
    # ident is dictionary of variable type, value pairs
state = {'program': None, 'ident':{}}

def stateSym(name, value):
    '''Sets the value of a state (@ prefix) symbol'''
    logging.info('Set state '+name+' to '+value)
    state[name] = value

def newSym(name,type='int',value=0):
    if name in state['ident']:
        logging.info('duplicate symbol (overwrite): '+str(name))

    packet = [type, value]
    state['ident'][name] = packet

def setSym(name,type='int',value=0):
    if name not in state['ident']:
        logging.info('missing symbol (add): '+str(name))

    packet = [type, value]
    state['ident'][name] = packet


def getSym(name):
    if name not in state['ident']:
        logging.critical('nonexistant symbol: '+str(name))
        sys.exit(1)

    packet = state['ident'][name]
    return packet

def getJSON():
    return json.dumps(state, indent=2, sort_keys=True)
