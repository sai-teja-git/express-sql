const HttpCodes = require("../../constants/http-codes");
const dataSource = require("../../config/data-source");
const { UnauthorizedError } = require("../../errors/http.errors");
const moment = require("moment-timezone");
const bcrypt = require('bcrypt');

const userEntity = require("../../entities/user.entity");
const user = dataSource.getRepository(userEntity)

const login = async (req, res) => {
    try {
        const body = req.body
        const userData = await user.findOne({ where: { username: body.username } });
        const passwordMatch = await bcrypt.compare(body.password, userData.password)
        if (!passwordMatch) {
            throw new UnauthorizedError("Invalid Credentials")
        }
        const data = {
            name: userData.name,
            email: userData.email,
            last_login: userData.last_login
        }
        await user.update(userData.id, {
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