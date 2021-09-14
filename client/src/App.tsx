import "./App.scss";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./material-ui-variables";
import { StartPage } from "./components/pages/StartPage/StartPage";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <main>
            <Header></Header>
            <AppRouter></AppRouter>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
