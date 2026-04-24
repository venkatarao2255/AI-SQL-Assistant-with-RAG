const express = require("express");
const router = express.Router();

const schema = require("../data/schema.json");

const { getBestQuery, explainQuery } = require("../services/aiService");
const queryService = require("../services/queryService");
const { retrieveRelevantData } = require("../services/retriever");

// =========================
// RAG QUERY ROUTE
// =========================
router.post("/query", async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "User input required" });
    }

    const relevantData = retrieveRelevantData(userInput);

    const sql = await getBestQuery(relevantData, schema, userInput);

    const results = await queryService.executeQuery(sql);

    res.json({
      sql,
      results,
      contextUsed: relevantData,
    });

  } catch (err) {
    console.error("Route Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// EXPLAIN ROUTE (FIXED)
// =========================
router.post("/explain", async (req, res) => {
  try {
    const { sql } = req.body;

    if (!sql) {
      return res.status(400).json({ error: "SQL required" });
    }

    const explanation = await explainQuery(sql);

    res.json({ explanation });

  } catch (err) {
    console.error("Explain Route Error:", err.message);
    res.status(500).json({ error: "Failed to get explanation" });
  }
});

module.exports = router;