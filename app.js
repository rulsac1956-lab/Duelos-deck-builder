let cards = [];
let gameData = { classes: [] };
let deck = {};
let selectedClass = "";
let selectedSubclass = "";
let selectedHeroId = "";

const setupScreen = document.getElementById("setupScreen");
const builderScreen = document.getElementById("builderScreen");
const setupTitle = document.getElementById("setupTitle");
const setupSubtitle = document.getElementById("setupSubtitle");
const choiceGrid = document.getElementById("choiceGrid");
const backStepButton = document.getElementById("backStepButton");
const resetSetupButton = document.getElementById("resetSetupButton");
const changeSelectionButton = document.getElementById("changeSelectionButton");

const cardsGrid = document.getElementById("cardsGrid");
const deckList = document.getElementById("deckList");
const deckTotal = document.getElementById("deckTotal");
const uniqueTotal = document.getElementById("uniqueTotal");
const exportText = document.getElementById("exportText");
const costChart = document.getElementById("costChart");
const averageCostLabel = document.getElementById("averageCostLabel");
const totalCardsLabel = document.getElementById("totalCardsLabel");
const resultsCount = document.getElementById("resultsCount");
const deckIdentityText = document.getElementById("deckIdentityText");
const selectedHeroName = document.getElementById("selectedHeroName");
const selectedHeroInfo = document.getElementById("selectedHeroInfo");

const searchInput = document.getElementById("searchInput");
const classFilter = document.getElementById("classFilter");
const typeFilter = document.getElementById("typeFilter");
const costFilter = document.getElementById("costFilter");
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");
const deckUrlOutput = document.getElementById("deckUrlOutput");
const clearButton = document.getElementById("clearButton");

const DEFAULT_MAX_COPIES = 2;
const VALID_DECK_CLASSES = ["Asesino", "Paladín", "Tecnomago", "Nigromante", "Ingeniera de Conquista"];

const classOrder = {
  "Asesino": 1,
  "Paladín": 2,
  "Tecnomago": 3,
  "Nigromante": 4,
  "Ingeniera de Conquista": 5,
  "Sin clase": 90,
  "Neutral": 99
};

const typeOrder = {
  "Héroe": 0,
  "Esbirro": 1,
  "Esbirro Extra": 2,
  "Extra": 2,
  "Hechizo": 3,
  "Arma": 4,
  "Campo": 5,
  "Carta": 99
};

async function loadData() {
  const [cardsResponse, gameResponse] = await Promise.all([
    fetch("cards.json"),
    fetch("game-data.json")
  ]);

  cards = await cardsResponse.json();
  gameData = await gameResponse.json();

  sortCards();
  loadDeckFromStorage();
  fillFilters();
  totalCardsLabel.textContent = `${cards.length} cartas`;

  if (selectedClass && selectedSubclass && selectedHeroId) {
    showBuilder();
  } else {
    renderClassStep();
  }
}

function sortCards() {
  cards.sort((a, b) => {
    const classDiff = (classOrder[a.class] ?? 999) - (classOrder[b.class] ?? 999);
    if (classDiff !== 0) return classDiff;

    const subDiff = (a.subclass || "ZZZ").localeCompare(b.subclass || "ZZZ");
    if (subDiff !== 0) return subDiff;

    const typeDiff = (typeOrder[a.type] ?? 999) - (typeOrder[b.type] ?? 999);
    if (typeDiff !== 0) return typeDiff;

    const costDiff = (a.cost ?? 999) - (b.cost ?? 999);
    if (costDiff !== 0) return costDiff;

    return a.name.localeCompare(b.name);
  });
}

