# Interactive Tutorials

Welcome to the hands-on tutorials! Learn WebAssembly formal semantics through interactive examples and step-by-step guides.

## 📚 Tutorial Structure

Each tutorial includes:
- **Conceptual explanation** of the topic
- **WebAssembly examples** (.wat files)
- **K Framework rules** defining semantics
- **Interactive visualizers** to see execution
- **Exercises** to test understanding

## 🎓 Learning Path

### Beginner Tutorials

1. **[Hello WebAssembly Semantics](hello_wasm_semantics/)** ⭐  
   *20 minutes*  
   Your first formal semantics! Learn how `i32.const` works.

2. **[Arithmetic Operations](arithmetic_operations/)** ⭐⭐  
   *45 minutes*  
   Add, subtract, multiply, divide with overflow handling.

3. **[Control Flow](control_flow/)** ⭐⭐  
   *1 hour*  
   Conditionals, loops, and branching instructions.

### Intermediate Tutorials

4. **[Function Calls](function_calls/)** ⭐⭐⭐  
   *1.5 hours*  
   Function invocation, stack frames, and recursion.

5. **[Memory Operations](memory_operations/)** ⭐⭐⭐  
   *2 hours*  
   Load, store, and memory safety verification.

6. **[Tables and References](tables_and_references/)** ⭐⭐⭐  
   *2 hours*  
   Indirect calls and reference types.

## 🛠️ What You'll Build

By completing these tutorials, you'll:
- ✅ Understand WebAssembly execution model
- ✅ Read and write K Framework semantics
- ✅ Trace program execution step-by-step
- ✅ Verify safety properties
- ✅ Debug WebAssembly programs

## 🚀 Quick Start

### Option 1: Interactive Web Interface

Simply open any tutorial directory and click on the HTML files:
```bash
cd hello_wasm_semantics
open tutorial.md  # Read the guide
open semantics_trace.html  # Watch execution
```

### Option 2: Command Line

Run examples using the K Framework:
```bash
# From repository root
./kwasm run demos/formal_semantics_explorer/assets/wasm_examples/basic/hello.wat

# With visualization
./kwasm run --output pretty hello.wat
```

## 📖 Tutorial Format

Each tutorial follows this structure:

```
tutorial_name/
├── tutorial.md              # Main guide
├── example.wat              # WebAssembly code
├── semantics_trace.html     # Interactive execution viewer
├── interactive_stepper.html # Step-by-step debugger
└── exercises.md             # Practice problems
```

## 💡 Learning Tips

1. **Read First**: Understand concepts before running code
2. **Experiment**: Modify examples to see what happens
3. **Step Through**: Use interactive stepper to understand execution
4. **Do Exercises**: Practice solidifies learning
5. **Ask Questions**: Open issues or discussions on GitHub

## 🎯 Prerequisites

**Required Knowledge:**
- Basic programming concepts
- Understanding of stack data structure
- Willingness to learn!

**Optional (Helpful):**
- Assembly language experience
- Compiler knowledge
- Formal methods background

**No prior K Framework experience needed!**

## 🔗 Related Resources

- [Introduction Section](../01_introduction/) - Background on formal semantics
- [Visualization Gallery](../03_visualization_gallery/) - See more examples
- [K Framework Deep Dive](../05_k_framework_deep_dive/) - Advanced K topics
- [Interactive Playground](../06_interactive_playground/) - Experiment freely

## 📊 Tutorial Difficulty Guide

- ⭐ **Beginner**: Basic concepts, simple examples
- ⭐⭐ **Intermediate**: Multiple concepts, longer examples
- ⭐⭐⭐ **Advanced**: Complex interactions, verification
- ⭐⭐⭐⭐ **Expert**: Full case studies, proofs
- ⭐⭐⭐⭐⭐ **Research**: Cutting-edge topics

## 🏆 Completion Checklist

Track your progress:

- [ ] Completed Hello WebAssembly Semantics
- [ ] Completed Arithmetic Operations
- [ ] Completed Control Flow
- [ ] Completed Function Calls
- [ ] Completed Memory Operations
- [ ] Completed Tables and References
- [ ] All exercises solved
- [ ] Built custom example
- [ ] Verified a property

## 🎮 Interactive Features

### Execution Visualizer
Watch programs execute with:
- Animated stack operations
- Memory state display
- Step-by-step controls
- Speed adjustment

### Semantic Rule Browser
Explore K rules:
- Search by instruction
- Filter by category
- View rule application
- See side conditions

### Configuration Inspector
Examine execution state:
- Current instruction
- Stack contents
- Memory layout
- Local/global variables

## 🐛 Troubleshooting

**Issue**: Interactive HTML files don't work  
**Solution**: Serve via HTTP: `make serve` or `python3 -m http.server`

**Issue**: Can't find K Framework  
**Solution**: Follow [build instructions](../10_community_resources/build_instructions.md)

**Issue**: Examples don't run  
**Solution**: Check you're in the correct directory and K is installed

## 💬 Get Help

- **GitHub Issues**: Report bugs or unclear documentation
- **Discussions**: Ask questions, share ideas
- **Slack**: Real-time help in K Framework Slack

## 🌟 What's Next?

After completing tutorials:
1. Try [Verification Case Studies](../04_verification_case_studies/)
2. Explore [Advanced Topics](../08_advanced_topics/)
3. Build your own semantics
4. Contribute back!

---

<div align="center">

**[← Back to Home](../README.md)** | **[Start Learning →](hello_wasm_semantics/)**

*Happy Learning! 🔬📚*

</div>
