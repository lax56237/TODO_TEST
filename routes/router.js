const express = require("express")
const router = express.Router()
const validateTask = require("../middlewares/validateTask");
const validateIds = require("../middlewares/validateIds");
const { addTasks, getTasks, deleteTask, markTask, editTask } = require("../controllers/tasks.controller")


router.get("/", getTasks);
router.post("/", validateTask, addTasks);
router.delete("/", validateIds, deleteTask);
router.patch("/complete", validateIds, markTask);
router.put("/", editTask);

module.exports = router;