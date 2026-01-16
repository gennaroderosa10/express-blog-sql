import postsArray from "../data/data.js"
import connection from "../data/db.js";

function index(req, res) {
    const query = "SELECT * FROM `posts`";

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500);
            return res.json({
                message: "server error",
            })
        }

        res.json({
            results: result,
        })
    });
};

function show(req, res) {
    const id = parseInt(req.params.id);
    const post = postsArray.find(post => post.id === id);

    if (post === undefined) {
        res.status(404);
        return res.json({
            message: "post non disponibile",
        })
    }
    res.json(post)

}

function store(req, res) {


    const dati = req.body;

    if (dati.title === undefined || dati.title.length === 0) {
        res.status(400);
        return res.json({
            error: "Client error",
            message: "il title è obbligatorio"
        });
    }

    const newId = postsArray[postsArray.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: dati.title,
        content: dati.content,
        tags: dati.tags,
    };

    postsArray.push(newPost)

    res.status(201);

    res.json(newPost);




}

function update(req, res) {
    const id = parseInt(req.params.id);
    const dati = req.body;

    const postIndex = postsArray.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        res.status(404);
        return res.json({
            message: "post non disponibile",
        });
    }

    if (!dati.title || dati.title.length === 0) {
        res.status(400);
        return res.json({
            error: "Client error",
            message: "il title è obbligatorio",
        });
    }


    const updatedPost = {
        id: id,
        title: dati.title,
        content: dati.content,
        tags: dati.tags,
    };

    postsArray[postIndex] = updatedPost;

    res.json(updatedPost);
}


function modify(req, res) {
    const id = parseInt(req.params.id);
    res.send("aggiorna parzialemte post n." + id)
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const postIndex = postsArray.findIndex((post) => post.id === id)

    if (postIndex === -1) {
        res.status(404)
        return res.json({
            message: "post non disponibile"
        })
    }
    postsArray.splice(postIndex, 1)
    res.sendStatus(204)

}

const controller = {
    index,
    show,
    store,
    update,
    modify,
    destroy,

}

export default controller