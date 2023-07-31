exports.middlewareGlobal = (req,res,next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

module.exports.checkCsrfError = (err, requisicao, resposta, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return resposta.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}

exports.loginRequired = (req,res,next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login para registrar/editar contatos.')
        req.session.save(() => res.redirect('/'))
        return
    }
    next()
}