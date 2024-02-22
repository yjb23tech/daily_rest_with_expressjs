function authenticator(req, res, next) {
    console.log('Authentication successful')
    next()
}

module.exports = authenticator; 