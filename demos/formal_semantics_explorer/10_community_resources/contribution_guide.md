# Contributing to WebAssembly Formal Semantics Explorer

Thank you for your interest in contributing to the WebAssembly Formal Semantics Explorer! This guide will help you get started.

## Ways to Contribute

### 1. Add New Tutorials
- Create step-by-step guides for WebAssembly features
- Include executable examples and visualizations
- Follow existing tutorial structure in `02_interactive_tutorials/`

### 2. Improve Visualizations
- Enhance existing JavaScript visualizers
- Create new visualization types (3D memory, proof trees, etc.)
- Optimize rendering performance

### 3. Add Verification Case Studies
- Prove new properties about WebAssembly
- Document real-world security issues
- Create interactive proof explorers

### 4. Extend K Semantics
- Cover additional WebAssembly proposals (SIMD, threads, GC)
- Add new semantic rules
- Improve existing rule documentation

### 5. Fix Bugs
- Report issues on GitHub
- Submit fixes with test cases
- Improve error messages

### 6. Documentation
- Fix typos and clarity issues
- Add more examples
- Translate to other languages

## Getting Started

### Prerequisites

```bash
# Required
- K Framework 5.0+
- Python 3.8+
- Git

# Optional (for development)
- Node.js (for linting)
- Pandoc (for documentation)
```

### Setup Development Environment

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/wasm-semantics.git
cd wasm-semantics

# 3. Add upstream remote
git remote add upstream https://github.com/runtimeverification/wasm-semantics.git

# 4. Create a branch
git checkout -b feature/my-contribution

# 5. Make changes

# 6. Test your changes
cd demos/formal_semantics_explorer
make test
make serve  # Test in browser
```

## Contribution Guidelines

### Code Style

**JavaScript:**
- Use ES6+ features
- Add JSDoc comments for functions
- Follow existing naming conventions
- Run linter: `make lint`

**CSS:**
- Use CSS variables for theming
- Mobile-first responsive design
- Follow BEM naming convention

**Markdown:**
- Use headers hierarchically
- Include code examples with syntax highlighting
- Add navigation links at bottom

**K Framework:**
- Follow [K Style Guide](https://github.com/kframework/k/wiki/Style-Guide)
- Document complex rules with comments
- Include test cases for new rules

### Commit Messages

Use conventional commit format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(tutorial): add memory operations tutorial

Add comprehensive tutorial covering:
- Load/store instructions
- Bounds checking
- Memory safety verification

Closes #123

fix(visualizer): correct stack rendering for f64 values

Stack visualizer was displaying f64 values incorrectly.
Fixed precision and added proper type coloring.

docs(readme): update installation instructions

Added Docker installation option and troubleshooting section.
```

### Pull Request Process

1. **Update documentation** if you changed APIs
2. **Add tests** for new functionality
3. **Run existing tests**: `make test`
4. **Update README.md** if needed
5. **Submit PR** with clear description

**PR Title Format:**
```
[Type] Brief description

Example:
[Feature] Add SIMD instruction tutorial
[Fix] Correct proof tree rendering bug
[Docs] Improve K Framework primer
```

**PR Description:**
- What does this PR do?
- Why is it needed?
- How to test?
- Screenshots (if UI changes)
- Related issues

### Code Review

Expect feedback on:
- Code quality and style
- Test coverage
- Documentation completeness
- Performance implications
- Compatibility with existing code

## Project Structure

```
demos/formal_semantics_explorer/
├── README.md                  # Main documentation
├── index.html                 # Landing page
├── Makefile                   # Build system
├── assets/                    # Static assets
│   ├── styles/               # CSS files
│   ├── js/                   # JavaScript modules
│   ├── images/               # Images and SVGs
│   └── wasm_examples/        # Example .wat files
├── 01_introduction/          # Getting started docs
├── 02_interactive_tutorials/ # Step-by-step tutorials
├── 03_visualization_gallery/ # Visual demos
├── 04_verification_case_studies/ # Formal proofs
├── 05_k_framework_deep_dive/ # K Framework docs
├── 06_interactive_playground/ # Online editor
├── 07_educational_narratives/ # Story-driven learning
├── 08_advanced_topics/       # Advanced features
├── 09_comparison_studies/    # Tool comparisons
└── 10_community_resources/   # This file!
```

## Testing

### Manual Testing
```bash
make serve
# Open browser and test interactively
```

### Automated Testing
```bash
make test           # Run all tests
make lint           # Check code style
make verify-example # Run verification
```

### Test Checklist
- [ ] All links work
- [ ] JavaScript has no errors (check console)
- [ ] Responsive design works on mobile
- [ ] Examples execute correctly
- [ ] Documentation is accurate

## Reporting Issues

### Bug Reports

Include:
1. **Title**: Brief, descriptive summary
2. **Description**: What happened vs. what you expected
3. **Steps to reproduce**
4. **Environment**: Browser, OS, K Framework version
5. **Screenshots** if applicable

### Feature Requests

Include:
1. **Use case**: Why is this needed?
2. **Proposed solution**: How should it work?
3. **Alternatives**: What else have you considered?
4. **Examples**: Similar features elsewhere?

## Community

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **K Framework Slack**: Real-time chat
- **Runtime Verification**: Professional support

## Recognition

Contributors are recognized in:
- README.md acknowledgments
- Git history
- Release notes

Significant contributors may be invited to become maintainers.

## License

By contributing, you agree that your contributions will be licensed under the UIUC License, same as the main project.

## Questions?

If you have questions about contributing:
- Open a GitHub Discussion
- Ask in K Framework Slack
- Email: contact@runtimeverification.com

Thank you for contributing to formal methods education! 🔬

---

**Last Updated**: 2025-01-26
