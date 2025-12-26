# What is Formal Semantics?

## Introduction

**Formal semantics** is a mathematical framework for precisely defining the meaning and behavior of programming languages. Unlike informal descriptions or implementation-driven definitions, formal semantics provides an unambiguous, mathematical specification of how programs execute.

## Why Do We Need Formal Semantics?

### The Problem with Informal Specifications

Traditional programming language specifications often rely on:
- Natural language descriptions (ambiguous)
- Reference implementations (may have bugs)
- Examples and test cases (incomplete coverage)

This leads to:
- **Ambiguities**: Different interpretations of the same specification
- **Inconsistencies**: Contradictions between different parts of the spec
- **Implementation bugs**: Errors in compilers and interpreters
- **Security vulnerabilities**: Unexpected behaviors that can be exploited

### The Solution: Mathematical Precision

Formal semantics provides:
- **Unambiguous definitions**: Every construct has exactly one meaning
- **Mechanized reasoning**: Automated tools can verify properties
- **Implementation guidance**: Clear specification for compiler writers
- **Correctness guarantees**: Proofs that programs behave as intended

## Types of Formal Semantics

### 1. Operational Semantics

Describes how programs execute step-by-step.

**Example**: WebAssembly instruction `i32.add`
```
Stack: [v1, v2] + i32.add → Stack: [v1 + v2]
```

**Advantages**:
- Intuitive (matches mental model of execution)
- Easy to implement interpreters from
- Natural for reasoning about execution traces

### 2. Denotational Semantics

Maps programs to mathematical objects (functions, domains).

**Example**: 
```
⟦i32.add⟧ = λs. push(pop(s) + pop(s), s)
```

**Advantages**:
- Compositional (meaning of whole from parts)
- Good for compiler optimization proofs
- Abstract (ignores implementation details)

### 3. Axiomatic Semantics

Defines programs through logical assertions (preconditions, postconditions).

**Example**: Hoare triple
```
{x = 5 ∧ y = 3} z := x + y {z = 8}
```

**Advantages**:
- Direct support for program verification
- Reasoning about correctness properties
- Foundation for tools like Frama-C, Dafny

## Formal Semantics in WebAssembly

WebAssembly's [official specification](https://webassembly.github.io/spec/) uses **operational semantics** with:

- **Reduction rules**: How instructions transform the execution state
- **Type system**: Static guarantees about program behavior
- **Validation rules**: Conditions for well-formed modules

### Example: WebAssembly `i32.add` Semantics

**Informal description**:
> "The i32.add instruction pops two i32 values from the stack, adds them, and pushes the result."

**Formal operational semantics**:
```
⟨(i32.const v1) (i32.const v2) i32.add, S⟩ → ⟨(i32.const (v1 + v2 mod 2³²)), S⟩
```

**Type rule**:
```
⊢ i32.add : [i32 i32] → [i32]
```

## Benefits of Formal Semantics

### 1. **Precision**
- No ambiguity in language definition
- Clear specification for implementers

### 2. **Automated Verification**
- Tools can prove correctness automatically
- Find bugs before they reach production

### 3. **Implementation Correctness**
- Test that compilers match specification
- Conformance testing for different engines

### 4. **Security**
- Prove absence of vulnerabilities
- Verify sandboxing properties

### 5. **Optimization Correctness**
- Prove compiler optimizations preserve semantics
- Validate aggressive transformations

## Real-World Impact

### Found Bugs in Specifications
Formal semantics have discovered:
- Ambiguities in WebAssembly spec
- Missing edge cases in type checking
- Inconsistencies between prose and formal rules

### Verified Implementations
Projects using formal semantics:
- **WasmCert**: Verified WebAssembly type checker in Coq
- **KWasm**: Executable semantics and verifier (this project!)
- **CompCert**: Formally verified C compiler
- **seL4**: Formally verified microkernel

### Tool Ecosystems
Formal semantics enable:
- **Symbolic execution engines**: Explore all program paths
- **Model checkers**: Verify finite-state properties
- **Theorem provers**: Prove arbitrary properties
- **Fuzzing tools**: Generate test cases from semantics

## How to Read Formal Semantics

### Understanding Notation

**Configuration**: Current program state
```
⟨instructions, stack, memory, locals, ...⟩
```

**Reduction arrow**: State transition
```
⟨state1⟩ → ⟨state2⟩
```

**Sequence**: Multiple steps
```
⟨state1⟩ →* ⟨state2⟩
```

**Judgment**: Assertion about program
```
⊢ e : τ    (expression e has type τ)
```

### Reading Rules

General form:
```
   premise1    premise2    ...
  ─────────────────────────────── [rule name]
           conclusion
```

Example:
```
   ⊢ e1 : i32    ⊢ e2 : i32
  ─────────────────────────────── [T-Add]
       ⊢ e1 + e2 : i32
```

Interpretation: "If e1 has type i32 AND e2 has type i32, THEN e1 + e2 has type i32"

## Learning Path

To master formal semantics:

1. **Start simple**: Understand small examples (arithmetic)
2. **Build intuition**: Work through execution traces manually
3. **Study rules**: Learn common patterns in semantic rules
4. **Try proofs**: Prove simple properties on paper
5. **Use tools**: Leverage mechanized verification systems

## Resources

### Books
- **"Semantics of Programming Languages"** by Carl Gunter
- **"Types and Programming Languages"** by Benjamin Pierce
- **"Formal Semantics of Programming Languages"** by Glynn Winskel

### Online Courses
- Software Foundations (Coq-based)
- Programming Languages (Coursera)
- Formal Methods (edX)

### Tools
- **K Framework**: Rewrite-based semantics
- **Coq**: Interactive theorem prover
- **Isabelle/HOL**: Higher-order logic prover
- **PLT Redex**: Lightweight semantics engineering

## Next Steps

Now that you understand what formal semantics are, explore:

1. [K Framework Primer](01_k_framework_primer.md) - Learn the K Framework
2. [WebAssembly Overview](02_webassembly_overview.md) - Understand WebAssembly
3. [Why Verify WebAssembly?](03_why_verify_wasm.md) - Motivation for verification

Or jump into our [Hello WebAssembly Semantics](../02_interactive_tutorials/hello_wasm_semantics/) tutorial!

---

<div align="center">

**[Back to Home](../README.md)** | **[Next: K Framework Primer →](01_k_framework_primer.md)**

</div>
