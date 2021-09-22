"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeLogo = void 0;
require("./LargeLogo.scss");
const poker_cards_svg_1 = require("../../assets/icons/poker-cards.svg");
const LargeLogo = () => {
    return (<div className="largeLogo">
      <img src={poker_cards_svg_1.default} alt="Poker cards"/>

      <div className="largeLogo__title">
        <span>Poker</span>
        <span>Planning</span>
      </div>
    </div>);
};
exports.LargeLogo = LargeLogo;
//# sourceMappingURL=LargeLogo.js.map