function renderClassStep() {
  setupScreen.classList.remove("hidden");
  builderScreen.classList.add("hidden");
  backStepButton.classList.add("hidden");
  resetSetupButton.classList.add("hidden");
  setupTitle.textContent = "Escoge una clase";
  setupSubtitle.textContent = "Primero elige la clase base del mazo.";
  choiceGrid.innerHTML = "";

  for (const cls of gameData.classes) {
    const card = document.createElement("div");
    card.className = "choice-card";
    card.innerHTML = `
      <div class="choice-icon">${cls.image ? getIconImageHtml(cls.image, cls.name) : ""}</div>
      <strong>${escapeHtml(cls.name)}</strong>
      <small>${cls.subclasses.length} subclase(s)</small>
    `;
    card.addEventListener("click", () => {
      selectedClass = cls.name;
      selectedSubclass = "";
      selectedHeroId = "";
      saveDeckToStorage();
      renderSubclassStep();
    });
    choiceGrid.appendChild(card);
  }
}

function renderSubclassStep() {
  const cls = gameData.classes.find(c => c.name === selectedClass);
  backStepButton.classList.remove("hidden");
  resetSetupButton.classList.remove("hidden");
  setupTitle.textContent = `Escoge una subclase`;
  setupSubtitle.textContent = selectedClass;
  choiceGrid.innerHTML = "";

  for (const subclass of cls.subclasses) {
    const card = document.createElement("div");
    card.className = "choice-card";
    card.innerHTML = `
      <div class="choice-icon">${subclass.image ? getIconImageHtml(subclass.image, subclass.name) : ""}</div>
      <strong>${escapeHtml(subclass.name || "Sin subclase")}</strong>
      <small>${subclass.heroes.length} héroe(s)</small>
    `;
    card.addEventListener("click", () => {
      selectedSubclass = subclass.name;
      selectedHeroId = "";
      saveDeckToStorage();
      renderHeroStep();
    });
    choiceGrid.appendChild(card);
  }
}

function renderHeroStep() {
  const cls = gameData.classes.find(c => c.name === selectedClass);
  const subclass = cls.subclasses.find(s => s.name === selectedSubclass);
  backStepButton.classList.remove("hidden");
  resetSetupButton.classList.remove("hidden");
  setupTitle.textContent = `Escoge un héroe`;
  setupSubtitle.textContent = `${selectedClass} / ${selectedSubclass}`;
  choiceGrid.innerHTML = "";

  for (const hero of subclass.heroes) {
    const heroCard = cards.find(card => card.id === hero.id);
    const card = document.createElement("div");
    card.className = "choice-card hero-choice-card";
    const heroText = heroCard ? heroCard.text : "";
    const heroStats = heroCard ? getStatsHtml(heroCard) : "";

    card.innerHTML = `
      <div class="hero-choice-image">
        ${hero.image ? `<img src="${getCardImagePath(hero.image)}" alt="${escapeHtml(hero.name)}" onerror="this.style.display='none'; this.parentElement.textContent='${escapeHtml(shortImageName(hero.image))}'">` : "Sin imagen"}
      </div>
      <div class="hero-choice-body">
        <strong>${escapeHtml(hero.name)}</strong>
        <small>${escapeHtml(selectedClass)} / ${escapeHtml(selectedSubclass)}</small>
        <p>${escapeHtml(heroText || "")}</p>
        ${heroStats}
      </div>
    `;
    card.addEventListener("click", () => {
      selectedHeroId = hero.id;
      deck = {};
      deck[hero.id] = 1;
      saveDeckToStorage();
      showBuilder();
    });
    choiceGrid.appendChild(card);
  }
}

function showBuilder() {
  setupScreen.classList.add("hidden");
  builderScreen.classList.remove("hidden");

  classFilter.value = selectedClass;
  renderCards();
  renderDeck();
  updateIdentity();
}

function updateIdentity() {
  const hero = cards.find(c => c.id === selectedHeroId);
  deckIdentityText.textContent = `${selectedClass} / ${selectedSubclass}`;
  selectedHeroName.textContent = hero ? hero.name : "Sin héroe";
  selectedHeroInfo.textContent = hero ? `${hero.class} / ${hero.subclass} · Vida ${hero.health ?? "-"}` : "";
}

