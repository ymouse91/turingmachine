"use strict";

const core = window.TuringCore;

const state = {
  game: null,
  symbol: "pound",
  players: [],
  currentPlayer: 0,
  round: 1,
  turnProposal: null,
  turnVerifiers: [],
  finished: false
};

const els = {
  setupScreen: document.querySelector("#setup-screen"),
  setupForm: document.querySelector("#setup-form"),
  boardScreen: document.querySelector("#board-screen"),
  roundTitle: document.querySelector("#round-title"),
  players: document.querySelector("#players"),
  challengeTitle: document.querySelector("#challenge-title"),
  symbolBadge: document.querySelector("#symbol-badge"),
  verifierGrid: document.querySelector("#verifier-grid"),
  turnTitle: document.querySelector("#turn-title"),
  passTurn: document.querySelector("#pass-turn"),
  newGame: document.querySelector("#new-game"),
  blueDigit: document.querySelector("#blue-digit"),
  yellowDigit: document.querySelector("#yellow-digit"),
  purpleDigit: document.querySelector("#purple-digit"),
  verifierSelect: document.querySelector("#verifier-select"),
  runTest: document.querySelector("#run-test"),
  resultBox: document.querySelector("#result-box"),
  playerNotes: document.querySelector("#player-notes"),
  playerLog: document.querySelector("#player-log"),
  revealGame: document.querySelector("#reveal-game"),
  guessCurrent: document.querySelector("[data-guess='current']"),
  turnDialog: document.querySelector("#turn-dialog"),
  dialogTitle: document.querySelector("#dialog-title"),
  dialogCopy: document.querySelector("#dialog-copy"),
  endDialog: document.querySelector("#end-dialog"),
  endTitle: document.querySelector("#end-title"),
  endCopy: document.querySelector("#end-copy")
};

function createOption(value, label = value, selected = false) {
  const option = document.createElement("option");
  option.value = String(value);
  option.textContent = String(label);
  option.defaultSelected = selected;
  option.selected = selected;
  return option;
}

function setupDigitSelects() {
  const digits = [1, 2, 3, 4, 5].map((digit) => createOption(digit, digit, digit === 1));
  els.blueDigit.replaceChildren(...digits.map((option) => option.cloneNode(true)));
  els.yellowDigit.replaceChildren(...digits.map((option) => option.cloneNode(true)));
  els.purpleDigit.replaceChildren(...digits.map((option) => option.cloneNode(true)));
  [els.blueDigit, els.yellowDigit, els.purpleDigit].forEach((select) => {
    select.addEventListener("change", () => syncDigitDisplay(select));
    setupDigitMenu(select);
  });
  resetDigitSelects();
}

function setupDigitMenu(select) {
  const slot = select.parentElement;
  const trigger = document.createElement("button");
  const menu = document.createElement("div");

  trigger.type = "button";
  trigger.className = "digit-trigger";
  trigger.setAttribute("aria-label", select.getAttribute("aria-label"));
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  menu.className = "digit-menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;
  slot.append(trigger, menu);

  [1, 2, 3, 4, 5].forEach((digit) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "digit-menu-option";
    button.dataset.digit = String(digit);
    button.setAttribute("role", "option");
    button.textContent = String(digit);
    button.addEventListener("click", () => {
      select.value = String(digit);
      syncDigitDisplay(select);
      closeDigitMenus();
      trigger.focus();
    });
    menu.append(button);
  });

  trigger.addEventListener("click", () => {
    if (select.disabled) return;
    toggleDigitMenu(select);
  });

  trigger.addEventListener("keydown", (event) => {
    if (select.disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDigitMenu(select);
    }
    if (event.key === "Escape") closeDigitMenus();
  });
}

function toggleDigitMenu(select) {
  const menu = select.parentElement.querySelector(".digit-menu");
  const trigger = select.parentElement.querySelector(".digit-trigger");
  const shouldOpen = menu.hidden;
  closeDigitMenus();
  if (!shouldOpen) return;
  updateDigitMenu(select);
  menu.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
}

