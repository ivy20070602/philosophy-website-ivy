let currentBook = "mind";
let graph = null;

document.addEventListener("DOMContentLoaded", () => {
    graph = new KnowledgeGraph("graph-container");
    graph.onNodeSelect = showNodeDetails;

    loadBook(currentBook);

    document.querySelectorAll(".book-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".book-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentBook = btn.dataset.book;
            loadBook(currentBook);
        });
    });

    document.getElementById("zoom-in").addEventListener("click", () => graph.zoomIn());
    document.getElementById("zoom-out").addEventListener("click", () => graph.zoomOut());
    document.getElementById("reset").addEventListener("click", () => graph.resetView());
    document.getElementById("search").addEventListener("input", (e) => graph.search(e.target.value));

    window.addEventListener("resize", () => graph.resize());
});

function loadBook(bookKey) {
    const book = BOOKS[bookKey];
    document.getElementById("book-title").textContent = book.title;
    document.getElementById("book-author").textContent = book.author;
    document.getElementById("book-description").textContent = book.description;

    graph.setData(book.nodes, book.links);

    const chaptersList = document.getElementById("chapters-list");
    chaptersList.innerHTML = "";

    book.chapters.forEach(ch => {
        const card = document.createElement("div");
        card.className = "chapter-card";
        card.innerHTML = `<h4>${ch.title}</h4><p>${ch.summary}</p>`;
        card.addEventListener("click", () => {
            const panel = document.getElementById("detail-title");
            panel.textContent = ch.title;
            const content = document.getElementById("detail-content");
            content.innerHTML = `
                <p>${ch.summary}</p>
                <h4>Key Concepts</h4>
                <ul>
                    ${ch.concepts.map(c => `<li><strong>${c}</strong></li>`).join("")}
                </ul>
            `;
        });
        chaptersList.appendChild(card);
    });

    document.getElementById("detail-title").textContent = "Select a concept";
    document.getElementById("detail-content").innerHTML = "<p>Click on any node in the knowledge graph to see detailed information about that concept.</p>";
}

function showNodeDetails(node) {
    const panel = document.getElementById("detail-title");
    const content = document.getElementById("detail-content");

    panel.textContent = node.id;

    const connectedNodes = [];
    const book = BOOKS[currentBook];
    book.links.forEach(l => {
        const src = typeof l.source === "object" ? l.source.id : l.source;
        const tgt = typeof l.target === "object" ? l.target.id : l.target;
        if (src === node.id) connectedNodes.push(tgt);
        if (tgt === node.id) connectedNodes.push(src);
    });

    const chapter = book.chapters.find(ch =>
        ch.concepts.some(c => c === node.id)
    );

    let chapterHtml = "";
    if (chapter) {
        chapterHtml = `<h4>Chapter</h4><p>${chapter.title}</p>`;
    }

    content.innerHTML = `
        <p><strong>${node.id}</strong></p>
        <p>${node.desc || "No description available."}</p>
        ${chapterHtml}
        <h4>Connected Concepts</h4>
        <ul>
            ${connectedNodes.map(n => `<li>${n}</li>`).join("")}
        </ul>
    `;
}
