import {useState, useEffect} from 'react';
import '../App.css';
import { AxiosInstance } from 'axios';

import Popup from '../components/Popup';

function Cart({api, access, handleBuy, setPopup}: {api: AxiosInstance, access: string, handleBuy: any, setPopup: any}) {

  const [items, setItems] = useState<Array<object>>([])

  async function handleGet() {
    const response = await api.get('cart/', {
        headers: {
            'Authorization': 'Bearer '+access
        }
    })

    if (response.status === 200) {
        const data = await response.data;
        setItems(data);
    }
  }

  async function handleDelete(name: string, image: string | null = null, state: string | null = null) {
    try {
        const response = await api.delete(`cart/${name}/delete/`, {
            headers: {
                'Authorization': 'Bearer '+access 
            }
        });
    
        if (response.status === 401) throw 'authorization';
        if (response.status === 204) {
            if (state === 'buy') {
                handleBuy(name, image)
            }
            else {
                window.location.reload();
            }
        }
    } catch (error) {
        if (error === 'auhorization') {
            alert('there is an authorization problem, sign out and sign in again.')
        }
    }
  }

  useEffect(() => {
    handleGet();
  }, [])

  return (
    <div className='cartPage'>
        <div>
            {items && items.map((item) => {
                return (
                    <div className='item'>
                        <div>
                            <div className='img'>
                                <img src={item['image' as keyof typeof item]} alt="" />
                            </div>
                            <div>
                                <h4>{item['product_name' as keyof typeof item]}</h4>
                                <h4>$30</h4>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => {
                                handleDelete(item['product_name' as keyof typeof item]);
                            }} className='remove'>remove</button>
                            <button onClick={() => {
                                function handleProceed() {
                                    handleDelete(item['product_name' as keyof typeof item], item['image' as keyof typeof item], 'buy');
                                }
                                setPopup(<Popup setPopup={setPopup} topic={'copy the card number below to proceed the checkout.'} button={'proceed'} handleEvent={handleProceed} copy={true} />)
                            }} className='buy'>buy</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Cart;