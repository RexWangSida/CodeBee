### Concept for Communication

In _README.md_, a system for communication between the CodeBee front-end and Bee
parser is described. Basically, the front-end will create a JSON file containing
code nodes that can be sent to the parser for execution.   
In this file, a short example of how the JSON object could be structured is shown.  
The example will be a program which which will calculate the fibonnaci numbers up to 100
and print them. The codes is defined as the following:

```
program fib() do
  limit := 100
  num1 := 1
  num2 := 1

  output (num1)
  output (num2)

  while (num1 + num2 < limit)
  do
    output (num1 + num2)
    if (num1 > num2)
      num2 := num1 + num2
    else
      num1 := num1 + num2
  end
end
```

Each statement can be considered a node with its own children. For example, a if
statement will have children nodes for the condition, true branch and the optional
false branch. Additionally, binary and unary operations are represented by a unified
'binop' or 'unop' node which has children for the arguments and the operation itself.
Nodes that do not take any children are called 'literal's because they define themselves.
Identifiers, numbers, strings, booleans and operators are all considered literals. Below is a AST
breakdown of the fibonnaci function:

```
program node
  literal 'fib' (program name)
  NONE (parameters)
  block node (program body)
    assignment node
      literal 'limit' (assigned variable)
      literal 100 (assigned value)
    assignment node
      literal 'num1'
      literal 1
    assignment node
      literal 'num2'
      literal 1
    output node
      literal 'num1' (outputted value)
    output node
      literal 'num2'
    while node
      expression node (condition)
        binop node
          binop node
            literal 'num1' (operand 1)
            literal 'num2' (operand 2)
            literal + (operator)
          literal 'limit'
          literal <
      block node
        output node
          binop node
            literal 'num1'
            literal 'num2'
            literal +
        if node
          expression node (condition)
            binop node
              literal 'num1'
              literal 'num2'
              literal >
          assignment node (true branch)
            literal 'num2'
            binop node
              literal 'num1'
              literal 'num2'
              literal +
          assignment node (false branch)
            literal 'num1'
            binop node
              literal 'num1'
              literal 'num2'
              literal +
```
