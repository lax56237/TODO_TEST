const pool = require("../db");

const addTaskService = async ({ title, description, category, completed }) => {
    try {
        const query = `
      INSERT INTO tasks (title, description, category, completed)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

        const values = [
            title.trim(),
            description || null,
            category || "other",
            completed !== undefined ? completed : false,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        const err = new Error("Database error while creating task");
        err.status = 500;
        throw err;
    }
};

const getTasksService = async () => {
    try {
        const query = "SELECT * FROM tasks ORDER BY id ASC;";
        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        const err = new Error("Database error while fetching tasks");
        err.status = 500;
        throw err;
    }
};

const deleteTaskService = async (id) => {
    try {
        const check = await pool.query(
            "SELECT id FROM tasks WHERE id = $1;",
            [id]
        );

        if (check.rows.length === 0) {
            const err = new Error("Task not found");
            err.status = 404;
            throw err;
        }

        await pool.query("DELETE FROM tasks WHERE id = $1;", [id]);

        return true;
    } catch (error) {
        if (error.status) throw error;

        const err = new Error("Database error while deleting task");
        err.status = 500;
        throw err;
    }
};

const markTaskService = async (id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            const err = new Error("Task not found");
            err.status = 404;
            throw err;
        }

        const task = result.rows[0];

        if (task.completed) {
            const err = new Error("Task already completed");
            err.status = 400;
            throw err;
        }

        const update = await pool.query(
            "UPDATE tasks SET completed = true WHERE id = $1 RETURNING *;",
            [id]
        );

        return update.rows[0];
    } catch (error) {
        if (error.status) throw error;

        const err = new Error("Database error while updating task");
        err.status = 500;
        throw err;
    }
};

const editTaskService = async (id, { title, description, category }) => {
    try {
        const check = await pool.query(
            "SELECT id FROM tasks WHERE id = $1;",
            [id]
        );

        if (check.rows.length === 0) {
            const err = new Error("Task not found");
            err.status = 404;
            throw err;
        }

        const result = await pool.query(
            `UPDATE tasks
       SET title = $1,
           description = $2,
           category = $3
       WHERE id = $4
       RETURNING *;`,
            [title.trim(), description || null, category || "other", id]
        );

        return result.rows[0];
    } catch (error) {
        if (error.status) throw error;

        const err = new Error("Database error while updating task");
        err.status = 500;
        throw err;
    }
};

module.exports = {
    addTaskService,
    getTasksService,
    deleteTaskService,
    markTaskService,
    editTaskService,
};