const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    } else {
        console.log("Database connected successfully");
        release();
    }
});

pool.on("error", (err) => {
    console.error("Unexpected database error:", err.message);
});

module.exports = pool;