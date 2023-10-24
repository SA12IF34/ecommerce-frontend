import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { AxiosInstance } from 'axios';

type props = {
  children: React.ReactNode, 
  authenticated: boolean,
  api: AxiosInstance,
  setPopup: any
}

function Layout({children, authenticated, api, setPopup}: props) {
  return (
    <>
      <Header authenticated={authenticated} api={api} setPopup={setPopup} />
      {children}
      <Footer />
    </>
  )
}

export default Layout;