function goBackStep() {
  if (selectedHeroId) {
    selectedHeroId = "";
    renderHeroStep();
  } else if (selectedSubclass) {
    selectedSubclass = "";
    renderSubclassStep();
  } else if (selectedClass) {
    selectedClass = "";
    renderClassStep();
  }
  saveDeckToStorage();
}

function resetSelection() {
  if (!confirm("¿Cambiar la selección? Esto vaciará el mazo actual.")) return;
  selectedClass = "";
  selectedSubclass = "";
  selectedHeroId = "";
  deck = {};
  saveDeckToStorage();
  renderClassStep();
}

function fillFilters() {
  const classes = [...new Set(cards.map(card => card.class))]
    .sort((a, b) => (classOrder[a] ?? 999) - (classOrder[b] ?? 999));

  const types = [...new Set(cards.map(card => getDisplayCategory(card)))]
    .sort((a, b) => (typeOrder[a] ?? 999) - (typeOrder[b] ?? 999));

  for (const cls of classes) {
    const option = document.createElement("option");
    option.value = cls;
    option.textContent = cls;
    classFilter.appendChild(option);
  }

  for (const type of types) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  }
}

function cardIsAllowed(card) {
  if (!selectedClass || !selectedSubclass) return false;
  if (card.id === selectedHeroId) return true;
  if (card.type === "Héroe") return false;
  if (card.class === "Neutral" || card.class === "Sin clase") return true;
  if (card.class !== selectedClass) return false;
  if (card.subclassLocked && card.subclass && card.subclass !== selectedSubclass) return false;
  return true;
}

function isCardMaxed(card) {
  const currentAmount = deck[card.id] || 0;
  return currentAmount >= getPhysicalMaxCopies(card);
}

function renderCards() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedFilterClass = classFilter.value;
  const selectedType = typeFilter.value;
  const selectedCost = costFilter.value;

  const filteredCards = cards.filter(card => {
    const matchesSearch =
      card.name.toLowerCase().includes(query) ||
      (card.text || "").toLowerCase().includes(query) ||
      (card.subtype || "").toLowerCase().includes(query) ||
      (card.subclass || "").toLowerCase().includes(query) ||
      (card.sourceComponent || "").toLowerCase().includes(query);

    const matchesClass = !selectedFilterClass || card.class === selectedFilterClass;
    const matchesType = !selectedType || getDisplayCategory(card) === selectedType;

    let matchesCost = true;
    if (selectedCost === "6+") {
      matchesCost = Number(card.cost) >= 6;
    } else if (selectedCost === "none") {
      matchesCost = card.cost === null || card.cost === undefined;
    } else if (selectedCost !== "") {
      matchesCost = Number(card.cost) === Number(selectedCost);
    }

    return matchesSearch && matchesClass && matchesType && matchesCost;
  }).sort((a, b) => {
    const allowedDiff = Number(cardIsAllowed(b)) - Number(cardIsAllowed(a));
    if (allowedDiff !== 0) return allowedDiff;

    const maxedDiff = Number(isCardMaxed(a)) - Number(isCardMaxed(b));
    if (maxedDiff !== 0) return maxedDiff;

    const typeDiff = (typeOrder[a.type] ?? 999) - (typeOrder[b.type] ?? 999);
    if (typeDiff !== 0) return typeDiff;

    const costDiff = (a.cost ?? 999) - (b.cost ?? 999);
    if (costDiff !== 0) return costDiff;

    return a.name.localeCompare(b.name);
  });

  const allowedCount = filteredCards.filter(card => cardIsAllowed(card)).length;
  resultsCount.textContent = `${allowedCount} disponibles / ${filteredCards.length} resultados`;
  cardsGrid.innerHTML = "";

  if (filteredCards.length === 0) {
    cardsGrid.innerHTML = '<p class="empty-state">No se encontraron cartas.</p>';
    return;
  }

  for (const card of filteredCards) {
    const allowed = cardIsAllowed(card);
    const currentAmount = deck[card.id] || 0;
    const maxCopies = getPhysicalMaxCopies(card);
    const maxed = currentAmount >= maxCopies;
    const alreadySelected = currentAmount > 0;
    const cardElement = document.createElement("article");
    cardElement.className = `card ${allowed ? "" : "unavailable"} ${maxed ? "already-selected" : ""}`;

    const cost = card.cost ?? "-";
    const stats = getStatsHtml(card);
    const unavailableReason = allowed ? "" : getUnavailableReason(card);

    cardElement.innerHTML = `
      <div class="card-image">
        ${card.image ? `<img src="${getCardImagePath(card.image)}" alt="${escapeHtml(card.name)}" onerror="this.style.display='none'; this.parentElement.textContent='${escapeHtml(shortImageName(card.image))}'">` : "Sin imagen"}
      </div>

      <div class="card-content">
        <div class="card-top">
          <h3>${escapeHtml(card.name)}</h3>
          <div class="cost-badge">${cost}</div>
        </div>

        <div class="card-meta">
          ${escapeHtml(card.class)} · ${escapeHtml(getDisplayCategory(card))}
          ${card.subclass ? ` · ${escapeHtml(card.subclass)}` : ""}
          ${card.subtype ? ` · ${escapeHtml(card.subtype)}` : ""}
        </div>

        <div class="card-text">${escapeHtml(card.text || "")}</div>

        ${stats}

        <button ${allowed && !maxed ? "" : "disabled"} onclick="addToDeck('${card.id}')">
          ${maxed ? "Ya elegido" : (alreadySelected ? `Añadir (${currentAmount}/${maxCopies})` : (allowed ? "Añadir" : unavailableReason))}
        </button>
      </div>
    `;

    cardsGrid.appendChild(cardElement);
  }
}

