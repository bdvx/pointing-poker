"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobPosition: { type: String, required: true },
    login: { type: String, required: true },
    //role: { type: String, required: true},
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    id: { type: Number, required: false },
});
const RegModel = mongoose_1.model('User', schema);
exports.default = RegModel;
//# sourceMappingURL=mongoDBShcema.js.map