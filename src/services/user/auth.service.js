const HttpCodes = require("../../constants/http-codes");
const user = require("../../entities/user.entity");
const dataSource = require("../../config/data-source");
const { UnauthorizedError } = require("../../errors/http.errors");
const moment = require("moment-timezone");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const body = req.body
        const userRepo = dataSource.getRepository(user)
        const userData = await userRepo.findOne({ where: { username: body.username } });
        const passwordMatch = await bcrypt.compare(body.password, userData.password)
        if (!passwordMatch) {
            throw new UnauthorizedError("Invalid Credentials")
        }
        const data = {
            name: userData.name,
            email: userData.email,
            last_login: userData.last_login
        }
        await userRepo.update(userData.id, {
            last_login: moment.utc()
        })
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Login Successful"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    login
}