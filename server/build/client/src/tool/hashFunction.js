"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashCode = void 0;
function hashCode(s) {
    return s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
}
exports.hashCode = hashCode;
//# sourceMappingURL=hashFunction.js.map