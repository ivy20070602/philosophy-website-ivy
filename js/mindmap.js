class MindMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = this.container.clientWidth;
        this.height = 600;
        this.svg = null;
        this.g = null;
        this.root = null;
        this.treemap = null;
        this.zoom = null;
        this.onNodeClick = null;
        this.i = 0;
        this.duration = 500;

        this.colorScale = {
            "#667eea": "#667eea",
            "#764ba2": "#764ba2",
            "#f5576c": "#f5576c",
            "#4facfe": "#4facfe",
            "#43e97b": "#43e97b"
        };

        this.init();
    }

    init() {
        this.svg = d3.select(`#${this.container.id}`)
            .append("svg")
            .attr("width", "100%")
            .attr("height", this.height);

        this.g = this.svg.append("g")
            .attr("transform", `translate(80,0)`);

        this.zoom = d3.zoom()
            .scaleExtent([0.3, 5])
            .on("zoom", (event) => {
                this.g.attr("transform", event.transform);
            });

        this.svg.call(this.zoom);

        this.treemap = d3.tree()
            .size([this.height - 40, this.width - 300])
            .separation((a, b) => (a.parent === b.parent ? 1 : 1.5));

        this.linkGroup = this.g.append("g").attr("class", "links");
        this.nodeGroup = this.g.append("g").attr("class", "nodes");
    }

    setData(data) {
        this.data = data;
        this.root = d3.hierarchy(data, d => d.children);
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;

        this.root.descendants().forEach((d, i) => {
            if (i > 100) return;
            d.id = d.id || ++this.i;
            d._children = d.children;
            if (d.depth > 2 && d.children) {
                d.children = null;
            }
        });

        this.update(this.root);
    }

    update(source) {
        const treeData = this.treemap(this.root);
        const nodes = treeData.descendants();
        const links = treeData.links();

        nodes.forEach(d => {
            d.y = d.depth * 220;
        });

        const node = this.nodeGroup.selectAll("g.node")
            .data(nodes, d => d.id);

        const nodeEnter = node.enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on("click", (event, d) => {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                this.update(d);
                if (this.onNodeClick) {
                    this.onNodeClick(d.data);
                }
            });

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", d => d._children ? (d.data.color || "#667eea") : "#fff")
            .style("stroke", d => d.data.color || "#667eea");

        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children || d._children ? -13 : 13)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.name.length > 25 ? d.data.name.substring(0, 22) + "..." : d.data.name)
            .style("fill-opacity", 1e-6);

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(this.duration)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle")
            .attr("r", d => d._children ? 8 : 6)
            .style("fill", d => d._children ? (d.data.color || "#667eea") : "#fff")
            .style("stroke", d => d.data.color || "#667eea");

        nodeUpdate.select("text")
            .style("fill-opacity", 1)
            .attr("x", d => d.children || d._children ? -13 : 13)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.name.length > 25 ? d.data.name.substring(0, 22) + "..." : d.data.name);

        const nodeExit = node.exit()
            .transition()
            .duration(this.duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle").attr("r", 1e-6);
        nodeExit.select("text").style("fill-opacity", 1e-6);

        const link = this.linkGroup.selectAll("path.link")
            .data(links, d => d.target.id);

        const linkEnter = link.enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = { x: source.x0, y: source.y0 };
                return this.diagonal(o, o);
            });

        const linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(this.duration)
            .attr("d", d => this.diagonal(d.source, d.target));

        link.exit()
            .transition()
            .duration(this.duration)
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o);
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    diagonal(s, d) {
        return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
    }

    expandAll() {
        this.expand(this.root);
        this.update(this.root);
    }

    expand(d) {
        if (d._children) {
            d.children = d._children;
            d._children = null;
        }
        if (d.children) {
            d.children.forEach(child => this.expand(child));
        }
    }

    collapseAll() {
        this.root.children.forEach(child => this.collapse(child));
        this.update(this.root);
    }

    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        }
        if (d._children) {
            d._children.forEach(child => this.collapse(child));
        }
    }

    zoomIn() {
        this.svg.transition().call(this.zoom.scaleBy, 1.3);
    }

    zoomOut() {
        this.svg.transition().call(this.zoom.scaleBy, 0.7);
    }

    resetView() {
        this.svg.transition().call(this.zoom.transform, d3.zoomIdentity.translate(80, 0));
    }

    resize() {
        this.width = this.container.clientWidth;
        this.treemap.size([this.height - 40, this.width - 300]);
        this.update(this.root);
    }
}
