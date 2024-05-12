var Todos = require("../models/todoModel")

module.exports = function (app) {
    app.get("/api/setupTodos", function (req, res) {
        var seedTodos = [
            {
                text: "hoc node js",
                isDone: false
            },
            {
                text: "hoc Angular",
                isDone: false
            },
            {
                text: "hoc Nodejs",
                isDone: false
            }
        ]

        Todos.create(seedTodos)
            .then(result => {
                // Handle success
                res.send(result)
            })
            .catch(err => {
                // Handle error
                console.log("Error!!!")
            });


    })
}