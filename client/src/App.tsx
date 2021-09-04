import { ThemeProvider } from '@material-ui/core';
import { Header } from './components/header/Header';
import { theme } from './material-ui-variables';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
