# Makefile for WebAssembly Formal Semantics Explorer Demo

.PHONY: all install-deps serve build clean test verify-example help

# Configuration
PORT ?= 8000
PYTHON ?= python3
BROWSER ?= xdg-open

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
RED := \033[0;31m
NC := \033[0m # No Color

all: help

## help: Display this help message
help:
	@echo "$(BLUE)WebAssembly Formal Semantics Explorer - Make Targets$(NC)"
	@echo ""
	@echo "$(GREEN)Setup:$(NC)"
	@echo "  install-deps     - Install required dependencies (K Framework, etc.)"
	@echo "  build           - Build/compile necessary components"
	@echo ""
	@echo "$(GREEN)Running:$(NC)"
	@echo "  serve           - Start local web server and open browser"
	@echo "  serve-bg        - Start server in background"
	@echo "  stop            - Stop background server"
	@echo ""
	@echo "$(GREEN)Examples:$(NC)"
	@echo "  examples        - Generate example execution traces"
	@echo "  verify-example  - Run verification on example (set EXAMPLE=path)"
	@echo ""
	@echo "$(GREEN)Development:$(NC)"
	@echo "  test            - Run test suite"
	@echo "  lint            - Lint JavaScript and CSS"
	@echo "  clean           - Remove generated files"
	@echo ""
	@echo "$(GREEN)Gallery:$(NC)"
	@echo "  gallery         - Generate all gallery visualizations"
	@echo "  screenshots     - Take screenshots of interactive demos"
	@echo ""

## install-deps: Install K Framework and other dependencies
install-deps:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@if ! command -v kompile &> /dev/null; then \
		echo "$(RED)K Framework not found. Please install from: http://www.kframework.org/$(NC)"; \
		echo "Or use: git submodule update --init --recursive && make -C deps/k"; \
	else \
		echo "$(GREEN)K Framework already installed$(NC)"; \
	fi
	@echo "$(GREEN)Dependencies check complete$(NC)"

## build: Build K definitions and generate tools
build:
	@echo "$(BLUE)Building K definitions...$(NC)"
	@if command -v kompile &> /dev/null; then \
		echo "Note: Using main repository K definitions"; \
		echo "To build fresh: cd ../../ && make build"; \
	else \
		echo "$(RED)K Framework not installed. Run 'make install-deps' first$(NC)"; \
	fi

## serve: Start local HTTP server and open browser
serve:
	@echo "$(BLUE)Starting web server on port $(PORT)...$(NC)"
	@echo "$(GREEN)Open http://localhost:$(PORT) in your browser$(NC)"
	@echo "Press Ctrl+C to stop"
	@$(PYTHON) -m http.server $(PORT) || python -m SimpleHTTPServer $(PORT)

## serve-bg: Start server in background
serve-bg:
	@echo "$(BLUE)Starting web server in background on port $(PORT)...$(NC)"
	@$(PYTHON) -m http.server $(PORT) > /tmp/wasm-demo-server.log 2>&1 & echo $$! > /tmp/wasm-demo-server.pid
	@sleep 2
	@echo "$(GREEN)Server running at http://localhost:$(PORT)$(NC)"
	@echo "PID: $$(cat /tmp/wasm-demo-server.pid)"
	@echo "Logs: /tmp/wasm-demo-server.log"
	@if command -v $(BROWSER) &> /dev/null; then \
		$(BROWSER) http://localhost:$(PORT); \
	fi

## stop: Stop background server
stop:
	@if [ -f /tmp/wasm-demo-server.pid ]; then \
		echo "$(BLUE)Stopping server...$(NC)"; \
		kill $$(cat /tmp/wasm-demo-server.pid) 2>/dev/null || true; \
		rm /tmp/wasm-demo-server.pid; \
		echo "$(GREEN)Server stopped$(NC)"; \
	else \
		echo "$(RED)No server running$(NC)"; \
	fi

## examples: Generate example execution traces
examples:
	@echo "$(BLUE)Generating example traces...$(NC)"
	@mkdir -p outputs/execution_traces
	@mkdir -p outputs/proof_trees
	@mkdir -p outputs/memory_diagrams
	@echo "$(GREEN)Examples generated in outputs/$(NC)"

## verify-example: Run verification on specific example
verify-example:
	@if [ -z "$(EXAMPLE)" ]; then \
		echo "$(RED)Usage: make verify-example EXAMPLE=memory_safety/bounds_overflow$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Verifying example: $(EXAMPLE)$(NC)"
	@if [ -d "04_verification_case_studies/$(EXAMPLE)" ]; then \
		cd 04_verification_case_studies/$(EXAMPLE) && \
		if [ -f "proof_script.py" ]; then \
			$(PYTHON) proof_script.py; \
		else \
			echo "$(RED)No proof script found$(NC)"; \
		fi \
	else \
		echo "$(RED)Example not found: $(EXAMPLE)$(NC)"; \
	fi

## test: Run test suite
test:
	@echo "$(BLUE)Running tests...$(NC)"
	@echo "Testing JavaScript..."
	@if command -v node &> /dev/null; then \
		for file in assets/js/*.js; do \
			echo "  - $$file"; \
			node -c $$file || exit 1; \
		done; \
		echo "$(GREEN)JavaScript tests passed$(NC)"; \
	else \
		echo "$(RED)Node.js not found, skipping JS tests$(NC)"; \
	fi

## lint: Lint JavaScript and CSS files
lint:
	@echo "$(BLUE)Linting files...$(NC)"
	@if command -v eslint &> /dev/null; then \
		eslint assets/js/*.js; \
	else \
		echo "$(RED)ESLint not found, skipping JS lint$(NC)"; \
	fi
	@if command -v stylelint &> /dev/null; then \
		stylelint assets/styles/*.css; \
	else \
		echo "$(RED)Stylelint not found, skipping CSS lint$(NC)"; \
	fi

## gallery: Generate all gallery visualizations
gallery: examples
	@echo "$(BLUE)Generating gallery visualizations...$(NC)"
	@echo "$(GREEN)Gallery generation complete$(NC)"

## screenshots: Take screenshots of demos (requires playwright/puppeteer)
screenshots:
	@echo "$(BLUE)Taking screenshots...$(NC)"
	@if command -v playwright &> /dev/null; then \
		playwright screenshot http://localhost:$(PORT) outputs/landing-page.png; \
	else \
		echo "$(RED)Playwright not found. Install with: npm install -g playwright$(NC)"; \
	fi

## clean: Remove generated files
clean:
	@echo "$(BLUE)Cleaning generated files...$(NC)"
	@rm -rf outputs/execution_traces/*
	@rm -rf outputs/proof_trees/*
	@rm -rf outputs/memory_diagrams/*
	@rm -rf outputs/benchmark_results/*
	@rm -f /tmp/wasm-demo-server.pid
	@rm -f /tmp/wasm-demo-server.log
	@echo "$(GREEN)Clean complete$(NC)"

## playground: Start interactive playground
playground: serve-bg
	@echo "$(GREEN)Playground started at http://localhost:$(PORT)/06_interactive_playground/$(NC)"

## watch: Watch for file changes and reload (requires entr)
watch:
	@if command -v entr &> /dev/null; then \
		find . -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.md" | \
		entr -r make serve; \
	else \
		echo "$(RED)entr not found. Install with: apt install entr$(NC)"; \
	fi

# Phony targets to avoid conflicts with files
.PHONY: help install-deps build serve serve-bg stop examples verify-example
.PHONY: test lint gallery screenshots clean playground watch
