// WebAssembly Visualizer
// Handles visual execution traces and stack animations

class WasmVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.executionTrace = [];
        this.currentStep = 0;
        this.stack = [];
        this.memory = new Array(65536).fill(0);
        this.animationSpeed = 500; // ms
        this.isPlaying = false;
    }

    // Load execution trace from data
    loadTrace(trace) {
        this.executionTrace = trace;
        this.currentStep = 0;
        this.reset();
    }

    // Reset visualizer state
    reset() {
        this.stack = [];
        this.memory = new Array(65536).fill(0);
        this.currentStep = 0;
        this.isPlaying = false;
        this.render();
    }

    // Execute next step
    step() {
        if (this.currentStep >= this.executionTrace.length) {
            this.isPlaying = false;
            return false;
        }

        const instruction = this.executionTrace[this.currentStep];
        this.executeInstruction(instruction);
        this.currentStep++;
        this.render();
        return true;
    }

    // Step backward
    stepBack() {
        if (this.currentStep <= 0) return false;
        
        this.currentStep--;
        this.replayToCurrentStep();
        this.render();
        return true;
    }

    // Play animation
    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.animate();
    }

    // Pause animation
    pause() {
        this.isPlaying = false;
    }

    // Animation loop
    animate() {
        if (!this.isPlaying) return;
        
        const hasNext = this.step();
        if (hasNext) {
            setTimeout(() => this.animate(), this.animationSpeed);
        } else {
            this.isPlaying = false;
        }
    }

    // Replay execution to current step
    replayToCurrentStep() {
        this.stack = [];
        this.memory = new Array(65536).fill(0);
        
        for (let i = 0; i < this.currentStep; i++) {
            this.executeInstruction(this.executionTrace[i]);
        }
    }

    // Execute a single instruction
    executeInstruction(instruction) {
        const { opcode, args } = instruction;

        switch (opcode) {
            case 'i32.const':
                this.stack.push({ type: 'i32', value: args[0] });
                break;
            case 'i64.const':
                this.stack.push({ type: 'i64', value: args[0] });
                break;
            case 'f32.const':
                this.stack.push({ type: 'f32', value: args[0] });
                break;
            case 'f64.const':
                this.stack.push({ type: 'f64', value: args[0] });
                break;
            case 'i32.add':
                this.binaryOp((a, b) => a + b);
                break;
            case 'i32.sub':
                this.binaryOp((a, b) => a - b);
                break;
            case 'i32.mul':
                this.binaryOp((a, b) => a * b);
                break;
            case 'i32.div_s':
                this.binaryOp((a, b) => Math.floor(a / b));
                break;
            case 'i32.load':
                this.memoryLoad(args[0], 4);
                break;
            case 'i32.store':
                this.memoryStore(args[0], 4);
                break;
            default:
                console.warn(`Unhandled instruction: ${opcode}`);
        }
    }

    // Binary operation helper
    binaryOp(op) {
        if (this.stack.length < 2) return;
        const b = this.stack.pop();
        const a = this.stack.pop();
        const result = op(a.value, b.value);
        this.stack.push({ type: a.type, value: result });
    }

    // Memory load operation
    memoryLoad(offset, bytes) {
        if (this.stack.length < 1) return;
        const addr = this.stack.pop().value + offset;
        let value = 0;
        for (let i = 0; i < bytes; i++) {
            value |= (this.memory[addr + i] << (i * 8));
        }
        this.stack.push({ type: 'i32', value });
    }

    // Memory store operation
    memoryStore(offset, bytes) {
        if (this.stack.length < 2) return;
        const value = this.stack.pop().value;
        const addr = this.stack.pop().value + offset;
        for (let i = 0; i < bytes; i++) {
            this.memory[addr + i] = (value >> (i * 8)) & 0xFF;
        }
    }

    // Render current state
    render() {
        if (!this.ctx) return;

        const width = this.canvas.width;
        const height = this.canvas.height;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw stack
        this.drawStack(50, 50, 150, height - 100);

        // Draw current instruction
        this.drawCurrentInstruction(250, 50);

        // Draw step counter
        this.drawStepCounter(250, 100);
    }

    // Draw stack visualization
    drawStack(x, y, width, height) {
        if (!this.ctx) return;

        // Draw stack frame
        this.ctx.strokeStyle = '#0066cc';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);

        // Draw stack label
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 16px Inter';
        this.ctx.fillText('Stack', x, y - 10);

        // Draw stack items
        const itemHeight = 40;
        const itemMargin = 5;
        
        this.stack.forEach((item, index) => {
            const itemY = y + height - (index + 1) * (itemHeight + itemMargin);
            
            // Draw item background
            this.ctx.fillStyle = this.getTypeColor(item.type);
            this.ctx.fillRect(x + 5, itemY, width - 10, itemHeight);

            // Draw item text
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '14px Fira Code';
            this.ctx.fillText(
                `${item.type}: ${item.value}`,
                x + 10,
                itemY + 25
            );
        });
    }

    // Draw current instruction
    drawCurrentInstruction(x, y) {
        if (!this.ctx || this.currentStep >= this.executionTrace.length) return;

        const instruction = this.executionTrace[this.currentStep];
        
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 16px Inter';
        this.ctx.fillText('Current Instruction:', x, y);

        this.ctx.font = '14px Fira Code';
        this.ctx.fillStyle = '#0066cc';
        this.ctx.fillText(
            `${instruction.opcode} ${instruction.args.join(', ')}`,
            x,
            y + 30
        );
    }

    // Draw step counter
    drawStepCounter(x, y) {
        if (!this.ctx) return;

        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '14px Inter';
        this.ctx.fillText(
            `Step ${this.currentStep} / ${this.executionTrace.length}`,
            x,
            y
        );
    }

    // Get color for value type
    getTypeColor(type) {
        const colors = {
            'i32': '#4fc1ff',
            'i64': '#4fc1ff',
            'f32': '#b5cea8',
            'f64': '#b5cea8',
            'funcref': '#ce9178',
            'externref': '#ce9178'
        };
        return colors[type] || '#808080';
    }

    // Set animation speed
    setSpeed(speed) {
        this.animationSpeed = speed;
    }

    // Export current state
    exportState() {
        return {
            step: this.currentStep,
            stack: [...this.stack],
            memory: [...this.memory]
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WasmVisualizer;
}
