import {RefObject, useRef, useState, useEffect} from 'react';
import {BiShow, BiHide} from 'react-icons/bi';
import {AxiosInstance} from 'axios'

import '../App.css';

type props = {
  api: AxiosInstance
}

function SignIn({api}: props) {

  const emailRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef = useRef() as RefObject<HTMLInputElement>;
  const [showHide, setShowHide] = useState('show');

  async function handleSubmit() {
    try {
      const response = await api.post('token/', {
        'username': emailRef.current?.value,
        'password': passwordRef.current?.value
      });
      
      if (response.status === 401) throw 401;
      if (response.status === 200) {
        const credentials = await response.data;
        window.localStorage.setItem('access', credentials['access']);
        window.localStorage.setItem('refresh', credentials['refresh']);
        
        window.location.assign('/');
        
      }
    } catch (error) {
      if (error === 401) {
        alert('Account does not exist')
      }
    }
  }

  useEffect(() => {
    const span = document.querySelector('.password-show') as HTMLElement;
    const passwrodInput = document.querySelector('#password') as HTMLInputElement;
    span.onclick = () => {
      if (span.id === 'show') {
        passwrodInput.type = 'text';
        setShowHide('hide');
      }
      if (span.id === 'hide') {
        passwrodInput.type = 'password';
        setShowHide('show');
      }
    }

  }, [])

  return (
    <div className='signin grid-main'>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <input type="text" required placeholder='email' id='email' ref={emailRef} />
          <br />
          <div>
            <input type="password" required placeholder="password" id="password" ref={passwordRef} />
            <span id={showHide} className='password-show'>
              {
                showHide === 'show' ? <><BiShow /></> : 
                showHide === 'hide' ? <><BiHide /></> : <></>
              }
            </span>
          </div>
          <br />
          <button type="submit">sign in</button>
        </form>
        <h1>Welcome Back</h1>
      </div>
    </div>
  )
}

export default SignIn