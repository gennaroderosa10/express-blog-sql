function pageNotFound(req, res, next) {
    res.status(404)
    res.json({
        error: "not found",
        message: "pagina non trovata"
    });
};

export default pageNotFound