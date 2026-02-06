const authenticate = (req, res, next) =>{

    req.user = {
        id: '6984d021bd5d921cee636cd1',
        name: "Diana Prince",
        role: "user",
        status: "approved"
    }
    next()
}


module.exports = authenticate