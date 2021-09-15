import './App.scss';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './material-ui-variables';
import { StartPage } from './components/StartPage/StartPage';
import { CssBaseline } from '@material-ui/core';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <main>
          <StartPage classes="app__startPage" />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
