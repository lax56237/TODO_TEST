const {
    addTaskService,
    getTasksService,
    deleteTaskService,
    markTaskService,
    editTaskService,
} = require("../services/tasks.service");
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
    const { id } = req.params;

    if (!id || isNaN(id)) {
        const err = new Error("Invalid task ID");
        err.status = 400;
        throw err;
    }

    await deleteTaskService(id);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
    });
});

const markTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        const err = new Error("Invalid task ID");
        err.status = 400;
        throw err;
    }

    const updatedTask = await markTaskService(id);

    res.status(200).json({
        success: true,
        message: "Task marked as completed",
        data: updatedTask,
    });
});

const editTask = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { title, description, category } = req.body;

    if (!id || isNaN(id)) {
        const err = new Error("Invalid task ID");
        err.status = 400;
        throw err;
    }

    if (
        title === undefined ||
        title === null ||
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        const err = new Error("Title must be a non-empty string");
        err.status = 400;
        throw err;
    }

    if (
        description !== undefined &&
        typeof description !== "string"
    ) {
        const err = new Error("Description must be a string");
        err.status = 400;
        throw err;
    }

    if (category === undefined || category === null || category === "") {
        category = "other";
    } else if (typeof category !== "string") {
        const err = new Error("Category must be a string");
        err.status = 400;
        throw err;
    }

    const updatedTask = await editTaskService(id, {
        title: title.trim(),
        description: description || null,
        category,
    });

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
    });
});

module.exports = {
    addTasks,
    getTasks,
    deleteTask,
    markTask,
    editTask,
};