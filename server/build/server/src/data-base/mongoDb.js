"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashServise_1 = require("./hashServise");
const mongoDBShcema_1 = require("./mongoDBShcema");
const mongoose = require('mongoose');
const bdUrl = 'mongodb+srv://fury:9558985@cluster0.4gdys.mongodb.net/planing-pocker?retryWrites=true&w=majority';
function addNewUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const isConnect = yield connectToDB();
        if (!isConnect)
            return makeResponse(false, "failed to connect to server");
        const userLogin = yield mongoDBShcema_1.default.findOne({ login: user.login });
        if (!userLogin) {
            const hashedUser = Object.assign(Object.assign({}, user), { password: hashServise_1.default.makeHash(user.password) });
            const newUser = new mongoDBShcema_1.default(hashedUser);
            yield newUser.save();
            mongoose.connection.close();
            return makeResponse(true, `user ${user.login} registered successfully`);
        }
        else {
            return makeResponse(false, `user with name ${user.login} is already exist`);
        }
    });
}
function signIn(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToDB();
        const userInfoFromBD = yield mongoDBShcema_1.default.findOne({ login: user.login });
        if (userInfoFromBD) {
            if (hashServise_1.default.comparePassWithHash(user.password, userInfoFromBD.password)) {
                return makeResponse(true, `user ${user.login} login successfully`, makeUserInfoWithOutPassword(userInfoFromBD));
            }
            else {
                return makeResponse(false, `wrong password`);
            }
        }
        else {
            return makeResponse(false, `user ${user.login} is not registered in the system`);
        }
    });
}
function getUserByLogin(login) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToDB();
        const userInfo = yield mongoDBShcema_1.default.findOne({ login: login });
        if (userInfo) {
            return userInfo;
        }
        else {
            return null;
        }
    });
}
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(bdUrl);
            return true;
        }
        catch (e) {
            console.log('ошибка подключения к БД');
            return false;
        }
    });
}
function makeResponse(isSuccess, message, body) {
    const status = { isSuccess, message, body };
    return status;
}
const MongoDB = {
    addNewUser,
    signIn,
    getUserByLogin
};
exports.default = MongoDB;
function makeUserInfoWithOutPassword(userInfoFromBD) {
    const { firstName, lastName, jobPosition, avatar, login } = userInfoFromBD;
    const userInfo = { firstName, lastName, jobPosition, avatar, login };
    return userInfo;
}
//# sourceMappingURL=mongoDb.js.map