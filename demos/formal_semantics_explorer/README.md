# 🌐 WebAssembly Formal Semantics Explorer

> An Interactive Journey Through Formal Verification of WebAssembly using the K Framework

[![K Framework](https://img.shields.io/badge/K%20Framework-5.0+-blue.svg)](http://www.kframework.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-Spec%202.0-purple.svg)](https://webassembly.org/)
[![Formal Verification](https://img.shields.io/badge/Formal-Verification-green.svg)](https://runtimeverification.com/)

---

## 🎯 What is This?

This is an **interactive educational showcase** of formally verified WebAssembly semantics defined in the K Framework. It transforms abstract formal methods into:

✨ **Visual Execution Traces** - Watch WebAssembly instructions execute step-by-step  
🎨 **Interactive Proof Trees** - Explore formal verification derivations  
🔍 **Memory Visualizations** - See stack, heap, and linear memory in 3D  
🎮 **Hands-on Playground** - Write, verify, and debug WebAssembly code  
📚 **Educational Narratives** - Learn through story-driven tutorials  
🧪 **Verification Case Studies** - Real-world security property proofs  

---

## 🚀 Quick Start

```bash
# Clone the fork
git clone https://github.com/AYUSHMIT/wasm-semantics.git
cd wasm-semantics/demos/formal_semantics_explorer

# Install dependencies (requires K Framework)
make install-deps

# Launch interactive explorer
make serve
# Opens http://localhost:8000 in your browser

# Run example verification
make verify-example EXAMPLE=memory_safety/bounds_overflow
```

---

## 🎨 Gallery Showcase

### Execution Trace Visualization
![Execution Trace](outputs/execution_traces/fibonacci_trace.gif)  
*Watch Fibonacci computation execute instruction-by-instruction with animated stack*

### Interactive Proof Tree
![Proof Tree](outputs/proof_trees/type_soundness_tree.png)  
*Explore formal proof of type soundness with collapsible derivation tree*

### 3D Memory Visualizer
![Memory](outputs/memory_diagrams/heap_stack_3d.png)  
*Navigate WebAssembly linear memory, stack, and heap in interactive 3D space*

### Semantic Rule Browser
![Rules](outputs/rule_browser_screenshot.png)  
*Browse 500+ K rewrite rules with syntax highlighting and search*

### Control Flow Graph
![CFG](outputs/cfg_examples/complex_control_flow.png)  
*Visualize branching, loops, and function calls as interactive graphs*

---

## 📚 Learning Paths

### 🟢 Beginner: "First Steps in Formal Semantics" (2-3 hours)

1. **Introduction** → Read [What is Formal Semantics?](01_introduction/00_what_is_formal_semantics.md)
2. **Hello Wasm** → Try [Hello WebAssembly Semantics](02_interactive_tutorials/hello_wasm_semantics/)
3. **Stack Machine** → Explore [The Stack Machine Journey](07_educational_narratives/story_1_stack_machine/)
4. **Interactive** → Play with [WebAssembly Editor](06_interactive_playground/wasm_editor/)

**Goal**: Understand how formal semantics describes program behavior

### 🟡 Intermediate: "Verification Practitioner" (6-8 hours)

1. **Control Flow** → Master [Loops & Branches](02_interactive_tutorials/control_flow/)
2. **Memory Safety** → Study [Bounds Checking](02_interactive_tutorials/memory_operations/)
3. **Type System** → Learn [Type Soundness](04_verification_case_studies/type_soundness/)
4. **K Framework** → Deep dive into [Rewrite Rules](05_k_framework_deep_dive/rewrite_rules/)
5. **Hands-on** → Build proofs in [Verification Sandbox](06_interactive_playground/verification_sandbox/)

**Goal**: Verify safety properties of WebAssembly programs

### 🔴 Advanced: "Formal Methods Researcher" (2-3 days)

1. **Concurrency** → Tackle [Thread Semantics & Memory Models](08_advanced_topics/concurrency/)
2. **Compiler Correctness** → Prove [Semantic Equivalence](04_verification_case_studies/compiler_correctness/)
3. **Symbolic Execution** → Master [Symbolic Backend](05_k_framework_deep_dive/backends/)
4. **Research** → Compare [Formal Tools](09_comparison_studies/formal_tools_comparison/)
5. **Contribute** → Extend semantics via [Contribution Guide](10_community_resources/contribution_guide.md)

**Goal**: Advance state-of-the-art in WebAssembly verification

---

## 🎓 Featured Tutorials

| Tutorial | Complexity | Time | Highlights |
|----------|-----------|------|------------|
| [Hello Wasm Semantics](02_interactive_tutorials/hello_wasm_semantics/) | ⭐ | 20 min | First formal execution trace |
| [Arithmetic Operations](02_interactive_tutorials/arithmetic_operations/) | ⭐⭐ | 45 min | Interactive stepper, overflow detection |
| [Control Flow](02_interactive_tutorials/control_flow/) | ⭐⭐ | 1 hour | CFG visualization, branch semantics |
| [Function Calls](02_interactive_tutorials/function_calls/) | ⭐⭐⭐ | 1.5 hours | Stack frames, recursion, tail calls |
| [Memory Operations](02_interactive_tutorials/memory_operations/) | ⭐⭐⭐ | 2 hours | Memory safety proofs, bounds checking |
| [Memory Safety Case Study](04_verification_case_studies/memory_safety/) | ⭐⭐⭐⭐ | 3 hours | Full verification workflow |
| [Compiler Correctness](04_verification_case_studies/compiler_correctness/) | ⭐⭐⭐⭐⭐ | 4 hours | Bisimulation, semantic equivalence |

---

## 🌟 Highlighted Features

### Interactive Execution Stepper
<!-- 02_interactive_tutorials/arithmetic_operations/interactive_stepper.html -->

Step through WebAssembly execution with:
- 🎬 Play/pause/step-forward/step-back controls
- 📊 Real-time stack visualization
- 🔍 Current instruction highlighting
- 📝 K configuration state display
- 🎨 Animated transitions between states

### Proof Tree Explorer
<!-- 03_visualization_gallery/proof_trees/derivation_viewer.html -->

Navigate formal proofs with:
- 🌳 Collapsible/expandable tree nodes
- 🔗 Click nodes to see K rule application
- 🎯 Highlight proof path to conclusion
- 💾 Export to LaTeX/GraphML
- 🔎 Search proof by rule name

### Memory Inspector 3D
<!-- 03_visualization_gallery/memory_models/heap_visualizer.html -->

Explore memory with:
- 🎮 3D navigation (pan, zoom, rotate)
- 🎨 Color-coded by type (i32, i64, f32, f64)
- 📍 Click address to inspect value
- ⏱️ Timeline slider (watch memory evolve)
- 📊 Stack growth animation

### Semantic Rule Browser
<!-- 03_visualization_gallery/semantic_rules/rule_browser.html -->

Discover K rules with:
- 🔍 Full-text search across all rules
- 🏷️ Filter by category (arithmetic, control, memory)
- 📖 Syntax-highlighted K notation
- 🔗 Rule dependency graph
- 📚 Link to specification section

---

## 🎮 Interactive Playground

Launch the full-featured playground:

```bash
make playground
```

**Features:**
- **Monaco Editor** - Industry-standard editor with WebAssembly syntax highlighting
- **Live Validation** - Real-time type checking and syntax errors
- **Autocomplete** - Intelligent suggestions for instructions, types, imports
- **Execution Modes**:
  - 🏃 Concrete: Run with actual values
  - 🔮 Symbolic: Explore all possible executions
  - 🐛 Debug: Step-by-step with breakpoints
- **Verification Panel** - Write specifications and check properties
- **Export Options** - Download .wat, .wasm, proofs, traces

---

## 🧪 Verification Case Studies

### Case Study 1: Memory Safety

**Problem**: Prove that WebAssembly memory operations never access out-of-bounds addresses.

**Approach**:
1. Define memory safety specification in K
2. Identify all memory-accessing instructions
3. Prove bounds checking happens before every access
4. Verify trap behavior on violation

**Files**:
- [Bounds Overflow Example](04_verification_case_studies/memory_safety/bounds_overflow.wat)
- [Formal Specification](04_verification_case_studies/memory_safety/verification_spec.k)
- [Automated Proof Script](04_verification_case_studies/memory_safety/proof_script.py)
- [Interactive Results Dashboard](04_verification_case_studies/memory_safety/results_dashboard.html)

**Outcome**: ✅ Proved memory safety holds for all valid WebAssembly modules

### Case Study 2: Type Soundness

**Theorem**: "Well-typed programs don't go wrong"

**Proof Strategy**:
1. **Type Preservation** - Types are preserved during execution
2. **Progress** - Well-typed programs never get stuck

**Visualization**: [Interactive Proof Tree](04_verification_case_studies/type_soundness/progress_proof.html)

### Case Study 3: Deterministic Execution

**Property**: Given the same inputs, WebAssembly always produces the same outputs.

**Verification**:
- Compare execution traces from different runs
- Prove confluence of rewrite rules
- Check for non-deterministic constructs

**Demo**: [Trace Comparison Tool](04_verification_case_studies/determinism/trace_comparison.html)

---

## 🔬 K Framework Deep Dive

### What is the K Framework?

The K Framework is a rewrite-based executable semantic framework where:
- Programming languages are defined as term rewriting systems
- Execution is rule application on configurations
- Verification uses reachability logic and symbolic execution

**Example K Rule**:
```k
rule <k> (i32.const I1:Int) (i32.const I2:Int) i32.add => i32.const (I1 +Int I2) ... </k>
     requires I1 +Int I2 <=Int (2 ^Int 32 -Int 1)
```

**Interpretation**:
- **Left side**: Pattern to match (two i32 constants on stack, then add instruction)
- **Right side**: Result (single i32 constant with sum)
- **Requires**: Side condition (no overflow)

**Interactive K Rule Applier**: Try it at [Rule Applier](06_interactive_playground/semantic_explorer/rule_applier.html)

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| K Semantic Rules | 500+ |
| WebAssembly Instructions Covered | 180+ |
| Verification Case Studies | 15 |
| Interactive Visualizations | 40+ |
| Educational Narratives | 3 complete stories |
| Test Cases | 1000+ |
| Formal Proofs | 25+ |

---

## 🛠️ Technical Stack

### Core Technologies:
- **K Framework 5.0+** - Semantic definition & verification
- **WebAssembly 2.0** - Target language
- **Python 3.8+** - Build scripts & automation
- **D3.js** - Interactive visualizations
- **Monaco Editor** - Code editing
- **Three.js** - 3D memory visualization
- **Plotly.js** - Charts & graphs
- **Prism.js** - Syntax highlighting

### Build System:
```makefile
# Key make targets
make install-deps     # Install K Framework & dependencies
make build           # Compile K semantics
make test            # Run test suite
make verify          # Run all verification case studies
make serve           # Launch web server
make docs            # Generate documentation
make benchmark       # Run performance tests
```

---

## 🎯 Why WebAssembly Formal Semantics?

### The Problem:
- WebAssembly is deployed in billions of browsers
- Security bugs can lead to sandbox escapes
- Compilers may have optimization bugs
- Specification ambiguities cause engine inconsistencies

### The Solution:
- Formal semantics provide unambiguous definitions
- Mechanized proofs guarantee safety properties
- Executable specifications enable conformance testing
- Tool foundation for verified compilers & analyzers

### Real-World Impact:
- Found specification bugs in WebAssembly standard
- Verified safety of browser implementations
- Foundation for verified compilation pipelines
- Educational resource for PL researchers

---

## 🤝 Contributing

Want to extend the semantics or add demos?

1. **Fork & Clone**: Start with your fork of wasm-semantics
2. **Read Guide**: [Contribution Guide](10_community_resources/contribution_guide.md)
3. **Pick an Issue**: Browse open issues or propose new features
4. **Test**: Run test suite and add new tests
5. **Submit PR**: Include documentation and examples

### Ideas for Contributions:
- [ ] Add SIMD instruction semantics
- [ ] Implement garbage collection proposal
- [ ] Create new verification case studies
- [ ] Improve visualization performance
- [ ] Add support for WebAssembly Component Model
- [ ] Translate educational narratives to other languages

---

## 📖 Research & Publications

This work builds on:

1. **"Semantics-Based Program Verifiers for All Languages"**  
   Roșu & Ștefănescu, OOPSLA 2016  
   [Paper](http://fsl.cs.illinois.edu/index.php/Semantics-Based_Program_Verifiers_for_All_Languages)

2. **"KEVM: A Complete Formal Semantics of the Ethereum Virtual Machine"**  
   Hildenbrandt et al., CSF 2018  
   [Paper](https://www.ideals.illinois.edu/handle/2142/97207)

3. **"A Formal Semantics of WebAssembly in K"**  
   Runtime Verification Technical Report, 2020

4. **"WebAssembly Specification"**  
   W3C, 2023  
   [Spec](https://webassembly.github.io/spec/)

---

## 🏆 Acknowledgments

- **Runtime Verification** - K Framework & formal methods expertise
- **WebAssembly Community Group** - Language design & specification
- **K Framework Team** - Tool development & support
- **Academic Partners** - Research collaboration

---

## 📜 License

This demo showcase is released under the **UIUC License**, consistent with the main wasm-semantics repository.

The K Framework is licensed under **BSD-3-Clause**.

---

## 🌐 Links

- **Main Repository**: [runtimeverification/wasm-semantics](https://github.com/runtimeverification/wasm-semantics)
- **K Framework**: [kframework.org](http://www.kframework.org/)
- **WebAssembly**: [webassembly.org](https://webassembly.org/)
- **Runtime Verification**: [runtimeverification.com](https://runtimeverification.com/)

---

<div align="center">

**Built with 🔬 using K Framework • WebAssembly • Formal Methods**

[🏠 Back to Top](#-webassembly-formal-semantics-explorer)

</div>
