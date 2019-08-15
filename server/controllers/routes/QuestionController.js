const Question  = require('../lib/question');

module.exports = function (app) {

    app.post('/question', Question.create)

    app.get('/questions', Question.getAllQuestion)

    app.get('/question/:id', Question.getQuestion)

    app.patch('/question/:id', Question.patchQuestion)

    app.delete('/question/:id', Question.deleteQuestion)
}
