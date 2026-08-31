let currentDisc = "mind";

document.addEventListener("DOMContentLoaded", () => {
    initNav();
    loadDiscipline(currentDisc);
});

function initNav() {
    document.querySelectorAll(".nav-link[data-disc]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-link[data-disc]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentDisc = btn.dataset.disc;
            loadDiscipline(currentDisc);
        });
    });
}

function loadDiscipline(disc) {
    const fw = FRAMEWORKS[disc];
    document.getElementById("disc-title").textContent = fw.title;
    document.getElementById("disc-intro").textContent = fw.intro;

    const list = document.getElementById("school-list");
    list.innerHTML = "";

    fw.schools.forEach(school => {
        const item = document.createElement("button");
        item.className = "school-item";
        item.dataset.id = school.id;
        item.dataset.color = school.color || "#94a3b8";
        item.innerHTML = `
            <span class="school-name">${school.name}</span>
            <span class="school-count">${countRelations(school.id, fw)}</span>
        `;
        item.style.borderLeftColor = school.color || "#94a3b8";
        item.addEventListener("click", () => selectSchool(school.id, fw));
        list.appendChild(item);
    });

    document.getElementById("detail").hidden = true;
    document.getElementById("empty-state").hidden = false;
}

function countRelations(id, fw) {
    const count = fw.relations.filter(r =>
        (r.from === id || r.to === id) && (r.to !== r.from)
    ).length;
    return count > 0 ? `${count} 关系` : "";
}

function selectSchool(id, fw) {
    const school = fw.schools.find(s => s.id === id);
    if (!school) return;

    document.querySelectorAll(".school-item").forEach(i => {
        i.classList.toggle("active", i.dataset.id === id);
    });

    document.getElementById("empty-state").hidden = true;
    const detail = document.getElementById("detail");
    detail.hidden = false;

    document.getElementById("d-badge").style.background = school.color || "#94a3b8";
    document.getElementById("d-name").textContent = school.name;
    document.getElementById("d-base").textContent = school.base;

    const phil = document.getElementById("d-philosophers");
    phil.innerHTML = school.philosophers.map(p => `<li>${p}</li>`).join("");

    document.getElementById("d-view").textContent = school.view;

    const args = document.getElementById("d-arguments");
    args.innerHTML = school.arguments.map(a => `
        <div class="argument">
            <h4>${a.name}</h4>
            <p>${a.desc}</p>
        </div>
    `).join("");

    renderRelations(school, fw);
}

function renderRelations(school, fw) {
    const container = document.getElementById("d-relations");

    const outRelations = fw.relations
        .filter(r => r.from === school.id || r.to === school.id)
        .filter(r => r.from !== r.to)
        .map(r => {
            const isOut = r.from === school.id;
            const targetId = isOut ? r.to : r.from;
            const target = fw.schools.find(s => s.id === targetId);
            return {
                type: r.type,
                note: r.note,
                direction: isOut
                    ? `${school.name} → ${target ? target.name : targetId}`
                    : `${target ? target.name : targetId} → ${school.name}`,
                targetName: target ? target.name : targetId
            };
        });

    if (outRelations.length === 0) {
        container.innerHTML = `<p style="color:var(--text-soft)">暂无已标注的流派间关系。</p>`;
        return;
    }

    const typeLabels = { agree: "AGREE 赞同", oppose: "OPPOSE 反对" };
    const weight = { oppose: 0, agree: 1 };

    container.innerHTML = outRelations
        .sort((a, b) => (weight[a.type] || 2) - (weight[b.type] || 2))
        .map(r => `
            <div class="relation ${r.type}">
                <span class="rel-type">${typeLabels[r.type]}</span>
                <span class="rel-target">${r.targetName}</span>
                <span class="rel-note">${r.note || ""}</span>
            </div>
        `).join("");
}
