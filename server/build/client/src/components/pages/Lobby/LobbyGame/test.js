"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const useTypedSelector_1 = require("../../../../hooky/useTypedSelector");
function Test() {
    const room = useTypedSelector_1.useTypedSelector(store => store.roomInfo);
    return (<>
    <h2>{room.roomUrl}</h2>
    <h3>{Date.now()}</h3>
    </>);
}
exports.Test = Test;
//# sourceMappingURL=test.js.map