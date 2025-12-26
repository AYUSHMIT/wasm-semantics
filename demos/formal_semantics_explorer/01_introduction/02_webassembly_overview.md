# WebAssembly Overview

## What is WebAssembly?

**WebAssembly (Wasm)** is a low-level, portable bytecode format designed as a compilation target for high-level languages. It enables near-native performance in web browsers and other runtime environments.

## Key Characteristics

### 1. **Stack-Based Virtual Machine**

WebAssembly uses a **stack machine** model:

```wasm
;; Push values onto stack
(i32.const 5)   ;; Stack: [5]
(i32.const 3)   ;; Stack: [5, 3]

;; Operate on stack values
(i32.add)       ;; Stack: [8]
```

### 2. **Statically Typed**

All operations have well-defined types:

```wasm
;; Valid: both operands are i32
(i32.const 5) (i32.const 3) (i32.add) : [i32]

;; Invalid: type mismatch
(i32.const 5) (f32.const 3.0) (i32.add)  ;; ERROR!
```

### 3. **Memory Safe**

Built-in safety guarantees:
- **Bounds checking**: All memory accesses validated
- **Type safety**: Cannot mix incompatible types
- **Sandboxing**: Isolated from host environment
- **No undefined behavior**: All operations well-defined

### 4. **Portable**

WebAssembly is:
- **Platform-independent**: Runs on any architecture
- **Deterministic**: Same inputs → same outputs
- **Embeddable**: Works in browsers, servers, IoT

## Architecture

### Value Types

```wasm
i32  ;; 32-bit integer
i64  ;; 64-bit integer
f32  ;; 32-bit float (IEEE 754)
f64  ;; 64-bit float (IEEE 754)
```

### Instructions

**Numeric Operations:**
```wasm
i32.add, i32.sub, i32.mul, i32.div_s, i32.div_u
i32.rem_s, i32.rem_u
i32.and, i32.or, i32.xor, i32.shl, i32.shr_s, i32.shr_u
i32.eq, i32.ne, i32.lt_s, i32.le_s, i32.gt_s, i32.ge_s
```

**Control Flow:**
```wasm
block, loop, if, br, br_if, br_table
call, call_indirect, return
```

**Memory:**
```wasm
i32.load, i64.load, f32.load, f64.load
i32.store, i64.store, f32.store, f64.store
memory.size, memory.grow
```

**Variables:**
```wasm
local.get, local.set, local.tee
global.get, global.set
```

### Module Structure

A WebAssembly module consists of:

```wasm
(module
  ;; Type definitions
  (type $add_type (func (param i32 i32) (result i32)))
  
  ;; Imports
  (import "env" "print" (func $print (param i32)))
  
  ;; Functions
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )
  
  ;; Memory
  (memory 1)  ;; 1 page = 64KB
  
  ;; Globals
  (global $counter (mut i32) (i32.const 0))
  
  ;; Exports
  (export "add" (func $add))
  (export "memory" (memory 0))
  
  ;; Data initialization
  (data (i32.const 0) "Hello, World!")
)
```

## Execution Model

### Stack Machine

Instructions manipulate an operand stack:

```
Instruction       Stack Before    Stack After
─────────────────────────────────────────────
i32.const 5       []              [5]
i32.const 3       [5]             [5, 3]
i32.add           [5, 3]          [8]
```

### Call Frames

Function calls create **activation frames**:

```
Frame Stack:
┌─────────────────┐
│ Frame 2: $fib   │  ← Current
│ locals: n=2     │
├─────────────────┤
│ Frame 1: $fib   │
│ locals: n=3     │
├─────────────────┤
│ Frame 0: $main  │
│ locals: x=5     │
└─────────────────┘
```

### Linear Memory

Contiguous, resizable memory:

```
Address    Value
────────────────
0x0000     01
0x0001     02
0x0002     03
0x0003     04
...
```

Properties:
- **Byte-addressed**: Each address = 1 byte
- **Little-endian**: Least significant byte first
- **Growable**: Can expand at runtime
- **Bounds-checked**: Invalid access → trap

## Type System

### Validation

Programs must be **well-typed** before execution:

```
Γ ⊢ e : [t1* ] → [t2*]
```

Meaning: In context Γ, expression e has type [t1*] → [t2*]  
(Takes t1* from stack, produces t2*)

### Type Rules Examples

**Constants:**
```
─────────────────────── [T-Const]
⊢ (t.const c) : [] → [t]
```

**Binary Operations:**
```
─────────────────────── [T-Binop]
⊢ t.binop : [t t] → [t]
```

**Control Flow:**
```
Γ ⊢ e1 : [t1*] → [t2*]    Γ ⊢ e2 : [t1*] → [t2*]
───────────────────────────────────────────────── [T-If]
Γ ⊢ (if [t2*] e1 else e2) : [t1* i32] → [t2*]
```

