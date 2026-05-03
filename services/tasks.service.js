const pool = require("../database/db");

const addTaskService = async ({ title, description, category, completed }) => {
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, category, completed) VALUES ($1, $2, $3, $4) RETURNING *;",
            [
                title.trim(),
                description || null,
                category || "other",
                completed !== undefined ? completed : false,
            ]
        );

        return result.rows[0];
    } catch (error) {
        const err = new Error("Database error while creating task");
        err.status = 500;
        throw err;
    }
};

const getTasksService = async () => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id ASC;"
        );

        return result.rows;
    } catch (error) {
        const err = new Error("Database error while fetching tasks");
        err.status = 500;
        throw err;
    }
};

const deleteTaskService = async (ids) => {
    const deleted = [];
    const notFound = [];

    for (const id of ids) {
        try {
            const check = await pool.query(
                "SELECT id FROM tasks WHERE id = $1;",
                [id]
            );

            if (check.rows.length === 0) {
                notFound.push(id);
                continue;
            }

            await pool.query(
                "DELETE FROM tasks WHERE id = $1;",
                [id]
            );

            deleted.push(id);
        } catch (error) {
            throw new Error("Database error while deleting tasks");
        }
    }

    return { deleted, notFound };
};

const markTaskService = async (ids) => {
    const updated = [];
    const alreadyCompleted = [];
    const notFound = [];

    for (const id of ids) {
        try {
            const result = await pool.query(
                "SELECT * FROM tasks WHERE id = $1;",
                [id]
            );

            if (result.rows.length === 0) {
                notFound.push(id);
                continue;
            }

            const task = result.rows[0];

            if (task.completed) {
                alreadyCompleted.push(id);
                continue;
            }

            await pool.query(
                "UPDATE tasks SET completed = true WHERE id = $1;",
                [id]
            );

            updated.push(id);
        } catch (error) {
            throw new Error("Database error while updating tasks");
        }
    }

    return { updated, alreadyCompleted, notFound };
};

const editTaskService = async (tasks) => {
    const updated = [];
    const notFound = [];

    for (const task of tasks) {
        try {
            const check = await pool.query(
                "SELECT id FROM tasks WHERE id = $1;",
                [task.id]
            );

            if (check.rows.length === 0) {
                notFound.push(task.id);
                continue;
            }

            await pool.query(
                "UPDATE tasks SET title = $1, description = $2, category = $3 WHERE id = $4;",
                [
                    task.title,
                    task.description,
                    task.category,
                    task.id,
                ]
            );

            updated.push(task.id);
        } catch (error) {
            throw new Error("Database error while updating tasks");
        }
    }

    return { updated, notFound };
};

module.exports = { addTaskService, getTasksService, deleteTaskService, markTaskService, editTaskService };