function updateDigitMenu(select) {
  select.parentElement.querySelectorAll(".digit-menu-option").forEach((button) => {
    const selected = button.dataset.digit === select.value;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-selected", String(selected));
  });
}

function closeDigitMenus() {
  document.querySelectorAll(".digit-menu").forEach((menu) => {
    menu.hidden = true;
  });
  document.querySelectorAll(".digit-trigger").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}

function syncDigitDisplay(select) {
  const slot = select.parentElement;
  const trigger = slot.querySelector(".digit-trigger");
  slot.dataset.digit = select.value;
  if (trigger) {
    trigger.dataset.digit = select.value;
    trigger.setAttribute("aria-label", `${select.getAttribute("aria-label")}, valittu ${select.value}`);
  }
  slot.classList.remove("digit-refresh");
  window.requestAnimationFrame(() => slot.classList.add("digit-refresh"));
}

function resetDigitSelects() {
  [els.blueDigit, els.yellowDigit, els.purpleDigit].forEach((select) => {
    [...select.options].forEach((option, index) => {
      option.selected = index === 0;
      option.defaultSelected = index === 0;
    });
    select.selectedIndex = 0;
    select.value = "1";
    syncDigitDisplay(select);
  });
  setDigitSelectsDisabled(false);
}

function selectedCode() {
  return {
    blue: Number(els.blueDigit.value),
    yellow: Number(els.yellowDigit.value),
    purple: Number(els.purpleDigit.value),
    get value() {
      return `${this.blue}${this.yellow}${this.purple}`;
    }
  };
}

function currentPlayer() {
  return state.players[state.currentPlayer];
}

function startGame(form) {
  const data = new FormData(form);
  const playerCount = Number(data.get("players"));
  const difficulty = data.get("difficulty");
  const verifierCount = Number(data.get("verifiers"));

  state.game = core.generateGame(verifierCount, difficulty);
  state.symbol = core.SYMBOLS[core.randomInt(0, core.SYMBOLS.length - 1)];
  state.players = Array.from({ length: playerCount }, (_, index) => ({
    name: `Pelaaja ${index + 1}`,
    tests: [],
    notes: "",
    guesses: 0,
    revealed: false,
    solved: false
  }));
  state.currentPlayer = 0;
  state.round = 1;
  state.turnProposal = null;
  state.turnVerifiers = [];
  state.finished = false;
  resetDigitSelects();

  els.setupScreen.hidden = true;
  els.boardScreen.hidden = false;
  renderStaticChallenge(difficulty);
  renderTurn(true);
}

function renderStaticChallenge(difficulty) {
  els.challengeTitle.textContent = `${core.DIFFICULTIES[difficulty].label} / ${state.game.verifiers.length}`;
  els.symbolBadge.className = `symbol-badge ${state.symbol}`;
  els.symbolBadge.textContent = core.SYMBOL_LABELS[state.symbol];
  els.verifierGrid.dataset.count = String(state.game.verifiers.length);
  els.verifierGrid.replaceChildren(...state.game.verifiers.map(renderVerifier));
  els.verifierSelect.replaceChildren(...state.game.verifiers.map((verifier, index) => {
    return createOption(index, `${String.fromCharCode(65 + index)} / Tarkistin ${verifier}`);
  }));
}

