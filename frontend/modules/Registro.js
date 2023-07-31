import validator from 'validator'

export default class Registro {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        const campoEmail = document.querySelector('.campoEmail')
        const campoSenha = document.querySelector('.campoSenha')
        let error = false

        if(!validator.isEmail(emailInput.value)) {
            campoEmail.classList.add('text-danger')
            campoEmail.innerHTML = 'Email inválido (Registre um e-mail real existente).'
            error = true
        }


        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            campoSenha.classList.add('text-danger')
            campoSenha.innerHTML = 'Senha inválida (Cadastre uma senha que contenha entre 3 a 50 caracteres)'
            error = true
        }

        if(!error) el.submit()

        console.log(emailInput.value, passwordInput.value)
    }
}