function getUnavailableReason(card) {
  if (card.type === "Héroe") return "Otro héroe";
  if (card.class !== selectedClass && card.class !== "Neutral" && card.class !== "Sin clase") return "Otra clase";
  if (card.subclassLocked && card.subclass && card.subclass !== selectedSubclass) return "Otra subclase";
  return "No disponible";
}

function getStatsHtml(card) {
  const orbs = [];

  if (card.type === "Héroe") {
    if (card.health !== null && card.health !== undefined) {
      orbs.push(`<span class="stat-orb health-orb stat-right" title="Vida">${card.health}</span>`);
    }
  } else if (card.type === "Arma") {
    if (card.attack !== null && card.attack !== undefined) {
      orbs.push(`<span class="stat-orb attack-orb stat-left" title="Daño">${card.attack}</span>`);
    }
    if (card.durability !== null && card.durability !== undefined) {
      orbs.push(`<span class="stat-orb durability-orb stat-right" title="Durabilidad">${card.durability}</span>`);
    }
  } else if (card.type === "Campo") {
    if (card.health !== null && card.health !== undefined) {
      orbs.push(`<span class="stat-orb durability-orb stat-right" title="Duración/Vida">${card.health}</span>`);
    }
  } else if ((card.type === "Esbirro" || card.type === "Esbirro Extra")) {
    if (card.attack !== null && card.attack !== undefined) {
      orbs.push(`<span class="stat-orb attack-orb stat-left" title="Daño">${card.attack}</span>`);
    }
    if (card.health !== null && card.health !== undefined) {
      orbs.push(`<span class="stat-orb health-orb stat-right" title="Salud">${card.health}</span>`);
    }
  }

  return orbs.length ? `<div class="card-stats orb-stats">${orbs.join("")}</div>` : "";
}

function getMaxCopies(card) {
  if (card.type === "Héroe") return 1;
  if ((card.subtype || "").toLowerCase().includes("único")) return 1;
  return DEFAULT_MAX_COPIES;
}

