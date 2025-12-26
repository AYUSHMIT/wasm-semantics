# Visualization Gallery

Explore formal WebAssembly semantics through beautiful, interactive visualizations.

## 🎨 Gallery Sections

### 1. [Execution Traces](execution_traces/)
Watch WebAssembly programs execute step-by-step with animated visualizations.

**Features:**
- Instruction-by-instruction animation
- Stack operation visualization
- Memory state tracking
- Timeline scrubbing
- Speed control

**Examples:**
- Fibonacci sequence computation
- Factorial calculation
- Array sorting
- Tree traversal

### 2. [Semantic Rules](semantic_rules/)
Browse and understand K Framework rules that define WebAssembly semantics.

**Features:**
- Searchable rule database
- Category filtering
- Syntax highlighting
- Rule dependencies graph
- Interactive examples

**Categories:**
- Arithmetic operations
- Control flow
- Memory operations
- Function calls
- Table operations

### 3. [Proof Trees](proof_trees/)
Explore formal verification proofs as interactive tree structures.

**Features:**
- Collapsible/expandable nodes
- Rule application highlighting
- LaTeX export
- GraphViz export
- Search functionality

**Proofs:**
- Type soundness
- Memory safety
- Determinism
- Progress theorem
- Preservation theorem

### 4. [Memory Models](memory_models/)
Visualize WebAssembly memory in 2D and 3D.

**Features:**
- Hex dump viewer
- 3D memory explorer
- Stack visualization
- Growth animation
- Type coloring

**Views:**
- Linear memory layout
- Stack frame structure
- Heap organization
- Global variables
- Table contents

### 5. [Type System](type_system/)
See how WebAssembly's type system ensures safety.

**Features:**
- Type checking visualization
- Validation flow diagrams
- Type error explanation
- Stack polymorphism demo
- Type inference

**Visualizations:**
- Module validation
- Function type checking
- Instruction typing
- Block types
- Control flow types

## 🚀 Using the Gallery

### Interactive Mode

Open visualizations in your browser:
```bash
cd demos/formal_semantics_explorer
make serve
# Navigate to http://localhost:8000/03_visualization_gallery/
```

### Generating Custom Visualizations

```bash
# Generate execution trace
make example EXAMPLE=fibonacci

# Export proof tree
make proof-tree EXAMPLE=type_soundness

# Create memory diagram
make memory-viz EXAMPLE=array_access
```

## 📊 Visualization Types

### Static Diagrams
- SVG graphics
- Architecture diagrams
- State machine diagrams
- Type derivation trees

### Interactive Visualizations
- D3.js animations
- Canvas-based renderers
- WebGL 3D views
- Interactive controls

### Animated Sequences
- Frame-by-frame execution
- Transition animations
- State evolution
- Proof construction

## 🎯 Learning Objectives

Through visualizations, you'll understand:
- How WebAssembly executes
- What K rules mean
- How proofs are constructed
- Why properties hold
- Where bugs can occur

## 🛠️ Technical Details

### Technologies Used
- **D3.js**: Tree and graph visualizations
- **Three.js**: 3D memory viewer
- **Canvas API**: Execution traces
- **Prism.js**: Code highlighting
- **MathJax**: Mathematical notation

### Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Canvas support
- WebGL (for 3D features)

## 📖 Featured Visualizations

### Execution Trace: Fibonacci
![Fibonacci Trace](../outputs/execution_traces/fibonacci_trace.gif)

Watch recursive Fibonacci compute `fib(5)` with:
- Call stack evolution
- Stack operations
- Return value propagation

### Proof Tree: Type Soundness
![Type Soundness](../outputs/proof_trees/type_soundness_tree.png)

Explore the proof that well-typed programs don't get stuck.

### Memory Layout: Array Operations
![Memory Diagram](../outputs/memory_diagrams/heap_stack_3d.png)

See how arrays are stored and accessed in linear memory.

### Rule Browser: i32.add
![Rule Browser](../outputs/rule_browser_screenshot.png)

Understand how addition works in the K semantics.

## 🔍 Navigation

Each visualization includes:
- **Controls**: Play, pause, step, reset
- **Info panel**: Current state description
- **Settings**: Speed, color scheme, detail level
- **Export**: Save as image, JSON, or SVG

## 💡 Tips for Learning

1. **Start Simple**: Begin with basic arithmetic
2. **Compare**: Run similar examples side-by-side
3. **Slow Down**: Use slow animation to understand
4. **Experiment**: Modify examples to see effects
5. **Export**: Save interesting states for later

## 🎓 Educational Uses

### For Students
- Understand formal semantics concretely
- Debug WebAssembly programs
- Prepare for exams

### For Teachers
- Demonstrate concepts visually
- Create engaging lectures
- Assign as homework

### For Researchers
- Explore semantic edge cases
- Validate theories
- Generate figures for papers

## 🌟 Advanced Features

### Custom Examples
Upload your own WebAssembly:
```javascript
// In browser console
visualizer.loadWasm(wasmBytes);
visualizer.run();
```

### Comparison Mode
View multiple executions simultaneously:
- Before/after optimization
- Different implementations
- Correct vs buggy code

### Recording
Capture visualizations as videos:
- GIF export
- MP4 recording
- Frame-by-frame PNGs

## 🐛 Troubleshooting

**Visualization doesn't load:**
- Check browser console for errors
- Ensure JavaScript enabled
- Try different browser

**Performance issues:**
- Reduce animation speed
- Close other tabs
- Disable 3D features if needed

**Export fails:**
- Check browser download settings
- Try different export format
- Use "Save As" from browser

## 📚 Related Resources

- [Interactive Tutorials](../02_interactive_tutorials/) - Learn by doing
- [Case Studies](../04_verification_case_studies/) - Real-world examples
- [K Framework Deep Dive](../05_k_framework_deep_dive/) - Understanding rules

## 🤝 Contributing

Want to add visualizations?
1. See [contribution guide](../10_community_resources/contribution_guide.md)
2. Use existing visualizers as templates
3. Submit PR with screenshots

## 🎬 Video Tours

Check out video walkthroughs:
- [Gallery Overview](https://example.com) (5 min)
- [Execution Traces Deep Dive](https://example.com) (15 min)
- [Proof Tree Tutorial](https://example.com) (10 min)

---

<div align="center">

**[← Back to Home](../README.md)** | **[Explore Visualizations →](execution_traces/)**

*Seeing is believing! 👁️✨*

</div>
