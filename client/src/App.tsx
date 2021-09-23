import "./App.scss";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./material-ui-variables";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./AppRouter";
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <main>  
            <AppRouter></AppRouter>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
