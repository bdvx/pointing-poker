import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import Header from './components/Header/Header';
import Lobby from './components/Lobby/Lobby';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Lobby/>
      </div>
    </BrowserRouter>
  );
}

export default App;
