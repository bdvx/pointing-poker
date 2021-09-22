"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bp = exports.theme = void 0;
const core_1 = require("@material-ui/core");
exports.theme = core_1.createTheme({
    breakpoints: {
        values: {
            'phone-sm': 320,
            'phone-md': 375,
            'phone-lg': 425,
            'phone-xl': 480,
            phone: 640,
            tablet: 768,
            lap: 1024,
            desk: 1200,
            widescreen: 1440,
            fullhd: 1920
        },
    },
    palette: {
        primary: {
            main: '#2b3a67'
        },
        secondary: {
            main: '#66999b'
        },
        avatar: '#60dabf'
    }
});
exports.bp = exports.theme.breakpoints;
//# sourceMappingURL=material-ui-variables.js.map