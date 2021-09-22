"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createHash } = require('crypto');
class HashServise {
    static makeHash(password) {
        const hash = createHash('sha256');
        hash.write(password);
        return hash.digest('base64');
    }
    static comparePassWithHash(password, hash) {
        return (HashServise.makeHash(password) === hash) ? true : false;
    }
}
exports.default = HashServise;
//# sourceMappingURL=hashServise.js.map