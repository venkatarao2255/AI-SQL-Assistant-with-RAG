const forbidden = ["DROP", "DELETE", "TRUNCATE", "ALTER"];

function isSafeQuery(query) {
  const upper = query.toUpperCase();
  return !forbidden.some((word) => upper.includes(word));
}

module.exports = { isSafeQuery };