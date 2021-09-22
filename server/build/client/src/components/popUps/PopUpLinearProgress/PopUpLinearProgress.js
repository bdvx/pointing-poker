"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopUpLinearProgress = void 0;
require("./PopUpLinearProgress.scss");
const core_1 = require("@material-ui/core");
const PopUpLinearProgress = (_a) => {
    var { loading, children } = _a, props = __rest(_a, ["loading", "children"]);
    return (<core_1.Dialog {...props} className={`${props.className} PopUpLinearProgress`}>
      {loading && <core_1.LinearProgress />}
      {children}
    </core_1.Dialog>);
};
exports.PopUpLinearProgress = PopUpLinearProgress;
//# sourceMappingURL=PopUpLinearProgress.js.map