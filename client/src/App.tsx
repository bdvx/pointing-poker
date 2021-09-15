import "./App.scss";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./material-ui-variables";
import { StartPage } from "./components/pages/StartPage/StartPage";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Router } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./AppRouter";
import { Footer } from './components/Footer/Footer';

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
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
