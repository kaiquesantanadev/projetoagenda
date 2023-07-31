require('dotenv').config()
const express = require('express')
const app =  express()

// conexao mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectado à Base de dados.\n')
        app.emit('pronto') // Emitir sinal que a base foi conectada
    }).catch((e) => console.log(`ERRO: ${e}`))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const {checkCsrfError, csrfMiddleware, middlewareGlobal} = require('./src/middlewares/middleware')

app.use(helmet())
app.use(express.urlencoded({extended: true})) // permite POST de formularios pra aplicacao
app.use(express.json()) // permite parse de json para a aplicação.
app.use(express.static(path.resolve(__dirname, 'public'))) // permite acessos estaticos: imgs, css, js, etc.

const sessionOptions = session({
    secret: 'rpoyrwoptykprwykrwpoykrwepeniygfyg',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

// views
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())

// middlewares
app.use(middlewareGlobal)
app.use(csrfMiddleware)
app.use(checkCsrfError)
app.use(routes)


app.on('pronto', () => { //Captura o sinal da base conectada, e inicia o servidor.
    app.listen(3333, () => {
        console.log('Acessar http://localhost:3333')
        console.log('Servidor executando na porta 3333.')
    })
        
})

