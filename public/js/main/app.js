var app = angular.module("app.todos", ["xeditable"])

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appName = "Todos Dashboard",
    $scope.formData = {},
    $scope.todos = []
    $scope.loading = true
    
    // load data form api
    // svTodos.get().success(function (data) {
    //     $scope.todos = data
    // })

    svTodos.get().then(function(response) {
        $scope.todos = response.data;
        $scope.loading = false
    }, function(error) {
        // Handle error
    });


    $scope.createTodo = function () {
        $scope.loading = true
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }

        // console.log("Debug Create ")
        svTodos.create(todo).then(function (response) {
                console.log("Done Create ")
                $scope.todos = response.data
                $scope.formData.text = ""
                $scope.loading = false

            }, function(error) {
                // Handle error
            });
    }
 

    $scope.updateTodo = function (todo) {
        console.log(todo)
        $scope.loading = true

        svTodos.update(todo).then(function (response) {
            $scope.todos = response.data
            $scope.loading = false

        }, function(error) {
            // Handle error
            console.log('error update')

        });
    }

    $scope.deleteTodo = function (todo) {
        console.log("Delete todo: ",todo)
        console.log("Delete id: ",todo._id)
        $scope.loading = true

        svTodos.delete(todo._id).then(function (response) {
            $scope.todos = response.data
            $scope.loading = false

        }, function(error) {
            // Handle error
            console.log('error delete')
            
        });
    }

    
}])