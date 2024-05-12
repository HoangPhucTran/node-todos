var Todos = require("../models/todoModel")

function getTodos(res) {
    Todos.find({})
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }

module.exports = function (app) {
    app.get("/api/todos", function (req, res) {
        getTodos(res)
    })

    app.get("/api/todo/:id", function (req, res) {
        Todos.findById({ _id: req.params.id })
            .then(todo => {
                res.json(todo)
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })

    app.post("/api/todo", function (req, res) {
        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
        }

        Todos.create(todo)
        .then(result => {
            // Handle success
            getTodos(res)
        })
        .catch(err => {
            // Handle error
            throw err
        });

    })

    app.put("/api/todo", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("ID is required")
        } else {
            Todos.updateOne({
                _id: req.body._id
            }, {
                text: req.body.text,
                isDone: req.body.isDone
            })
            .then(result => {
                getTodos(res);
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }
    })
    
    app.delete("/api/todo/:id", function (req, res) {
        Todos.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            getTodos(res);
        })
        .catch(err => {
            console.log("delete error")
            res.status(500).json(err);
        });
    })
}