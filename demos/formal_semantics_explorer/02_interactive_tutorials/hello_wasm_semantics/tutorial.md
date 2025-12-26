# Hello WebAssembly Semantics

## Welcome!

This is your first step into the world of formal WebAssembly semantics. In this tutorial, you'll:

1. See a simple WebAssembly program
2. Understand its formal semantics
3. Watch it execute step-by-step
4. Explore the K Framework rules that define its behavior

## The Simplest Program

Let's start with the most basic WebAssembly program:

```wasm
(i32.const 42)
```

That's it! This program:
- Pushes the integer constant `42` onto the stack
- Has type `[] → [i32]` (takes nothing, produces an i32)

## Informal Understanding

When this program runs:
1. **Before**: Stack is empty `[]`
2. **Execute**: Push 42 onto stack
3. **After**: Stack contains `[42]`

Simple, right? But how do we know this is **exactly** what happens?

## Formal Semantics

The K Framework defines this behavior precisely:

```k
rule <k> (i32.const I:Int) => . ... </k>
     <stack> S => (i32.const I) : S </stack>
```

**Reading this rule:**
- **Left side** (before `=>`): Pattern to match
  - `<k>`: Computation cell contains `i32.const I`
  - `I:Int`: Variable I matches any integer
  - `...`: Rest of computation (unchanged)
- **Right side** (after `=>`): Result
  - `<k> . ...`: Instruction removed from computation
  - `<stack> S => (i32.const I) : S`: Value pushed onto stack

## Step-by-Step Execution

### Initial State

```
<T>
  <k> (i32.const 42) </k>
  <stack> .Stack </stack>
</T>
```

**Explanation:**
- Computation to execute: `i32.const 42`
- Stack: Empty (`.Stack`)

### After One Step

Apply the rule:

```
<T>
  <k> . </k>
  <stack> (i32.const 42) : .Stack </stack>
</T>
```

**Explanation:**
- Computation: Complete (`.`)
- Stack: Contains `42`

### Final Result

The program terminates successfully with:
- **Return value**: `42`
- **Exit status**: Success

## Type Checking

WebAssembly is **statically typed**. The type rule for constants:

```
─────────────────────── [T-Const]
⊢ (t.const c) : [] → [t]
```

For our program:
```
─────────────────────────── [T-Const]
⊢ (i32.const 42) : [] → [i32]
```

This means:
- Takes 0 values from stack
- Produces 1 i32 value on stack

## Interactive Visualization

<div class="interactive-demo">
  <canvas id="hello-wasm-canvas" width="800" height="400"></canvas>
  <div class="controls">
    <button onclick="resetDemo()">Reset</button>
    <button onclick="stepDemo()">Step</button>
    <button onclick="runDemo()">Run</button>
  </div>
</div>

<script src="../../assets/js/wasm_visualizer.js"></script>
<script>
const visualizer = new WasmVisualizer('hello-wasm-canvas');

const trace = [
  { opcode: 'i32.const', args: [42] }
];

visualizer.loadTrace(trace);

function resetDemo() {
  visualizer.reset();
}

function stepDemo() {
  visualizer.step();
}

function runDemo() {
  visualizer.play();
}
</script>

## Try It Yourself

Modify the constant and see what happens:

```wasm
;; Try different values:
(i32.const 0)      ;; Zero
(i32.const -1)     ;; Negative (wraps to 4294967295)
(i32.const 100)    ;; Positive
```

Each follows the same semantic rule, just with different values for `I`.

## What About Other Types?

The same rule works for other numeric types:

```wasm
(i64.const 9223372036854775807)  ;; 64-bit integer
(f32.const 3.14)                 ;; 32-bit float
(f64.const 2.71828)              ;; 64-bit float
```

Each has a similar K rule:

```k
rule <k> (i64.const I:Int) => . ... </k>
     <stack> S => (i64.const I) : S </stack>

rule <k> (f32.const F:Float) => . ... </k>
     <stack> S => (f32.const F) : S </stack>
```

## Key Takeaways

1. **Formal semantics** precisely define program behavior
2. **K rules** specify state transformations
3. **Pattern matching** identifies which rule applies
4. **Execution** is rule application on configurations
5. **Type rules** ensure well-formed programs

## Next Steps

Now that you understand the basics, try:

1. [Arithmetic Operations](../arithmetic_operations/) - Combine multiple instructions
2. [Control Flow](../control_flow/) - Learn conditionals and loops
3. [Interactive Stepper](../arithmetic_operations/interactive_stepper.html) - Full-featured debugger

## Exercise

**Challenge**: Predict the final stack for this program:

```wasm
(i32.const 10)
(i32.const 20)
(i32.const 30)
```

<details>
<summary>Click to reveal answer</summary>

**Answer**: Stack contains `[10, 20, 30]` (30 on top)

Each instruction pushes its value, so we apply the rule three times:
1. Push 10: `[10]`
2. Push 20: `[10, 20]`
3. Push 30: `[10, 20, 30]`

</details>

## Questions?

- **Q: Why is the formal semantics necessary?**  
  A: It removes ambiguity and enables automated verification.

- **Q: Can I run this program?**  
  A: Yes! Use `kwasm run` or any WebAssembly engine.

- **Q: What if I use an invalid constant?**  
  A: WebAssembly has range limits. i32 must fit in 32 bits (signed).

## Further Reading

- [K Framework Primer](../../01_introduction/01_k_framework_primer.md)
- [WebAssembly Specification](https://webassembly.github.io/spec/)
- [KWasm Source Code](https://github.com/runtimeverification/wasm-semantics)

---

<div align="center">

**[← Back to Tutorials](../../README.md#tutorials)** | **[Next: Arithmetic Operations →](../arithmetic_operations/)**

</div>
