import './App.scss';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './material-ui-variables';
import { StartPage } from './components/start-page/Start-page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <main>
          <StartPage classes="app__startPage" />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
