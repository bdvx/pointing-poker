import "./App.scss";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./material-ui-variables";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./AppRouter";
import { Footer } from './components/Footer/Footer';
import { useTypedSelector } from "./hooky/useTypedSelector";
import { useEffect, useState } from "react";
import { SuccessSnackBar } from "./components/Base/SuccessSnackBar/SuccessSnackBar";
import { KickPlayerPopUp } from "./components/popUps/KickPlayerPopUp/KickPlayerPopUp";
import LobbyService from "./serverService/lobbyService";

function App() {
  const user = useTypedSelector((state) => state.userInfo);
  const [openLogInSuccessSnackBar, setOpenLogInSuccessSnackBar] = useState<boolean>(false);

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

          <SuccessSnackBar open={ openLogInSuccessSnackBar } onSetOpen={ setOpenLogInSuccessSnackBar } text="You are successfully logged in!" />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
