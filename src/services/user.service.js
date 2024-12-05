const HttpCodes = require("../constants/http-codes");
const user = require("../entities/user.entity");
const dataSource = require("../config/data-source");
const bcrypt = require('bcrypt');
const GLOBAL_CONST = require("../constants/global.const");
const { HttpError } = require("../errors/http.erros");
const moment = require("moment-timezone");

const addUsers = async (req, res) => {
    try {
        const userRepo = dataSource.getRepository(user)

        const hash = async (password) => {
            const salt = await bcrypt.genSalt(GLOBAL_CONST.PASSWORD_SALT_ROUND);
            return await bcrypt.hash(password, salt)
        }
        if (Array.isArray(req.body)) {
            for (let user of req.body) {
                user.password = await hash(user.password)
            }
        } else {
            req.body.password = await hash(req.body.password)
        }
        const data = await userRepo.insert(req.body)

        res.send({
            status: HttpCodes.OK,
            data,
            message: "User(s) Created"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const userRepo = dataSource.getRepository(user)
        const data = await userRepo.find()
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

const login = async (req, res) => {
    try {
        const body = req.body
        const userRepo = dataSource.getRepository(user)
        const userData = await userRepo.findOne({ where: { username: body.username } });
        const passwordMatch = await bcrypt.compare(body.password, userData.password)
        if (!passwordMatch) {
            throw new HttpError("Invalid Credentials", 401)
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
    addUsers,
    getUsers,
    login
}