function addToDeck(cardId) {
  const card = cards.find(card => card.id === cardId);
  if (!card) return;

  if (!cardIsAllowed(card)) {
    alert(getUnavailableReason(card));
    return;
  }

  const currentAmount = deck[cardId] || 0;
  const maxCopies = getPhysicalMaxCopies(card);

  if (currentAmount >= maxCopies) {
    alert(`Solo puedes llevar ${maxCopies} copia(s) de esta carta.`);
    return;
  }

  if (countsForMainDeck(card) && getMainDeckCount(cardId, 1) > 30) {
    alert("El Main Deck no puede superar 30 cartas. Las cartas Extra, Tokens, Second Deck y el héroe no cuentan.");
    return;
  }

  deck[cardId] = currentAmount + 1;
  saveDeckToStorage();
  renderDeck();
  renderCards();
}

function removeOneFromDeck(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (card && card.type === "Héroe") {
    alert("El héroe no se puede quitar. Cambia de héroe para elegir otro.");
    return;
  }

  if (!deck[cardId]) return;
  deck[cardId]--;
  if (deck[cardId] <= 0) delete deck[cardId];

  saveDeckToStorage();
  renderDeck();
  renderCards();
}

function addOneFromDeck(cardId) {
  addToDeck(cardId);
}

function removeAllFromDeck(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (card && card.type === "Héroe") {
    alert("El héroe no se puede quitar. Cambia de héroe para elegir otro.");
    return;
  }

  delete deck[cardId];
  saveDeckToStorage();
  renderDeck();
  renderCards();
}

function renderDeck() {
  const entries = Object.entries(deck);
  deckList.innerHTML = "";

  if (entries.length === 0) {
    deckList.innerHTML = '<p class="empty-state">Tu mazo está vacío.</p>';
  }

  let total = 0;
  let mainTotal = 0;

  const sortedEntries = entries.sort((a, b) => {
    const cardA = cards.find(card => card.id === a[0]);
    const cardB = cards.find(card => card.id === b[0]);

    const typeDiff = (typeOrder[cardA?.type] ?? 999) - (typeOrder[cardB?.type] ?? 999);
    if (typeDiff !== 0) return typeDiff;

    const costDiff = (cardA?.cost ?? 999) - (cardB?.cost ?? 999);
    if (costDiff !== 0) return costDiff;

    return (cardA?.name || "").localeCompare(cardB?.name || "");
  });

  for (const [cardId, amount] of sortedEntries) {
    const card = cards.find(card => card.id === cardId);
    if (!card) continue;

    if (card.type !== "Héroe") total += amount;
    if (countsForMainDeck(card)) mainTotal += amount;

    const item = document.createElement("div");
    item.className = "deck-item";

    item.innerHTML = `
      <div>
        <div class="deck-item-name">${amount}x ${escapeHtml(card.name)}</div>
        <small>${escapeHtml(getUntapZone(card))} · ${escapeHtml(card.class)} · ${escapeHtml(getDisplayCategory(card))}${card.subclass ? " · " + escapeHtml(card.subclass) : ""} · Coste ${card.cost ?? "-"}</small>
      </div>

      <div class="deck-item-controls">
        <button class="small-button" onclick="removeOneFromDeck('${card.id}')">-</button>
        <button class="small-button" onclick="addOneFromDeck('${card.id}')">+</button>
        <button class="small-button remove-button" onclick="removeAllFromDeck('${card.id}')">x</button>
      </div>
    `;

    deckList.appendChild(item);
  }

  deckTotal.textContent = `${mainTotal}/30`;
  uniqueTotal.textContent = entries.filter(([cardId]) => {
    const card = cards.find(card => card.id === cardId);
    return card && card.type !== "Héroe";
  }).length;
  updateIdentity();
  updateExportText();
  renderCostChart();
}

