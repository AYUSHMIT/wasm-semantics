// K Semantics Renderer
// Renders K Framework rules and configurations

class KSemanticsRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.rules = [];
        this.currentConfig = null;
    }

    // Load K rules from data
    loadRules(rules) {
        this.rules = rules;
        this.renderRulesList();
    }

    // Render list of rules
    renderRulesList() {
        if (!this.container) return;

        const html = `
            <div class="k-rules-browser">
                <div class="k-rules-header">
                    <h3>K Semantic Rules</h3>
                    <input type="text" id="rule-search" placeholder="Search rules..." class="rule-search">
                </div>
                <div class="k-rules-filters">
                    <button class="filter-btn active" data-category="all">All</button>
                    <button class="filter-btn" data-category="arithmetic">Arithmetic</button>
                    <button class="filter-btn" data-category="control">Control</button>
                    <button class="filter-btn" data-category="memory">Memory</button>
                    <button class="filter-btn" data-category="function">Function</button>
                </div>
                <div class="k-rules-list" id="rules-list">
                    ${this.rules.map((rule, index) => this.renderRule(rule, index)).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    // Render individual rule
    renderRule(rule, index) {
        return `
            <div class="k-rule-item" data-index="${index}" data-category="${rule.category}">
                <div class="k-rule-header" onclick="toggleRule(${index})">
                    <h4>${rule.name}</h4>
                    <span class="k-rule-category">${rule.category}</span>
                </div>
                <div class="k-rule-body" id="rule-${index}" style="display: none;">
                    <div class="k-rule-section">
                        <strong>Left Side (Pattern):</strong>
                        <pre><code class="language-k">${this.escapeHtml(rule.lhs)}</code></pre>
                    </div>
                    <div class="k-rule-arrow">⇒</div>
                    <div class="k-rule-section">
                        <strong>Right Side (Result):</strong>
                        <pre><code class="language-k">${this.escapeHtml(rule.rhs)}</code></pre>
                    </div>
                    ${rule.requires ? `
                        <div class="k-rule-section">
                            <strong>Requires:</strong>
                            <pre><code class="language-k">${this.escapeHtml(rule.requires)}</code></pre>
                        </div>
                    ` : ''}
                    ${rule.ensures ? `
                        <div class="k-rule-section">
                            <strong>Ensures:</strong>
                            <pre><code class="language-k">${this.escapeHtml(rule.ensures)}</code></pre>
                        </div>
                    ` : ''}
                    <div class="k-rule-description">
                        <strong>Description:</strong>
                        <p>${rule.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Render K configuration
    renderConfiguration(config) {
        this.currentConfig = config;

        const html = `
            <div class="k-configuration">
                <h3>Configuration State</h3>
                <div class="k-config-tree">
                    ${this.renderCell(config, 'T')}
                </div>
            </div>
        `;

        if (this.container) {
            this.container.innerHTML = html;
        }
    }

    // Render configuration cell
    renderCell(cell, name) {
        if (typeof cell === 'string' || typeof cell === 'number') {
            return `
                <div class="k-cell-leaf">
                    <span class="k-cell-name">&lt;${name}&gt;</span>
                    <span class="k-cell-value">${this.escapeHtml(String(cell))}</span>
                </div>
            `;
        }

        if (Array.isArray(cell)) {
            return `
                <div class="k-cell-list">
                    <span class="k-cell-name">&lt;${name}&gt;</span>
                    <div class="k-cell-children">
                        ${cell.map((item, i) => this.renderCell(item, `item-${i}`)).join('')}
                    </div>
                </div>
            `;
        }

        if (typeof cell === 'object') {
            return `
                <div class="k-cell-map">
                    <span class="k-cell-name">&lt;${name}&gt;</span>
                    <div class="k-cell-children">
                        ${Object.entries(cell).map(([key, value]) => 
                            this.renderCell(value, key)
                        ).join('')}
                    </div>
                </div>
            `;
        }

        return '';
    }

    // Highlight rule application
    highlightRuleApplication(ruleIndex, config) {
        // Render the rule being applied
        const rule = this.rules[ruleIndex];
        
        const html = `
            <div class="k-rule-application">
                <h3>Applying Rule: ${rule.name}</h3>
                <div class="k-rule-viz">
                    <div class="k-before">
                        <h4>Before:</h4>
                        ${this.renderConfiguration(config.before)}
                    </div>
                    <div class="k-rule-arrow-big">⇓</div>
                    <div class="k-after">
                        <h4>After:</h4>
                        ${this.renderConfiguration(config.after)}
                    </div>
                </div>
                <div class="k-rule-details">
                    ${this.renderRule(rule, ruleIndex)}
                </div>
            </div>
        `;

        if (this.container) {
            this.container.innerHTML = html;
        }
    }

    // Attach event listeners
    attachEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('rule-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterRules(e.target.value);
            });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => 
                    b.classList.remove('active')
                );
                e.target.classList.add('active');
                this.filterByCategory(e.target.dataset.category);
            });
        });
    }

    // Filter rules by search term
    filterRules(searchTerm) {
        const term = searchTerm.toLowerCase();
        document.querySelectorAll('.k-rule-item').forEach(item => {
            const index = parseInt(item.dataset.index);
            const rule = this.rules[index];
            const matches = 
                rule.name.toLowerCase().includes(term) ||
                rule.description.toLowerCase().includes(term) ||
                rule.category.toLowerCase().includes(term);
            
            item.style.display = matches ? 'block' : 'none';
        });
    }

    // Filter rules by category
    filterByCategory(category) {
        document.querySelectorAll('.k-rule-item').forEach(item => {
            const matches = 
                category === 'all' || 
                item.dataset.category === category;
            
            item.style.display = matches ? 'block' : 'none';
        });
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export rules to JSON
    exportRules() {
        return JSON.stringify(this.rules, null, 2);
    }

    // Load sample rules
    loadSampleRules() {
        this.rules = [
            {
                name: 'i32.add',
                category: 'arithmetic',
                lhs: '<k> (i32.const I1:Int) (i32.const I2:Int) i32.add => ... </k>',
                rhs: '<k> i32.const (I1 +Int I2) ... </k>',
                requires: 'I1 +Int I2 <=Int (2 ^Int 32 -Int 1)',
                ensures: '',
                description: 'Addition of two i32 constants with overflow check'
            },
            {
                name: 'i32.sub',
                category: 'arithmetic',
                lhs: '<k> (i32.const I1:Int) (i32.const I2:Int) i32.sub => ... </k>',
                rhs: '<k> i32.const (I1 -Int I2) ... </k>',
                requires: 'I1 -Int I2 >=Int 0',
                ensures: '',
                description: 'Subtraction of two i32 constants'
            },
            {
                name: 'if-then-else',
                category: 'control',
                lhs: '<k> (i32.const I:Int) (if ... then ... else ...) => ... </k>',
                rhs: '<k> ... </k>',
                requires: 'I =/=Int 0',
                ensures: '',
                description: 'Conditional execution based on stack value'
            },
            {
                name: 'i32.load',
                category: 'memory',
                lhs: '<k> (i32.const I:Int) (i32.load) => ... </k>\n<mem> ... I |-> V ... </mem>',
                rhs: '<k> i32.const V ... </k>\n<mem> ... I |-> V ... </mem>',
                requires: 'I <Int memsize',
                ensures: '',
                description: 'Load 32-bit integer from memory'
            },
            {
                name: 'call',
                category: 'function',
                lhs: '<k> (call F:Int) => ... </k>\n<funcs> ... F |-> func(...) ... </funcs>',
                rhs: '<k> ... func body ... </k>',
                requires: 'F <Int |funcs|',
                ensures: '',
                description: 'Function call with stack frame creation'
            }
        ];
        this.renderRulesList();
    }
}

// Global function for toggling rules
function toggleRule(index) {
    const ruleBody = document.getElementById(`rule-${index}`);
    if (ruleBody) {
        ruleBody.style.display = 
            ruleBody.style.display === 'none' ? 'block' : 'none';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KSemanticsRenderer;
}
