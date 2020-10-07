var message = {
    "message": false
};

module.exports = (req, res, next) => {
    res.status(404).json(message);
}