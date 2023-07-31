const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: Number, required: false, default: ''},
    dataCriacao: { type: Date, default: Date.now},
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    async register() {
        this.valida()

        if(this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    valida() {
        this.cleanUp()

        // Validação de campos (email válido -- senha entre 3 e 50 carac)

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido.')
        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório a se inserir.')
        if (!this.body.email && !this.body.telefone) this.errors.push('É necessário inserir ao menos um contato (telefone ou e-mail).')

    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string')
            this.body[key] = ''
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

    static async buscaPorId(id) {
        if (typeof id !== 'string') return
        const user = await ContatoModel.findById(id)
        return user
    }

    static async buscaContatos() {
        const contatos = await ContatoModel.find().sort({ criadoEm: -1})
        return contatos
    }

    static async delete(id) {
        if (typeof id !== 'string') return
        const contato = await ContatoModel.findByIdAndDelete({_id: id})
        return contato
    }

    async editContato(id) {
        if  (typeof id !== 'string') return
        this.valida()
        if(this.errors.length > 0) return
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true})
    }
}

module.exports = Contato