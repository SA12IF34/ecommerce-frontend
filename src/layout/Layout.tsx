import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { AxiosInstance } from 'axios';

type props = {
  children: React.ReactNode, 
  authenticated: boolean,
  api: AxiosInstance
}

function Layout({children, authenticated, api}: props) {
  return (
    <>
      <Header authenticated={authenticated} api={api} />
      {children}
      <Footer />
    </>
  )
}

export default Layout;