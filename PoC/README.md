### Bee Parser

#### Summary

This file is a general overview of the CodeBee's programming language, Bee. The __Basics__
section will explain what makes a Bee file and how to use the language. Following,
the __File Execution__ section will explain how to run the Bee PoC locally.
This document will then elaborate on all the individual statements available in
Bee and the language's grammar in general under the __Statements__ section. Finally,
the plan to tackle future code execution/ processing and communication with CodeBee's
front end is discussed in __Future__. At the end of the document there are examples
of Bee code.

#### Basics

In CodeBee's language, Bee, a program is entirely contained to one file. The Bee
file can contain Bee code, any comments made by the programmer and has no specific
file extension. The file consists of one main 'program' which contains all Bee code
and is executed when the file is ran.

Bee is a dynamically typed language with significant newline whitespace. The language
is designed to be easy to read and write for people with no former experience with
programming, only supporting integer, float, string and boolean primitives and array
collection types. Bee supports basic unary and binary operations along with
in place incrementing and decrementing. Bee also supports creation of functions which
can be called from within Bee code.

#### File Execution

To execute a Bee script, the files _proof\_scanner.py_ and _proof\_parse.py_ files
need to be downloaded, along with a third file which holds a Bee program. The file
which holds the Bee program must be a text file, but the file extension does not
matter. Python 3 is also required. After achieving the prerequisites, open a terminal
and move to a directory holding all three files. Then, enter the command `python
proof_parse.py <Bee file>`, replacing `<Bee file>` with the filename which holds
the Bee code. Note that `python` may also need to be changed to `python3` if multiple
python versions are installed locally. After running the command, any grammar errors
will be shown along with the final text `=parsed successfully=` or `=parsed unsuccessfully=`
depending on if there were errors during parsing.

#### Statements

Bee code is structured as a series of statements. Each statement has a specific structure.
As mentioned previously, Bee code is contained within one large 'program' statement,
fittingly started with `program`. Programs also have an identifier name and any arguments
after. At this time, it is not planned for Bee programs to take arguments. Code is
separated into 'blocks' which determine the code flow. Every statement is its own block,
except for a special 'block statement'. These statements can contain an arbitrary amount
of statements, allowing for multiple statements where one would normally be allowed. Bee
contains generic `if`, `if/ else`, `while`, assignment, function declaration (called `define`), return, block and print (called `output`) statements. All statements are
discussed in more detail below.

The full Bee grammar can be found in _proof\_grammar.txt_.

##### Expressions

Expressions are used in Bee to evaluate the result of mathematical operations.
Expressions in Bee are handled in order of precidence, with higher precidence operations
being executed first. Executions are done greedily, so they are evaluated as soon as
all required operands are found. Bee has ten levels of precidence and are detailed below.
Note that a lower precidence level denotes a higher precidence. Operands do not need
parentheses to follow the precidence order below.

| Precidence |      Operand      |
|---|:--------------------------:|
| 9 |             or             |
| 8 |             and            |
| 7 |            =, !=           |
| 6 |        <, >, <=, >=        |
| 5 |        (Binary) +, -       |
| 4 |           *, /, %          |
| 3 |    int, real, str, bool    |
| 2 |      (Unary) +, -, not     |
| 1 |   ++, --, Params, Select   |
| 0 |         Parentheses        |

All binary operators are left associative. Inline incrementing (`++`) and decrementing
(`--`) can only be used as postfix operators. Params are used to represent a function
call and Select is used to index an array. Parameters and selection are expressed
by the following:

`PARAM ::= '(' [EXPR (',' EXPR)*] ')'`  
`SELECT ::= '[' [EXPR (',' EXPR)*] ']'`

##### Program Statement

`PROGRAM ::= 'program' IDENT PARAMS STMT`  
This statement must be the first in a Bee file and the entire contents of the Bee
program must be within the STMT production following 'program'. The identifier and
parameters given here are primarily used for notation as Bee does not intend to
include file importing or calling programs with arguments.

##### Block Statement

`CPLX_STMT ::= 'do' '\n' ([STMT] '\n')* 'end'`  
Block statements allow for multiple statements to be used when only one would normally
be allowed. These statements will almost always follow the program statement. Empty
lines are allowed in Bee and are captured here.

##### Assignment Statement

`EXPR_STMT ::= [IDENT ':='] EXPR`  
Assignment expressions capture two uses, first being variable assignment and the
second being function calling. Since Bee is a dynamically typed language, there is
no need to verify the type of the variable before assignment. The optionality of the
identifier and becomes means that language literals can be expressed as statements.

##### If Statement

`SLCT_STMT ::= 'if' '(' EXPR ')' '\n' STMT '\n'`  
If statements are on of the fundamental control flow mechanisms in Bee. An if statement
consists of the keyword 'if' and the conditional surrounded by additional paretheses.
These parentheses are required as they help the reader recognize what the condition
for the statement is. After the condition, a statement is required. This statement will
only execute when the condition is true.

##### If/ Else Statement

`SLCT_STMT ::= 'if' '(' EXPR ')' '\n' STMT '\n' 'else' STMT '\n'`  
If/ else statements function similarly to if statements, but contain an additional
branch which will execute when the condition is evaluated to false.

##### While Loop
`ITER_STMT ::= 'while' '(' EXPR ')' '\n' STMT`  
Bee has only one iterable statement, the while loop. Like the if statements, the while
loop has a condition which will execute when the condition is true. However, unlike the
if statement, the while loop's body will continue to execute as long as the condition
is true.

##### Define (Function) Statement
`DEFN_STMT ::= 'define' IDENT PARAMS STMT`  
Define statements are structured identically to program statements, except they require
the text 'define'. Define statements declare and assign functions to a specified identifier.
Functions are allowed to take parameters, and unlike progra statements, parameters are
planned to have an effect in Bee functions

##### Print (Output) Statement
`OUTP_STMT   ::= 'output' '(' EXPR ')'`  
Output statements will simply output the expression between the brackets to the
output channel. Once again, parentheses are required around the what will be outputted
to make it easier to see.

##### Return Statement
`RETN_STMT   ::= 'return' ['(' EXPR ')']`  
Return statements are similar to output statements in structure. Return statements
will halt execution and return to the parent caller where the function was called.
This can be used to stop execution prematurely. Return statements have an optional
expression surrounded in parentheses. If present, the return statement will give
back a value to the caller. Otherwise, the caller will get nothing back.

#### Future

##### Tree Parser

##### Front to Back End

##### Execution

##### Diagrams

##### Workflow

#### Bee Examples
