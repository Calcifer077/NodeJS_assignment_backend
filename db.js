// db.js
const sql = require("mssql");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: "localhost\\sqlexpress",
  port: 1433, // optional if using default
  database: process.env.DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Generic function to run queries
async function executeQuery(query, params = []) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    // Add parameters if provided
    params.forEach((p) => {
      request.input(p.name, p.type, p.value);
    });

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Database Error:", err);
    throw err;
  } finally {
    await sql.close();
  }
}

module.exports = { executeQuery, sql };
