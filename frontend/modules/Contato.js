import validator from 'validator'

export default class Cadastro {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        document.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target

        //pegando os input
        const NomeInput = el.querySelector('input[name="nome"]')
        const SobrenomeInput = el.querySelector('input[name="sobrenome"]')
        const EmailInput = el.querySelector('input[name="email"]')
        const TelefoneInput = el.querySelector('input[name="telefone"]')

        // pegando as div
        const campoNome = document.querySelector('.campoNome')
        const campoSobrenome = document.querySelector('.campoSobrenome')
        const campoEmail = document.querySelector('.campoEmail')
        const campoTelefone = document.querySelector('.campoTelefone')
        let error = false
        
        if (EmailInput.value && !validator.isEmail(EmailInput.value)) {
            campoEmail.classList.add('text-danger')
            campoEmail.innerHTML = 'Email inválido (Registre um e-mail real existente)'
            error = true
        }

        if (!NomeInput.value) {
            campoNome.classList.add('text-danger')
            campoNome.innerHTML = 'Nome é um campo obrigatório a se inserir.'
            error = true
        }

        if (!EmailInput.value && !TelefoneInput.value) {
            campoTelefone.classList.add('text-danger')
            campoTelefone.innerHTML = 'É necessário inserir ao menos um contato (telefone ou e-mail)'
            error = true
        }

        if (!error) el.submit()
    }
}