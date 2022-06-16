import logo from './logo.svg';
import './App.css';
import { Home } from './Home';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <div class="app-title-container">
          <a class="title" href="/">OMDB</a>
        </div>
      </header>
      <Home />
      {/* <footer class="footer">
        <div class="app-footer-container">
          <a class="footer-link" href="/">OMDB - End of Page</a>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