function renderVerifier(verifier, index) {
  const criterion = state.game.criteria[index];
  const card = document.createElement("article");
  card.className = "verifier-card";

  const top = document.createElement("div");
  top.className = "verifier-heading";
  const letter = document.createElement("span");
  letter.className = "verifier-label";
  letter.textContent = String.fromCharCode(65 + index);
  const number = document.createElement("span");
  number.className = "verifier-number";
  number.textContent = String(verifier);
  const checkNumber = document.createElement("span");
  checkNumber.className = "check-number";
  checkNumber.textContent = core.CHECK_CARDS[criterion.checkcard][state.symbol];
  const checkSymbol = document.createElement("span");
  checkSymbol.className = "check-symbol";
  checkSymbol.textContent = core.SYMBOL_LABELS[state.symbol];
  top.append(letter, number, checkNumber, checkSymbol);

  const criteria = document.createElement("p");
  criteria.className = "criterion-list";
  core.PARSED_VERIFIERS[verifier].forEach((item, optionIndex) => {
    if (optionIndex > 0) criteria.append(document.createTextNode(" | "));
    criteria.append(...core.renderCriterionDescription(core.describeCriterion(item.name)));
  });

  card.append(top, criteria);
  return card;
}

function renderTurn(showDialog = false) {
  const player = currentPlayer();
  state.turnProposal = null;
  state.turnVerifiers = [];
  resetDigitSelects();
  els.roundTitle.textContent = `Kierros ${state.round}`;
  els.turnTitle.textContent = player.name;
  els.players.replaceChildren(...state.players.map(renderPlayer));
  els.playerNotes.value = player.notes;
  updateVerifierOptions();
  renderLog();
  clearResult();

  if (showDialog && state.players.length > 1) {
    els.dialogTitle.textContent = player.name;
    els.dialogCopy.textContent = "Anna iPad seuraavalle pelaajalle. Edellisen pelaajan testit ja muistiinpanot ovat piilossa.";
    els.turnDialog.showModal();
  }
}

function renderPlayer(player, index) {
  const card = document.createElement("div");
  card.className = `player-card${index === state.currentPlayer ? " active" : ""}`;
  const text = document.createElement("div");
  const name = document.createElement("div");
  name.className = "player-name";
  name.textContent = player.name;
  const meta = document.createElement("div");
  meta.className = "player-meta";
  if (player.solved) {
    meta.textContent = `${player.tests.length} testiä, ratkaistu`;
  } else if (player.revealed) {
    meta.textContent = "pois pelistä";
  } else {
    meta.textContent = `${player.tests.length} testiä, ${player.guesses} arvausta`;
  }
  text.append(name, meta);
  card.append(text);
  return card;
}

function renderLog() {
  const rows = currentPlayer().tests.map((test) => {
    const item = document.createElement("li");
    item.textContent = `${test.code} -> ${test.letter}: ${test.result ? "kyllä" : "ei"}`;
    return item;
  });
  els.playerLog.replaceChildren(...rows);
}

function clearResult() {
  els.resultBox.className = "result-box";
  els.resultBox.textContent = "Valitse koodi ja tarkistin.";
  els.runTest.disabled = false;
}

function runTest() {
  if (state.finished) return;
  const verifierIndex = Number(els.verifierSelect.value);
  if (state.turnVerifiers.length >= 3) {
    showTurnLimit();
    return;
  }
  if (state.turnVerifiers.includes(verifierIndex)) {
    els.resultBox.className = "result-box no";
    els.resultBox.textContent = "Samaa tarkistinta voi käyttää tällä vuorolla vain kerran.";
    return;
  }

  const criterion = state.game.criteria[verifierIndex];
  const code = state.turnProposal || selectedCode();
  const result = criterion.predicate(code);
  const letter = String.fromCharCode(65 + verifierIndex);

  if (!state.turnProposal) {
    state.turnProposal = code;
    setDigitSelectsDisabled(true);
  }
  state.turnVerifiers.push(verifierIndex);
  currentPlayer().tests.push({ code: code.value, letter, result });
  els.resultBox.className = `result-box ${result ? "yes" : "no"}`;
  els.resultBox.textContent = `${code.value} tarkistimella ${letter}: ${result ? "kyllä" : "ei"} (${state.turnVerifiers.length}/3)`;
  updateVerifierOptions();
  if (state.turnVerifiers.length >= 3) showTurnLimit(false);
  renderLog();
  renderPlayersOnly();
}

