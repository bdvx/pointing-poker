import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './material-ui-variables';
import { StartPage } from './components/StartPage/StartPage';
import { CssBaseline } from '@material-ui/core';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <div className="App">
          <main>
            <StartPage classes="app__startPage" />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
