#!/usr/bin/env python3
"""
Simple test script for the Formal Semantics Explorer demo.
Tests that all critical files exist and are accessible.
"""

import os
import sys
from pathlib import Path

# Colors for output
GREEN = '\033[92m'
RED = '\033[91m'
BLUE = '\033[94m'
RESET = '\033[0m'

def test_file_exists(path, description):
    """Test if a file exists."""
    if os.path.exists(path):
        print(f"{GREEN}✓{RESET} {description}: {path}")
        return True
    else:
        print(f"{RED}✗{RESET} {description}: {path} (NOT FOUND)")
        return False

def test_directory_exists(path, description):
    """Test if a directory exists."""
    if os.path.isdir(path):
        print(f"{GREEN}✓{RESET} {description}: {path}")
        return True
    else:
        print(f"{RED}✗{RESET} {description}: {path} (NOT FOUND)")
        return False

def main():
    """Run all tests."""
    print(f"\n{BLUE}Testing Formal Semantics Explorer Demo{RESET}\n")
    
    tests_passed = 0
    tests_total = 0
    
    # Test core files
    print(f"{BLUE}Core Files:{RESET}")
    core_files = [
        ("README.md", "Main README"),
        ("index.html", "Landing page"),
        ("Makefile", "Build system"),
        (".gitignore", "Git ignore file"),
    ]
    
    for filename, desc in core_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test CSS files
    print(f"\n{BLUE}CSS Files:{RESET}")
    css_files = [
        ("assets/styles/formal_methods.css", "Formal methods styles"),
        ("assets/styles/wasm_syntax_highlight.css", "Syntax highlighting"),
        ("assets/styles/interactive.css", "Interactive elements"),
    ]
    
    for filename, desc in css_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test JavaScript files
    print(f"\n{BLUE}JavaScript Files:{RESET}")
    js_files = [
        ("assets/js/wasm_visualizer.js", "WASM visualizer"),
        ("assets/js/k_semantics_renderer.js", "K semantics renderer"),
        ("assets/js/state_inspector.js", "State inspector"),
        ("assets/js/proof_tree_builder.js", "Proof tree builder"),
    ]
    
    for filename, desc in js_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test images
    print(f"\n{BLUE}Image Files:{RESET}")
    image_files = [
        ("assets/images/k_framework_logo.svg", "K Framework logo"),
        ("assets/images/wasm_architecture.svg", "WASM architecture"),
        ("assets/images/semantics_workflow.svg", "Semantics workflow"),
    ]
    
    for filename, desc in image_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test WebAssembly examples
    print(f"\n{BLUE}WebAssembly Examples:{RESET}")
    wasm_files = [
        ("assets/wasm_examples/basic/hello.wat", "Hello example"),
        ("assets/wasm_examples/basic/arithmetic.wat", "Arithmetic example"),
        ("assets/wasm_examples/basic/control_flow.wat", "Control flow example"),
        ("assets/wasm_examples/intermediate/functions.wat", "Functions example"),
    ]
    
    for filename, desc in wasm_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test introduction docs
    print(f"\n{BLUE}Introduction Documentation:{RESET}")
    intro_files = [
        ("01_introduction/00_what_is_formal_semantics.md", "Formal semantics intro"),
        ("01_introduction/01_k_framework_primer.md", "K Framework primer"),
        ("01_introduction/02_webassembly_overview.md", "WebAssembly overview"),
        ("01_introduction/03_why_verify_wasm.md", "Why verify"),
    ]
    
    for filename, desc in intro_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test tutorials
    print(f"\n{BLUE}Tutorial Files:{RESET}")
    tutorial_files = [
        ("02_interactive_tutorials/README.md", "Tutorials README"),
        ("02_interactive_tutorials/hello_wasm_semantics/tutorial.md", "Hello tutorial"),
    ]
    
    for filename, desc in tutorial_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test visualization gallery
    print(f"\n{BLUE}Visualization Gallery:{RESET}")
    viz_files = [
        ("03_visualization_gallery/README.md", "Gallery README"),
    ]
    
    for filename, desc in viz_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test community resources
    print(f"\n{BLUE}Community Resources:{RESET}")
    community_files = [
        ("10_community_resources/contribution_guide.md", "Contribution guide"),
        ("10_community_resources/build_instructions.md", "Build instructions"),
    ]
    
    for filename, desc in community_files:
        tests_total += 1
        if test_file_exists(filename, desc):
            tests_passed += 1
    
    # Test output directories
    print(f"\n{BLUE}Output Directories:{RESET}")
    output_dirs = [
        ("outputs/execution_traces", "Execution traces"),
        ("outputs/proof_trees", "Proof trees"),
        ("outputs/memory_diagrams", "Memory diagrams"),
        ("outputs/benchmark_results", "Benchmark results"),
    ]
    
    for dirname, desc in output_dirs:
        tests_total += 1
        if test_directory_exists(dirname, desc):
            tests_passed += 1
    
    # Summary
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}Test Summary:{RESET}")
    print(f"  Tests passed: {tests_passed}/{tests_total}")
    
    if tests_passed == tests_total:
        print(f"  {GREEN}All tests passed! ✓{RESET}")
        return 0
    else:
        print(f"  {RED}Some tests failed! ✗{RESET}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
