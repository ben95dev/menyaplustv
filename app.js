/* Menya Plus TV : script commun à toutes les pages (données dans data.js) */
const $ = id => document.getElementById(id);
const now = new Date(), day = now.getDay(), hr = now.getHours();
const key = day === 0 ? "dim" : day === 6 ? "sam" : "sem";
const cur = hr >= 23 || hr < 6 ? 10 : hr < 8 ? 0 : hr < 10 ? 1 : hr < 12 ? 2 : hr < 13 ? 3 : hr < 15 ? 4 : hr < 17 ? 5 : hr < 19 ? 6 : hr < 20 ? 7 : hr < 22 ? 8 : 9;

/* menu mobile + page active */
const mb = $("menu");
if (mb) mb.onclick = () => mb.setAttribute("aria-expanded", document.querySelector("nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => { if (a.getAttribute("href") === document.body.dataset.nav) a.setAttribute("aria-current", "page"); });

/* secteurs */
if ($("sectors")) $("sectors").innerHTML = SECTORS.map(x => `<a class="sector" href="secteur-${x.id}.html"><h3>${x.name}</h3><p>${x.d}</p></a>`).join("");

/* émissions (filtre par secteur, limite, ?s=secteur dans l'adresse) */
const box = $("videos");
if (box) {
  let filter = box.dataset.sector || new URLSearchParams(location.search).get("s") || "all";
  const draw = () => {
    if ($("chips")) $("chips").innerHTML = [["all", "Tous"], ...SECTORS.map(x => [x.id, x.name.split(" ")[0]])]
      .map(([i, n]) => `<button class="chip" data-f="${i}" aria-pressed="${i === filter}">${n}</button>`).join("");
    const list = VIDEOS.filter(v => filter === "all" || v.s === filter).slice(0, +box.dataset.limit || 99);
    box.innerHTML = list.length ? list.map(v => `<a class="card" href="${v.u}" style="text-decoration:none"><div class="thumb">${S[v.s]}</div><div class="t"><h3>${v.t}</h3><small>${v.d}</small></div></a>`).join("")
      : "<p>Aucune émission pour le moment. Revenez bientôt.</p>";
  };
  draw();
  if ($("chips")) $("chips").addEventListener("click", e => { const b = e.target.closest("[data-f]"); if (b) { filter = b.dataset.f; draw(); } });
}

/* programme du jour */
if ($("today")) {
  const from = Math.max(0, cur - 1);
  $("today").innerHTML = GRID[key].slice(from, from + 5).map((r, i) => {
    const on = from + i === cur;
    return `<li class="${on ? "cur" : ""}"><b>${r[0].split("-")[0]}</b><span>${r[1]}${on ? "<small>En ce moment</small>" : ""}</span></li>`;
  }).join("");
}

/* grille complète */
if ($("grid")) {
  let tab = key;
  const draw = () => {
    $("tabs").innerHTML = [["sem", "Lundi au vendredi"], ["sam", "Samedi"], ["dim", "Dimanche"]]
      .map(([k, n]) => `<button class="tab" role="tab" data-t="${k}" aria-selected="${k === tab}">${n}</button>`).join("");
    $("grid").innerHTML = GRID[tab].map((r, i) => `<tr class="${tab === key && i === cur ? "cur" : ""}"><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join("");
  };
  draw();
  $("tabs").addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (b) { tab = b.dataset.t; draw(); } });
}

/* lecteur */
const v = $("video");
let hls = null;
if (v && STREAM_URL) {
  $("off").style.display = "none";
  if (window.Hls && Hls.isSupported()) { hls = new Hls({ capLevelToPlayerSize: true }); hls.loadSource(STREAM_URL); hls.attachMedia(v); }
  else if (v.canPlayType("application/vnd.apple.mpegurl")) v.src = STREAM_URL;
}
["eco", "audio"].forEach(id => {
  if ($(id)) $(id).onclick = e => {
    const on = e.target.getAttribute("aria-pressed") !== "true";
    e.target.setAttribute("aria-pressed", on);
    if (id === "audio") v.style.visibility = on ? "hidden" : "visible";
    if (hls) hls.currentLevel = on ? 0 : -1; /* 0 = qualité la plus basse, -1 = automatique */
  };
});

/* formulaires (contact, publicité) */
document.querySelectorAll("form[data-form]").forEach(f => f.addEventListener("submit", async e => {
  e.preventDefault();
  const m = f.querySelector(".msg"), d = Object.fromEntries(new FormData(f));
  if (![...f.elements].filter(x => x.required).every(x => x.value.trim() && x.checkValidity())) { m.textContent = "Remplissez les champs obligatoires avec des informations valides."; return; }
  const sujet = f.dataset.form;
  if (!CONTACT_ENDPOINT) {
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(sujet + " : " + (d.nom || ""))}&body=${encodeURIComponent(Object.entries(d).map(([k, x]) => k + " : " + x).join("\n"))}`;
    return;
  }
  try {
    const r = await fetch(CONTACT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sujet, ...d }) });
    m.textContent = r.ok ? "Message envoyé. Merci !" : "L'envoi a échoué. Réessayez dans un instant.";
    if (r.ok) f.reset();
  } catch { m.textContent = "Pas de connexion. Réessayez dans un instant."; }
}));
if ($("y")) $("y").textContent = now.getFullYear();
