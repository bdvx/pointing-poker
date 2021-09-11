import './App.scss';
import { ThemeProvider } from '@material-ui/core';
import { WelcomePage } from './components/welcome-page/Welcome-page';
import { theme } from './material-ui-variables';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <main>
          <WelcomePage classes="app__welcome-page" />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
