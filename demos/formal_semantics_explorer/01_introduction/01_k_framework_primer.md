# K Framework Primer

## What is the K Framework?

The **K Framework** is a rewrite-based executable semantic framework for programming languages. It allows you to:

1. **Define** programming language semantics formally
2. **Execute** programs using the semantics as an interpreter
3. **Verify** program properties using symbolic execution
4. **Generate** tools (parsers, interpreters, debuggers) automatically

Developed at the University of Illinois and Runtime Verification, K has been used to formalize dozens of languages including C, Java, JavaScript, Ethereum VM, and WebAssembly.

## Core Concepts

### 1. Configurations

A **configuration** represents the complete state of a program's execution.

```k
configuration
  <T>
    <k> $PGM:Pgm </k>           // Computation (instructions to execute)
    <stack> .Stack </stack>      // Operand stack
    <mem> .Map </mem>            // Linear memory
    <locals> .Map </locals>      // Local variables
    <globals> .Map </globals>    // Global variables
  </T>
```

**Cells** (enclosed in `<...>`) represent different components of state:
- `<k>`: Computation cell (what to execute next)
- `<stack>`: Value stack
- `<mem>`: Memory
- `<locals>`, `<globals>`: Variable stores

### 2. Rewrite Rules

**Rules** specify how configurations transform during execution.

```k
rule <k> (i32.const I1:Int) (i32.const I2:Int) i32.add => i32.const (I1 +Int I2) ... </k>
```

**Structure**:
- **Left side**: Pattern to match
- **=>**: Rewrite arrow
- **Right side**: Replacement
- **...**: "Rest of the cell" (unchanged parts)

### 3. Side Conditions

Rules can have **requires** and **ensures** clauses.

```k
rule <k> (i32.const I1:Int) (i32.const I2:Int) i32.add => i32.const (I1 +Int I2) ... </k>
     requires I1 +Int I2 <=Int (2 ^Int 32 -Int 1)    // No overflow
```

**Requires**: Conditions that must hold for rule to apply  
**Ensures**: Conditions guaranteed to hold after rule applies

### 4. Sorts and Subsorts

K has a **type system** for organizing syntactic categories.

```k
syntax ValType ::= "i32" | "i64" | "f32" | "f64"
syntax NumType ::= ValType
syntax Value ::= Int | Float
```

**Subsort relationships**:
```k
syntax Instr ::= Value    // Values are instructions
```

## WebAssembly in K

### Module Structure

```k
syntax Module ::= "module" OptionalId Decls
syntax Decls ::= List{Decl, ""}
syntax Decl ::= FuncDecl | MemDecl | GlobalDecl | ExportDecl
```

### Instruction Semantics

#### Arithmetic Operations

```k
rule <k> (i32.const I1) (i32.const I2) i32.add => i32.const (I1 +Int I2 modInt (2 ^Int 32)) ... </k>

rule <k> (i32.const I1) (i32.const I2) i32.sub => i32.const (I1 -Int I2 modInt (2 ^Int 32)) ... </k>

rule <k> (i32.const I1) (i32.const I2) i32.mul => i32.const (I1 *Int I2 modInt (2 ^Int 32)) ... </k>
```

#### Stack Manipulation

```k
rule <k> (V:Value) => . ... </k>
     <stack> S => V : S </stack>
```

Interpretation: Values are pushed onto the stack and removed from computation.

#### Control Flow

```k
rule <k> (i32.const I) (if TF INSTRS1 else INSTRS2 end) => INSTRS1 ... </k>
     requires I =/=Int 0

rule <k> (i32.const 0) (if TF INSTRS1 else INSTRS2 end) => INSTRS2 ... </k>
```

#### Memory Operations

```k
rule <k> (i32.const I) (i32.load) => i32.const V ... </k>
     <mem> ... I |-> V ... </mem>
     requires I <Int memorySize

rule <k> (i32.const I) (i32.const V) (i32.store) => . ... </k>
     <mem> MEM => MEM[I <- V] </mem>
     requires I <Int memorySize
```

## K Syntax Features

### Pattern Matching

Variables in rules match any term of their sort:

```k
rule <k> (i32.const I:Int) ... </k>    // I matches any integer
```

### List Patterns

```k
INSTRS                // Matches any instruction sequence
INSTR:Instr INSTRS   // Matches one instruction followed by more
```

### Map Operations

```k
<mem> ... I |-> V ... </mem>           // Map contains I↦V
<mem> MEM => MEM[I <- V] </mem>        // Update map
<mem> MEM[I] orDefault 0 </mem>        // Lookup with default
```

### Cell Ellipsis

```k
<k> ... </k>                           // Only care about k cell
<T> ... <k> INSTRS </k> ... </T>      // Nested cell access
```

## Rule Attributes

Control rule application behavior:

```k
rule ... [structural]      // Doesn't count as computation step
rule ... [priority(50)]    // Higher priority rules apply first  
rule ... [owise]           // Otherwise (default case)
```

## Symbolic Execution

K can execute programs **symbolically** with symbolic variables:

