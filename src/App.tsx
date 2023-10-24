import {Routes, Route} from 'react-router-dom';
import { useContext, useState } from 'react';
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

  const [popup, setPopup] = useState<any>(null);

  async function handleCheckout() {
    try {
      const response = await api.post('checkout/', {
        'redirect': window.location.href
      }, {
        headers: {
          'Authorization': 'Bearer '+access
        }
      })
  
      if (response.status === 401) throw 'authorization';
      if (response.status === 200) {
        const data = await response.data;
        window.location.assign(data['url']);
      }
    } catch (error) {
      if (error === 'authorization') {
        alert('there is an authorization problem, sign out and sign in again.');
      }
    }
  }

  async function handleBuy(name: string, image: string) {

    try {
      const response = await api.post('boughts/', {
        'product_name': name,
        'image': image
      }, {
        headers: {
          'Authorization': 'Bearer '+access
        }
      });
      
      if (response.status === 401) throw 'authorization';
      if (response.status === 201) {
        handleCheckout();
      }
    } catch (error) {
      if (error === 'authorization') {
        alert('there is an authorization problem, sign out and sign in again.')
      }
    }
  }

  return (
    <>
      {popup && popup}
      <Layout authenticated={authenticated} api={api} setPopup={setPopup}>
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
