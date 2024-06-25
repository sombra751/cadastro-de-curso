const bodyParser = require('body-parser')
const cursos = require('./cursosRoute')
const alunos = require('./alunosRouter')
const materias = require('./materiasRouter')
const admins = require('./adminsRouter')
const respostas = require('./respostasRouter')
const atividades = require('./atividadesRouter')
const auth = require('./authRoute')
const docentes = require('./docenteRouter')


module.exports = app => {
    app.use(
        bodyParser.json(),
        cursos,
        alunos,
        materias,
        admins,
        respostas,
        atividades,
        auth,
        docentes
    )
}
