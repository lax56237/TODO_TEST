function validateTask(req, res, next) {
    let { title, description, category } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        const error = new Error("Title must be a non-empty string");
        error.status = 400;
        return next(error);
    }

    if (description !== undefined && typeof description !== "string") {
        const error = new Error("Description must be a string");
        error.status = 400;
        return next(error);
    }

    if (!category) {
        category = "other";
    } else if (typeof category !== "string") {
        const error = new Error("Category must be a string");
        error.status = 400;
        return next(error);
    }

    req.body = {
        title: title.trim(),
        description: description || null,
        category,
        completed: false,
    };

    next();
}

module.exports = validateTask;
