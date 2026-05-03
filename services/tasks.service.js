const pool = require("../database/db");

async function runQuery(query, params, errorMessage) {
    try {
        return await pool.query(query, params);
    } catch (err) {
        const error = new Error(errorMessage);
        error.status = 500;
        error.originalError = err;
        throw error;
    }
}

async function addTaskService({ title, description, category, completed }) {
    const result = await runQuery(
        "INSERT INTO tasks (title, description, category, completed) VALUES ($1, $2, $3, $4) RETURNING *;",
        [
            title.trim(),
            description || null,
            category || "other",
            completed !== undefined ? completed : false,
        ],
        "Database error while creating task"
    );
    return result.rows[0];
}

async function getTasksService() {
    const result = await runQuery(
        "SELECT * FROM tasks ORDER BY id ASC;",
        [],
        "Database error while fetching tasks"
    );
    return result.rows;
}

async function deleteTaskService(ids) {
    const deleted = [];
    const notFound = [];

    for (const id of ids) {
        const check = await runQuery(
            "SELECT id FROM tasks WHERE id = $1;",
            [id],
            "Database error while checking task existence"
        );

        if (check.rows.length === 0) {
            notFound.push(id);
            continue;
        }

        await runQuery(
            "DELETE FROM tasks WHERE id = $1;",
            [id],
            "Database error while deleting task"
        );

        deleted.push(id);
    }

    return { deleted, notFound };
}

async function markTaskService(ids) {
    const updated = [];
    const alreadyCompleted = [];
    const notFound = [];

    for (const id of ids) {
        const result = await runQuery(
            "SELECT * FROM tasks WHERE id = $1;",
            [id],
            "Database error while fetching task"
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

        await runQuery(
            "UPDATE tasks SET completed = true WHERE id = $1;",
            [id],
            "Database error while updating task"
        );

        updated.push(id);
    }

    return { updated, alreadyCompleted, notFound };
}

async function editTaskService(tasks) {
    const updated = [];
    const notFound = [];

    for (const task of tasks) {
        const check = await runQuery(
            "SELECT id FROM tasks WHERE id = $1;",
            [task.id],
            "Database error while checking task existence"
        );

        if (check.rows.length === 0) {
            notFound.push(task.id);
            continue;
        }

        await runQuery(
            "UPDATE tasks SET title = $1, description = $2, category = $3 WHERE id = $4;",
            [task.title, task.description, task.category, task.id],
            "Database error while updating task"
        );

        updated.push(task.id);
    }

    return { updated, notFound };
}

module.exports = {
    addTaskService,
    getTasksService,
    deleteTaskService,
    markTaskService,
    editTaskService,
};
