import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { AxiosInstance } from 'axios';

type props = {
  children: React.ReactNode, 
  access: string,
  authenticated: boolean,
  api: AxiosInstance,
  setPopup: any
}

function Layout({children, access, authenticated, api, setPopup}: props) {
  return (
    <>
      <Header access={access} authenticated={authenticated} api={api} setPopup={setPopup} />
      {children}
      <Footer />
    </>
  )
}

export default Layout;