import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import './styles/App.css';

function App() {

  return (
    <>
      <NavBar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App;