## Example: Fibonacci

### Source Code (Rust)

```rust
pub fn fib(n: u32) -> u32 {
    if n < 2 {
        n
    } else {
        fib(n - 1) + fib(n - 2)
    }
}
```

### Compiled WebAssembly

```wasm
(func $fib (param $n i32) (result i32)
  (if (result i32)
    (i32.lt_u (local.get $n) (i32.const 2))
    (then
      (local.get $n))
    (else
      (i32.add
        (call $fib
          (i32.sub (local.get $n) (i32.const 1)))
        (call $fib
          (i32.sub (local.get $n) (i32.const 2)))))))
```

### Execution Trace

```
Call $fib with n=3:
  n < 2? No
  Call $fib with n=2:
    n < 2? No
    Call $fib with n=1:
      n < 2? Yes
      Return 1
    Call $fib with n=0:
      n < 2? Yes
      Return 0
    Return 1 + 0 = 1
  Call $fib with n=1:
    n < 2? Yes
    Return 1
  Return 1 + 1 = 2
```

## Use Cases

### 1. **Web Performance**
- Games (Unity, Unreal Engine)
- CAD tools (AutoCAD)
- Video editing (Figma)
- Scientific computing

### 2. **Server-Side**
- Serverless functions (Cloudflare Workers)
- Edge computing
- Plugin systems (Envoy, Istio)

### 3. **Blockchain**
- Smart contracts (Ethereum 2.0, Polkadot)
- Deterministic execution
- Sandboxed computation

### 4. **IoT & Embedded**
- Resource-constrained devices
- Cross-platform code
- Secure execution

## Comparison to Native Code

| Aspect | WebAssembly | Native (x86/ARM) |
|--------|-------------|------------------|
| **Speed** | 95-100% of native | 100% |
| **Portability** | Runs anywhere | Platform-specific |
| **Security** | Sandboxed | No isolation |
| **Size** | Compact bytecode | Larger binaries |
| **Tooling** | Growing ecosystem | Mature tools |

## Language Support

WebAssembly can be compiled from:
- **C/C++**: clang, emscripten
- **Rust**: rustc
- **Go**: TinyGo
- **C#**: Blazor
- **AssemblyScript**: TypeScript-like
- **Many others**: Python, Ruby, Java, Kotlin...

## Formal Semantics

The [WebAssembly Specification](https://webassembly.github.io/spec/) provides:

1. **Syntax**: How to write programs
2. **Typing**: Well-formedness rules
3. **Execution**: Operational semantics
4. **Validation**: Type-checking algorithm
5. **Soundness**: Formal guarantees

Example from spec:

```
Execution of i32.add:
────────────────────────────────────────
S; F; (i32.const c1) (i32.const c2) i32.add
⟼ S; F; (i32.const (c1 + c2) mod 2³²)
```

## WebAssembly Proposals

Extensions being standardized:

- **SIMD**: Vector operations
- **Threads**: Shared memory, atomics
- **Tail Calls**: Optimized recursion
- **Exception Handling**: try/catch
- **Garbage Collection**: Managed types
- **Component Model**: Interface types

## Try It!

### Online Tools
- [WebAssembly Studio](https://webassembly.studio/)
- [WasmFiddle](https://wasdk.github.io/WasmFiddle/)
- [Wasm Explorer](https://mbebenita.github.io/WasmExplorer/)

### Command-Line Tools
```bash
# Compile C to Wasm
emcc hello.c -o hello.wasm

# Run with wasmtime
wasmtime hello.wasm

# Inspect binary
wasm-objdump -d hello.wasm
```

## Resources

### Official
- [WebAssembly.org](https://webassembly.org/)
- [Specification](https://webassembly.github.io/spec/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/WebAssembly)

### Books
- "Programming WebAssembly with Rust" by Kevin Hoffman
- "WebAssembly: The Definitive Guide" by Brian Sletten

### Communities
- [WebAssembly Community Group](https://www.w3.org/community/webassembly/)
- [Reddit r/WebAssembly](https://www.reddit.com/r/WebAssembly/)
- [Stack Overflow Tag](https://stackoverflow.com/questions/tagged/webassembly)

## Next Steps

- [Why Verify WebAssembly?](03_why_verify_wasm.md) - Learn about formal verification
- [Hello WebAssembly Semantics](../02_interactive_tutorials/hello_wasm_semantics/) - First tutorial
- [Arithmetic Operations](../02_interactive_tutorials/arithmetic_operations/) - Practice with instructions

---

<div align="center">

**[← Previous: K Framework Primer](01_k_framework_primer.md)** | **[Back to Home](../README.md)** | **[Next: Why Verify? →](03_why_verify_wasm.md)**

</div>
