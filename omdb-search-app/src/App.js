import './App.css';

import Home from './Home';
import { Header } from './Home/Header';
import SearchInput from './Home/SearchInput';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <SearchInput />
      </div>
      <Home />
    </div>
  );
}

export default App;
