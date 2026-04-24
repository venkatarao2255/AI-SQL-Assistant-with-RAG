const dataset = require("../data/dataset.json");

// 🔥 Simple scoring-based retrieval (REAL RAG logic, no vector DB)
function retrieveRelevantData(userInput) {
  const query = userInput.toLowerCase().split(" ");

  const scored = dataset.map((row) => {
    let score = 0;

    for (let value of Object.values(row)) {
      const text = String(value).toLowerCase();

      query.forEach((word) => {
        if (text.includes(word)) {
          score += 1;
        }
      });
    }

    return { row, score };
  });

  // sort by relevance
  scored.sort((a, b) => b.score - a.score);

  // take top 3 most relevant rows
  const topK = scored.slice(0, 3).map((item) => item.row);

  return topK.length ? topK : dataset.slice(0, 3);
}

module.exports = { retrieveRelevantData };