class KnowledgeGraph {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight || 500;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
        this.selectedNode = null;
        this.zoom = null;

        this.init();
    }

    init() {
        this.svg = d3.select(`#${this.container.id}`)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        this.g = this.svg.append("g");

        this.zoom = d3.zoom()
            .scaleExtent([0.3, 5])
            .on("zoom", (event) => {
                this.g.attr("transform", event.transform);
            });

        this.svg.call(this.zoom);

        this.linkGroup = this.g.append("g").attr("class", "links");
        this.nodeGroup = this.g.append("g").attr("class", "nodes");

        this.colorScale = d3.scaleOrdinal()
            .range(["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe", "#43e97b", "#38f9d7", "#fa709a", "#fee140", "#a8edea"]);
    }

    setData(nodes, links) {
        this.nodes = nodes.map(d => ({...d}));
        this.links = links.map(d => ({...d}));

        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("collision", d3.forceCollide().radius(50));

        this.render();
    }

    render() {
        this.linkGroup.selectAll("*").remove();
        this.nodeGroup.selectAll("*").remove();

        const link = this.linkGroup.selectAll("line")
            .data(this.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = this.nodeGroup.selectAll("g")
            .data(this.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", (event, d) => {
                    if (!event.active) this.simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) this.simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }));

        node.append("circle")
            .attr("r", d => 8 + (d.group || 1))
            .attr("fill", d => this.colorScale(d.group || 1))
            .attr("stroke", "#fff")
            .attr("stroke-width", 2);

        node.append("text")
            .attr("dy", d => 12 + (d.group || 1))
            .attr("text-anchor", "middle")
            .text(d => d.id.length > 20 ? d.id.substring(0, 18) + "..." : d.id)
            .style("font-size", "11px")
            .style("fill", "#333");

        node.on("click", (event, d) => {
            this.selectNode(d);
        });

        this.simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`);
        });

        this.simulation.alpha(1).restart();
    }

    selectNode(d) {
        this.selectedNode = d;

        this.nodeGroup.selectAll(".node circle")
            .classed("highlight", false)
            .classed("dimmed", true);

        this.nodeGroup.selectAll(".node")
            .filter(n => n.id === d.id || this.links.some(l =>
                (l.source.id === d.id && l.target.id === n.id) ||
                (l.target.id === d.id && l.source.id === n.id)
            ))
            .select("circle")
            .classed("dimmed", false)
            .classed("highlight", n => n.id === d.id);

        this.linkGroup.selectAll("line")
            .classed("dimmed", l => l.source.id !== d.id && l.target.id !== d.id)
            .classed("highlight", l => l.source.id === d.id || l.target.id === d.id);

        if (this.onNodeSelect) {
            this.onNodeSelect(d);
        }
    }

    clearSelection() {
        this.selectedNode = null;
        this.nodeGroup.selectAll(".node circle")
            .classed("highlight", false)
            .classed("dimmed", false);
        this.linkGroup.selectAll("line")
            .classed("highlight", false)
            .classed("dimmed", false);
    }

    search(query) {
        if (!query) {
            this.clearSelection();
            return;
        }
        const q = query.toLowerCase();
        const match = this.nodes.find(n => n.id.toLowerCase().includes(q));
        if (match) {
            this.selectNode(match);
        }
    }

    zoomIn() {
        this.svg.transition().call(this.zoom.scaleBy, 1.3);
    }

    zoomOut() {
        this.svg.transition().call(this.zoom.scaleBy, 0.7);
    }

    resetView() {
        this.svg.transition().call(this.zoom.transform, d3.zoomIdentity);
        this.clearSelection();
    }

    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight || 500;
        if (this.simulation) {
            this.simulation.force("center", d3.forceCenter(this.width / 2, this.height / 2));
            this.simulation.alpha(0.3).restart();
        }
    }
}
