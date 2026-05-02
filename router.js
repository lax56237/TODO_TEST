const express = require("express")
const router = express.Router()
const validateTask = require("./middlewares/validateTask");
const { addTasks, getTasks, deleteTask, markTask, editTask } = require("./controllers/tasks.controller")


router.get("/tasks", getTasks);

router.post("/addtasks", validateTask, addTasks);

router.delete("/tasks/:id", deleteTask);

router.patch("/tasks/:id/complete", markTask);

router.put("/tasks/:id", editTask);



module.exports = router;