let currentDiscipline = "mind";
let mindmap = null;

document.addEventListener("DOMContentLoaded", () => {
    mindmap = new MindMap("mindmap-container");
    mindmap.onNodeClick = showNodeDetails;

    loadDiscipline(currentDiscipline);

    document.querySelectorAll(".book-btn[data-discipline]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".book-btn[data-discipline]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentDiscipline = btn.dataset.discipline;
            loadDiscipline(currentDiscipline);
        });
    });

    document.getElementById("zoom-in").addEventListener("click", () => mindmap.zoomIn());
    document.getElementById("zoom-out").addEventListener("click", () => mindmap.zoomOut());
    document.getElementById("reset").addEventListener("click", () => mindmap.resetView());
    document.getElementById("expand-all").addEventListener("click", () => mindmap.expandAll());
    document.getElementById("collapse-all").addEventListener("click", () => mindmap.collapseAll());

    window.addEventListener("resize", () => mindmap.resize());
});

function loadDiscipline(discipline) {
    const fw = FRAMEWORKS[discipline];
    document.getElementById("discipline-title").textContent = fw.title;
    document.getElementById("discipline-description").textContent = fw.description;

    const legend = document.getElementById("legend");
    legend.innerHTML = fw.legend.map(item =>
        `<div class="legend-item">
            <div class="legend-color" style="background-color: ${item.color}"></div>
            <span>${item.label}</span>
        </div>`
    ).join("");

    mindmap.setData(fw.tree);

    const frameworksList = document.getElementById("frameworks-list");
    frameworksList.innerHTML = "";
    fw.frameworks.forEach(f => {
        const card = document.createElement("div");
        card.className = "chapter-card";
        card.innerHTML = `
            <h4>${f.title}</h4>
            <p>${f.summary}</p>
            <p><strong>Key positions:</strong> ${f.positions.join(", ")}</p>
        `;
        card.addEventListener("click", () => {
            showFrameworkDetails(f);
        });
        frameworksList.appendChild(card);
    });

    document.getElementById("frameworks-title").textContent = `${discipline === "mind" ? "Philosophy of Mind" : "Metaphysics"} Frameworks`;

    document.getElementById("node-detail").innerHTML = `
        <h4>Click a node to see details</h4>
        <p>Select any node in the mind map to view its description, key arguments, and related positions.</p>
    `;
}

function showNodeDetails(data) {
    const detail = document.getElementById("node-detail");
    detail.innerHTML = `
        <h4>${data.name}</h4>
        <p>${data.desc || "No description available."}</p>
    `;
}

function showFrameworkDetails(framework) {
    const detail = document.getElementById("node-detail");
    detail.innerHTML = `
        <h4>${framework.title}</h4>
        <p>${framework.summary}</p>
        <p><strong>Key positions:</strong></p>
        <ul>
            ${framework.positions.map(p => `<li>${p}</li>`).join("")}
        </ul>
    `;
}
