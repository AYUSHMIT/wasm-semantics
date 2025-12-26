// State Inspector
// Inspects and displays WebAssembly execution state

class StateInspector {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = null;
    }

    // Load execution state
    loadState(state) {
        this.state = state;
        this.render();
    }

    // Render complete state
    render() {
        if (!this.container || !this.state) return;

        const html = `
            <div class="state-inspector">
                <div class="state-tabs">
                    <button class="state-tab active" data-tab="stack">Stack</button>
                    <button class="state-tab" data-tab="memory">Memory</button>
                    <button class="state-tab" data-tab="locals">Locals</button>
                    <button class="state-tab" data-tab="globals">Globals</button>
                    <button class="state-tab" data-tab="tables">Tables</button>
                </div>
                
                <div class="state-content active" data-tab="stack">
                    ${this.renderStack()}
                </div>
                
                <div class="state-content" data-tab="memory">
                    ${this.renderMemory()}
                </div>
                
                <div class="state-content" data-tab="locals">
                    ${this.renderLocals()}
                </div>
                
                <div class="state-content" data-tab="globals">
                    ${this.renderGlobals()}
                </div>
                
                <div class="state-content" data-tab="tables">
                    ${this.renderTables()}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    // Render stack view
    renderStack() {
        if (!this.state.stack || this.state.stack.length === 0) {
            return '<div class="empty-state">Stack is empty</div>';
        }

        return `
            <div class="stack-view">
                <table class="state-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.state.stack.map((item, index) => `
                            <tr>
                                <td>${index}</td>
                                <td><span class="type-badge type-${item.type}">${item.type}</span></td>
                                <td><code>${this.formatValue(item.value, item.type)}</code></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Render memory view
    renderMemory() {
        const memory = this.state.memory || [];
        const pageSize = 64 * 1024; // 64KB pages
        const numPages = Math.ceil(memory.length / pageSize);

        return `
            <div class="memory-view">
                <div class="memory-controls">
                    <label>Page: 
                        <select id="memory-page-select">
                            ${Array.from({length: numPages}, (_, i) => 
                                `<option value="${i}">Page ${i}</option>`
                            ).join('')}
                        </select>
                    </label>
                    <label>Address: 
                        <input type="text" id="memory-address" placeholder="0x0000">
                    </label>
                    <button onclick="inspectMemoryAddress()">Go</button>
                </div>
                <div class="memory-hex" id="memory-hex">
                    ${this.renderMemoryPage(0)}
                </div>
            </div>
        `;
    }

    // Render memory page
    renderMemoryPage(pageNum) {
        const memory = this.state.memory || [];
        const pageSize = 64 * 1024;
        const start = pageNum * pageSize;
        const end = Math.min(start + 256, memory.length); // Show 256 bytes

        let html = '<div class="hex-dump">';
        
        for (let addr = start; addr < end; addr += 16) {
            html += `<div class="hex-line">`;
            html += `<span class="hex-address">${this.formatHex(addr, 8)}:</span>`;
            
            // Hex values
            html += '<span class="hex-bytes">';
            for (let i = 0; i < 16; i++) {
                if (addr + i < end) {
                    const byte = memory[addr + i] || 0;
                    html += `<span class="hex-byte">${this.formatHex(byte, 2)}</span>`;
                } else {
                    html += '<span class="hex-byte">  </span>';
                }
            }
            html += '</span>';
            
            // ASCII representation
            html += '<span class="hex-ascii">';
            for (let i = 0; i < 16; i++) {
                if (addr + i < end) {
                    const byte = memory[addr + i] || 0;
                    html += this.byteToAscii(byte);
                }
            }
            html += '</span>';
            
            html += '</div>';
        }
        
        html += '</div>';
        return html;
    }

    // Render locals view
    renderLocals() {
        if (!this.state.locals || this.state.locals.length === 0) {
            return '<div class="empty-state">No local variables</div>';
        }

        return `
            <div class="locals-view">
                <table class="state-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.state.locals.map((local, index) => `
                            <tr>
                                <td>${index}</td>
                                <td>${local.name || '-'}</td>
                                <td><span class="type-badge type-${local.type}">${local.type}</span></td>
                                <td><code>${this.formatValue(local.value, local.type)}</code></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Render globals view
    renderGlobals() {
        if (!this.state.globals || this.state.globals.length === 0) {
            return '<div class="empty-state">No global variables</div>';
        }

        return `
            <div class="globals-view">
                <table class="state-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Mutable</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.state.globals.map((global, index) => `
                            <tr>
                                <td>${index}</td>
                                <td>${global.name || '-'}</td>
                                <td><span class="type-badge type-${global.type}">${global.type}</span></td>
                                <td>${global.mutable ? '✓' : '✗'}</td>
                                <td><code>${this.formatValue(global.value, global.type)}</code></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Render tables view
    renderTables() {
        if (!this.state.tables || this.state.tables.length === 0) {
            return '<div class="empty-state">No tables</div>';
        }

        return `
            <div class="tables-view">
                ${this.state.tables.map((table, index) => `
                    <div class="table-section">
                        <h4>Table ${index}</h4>
                        <p>Type: ${table.type}, Size: ${table.elements.length}</p>
                        <table class="state-table">
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${table.elements.map((elem, i) => `
                                    <tr>
                                        <td>${i}</td>
                                        <td><code>${elem || 'null'}</code></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Attach event listeners
    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.state-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.state-tab').forEach(t => 
                    t.classList.remove('active')
                );
                e.target.classList.add('active');
                
                // Update active content
                document.querySelectorAll('.state-content').forEach(c => 
                    c.classList.remove('active')
                );
                document.querySelector(`.state-content[data-tab="${tabName}"]`)
                    .classList.add('active');
            });
        });

        // Memory page selection
        const pageSelect = document.getElementById('memory-page-select');
        if (pageSelect) {
            pageSelect.addEventListener('change', (e) => {
                const pageNum = parseInt(e.target.value);
                document.getElementById('memory-hex').innerHTML = 
                    this.renderMemoryPage(pageNum);
            });
        }
    }

    // Format value based on type
    formatValue(value, type) {
        switch (type) {
            case 'i32':
            case 'i64':
                return `${value} (0x${value.toString(16).toUpperCase()})`;
            case 'f32':
            case 'f64':
                return value.toFixed(6);
            default:
                return String(value);
        }
    }

    // Format hex number
    formatHex(num, width) {
        return num.toString(16).toUpperCase().padStart(width, '0');
    }

    // Convert byte to ASCII
    byteToAscii(byte) {
        return (byte >= 32 && byte <= 126) 
            ? String.fromCharCode(byte) 
            : '.';
    }

    // Export state to JSON
    exportState() {
        return JSON.stringify(this.state, null, 2);
    }

    // Load sample state
    loadSampleState() {
        this.state = {
            stack: [
                { type: 'i32', value: 42 },
                { type: 'i32', value: 10 },
                { type: 'f64', value: 3.14159 }
            ],
            memory: new Array(1024).fill(0).map((_, i) => i % 256),
            locals: [
                { name: 'x', type: 'i32', value: 100 },
                { name: 'y', type: 'f64', value: 2.71828 }
            ],
            globals: [
                { name: 'counter', type: 'i32', mutable: true, value: 0 },
                { name: 'PI', type: 'f64', mutable: false, value: 3.14159 }
            ],
            tables: [
                {
                    type: 'funcref',
                    elements: ['func_0', 'func_1', 'func_2', null]
                }
            ]
        };
        this.render();
    }
}

// Global helper function
function inspectMemoryAddress() {
    const input = document.getElementById('memory-address');
    if (input) {
        const address = parseInt(input.value, 16);
        // Scroll to address in memory view
        console.log('Inspecting address:', address);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StateInspector;
}