```k
<k> symbolic(i32) ~> PROGRAM </k>
```

This explores **all possible values** the variable could have, enabling:
- **Exhaustive testing**: Check all input combinations
- **Bug finding**: Discover edge cases that fail
- **Verification**: Prove properties for all inputs

## Verification with K

### Reachability Logic

Express properties as **reachability claims**:

```k
claim <k> PROGRAM => . </k>
      <stack> .Stack => V:Value </stack>
      requires PRECONDITION
      ensures POSTCONDITION
```

Interpretation: "Starting from PROGRAM with PRECONDITION, we reach final state with V on stack and POSTCONDITION holds"

### Example: Addition Correctness

```k
claim <k> (i32.const I1) (i32.const I2) i32.add => . </k>
      <stack> S => (i32.const (I1 +Int I2 modInt (2 ^Int 32))) : S </stack>
      requires I1 >=Int 0 andBool I2 >=Int 0
```

Proves: Addition correctly computes the sum modulo 2³².

## K Tool Ecosystem

### Kompile

Compile K definitions into executable interpreters:

```bash
kompile wasm.k --syntax-module WASM
```

Generates:
- Parser for WebAssembly syntax
- Interpreter for execution
- Prover for verification

### Krun

Execute programs using the compiled definition:

```bash
krun program.wast
```

Options:
- `--output pretty`: Pretty-print final configuration
- `--output kore`: Output in KORE format
- `--depth N`: Limit execution depth

### Kprove

Verify reachability claims:

```bash
kprove spec.k --def wasm-kompiled
```

Uses SMT solvers (Z3, etc.) to prove properties.

### Kast

Parse programs and display AST:

```bash
kast program.wast --output kore
```

## Practical Example: Fibonacci

### WebAssembly Fibonacci

```wasm
(func $fib (param $n i32) (result i32)
  (if (result i32) (i32.lt_s (local.get $n) (i32.const 2))
    (then (local.get $n))
    (else
      (i32.add
        (call $fib (i32.sub (local.get $n) (i32.const 1)))
        (call $fib (i32.sub (local.get $n) (i32.const 2)))))))
```

### K Semantics (Simplified)

```k
rule <k> (local.get I) => V ... </k>
     <locals> ... I |-> V ... </locals>

rule <k> (call F) => BODY ... </k>
     <funcs> ... F |-> func(PARAMS, BODY) ... </funcs>

rule <k> (i32.add) => . ... </k>
     <stack> (i32.const I2) : (i32.const I1) : S => (i32.const (I1 +Int I2)) : S </stack>
```

### Verification Claim

```k
claim <k> (call $fib) (i32.const N) => . </k>
      <stack> S => (i32.const FIB(N)) : S </stack>
      requires N >=Int 0
      ensures FIB(N) is the Nth Fibonacci number
```

## Advanced Features

### Heating and Cooling

Evaluate subexpressions before applying rules:

```k
syntax KItem ::= #freezer1( Instrs )

rule <k> (VAL:Value) ~> #freezer1(INSTRS) => VAL INSTRS ... </k>
```

### Configuration Abstraction

Partial configurations for modularity:

```k
rule <k> INSTR => . ... </k>
     ...    // Other cells abstracted away
```

### Module System

Import and compose K modules:

```k
requires "wasm-data.k"
requires "numeric.k"

module WASM
  imports WASM-DATA
  imports NUMERIC
  ...
endmodule
```

## Learning Resources

### Official Documentation
- [K Framework Website](http://www.kframework.org/)
- [K Tutorial](https://kframework.org/k-distribution/pl-tutorial/)
- [K Language Specification](https://github.com/kframework/k/blob/master/k-distribution/INSTALL.md)

### Example Semantics
- [KWasm (this project)](https://github.com/runtimeverification/wasm-semantics)
- [KEVM (Ethereum)](https://github.com/kframework/evm-semantics)
- [C Semantics](https://github.com/kframework/c-semantics)

### Academic Papers
- "All-Path Reachability Logic" (Ștefănescu et al., 2019)
- "Matching Logic" (Roșu, 2020)
- "K Framework Overview" (Roșu & Șerbănuță, 2010)

## Try It Yourself!

Explore K interactively:

1. [Interactive Rule Browser](../03_visualization_gallery/semantic_rules/rule_browser.html)
2. [Rule Applier Playground](../06_interactive_playground/semantic_explorer/rule_applier.html)
3. [Step-by-Step Executor](../02_interactive_tutorials/arithmetic_operations/interactive_stepper.html)

## Next Steps

- [WebAssembly Overview](02_webassembly_overview.md) - Learn WebAssembly architecture
- [Why Verify WebAssembly?](03_why_verify_wasm.md) - Motivation for verification
- [Hello WebAssembly Semantics](../02_interactive_tutorials/hello_wasm_semantics/) - First tutorial

---

<div align="center">

**[← Previous: What is Formal Semantics?](00_what_is_formal_semantics.md)** | **[Back to Home](../README.md)** | **[Next: WebAssembly Overview →](02_webassembly_overview.md)**

</div>
