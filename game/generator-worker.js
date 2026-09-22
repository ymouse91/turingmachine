"use strict";

importScripts("../app.js?v=20");

self.addEventListener("message", (event) => {
  const { id, verifierCount, difficulty } = event.data;

  try {
    const game = self.TuringCore.generateGame(verifierCount, difficulty);
    self.postMessage({
      id,
      ok: true,
      game: {
        tries: game.tries,
        verifiers: game.verifiers,
        criteria: game.criteria.map((criterion) => ({
          name: criterion.name,
          checkcard: criterion.checkcard
        })),
        code: game.code
      }
    });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : "Tehtävän generointi epäonnistui."
    });
  }
});