function setDigitSelectsDisabled(disabled) {
  if (disabled) closeDigitMenus();
  [els.blueDigit, els.yellowDigit, els.purpleDigit].forEach((select) => {
    select.disabled = disabled;
    select.parentElement.querySelector(".digit-trigger").disabled = disabled;
  });
}

function updateVerifierOptions() {
  [...els.verifierSelect.options].forEach((option) => {
    option.disabled = state.turnVerifiers.includes(Number(option.value));
  });
  if (els.verifierSelect.selectedOptions[0]?.disabled) {
    const next = [...els.verifierSelect.options].find((option) => !option.disabled);
    if (next) els.verifierSelect.value = next.value;
  }
  els.runTest.disabled = state.turnVerifiers.length >= 3;
}

function showTurnLimit(replaceText = true) {
  els.runTest.disabled = true;
  if (replaceText) {
    els.resultBox.className = "result-box";
    els.resultBox.textContent = "Tällä koodiehdotuksella on jo käytetty 3 tarkistinta. Vaihda vuoroa.";
  }
}

function renderPlayersOnly() {
  els.players.replaceChildren(...state.players.map(renderPlayer));
}

function passTurn() {
  if (state.finished) return;
  currentPlayer().notes = els.playerNotes.value;
  setDigitSelectsDisabled(false);
  advanceToNextPlayer();
  renderTurn(true);
}

function advanceToNextPlayer() {
  const previousPlayer = state.currentPlayer;
  do {
    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    if (state.currentPlayer === 0) state.round += 1;
  } while (currentPlayer().revealed && state.currentPlayer !== previousPlayer);
}

function solutionSummary(player) {
  const code = state.game.code.value;
  const criteria = state.game.criteria.map((criterion, index) => {
    return `${String.fromCharCode(65 + index)}: ${core.describeCriterion(criterion.name)}`;
  }).join(" | ");
  return `${player.name}, koodi oli ${code}. ${criteria}`;
}

function guessCurrentCode() {
  if (state.finished) return;
  const code = (state.turnProposal || selectedCode()).value;
  const player = currentPlayer();
  player.guesses += 1;
  if (code === state.game.code.value) {
    player.solved = true;
    state.finished = true;
    renderPlayersOnly();
    showEnd(solutionSummary(player), "Ratkaistu");
  } else {
    els.resultBox.className = "result-box no";
    els.resultBox.textContent = `${code} ei ole ratkaisu.`;
    renderPlayersOnly();
  }
}

function revealGame() {
  const player = currentPlayer();
  player.notes = els.playerNotes.value;
  player.revealed = true;
  showEnd(solutionSummary(player), "Paljastettu");
  if (activePlayers().length === 0) {
    state.finished = true;
  }
}

function showEnd(copy, title) {
  els.endTitle.textContent = title;
  els.endCopy.textContent = copy;
  els.endDialog.showModal();
}

function activePlayers() {
  return state.players.filter((player) => !player.revealed);
}

els.setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startGame(event.currentTarget);
});

els.runTest.addEventListener("click", runTest);
els.passTurn.addEventListener("click", passTurn);
els.guessCurrent.addEventListener("click", guessCurrentCode);
els.revealGame.addEventListener("click", revealGame);
els.endDialog.addEventListener("close", () => {
  if (!state.game || !currentPlayer().revealed) return;
  if (state.finished) {
    renderPlayersOnly();
    els.runTest.disabled = true;
    setDigitSelectsDisabled(true);
    els.resultBox.className = "result-box";
    els.resultBox.textContent = "Kaikki pelaajat ovat poistuneet pelistä.";
    return;
  }
  advanceToNextPlayer();
  renderTurn(true);
});
els.newGame.addEventListener("click", () => {
  currentPlayer().notes = els.playerNotes.value;
  els.boardScreen.hidden = true;
  els.setupScreen.hidden = false;
});
els.playerNotes.addEventListener("input", () => {
  currentPlayer().notes = els.playerNotes.value;
});
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".code-slot")) closeDigitMenus();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
  });
}

setupDigitSelects();
