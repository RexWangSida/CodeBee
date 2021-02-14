# A class to control the state of the parser
# Consists of a hashtable-like structure

import json, logging, sys

def init():
    global state
    # Set initial state of symtab
        # program is program name
        # error is if an error occured
        # errorno is the error number (agreement between front end and parser of what each number means)
        # ident is dictionary of variable names and values
        # output is a list of printed text
    state = {'program': None, 'error': False, 'errorno': 0, 'ident':{}, 'output': []}

def stateSym(name, value):
    '''Sets the value of a state (@ prefix) symbol'''
    logging.info('Set state '+name+' to '+str(value))
    state[name] = value

def setSym(name,packet):
    if name not in state['ident']:
        logging.info('missing symbol (add): '+str(name))

    state['ident'][name] = packet

def isSym(name):
    '''Returns true if name exists'''
    if name in state['ident']:
        return True
    return False

def getSym(name):
    if name not in state['ident']:
        logging.critical('nonexistant symbol: '+str(name))
        sys.exit(1)

    packet = state['ident'][name]
    return packet

def getState():
    return state
