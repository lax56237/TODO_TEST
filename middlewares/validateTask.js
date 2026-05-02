const validateTask = (req, res, next) => {
    try {
        let { title, description, category, completed } = req.body;

        if (!title || typeof title !== "string" || title.trim() === "") {
            const err = new Error("Title must be a non-empty string");
            err.status = 400;
            throw err;
        }

        if (description !== undefined && typeof description !== "string") {
            const err = new Error("Description must be a string");
            err.status = 400;
            throw err;
        }

        if (!category) {
            category = "other";
        } else if (typeof category !== "string") {
            const err = new Error("Category must be a string");
            err.status = 400;
            throw err;
        }

        if (completed === undefined) {
            completed = false;
        } else if (typeof completed !== "boolean") {
            const err = new Error("Completed must be true or false");
            err.status = 400;
            throw err;
        }

        req.body = {
            title: title.trim(),
            description: description || null,
            category,
            completed,
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = validateTask;