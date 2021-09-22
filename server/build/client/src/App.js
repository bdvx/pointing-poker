"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.scss");
const core_1 = require("@material-ui/core");
const material_ui_variables_1 = require("./material-ui-variables");
const core_2 = require("@material-ui/core");
const react_router_dom_1 = require("react-router-dom");
const Header_1 = require("./components/Header/Header");
const AppRouter_1 = require("./AppRouter");
const Footer_1 = require("./components/Footer/Footer");
function App() {
    return (<core_1.ThemeProvider theme={material_ui_variables_1.theme}>
      <core_2.CssBaseline />
      <react_router_dom_1.BrowserRouter>
        <div className="App">
          <Header_1.default></Header_1.default>
          <main>  
            <AppRouter_1.default></AppRouter_1.default>
          </main>
          <Footer_1.Footer />
        </div>
      </react_router_dom_1.BrowserRouter>
    </core_1.ThemeProvider>);
}
exports.default = App;
//# sourceMappingURL=App.js.map