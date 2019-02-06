# Settings
# --------

build_dir:=$(CURDIR)/.build
defn_dir:=$(build_dir)/defn
k_submodule:=$(build_dir)/k
pandoc_tangle_submodule:=$(build_dir)/pandoc-tangle
k_bin:=$(k_submodule)/k-distribution/target/release/k/bin
tangler:=$(pandoc_tangle_submodule)/tangle.lua

LUA_PATH=$(pandoc_tangle_submodule)/?.lua;;
export LUA_PATH

.PHONY: deps ocaml-deps \
        build build-wasm build-test \
        defn defn-wasm defn-test \
        test test-simple \
        media

all: build

clean:
	rm -rf $(build_dir)

# Build Dependencies (K Submodule)
# --------------------------------

deps: $(k_submodule)/make.timestamp $(pandoc_tangle_submodule)/make.timestamp ocaml-deps

$(k_submodule)/make.timestamp:
	git submodule update --init -- $(k_submodule)
	cd $(k_submodule) \
	    && mvn package -q -DskipTests -Dllvm.backend.skip
	touch $(k_submodule)/make.timestamp

$(pandoc_tangle_submodule)/make.timestamp:
	git submodule update --init -- $(pandoc_tangle_submodule)
	touch $(pandoc_tangle_submodule)/make.timestamp

ocaml-deps:
	eval $$(opam config env) \
	    opam install --yes mlgmp zarith uuidm

# Building Definition
# -------------------

# Tangle definition from *.md files

defn: defn-wasm defn-test
defn-wasm: $(defn_wasm_files)
defn-test: $(defn_test_files)

wasm_dir:=$(defn_dir)/wasm
test_dir:=$(defn_dir)/test

wasm_files:=wasm.k data.k
test_files:=test.k $(wasm_files)

defn_wasm_files:=$(patsubst %, $(wasm_dir)/%, $(wasm_files))
defn_test_files:=$(patsubst %, $(test_dir)/%, $(test_files))

$(wasm_dir)/%.k: %.md $(pandoc_tangle_submodule)/make.timestamp
	@echo "==  tangle: $@"
	mkdir -p $(dir $@)
	pandoc --from markdown --to $(tangler) --metadata=code:.k $< > $@

$(test_dir)/%.k: %.md $(pandoc_tangle_submodule)/make.timestamp
	@echo "==  tangle: $@"
	mkdir -p $(dir $@)
	pandoc --from markdown --to $(tangler) --metadata=code:.k $< > $@

# OCAML Backend

build: build-wasm build-test
build-wasm: $(wasm_dir)/wasm-kompiled/interpreter
build-test: $(test_dir)/test-kompiled/interpreter

$(wasm_dir)/wasm-kompiled/interpreter: $(defn_wasm_files)
	@echo "== kompile: $@"
	eval $$(opam config env) \
	    $(k_bin)/kompile --backend ocaml --directory $(wasm_dir) --main-module WASM --syntax-module WASM $<

$(test_dir)/test-kompiled/interpreter: $(defn_test_files)
	@echo "== kompile: $@"
	eval $$(opam config env) \
	    $(k_bin)/kompile --backend ocaml --directory $(test_dir) --main-module WASM-TEST --syntax-module WASM-TEST $<

# Testing
# -------

TEST=./kwasm test

tests/%.test: tests/%
	$(TEST) $<

test: test-simple

### Simple Tests

simple_tests:=$(wildcard tests/simple/*.wast)

test-simple: $(simple_tests:=.test)

# Presentation
# ------------

media: media/201803-ethcc/presentation.pdf

media/%/presentation.pdf: media/%/presentation.md
	cd media/$* \
		&& pandoc --from markdown --to beamer --output presentation.pdf presentation.md
