# Build Instructions

## Quick Start (Docker)

The easiest way to get started is using Docker:

```bash
# Pull the image
docker pull ghcr.io/ayushmit/wasm-semantics:latest

# Run the demo
docker run -p 8000:8000 ghcr.io/ayushmit/wasm-semantics:latest

# Open browser to http://localhost:8000/demos/formal_semantics_explorer
```

## Local Installation

### Prerequisites

#### Required
- **K Framework 5.0+**: [Installation guide](http://www.kframework.org/)
- **Python 3.8+**: For web server
- **Git**: For cloning repository

#### Optional
- **Node.js 16+**: For JavaScript linting
- **Pandoc 2.0+**: For generating documentation
- **Z3 4.8.15**: For symbolic execution

### Step 1: Install K Framework

**Using Kup (recommended):**
```bash
bash <(curl https://kframework.org/install)
kup install k
kup list
```

**From source:**
```bash
git clone https://github.com/kframework/k.git
cd k
mvn package -DskipTests
export PATH=$PATH:$(pwd)/k-distribution/target/release/k/bin
```

**Verify installation:**
```bash
kompile --version
# Should show: K version 5.x.x
```

### Step 2: Clone Repository

```bash
git clone https://github.com/AYUSHMIT/wasm-semantics.git
cd wasm-semantics
```

### Step 3: Build K Semantics

```bash
# Build all backends
make build

# Or build specific backend
make build-llvm      # Concrete execution
make build-haskell   # Symbolic execution
```

This will:
- Parse K definition files
- Generate interpreters
- Create verification tools

**Expected output:**
```
Kompiling WASM...
[Info] Compiling definition...
[Info] Backend: llvm
[Success] Compilation complete
```

### Step 4: Install Dependencies

For the demo specifically:

```bash
cd demos/formal_semantics_explorer
make install-deps
```

This checks for:
- K Framework
- Python 3
- Optional tools

### Step 5: Test Installation

```bash
# Run a simple test
cd ../../
./kwasm run tests/simple/arithmetic.wast

# Run demo server
cd demos/formal_semantics_explorer
make serve
```

Open http://localhost:8000 in your browser.

## Platform-Specific Instructions

### Ubuntu/Debian

```bash
# Install system dependencies
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    cmake \
    clang llvm \
    maven openjdk-11-jdk \
    python3 python3-pip \
    git curl \
    libgmp-dev libmpfr-dev \
    flex bison \
    z3

# Install K Framework
bash <(curl https://kframework.org/install)
kup install k

# Clone and build
git clone https://github.com/AYUSHMIT/wasm-semantics.git
cd wasm-semantics
make build
```

### macOS

```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install \
    maven openjdk@11 \
    python3 \
    git curl \
    gmp mpfr \
    flex bison \
    z3

# Install K Framework
bash <(curl https://kframework.org/install)
kup install k

# Clone and build
git clone https://github.com/AYUSHMIT/wasm-semantics.git
cd wasm-semantics
make build
```

### Windows (WSL2)

Use Windows Subsystem for Linux:

```bash
# In PowerShell (as Administrator)
wsl --install

# After reboot, in WSL Ubuntu:
sudo apt-get update
sudo apt-get install -y build-essential git curl

# Follow Ubuntu instructions above
```

## Troubleshooting

### "kompile: command not found"

K Framework not in PATH. Add to `~/.bashrc`:

```bash
export PATH=$PATH:$HOME/.kup/bin
source ~/.bashrc
```

### "Z3 version mismatch"

Install specific Z3 version:

```bash
wget https://github.com/Z3Prover/z3/releases/download/z3-4.8.15/z3-4.8.15-x64-ubuntu-18.04.zip
unzip z3-4.8.15-x64-ubuntu-18.04.zip
sudo cp z3-4.8.15-x64-ubuntu-18.04/bin/z3 /usr/local/bin/
z3 --version  # Should show 4.8.15
```

### "Out of memory during kompile"

Increase Java heap size:

```bash
export K_OPTS="-Xmx8G -Xss512m"
make build
```

### Port 8000 already in use

Use different port:

```bash
make serve PORT=8080
```

## Building Documentation

Generate HTML docs from Markdown:

```bash
# Install Pandoc
sudo apt-get install pandoc

# Generate docs
make docs
```

## Running Tests

```bash
# Full test suite
make test

# Specific tests
make test-simple          # Simple execution tests
make test-conformance     # WebAssembly spec conformance
make test-prove           # Verification tests
```

## Development Setup

### JavaScript Linting

```bash
npm install -g eslint
cd demos/formal_semantics_explorer
make lint
```

### CSS Linting

```bash
npm install -g stylelint stylelint-config-standard
make lint
```

### Live Reload

```bash
# Install entr
sudo apt-get install entr

# Auto-reload on changes
make watch
```

## Performance Optimization

### Kompile Options

```bash
# Faster compilation (less optimization)
KOMPILE_OPTS="--enable-llvm-debug" make build-llvm

# More optimization (slower compile, faster run)
KOMPILE_OPTS="-O3" make build-llvm
```

### Parallel Build

```bash
# Use multiple cores
make -j4 build
```

## Verification Setup

For running proofs:

```bash
# Install Haskell Stack
curl -sSL https://get.haskellstack.org/ | sh

# Build Haskell backend
make build-haskell

# Run verification
./kwasm prove tests/proofs/simple-arithmetic-spec.k kwasm-lemmas
```

## Docker Build

Build your own Docker image:

```bash
docker build -t wasm-semantics .
docker run -p 8000:8000 wasm-semantics
```

## Continuous Integration

GitHub Actions workflow (`.github/workflows/test-pr.yml`):

```yaml
- name: Install K
  run: bash <(curl https://kframework.org/install)
  
- name: Build
  run: make build
  
- name: Test
  run: make test
```

## Next Steps

- [Troubleshooting Guide](troubleshooting.md) - Common issues
- [Testing Framework](testing_framework.md) - Writing tests
- [Contribution Guide](contribution_guide.md) - How to contribute

---

<div align="center">

**[Back to Home](../README.md)** | **[Get Help](troubleshooting.md)**

</div>