function updateExportText() {
  const zones = {
    "Play": [],
    "Main Deck": [],
    "Second Deck": [],
    "Tokens": []
  };

  for (const [cardId, amount] of Object.entries(deck)) {
    const card = cards.find(card => card.id === cardId);
    if (!card) continue;

    const zone = getUntapZone(card);
    if (!zones[zone]) zones[zone] = [];
    zones[zone].push(`${amount} ${card.name}`);
  }

  const output = [];

  for (const zoneName of ["Play", "Main Deck", "Second Deck", "Tokens"]) {
    if (zones[zoneName].length === 0) continue;
    output.push(`[${zoneName}]`);
    output.push(...zones[zoneName].sort());
    output.push("");
  }

  exportText.value = output.join("\n").trim();
}

function renderCostChart() {
  const buckets = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6+": 0 };
  let totalCost = 0;
  let totalCards = 0;

  for (const [cardId, amount] of Object.entries(deck)) {
    const card = cards.find(card => card.id === cardId);

    // La curva solo cuenta Main Deck.
    // No cuenta héroe, tokens, pócimas, Second Deck ni cartas Extra.
    if (!card || !countsForMainDeck(card)) continue;
    if (card.cost === null || card.cost === undefined) continue;

    const numericCost = Number(card.cost);
    const bucket = numericCost >= 6 ? "6+" : String(numericCost);

    if (buckets[bucket] !== undefined) {
      buckets[bucket] += amount;
      totalCost += numericCost * amount;
      totalCards += amount;
    }
  }

  const averageCost = totalCards > 0 ? totalCost / totalCards : 0;
  averageCostLabel.textContent = `Promedio: ${averageCost.toFixed(2)}`;

  const maxValue = Math.max(...Object.values(buckets), 1);
  costChart.innerHTML = "";

  for (const [label, amount] of Object.entries(buckets)) {
    const height = (amount / maxValue) * 100;

    const column = document.createElement("div");
    column.className = "bar-column";
    column.innerHTML = `
      <div class="bar-value">${amount}</div>
      <div class="bar" style="height: ${height}%"></div>
      <div class="bar-label">${label}</div>
    `;

    costChart.appendChild(column);
  }
}

function saveDeckToStorage() {
  localStorage.setItem("duelosDeck", JSON.stringify(deck));
  localStorage.setItem("duelosSelectedClass", selectedClass);
  localStorage.setItem("duelosSelectedSubclass", selectedSubclass);
  localStorage.setItem("duelosSelectedHeroId", selectedHeroId);
}

function loadDeckFromStorage() {
  const saved = localStorage.getItem("duelosDeck");
  selectedClass = localStorage.getItem("duelosSelectedClass") || "";
  selectedSubclass = localStorage.getItem("duelosSelectedSubclass") || "";
  selectedHeroId = localStorage.getItem("duelosSelectedHeroId") || "";
  if (saved) deck = JSON.parse(saved);

  if (selectedHeroId && !deck[selectedHeroId]) {
    deck[selectedHeroId] = 1;
  }
}

function getIconImageHtml(value, label = "") {
  if (!value) return "";
  const src = getCardImagePath(value);
  const safeLabel = escapeHtml(label || shortImageName(value));
  const safeName = escapeHtml(shortImageName(value));
  return `<img src="${src}" alt="${safeLabel}" title="${safeLabel}" onerror="this.style.display='none'; this.parentElement.textContent='${safeName}'">`;
}

function cleanImageFilename(value) {
  let filename = String(value).split("/").pop().trim();

  const match = filename.match(/^(.+?\.(png|jpg|jpeg|webp|gif))/i);
  if (match) {
    filename = match[1];
  }

  return filename;
}

function getCardImagePath(value) {
  const filename = cleanImageFilename(value);
  return `images/${filename}`;
}

