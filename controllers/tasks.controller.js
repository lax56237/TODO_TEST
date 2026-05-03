const { addTaskService, getTasksService, deleteTaskService, markTaskService, editTaskService } = require("../services/tasks.service");
const asyncHandler = require("../utils/asyncHandler");

const addTasks = asyncHandler(async (req, res) => {
    const task = await addTaskService(req.body);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
    });
});

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await getTasksService();

    if (!tasks || tasks.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No tasks found",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: tasks,
    });
});

const deleteTask = asyncHandler(async (req, res) => {

    const { validIds, invalidIds } = req;

    if (validIds.length === 0) {
        const err = new Error("No valid IDs provided");
        err.status = 400;
        throw err;
    }
    const result = await deleteTaskService(validIds);

    res.status(200).json({
        success: true,
        message: "Delete operation completed",
        deleted: result.deleted,
        notFound: result.notFound,
        invalidIds,
    });
});

const markTask = asyncHandler(async (req, res) => {

    const { validIds, invalidIds } = req;

    if (validIds.length === 0) {
        const err = new Error("No valid IDs provided");
        err.status = 400;
        throw err;
    }

    const result = await markTaskService(validIds);

    res.status(200).json({
        success: true,
        message: "Mark operation completed",
        updated: result.updated,
        alreadyCompleted: result.alreadyCompleted,
        notFound: result.notFound,
        invalidIds,
    });
});

const editTask = asyncHandler(async (req, res) => {
    const { tasks } = req.body;

    if (!Array.isArray(tasks)) {
        const err = new Error("tasks must be an array");
        err.status = 400;
        throw err;
    }

    const validTasks = [];
    const invalidTasks = [];

    tasks.forEach((task) => {
        let { id, title, description, category, completed } = task;

        if (typeof id !== "number") {
            invalidTasks.push({ task, error: "Invalid ID" });
            return;
        }

        if (!title || typeof title !== "string" || title.trim() === "") {
            invalidTasks.push({ task, error: "Invalid title" });
            return;
        }

        if (description !== undefined && typeof description !== "string") {
            invalidTasks.push({ task, error: "Invalid description" });
            return;
        }

        if (!category) category = "other";
        if (typeof category !== "string") {
            invalidTasks.push({ task, error: "Invalid category" });
            return;
        }

        if (completed && typeof completed !== Boolean) {
            invalidTasks.push({ task, error: "Invalid completed status" });
            return;
        }

        validTasks.push({
            id,
            title: title.trim(),
            description: description || null,
            category,
            completed
        });
    });

    const result = await editTaskService(validTasks);

    res.status(200).json({
        success: true,
        message: "Edit operation completed",
        updated: result.updated,
        notFound: result.notFound,
        invalidTasks,
    });
});

module.exports = { addTasks, getTasks, deleteTask, markTask, editTask };