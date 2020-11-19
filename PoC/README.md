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

##### Expressions

##### Assignment Statement

##### If Statement

##### If/ Else Statement

##### While Statement

##### Output Statement

##### Return Statement

#### Future

##### Tree Parser

##### Front to Back End

##### Execution

##### Diagrams

##### Workflow

#### Bee Examples
