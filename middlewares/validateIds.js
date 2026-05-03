const validateIds = (req, res, next) => {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
        const err = new Error("ids must be an array");
        err.status = 400;
        return next(err);
    }

    const validIds = [];
    const invalidIds = [];

    ids.forEach((id) => {
        if (typeof id === "number") {
            validIds.push(id);
        } else {
            invalidIds.push(id);
        }
    });

    req.validIds = validIds;
    req.invalidIds = invalidIds;

    next();
};

module.exports = validateIds;