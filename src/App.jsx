import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchData } from './api/services';
import categorySlice from './store';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const { setCategories } = categorySlice();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const ep = 'products/data/category';
        const data = await fetchData(ep);
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
