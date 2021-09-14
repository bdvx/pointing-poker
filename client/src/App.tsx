import "./App.scss";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./material-ui-variables";
import { StartPage } from "./components/pages/StartPage/StartPage";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Router } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./AppRouter";
import history from "./history";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <div className="App">
          <main>
            <Header></Header>
            <AppRouter></AppRouter>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
