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
exports.joinLobbyByUrl = exports.signIn = exports.regNewUser = exports.app = void 0;
const dataService_1 = require("./tools/dataService");
const cors = require('cors');
const express = require('express');
const app = express();
exports.app = app;
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
function regNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const response = yield dataService_1.default.addNewUser(user);
        if (response.isSuccess) {
            res.statusCode = 200;
            res.send(response);
        }
        else {
            res.statusCode = 500;
            res.send(response);
        }
    });
}
exports.regNewUser = regNewUser;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = req.body;
        const response = yield dataService_1.default.signInUser(userInfo);
        if (response.isSuccess) {
            res.statusCode = 200;
            res.send(response);
        }
        else {
            res.statusCode = 404;
            res.send(response);
        }
    });
}
exports.signIn = signIn;
function joinLobbyByUrl(req, res) {
    console.log(req.body);
}
exports.joinLobbyByUrl = joinLobbyByUrl;
//# sourceMappingURL=http.js.map