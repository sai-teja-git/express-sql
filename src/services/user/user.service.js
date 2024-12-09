const bcrypt = require('bcrypt');
const moment = require("moment-timezone");
const dataSource = require("../../config/data-source");
const HttpCodes = require("../../constants/http-codes");
const GLOBAL_CONST = require("../../constants/global.const");
const { UnauthorizedError } = require("../../errors/http.errors");

const userEntity = require("../../entities/user.entity");

const addUsers = async (req, res) => {
    try {
        await insertUsers(req.body)
        res.send({
            status: HttpCodes.OK,
            message: "User(s) Created"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const insertUsers = async (body) => {
    const userRepo = dataSource.getRepository(userEntity)

    const hash = async (password) => {
        const salt = await bcrypt.genSalt(GLOBAL_CONST.PASSWORD_SALT_ROUND);
        return await bcrypt.hash(password, salt)
    }
    if (Array.isArray(body)) {
        for (let userItem of body) {
            userItem.password = await hash(userItem.password)
        }
    } else {
        body.password = await hash(body.password)
    }
    return await userRepo.insert(body)
}

const getUsers = async (_, res) => {
    try {
        const userRepo = dataSource.getRepository(userEntity)
        const data = await userRepo.find({ is_active: true })
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Fetched User(s) Data"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const updatePassword = async (req, res) => {
    try {
        const body = req.body;
        const userRepo = dataSource.getRepository(userEntity)
        const userData = await userRepo.findOne({ where: { username: body.username } });
        const passwordMatch = await bcrypt.compare(body.old, userData.password)
        if (!passwordMatch) {
            throw new UnauthorizedError("Invalid Credentials")
        }
        const salt = await bcrypt.genSalt(GLOBAL_CONST.PASSWORD_SALT_ROUND);
        const password = await bcrypt.hash(body.new, salt)
        await userRepo.update(userData.id, {
            password,
            password_updated_at: moment.utc(),
        })
        res.send({
            status: HttpCodes.OK,
            message: "Fetched User(s) Data"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    addUsers,
    getUsers,
    updatePassword,
    insertUsers,
}