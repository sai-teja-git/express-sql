const HttpCodes = require("../constants/http-codes");
const user = require("../entities/user.entity");
const dataSource = require("../config/data-source");

const addUsers = async (req, res) => {
    try {
        const userRepo = dataSource.getRepository(user)
        const data = await userRepo.insert(req.body)
        res.send({
            status: HttpCodes.OK,
            data,
            message: "User Here!"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    addUsers
}