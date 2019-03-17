
function findAll(req, res){
    res.status(200)
    .json({
        status: 'success',
        message: 'hello'
    });}

module.exports = {
    findAll: findAll
}