function isPotion(card) {
  const name = card.name.toLowerCase();
  const subtype = (card.subtype || "").toLowerCase();
  const text = (card.text || "").toLowerCase();
  const image = (card.image || "").toLowerCase();

  return (
    name.includes("pócima") ||
    name.includes("pocima") ||
    subtype.includes("pócima") ||
    subtype.includes("pocima") ||
    image.includes("pocima") ||
    image.includes("pócima")
  );
}

function getDisplayCategory(card) {
  if (card.type === "Héroe") return "Héroe";
  if (card.type === "Esbirro Extra" || isPotion(card)) return "Extra";
  return card.type;
}

function getUntapZone(card) {
  if (card.type === "Héroe") return "Play";
  if (card.type === "Esbirro Extra") return "Tokens";
  if (isPotion(card)) return "Second Deck";
  return "Main Deck";
}


function countsForMainDeck(card) {
  return getUntapZone(card) === "Main Deck";
}

function getMainDeckCount(extraCardId = null, extraAmount = 0) {
  let total = 0;

  for (const [cardId, amount] of Object.entries(deck)) {
    const card = cards.find(card => card.id === cardId);
    if (!card || !countsForMainDeck(card)) continue;
    total += amount;
  }

  if (extraCardId && extraAmount > 0) {
    const extraCard = cards.find(card => card.id === extraCardId);
    if (extraCard && countsForMainDeck(extraCard)) {
      total += extraAmount;
    }
  }

  return total;
}

function getTotalDeckCount() {
  return Object.entries(deck).reduce((total, [cardId, amount]) => {
    const card = cards.find(card => card.id === cardId);
    if (!card || card.type === "Héroe") return total;
    return total + amount;
  }, 0);
}


function getPhysicalMaxCopies(card) {
  const name = card.name.toLowerCase().trim();
  const subtype = (card.subtype || "").toLowerCase();

  if (card.type === "Arma") return 1;
  if (card.type === "Campo") return 1;
  if (isPotion(card)) return 1;
  if (subtype.includes("único") || subtype.includes("unico")) return 1;

  const tokenLimits = {
    "reanimado": 10,
    "soldado raso": 10,
    "víctima de la dama tóxica": 4,
    "victima de la dama toxica": 4
  };

  if (tokenLimits[name] !== undefined) {
    return tokenLimits[name];
  }

  return getMaxCopies(card);
}
function shortImageName(value) {
  return cleanImageFilename(value).replace(/\.(png|jpg|jpeg|webp|gif)$/i, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

backStepButton.addEventListener("click", goBackStep);
resetSetupButton.addEventListener("click", resetSelection);
changeSelectionButton.addEventListener("click", resetSelection);

copyButton.addEventListener("click", async () => {
  if (!exportText.value.trim()) {
    alert("El mazo está vacío.");
    return;
  }

  await navigator.clipboard.writeText(exportText.value);
  copyButton.textContent = "Copiado";

  setTimeout(() => {
    copyButton.textContent = "Copiar";
  }, 1200);
});

downloadButton.addEventListener("click", () => {
  if (!exportText.value.trim()) {
    alert("El mazo está vacío.");
    return;
  }

  const blob = new Blob([exportText.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const safeNameParts = [selectedClass, selectedSubclass]
    .filter(Boolean)
    .join("-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const filename = `${safeNameParts || "duelos"}-deck.txt`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  deckUrlOutput.value = url;
  downloadButton.textContent = "Exportado";

  setTimeout(() => {
    downloadButton.textContent = "Exportar mazo";
  }, 1200);
});

clearButton.addEventListener("click", () => {
  if (!confirm("¿Vaciar el mazo? Se conservará el héroe elegido.")) return;
  const heroId = selectedHeroId;
  deck = {};
  if (heroId) deck[heroId] = 1;
  saveDeckToStorage();
  renderDeck();
  renderCards();
  deckUrlOutput.value = "";
});

searchInput.addEventListener("input", renderCards);
classFilter.addEventListener("change", renderCards);
typeFilter.addEventListener("change", renderCards);
costFilter.addEventListener("change", renderCards);

loadData();
