import './App.scss';
import { ThemeProvider } from '@material-ui/core';
import { WelcomePage } from './components/welcome-page/Welcome-page';
import { theme } from './material-ui-variables';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <main>
          <WelcomePage classes="app__welcome-page" />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
