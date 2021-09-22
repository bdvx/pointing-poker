"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const useTypedSelector_1 = require("../../../../hooky/useTypedSelector");
function Test() {
    const room = useTypedSelector_1.useTypedSelector(store => store.roomInfo);
    const a = room.players.length;
    return (<>
    <h2>{a}</h2>
    <h1>{room.players}</h1>
    </>);
}
exports.Test = Test;
//# sourceMappingURL=test.js.map