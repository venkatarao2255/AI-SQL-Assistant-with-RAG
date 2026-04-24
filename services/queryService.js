const pool = require("./db");
const { isSafeQuery } = require("../utils/safety");

async function executeQuery(sql) {
  try {
    // safety check
    if (!isSafeQuery(sql)) {
      throw new Error("Unsafe query detected");
    }

    // execute SQL
    const [rows] = await pool.query(sql);
    return rows;

  } catch (err) {
    console.error("Query Execution Error:", err.message);
    throw new Error("Database execution failed");
  }
}

// ✅ IMPORTANT EXPORT
module.exports = {
  executeQuery
};