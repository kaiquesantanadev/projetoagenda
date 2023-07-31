import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Registro from './modules/Registro'
import Login from './modules/Login'
import Contato from './modules/Contato'

const cadastro = new Registro('.form-cadastro')
const login = new Login('.form-login')
const contato = new Contato('.form-contato')

cadastro.init()
login.init()
contato.init()

// import './assets/css/style.css'
