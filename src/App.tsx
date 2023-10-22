import {Routes, Route} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/ContextProvider';
import { api } from './api';

import Layout from './layout/Layout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Perfume from './pages/Perfume';
import Cart from './pages/Cart';
import Boughts from './pages/Boughts';
import PageNotFound from './pages/PageNotFound';

import './App.css';





function App() {

  const {access, authenticated} = useContext(Context);

  async function handleCheckout() {
    const response = await api.post('checkout/', {
      'redirect': window.location.href
    }, {
      headers: {
        'Authorization': 'Bearer '+access
      }
    })
    if (response.status === 200) {
      const data = await response.data;
      window.location.assign(data['url']);
    }
  }

  async function handleBuy(name: string, image: string) {
    const response = await api.post('boughts/', {
      'product_name': name,
      'image': image
    }, {
      headers: {
        'Authorization': 'Bearer '+access
      }
    });

    if (response.status === 201) {
      handleCheckout();
    }
  }

  return (
    <>
      <Layout authenticated={authenticated} api={api}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn api={api} />} />
          <Route path='/sign-up' element={<SignUp api={api} />} />
          <Route path='/search?' element={<Search />} />
          <Route path='/perfume/:name' element={<Perfume api={api} access={access} handleBuy={handleBuy} />} /> 
          <Route path='/cart' element={<Cart api={api} access={access} handleBuy={handleBuy} />} />
          <Route path='/boughts' element={<Boughts api={api} access={access} />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
