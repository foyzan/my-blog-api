const authenticate = (req, res, next) =>{

    req.user = {
        id: '6985ca72172423ee20b12e11',
        name: "Diana Prince 4",
        role: "user",
        status: "approved"
    }
    next()
}


module.exports = authenticate