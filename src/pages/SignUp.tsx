import {RefObject, useRef, useState, useEffect} from 'react';
import {BiShow, BiHide} from 'react-icons/bi';
import {AxiosError, AxiosInstance} from 'axios'

import '../App.css';

type props = {
  setAccess: any,
  setRefresh: any,
  api: AxiosInstance
}

function SignUp({setAccess, setRefresh, api}: props) {

  const fnameRef = useRef() as RefObject<HTMLInputElement>;
  const lnameRef = useRef() as RefObject<HTMLInputElement>;
  const emailRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef2 = useRef() as RefObject<HTMLInputElement>;
  const [showHide, setShowHide] = useState('show');

  async function handleSubmit() {
    const fname = fnameRef.current?.value as string;
    const lname = lnameRef.current?.value as string;
    const email = emailRef.current?.value as string;
    const password1 = passwordRef.current?.value as string;
    const password2 = passwordRef2.current?.value as string;

    if (password1 === password2) {
      try {
        const response = await api.post('signup/', {
          'first_name': lname,
          'last_name': fname,
          'username': `${fname[0].toUpperCase()+fname?.slice(1)} ${lname[0].toUpperCase()+lname?.slice(1)}`,
          'email': email,
          'password': password1
        });

        if (response.status === 201) {
          const credentials = await response.data;
          document.cookie=`access=${credentials['access']};`;
          document.cookie=`refresh=${credentials['refresh']}`;
          
          window.location.assign('/');
        }
      } catch (error) {
        const response = error as AxiosError;
        if (response.response?.status === 306) {
          
          alert('Email is already used');
        } 
      }
    } else {
      alert('Please make sure password is the same');
    }
  }

  useEffect(() => {
    const span = document.querySelector('.password-show') as HTMLElement;
    const passwrodInput = document.querySelector('#password') as HTMLInputElement;
    const passwrodInput2 = document.querySelector('#password2') as HTMLInputElement;

    span.onclick = () => {
      if (span.id === 'show') {
        passwrodInput.type = 'text';
        passwrodInput2.type = 'text';
        setShowHide('hide');
      }
      if (span.id === 'hide') {
        passwrodInput.type = 'password';
        passwrodInput2.type = 'password';
        setShowHide('show');
      }
    }

  }, [])



  return (
    <div className='signup grid-main'>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit()
        }}>
          <input type="text" required placeholder='first name' name="fname" id="name" ref={fnameRef} />
          <input type="text" required placeholder='last name' name="lname" id="name" ref={lnameRef} />
          <br />
          <input type="email" required placeholder='email' id='email' ref={emailRef} />
          <br />
          <input type="password" required placeholder="password" className='password' id="password" ref={passwordRef} />
          <div>
            <input type="password" required placeholder="repeat password" className='password' id="password2" ref={passwordRef2} />
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
        <h1>We are happy for you to join us</h1>
      </div>
    </div>
  )
}

export default SignUp