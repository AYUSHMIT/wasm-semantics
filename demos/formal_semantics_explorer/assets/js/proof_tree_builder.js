// Proof Tree Builder
// Builds and visualizes formal proof derivation trees

class ProofTreeBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.tree = null;
        this.selectedNode = null;
    }

    // Load proof tree from data
    loadTree(tree) {
        this.tree = tree;
        this.render();
    }

    // Render proof tree
    render() {
        if (!this.container || !this.tree) return;

        const html = `
            <div class="proof-tree-viewer">
                <div class="proof-controls">
                    <button onclick="proofTree.expandAll()">
                        <i class="fas fa-plus-square"></i> Expand All
                    </button>
                    <button onclick="proofTree.collapseAll()">
                        <i class="fas fa-minus-square"></i> Collapse All
                    </button>
                    <button onclick="proofTree.exportTree()">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
                <div class="proof-tree-container">
                    ${this.renderNode(this.tree, 0)}
                </div>
                <div class="proof-details" id="proof-details">
                    <p>Click on a node to see details</p>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    // Render tree node recursively
    renderNode(node, depth) {
        const hasChildren = node.children && node.children.length > 0;
        const nodeId = `node-${depth}-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="proof-node depth-${depth}" data-node-id="${nodeId}">
                <div class="proof-node-header" onclick="proofTree.toggleNode('${nodeId}')">
                    ${hasChildren ? '<span class="collapse-icon">▼</span>' : '<span class="leaf-icon">•</span>'}
                    <span class="proof-goal">${this.escapeHtml(node.goal)}</span>
                    <span class="proof-rule">${node.rule}</span>
                </div>
        `;

        if (hasChildren) {
            html += '<div class="proof-children" id="children-${nodeId}">';
            node.children.forEach(child => {
                html += this.renderNode(child, depth + 1);
            });
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // Toggle node expansion
    toggleNode(nodeId) {
        const node = document.querySelector(`[data-node-id="${nodeId}"]`);
        if (!node) return;

        const children = node.querySelector('.proof-children');
        const icon = node.querySelector('.collapse-icon');
        
        if (children) {
            const isCollapsed = children.style.display === 'none';
            children.style.display = isCollapsed ? 'block' : 'none';
            icon.textContent = isCollapsed ? '▼' : '▶';
        }

        this.showNodeDetails(node);
    }

    // Show node details
    showNodeDetails(node) {
        const details = document.getElementById('proof-details');
        if (!details) return;

        // Extract node information
        const goal = node.querySelector('.proof-goal').textContent;
        const rule = node.querySelector('.proof-rule').textContent;

        details.innerHTML = `
            <h4>Proof Step Details</h4>
            <div class="detail-section">
                <strong>Goal:</strong>
                <pre><code>${goal}</code></pre>
            </div>
            <div class="detail-section">
                <strong>Rule Applied:</strong>
                <code>${rule}</code>
            </div>
            <div class="detail-section">
                <strong>Description:</strong>
                <p>${this.getRuleDescription(rule)}</p>
            </div>
        `;
    }

    // Get rule description
    getRuleDescription(rule) {
        const descriptions = {
            'Type-Int': 'Integer constants have type i32',
            'Type-Add': 'Addition requires two operands of the same numeric type',
            'Type-If': 'Conditional requires i32 condition and matching branch types',
            'Type-Call': 'Function call must match declared function signature',
            'Type-Load': 'Memory load requires i32 address and produces typed value',
            'Type-Store': 'Memory store requires i32 address and typed value',
            'Eval-Add': 'Evaluate addition by computing sum of operands',
            'Eval-If-True': 'Take then-branch when condition is non-zero',
            'Eval-If-False': 'Take else-branch when condition is zero',
            'Progress': 'Well-typed expression can take a step or is a value',
            'Preservation': 'Type is preserved during evaluation step'
        };
        return descriptions[rule] || 'No description available';
    }

    // Expand all nodes
    expandAll() {
        document.querySelectorAll('.proof-children').forEach(children => {
            children.style.display = 'block';
        });
        document.querySelectorAll('.collapse-icon').forEach(icon => {
            icon.textContent = '▼';
        });
    }

    // Collapse all nodes
    collapseAll() {
        document.querySelectorAll('.proof-children').forEach(children => {
            children.style.display = 'none';
        });
        document.querySelectorAll('.collapse-icon').forEach(icon => {
            icon.textContent = '▶';
        });
    }

    // Export tree to various formats
    exportTree() {
        const format = prompt('Export format (json/latex/dot):', 'json');
        
        switch (format) {
            case 'json':
                this.exportJSON();
                break;
            case 'latex':
                this.exportLaTeX();
                break;
            case 'dot':
                this.exportDot();
                break;
            default:
                alert('Unknown format');
        }
    }

    // Export to JSON
    exportJSON() {
        const json = JSON.stringify(this.tree, null, 2);
        this.downloadFile('proof-tree.json', json);
    }

    // Export to LaTeX
    exportLaTeX() {
        const latex = this.treeToLaTeX(this.tree);
        this.downloadFile('proof-tree.tex', latex);
    }

    // Convert tree to LaTeX
    treeToLaTeX(node, indent = 0) {
        const spaces = '  '.repeat(indent);
        let latex = `${spaces}\\infer{${node.goal}}\n`;
        
        if (node.children && node.children.length > 0) {
            latex += `${spaces}{\n`;
            node.children.forEach(child => {
                latex += this.treeToLaTeX(child, indent + 1);
            });
            latex += `${spaces}}\n`;
        }
        
        return latex;
    }

    // Export to Graphviz DOT
    exportDot() {
        let dot = 'digraph ProofTree {\n';
        dot += '  node [shape=box];\n';
        dot += this.treeToDot(this.tree, 0);
        dot += '}\n';
        this.downloadFile('proof-tree.dot', dot);
    }

    // Convert tree to DOT format
    treeToDot(node, id) {
        let dot = `  node${id} [label="${node.goal}\\n[${node.rule}]"];\n`;
        
        if (node.children && node.children.length > 0) {
            node.children.forEach((child, index) => {
                const childId = id * 100 + index;
                dot += this.treeToDot(child, childId);
                dot += `  node${id} -> node${childId};\n`;
            });
        }
        
        return dot;
    }

    // Download file helper
    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load sample proof tree
    loadSampleTree() {
        this.tree = {
            goal: '⊢ (1 + 2) + 3 : i32',
            rule: 'Type-Add',
            children: [
                {
                    goal: '⊢ 1 + 2 : i32',
                    rule: 'Type-Add',
                    children: [
                        {
                            goal: '⊢ 1 : i32',
                            rule: 'Type-Int',
                            children: []
                        },
                        {
                            goal: '⊢ 2 : i32',
                            rule: 'Type-Int',
                            children: []
                        }
                    ]
                },
                {
                    goal: '⊢ 3 : i32',
                    rule: 'Type-Int',
                    children: []
                }
            ]
        };
        this.render();
    }
}

// Global instance
let proofTree = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('proof-tree-container');
    if (container) {
        proofTree = new ProofTreeBuilder('proof-tree-container');
        proofTree.loadSampleTree();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProofTreeBuilder;
}
