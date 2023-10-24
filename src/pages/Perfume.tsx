import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "axios";

import Popup from "../components/Popup";

function Perfume({api, access, handleBuy, setPopup}: {api: AxiosInstance, access: string, handleBuy: any, setPopup: any}) {

  const [perfume, setPerfume] = useState<object>({});
  const {name} = useParams();


  async function handleGetPerfume() {
    const response = await api.post('perfume/', {
      'perfume': name
    });
    
    if (response.status === 200) {
      const data = await response.data;
      setPerfume(data);
    }
  }

  async function handleAddToCart() {
    try {
      const response = await api.post('cart/', {
        'product_name': perfume['name' as keyof typeof perfume],
        'price': 30,
        'image': perfume['image' as keyof typeof perfume]
      }, {
        headers: {
          'Authorization': 'Bearer '+access
        }
      });
  
      if (response.status === 401) throw 'authorization';
      if (response.status === 201) {
        alert('item has been added');
      }
    } catch (error) {
      if (error === 'authorization') {
        alert('there is an authorization problem, sign out and sign in again.');
      }
    }
  }

  useEffect(() => {
    handleGetPerfume();
  }, [])

  

  return (
    <div className='perfumePage grid-main'>
      <div className='container-1'>
        <div style={{border: '1px solid black'}}>
          <img src={perfume['image' as keyof typeof perfume]} alt="" />
        </div>
        <div className='info'>
          <div>
            <h2>{perfume['name' as keyof typeof perfume]}</h2>
            <br />
            <h3>{perfume['for_gender' as keyof typeof perfume]}</h3> 
            <br />
            <h3>$30</h3>
          </div>
          <div className='buttons'>
            <button onClick={() => {
              function handleProceed() {
                handleBuy(perfume['name' as keyof typeof perfume], perfume['image' as keyof typeof perfume]);
              }
              setPopup(<Popup setPopup={setPopup} topic={'copy the card number below to proceed the checkout.'} copy={'4242424242424242'} button={'proceed'} handleEvent={handleProceed}  />)
              
            }} className='buy'>Buy</button>
            <button onClick={() => {
              handleAddToCart();
            }} className='cart'>Add to Cart</button>
          </div>
        </div>
      </div>
      <br />
      <div className='container-2'>
        <p>
          {perfume['description' as keyof typeof perfume] && (perfume['description' as keyof typeof perfume] as string).slice(0, (perfume['description' as keyof typeof perfume] as string).indexOf('Top notes are'))}
        </p>
      </div>
      <br />
      <div className='container-3'>
        <h3>Accords: <span>{perfume['main accords' as keyof typeof perfume] && Object.keys(perfume['main accords' as keyof typeof perfume]).map(a => <>{a+', '}</>)}</span></h3>
        <br />
        <table>
          <tr>
            <td>Top Notes</td>
            <td>{(perfume['top notes' as keyof typeof perfume]) && (perfume['top notes' as keyof typeof perfume] as Array<string>).map(t => <>{t+', '}</>)}</td>
          </tr>
          <tr>
            <td>Middle Notes</td>
            <td>{(perfume['middle notes' as keyof typeof perfume]) && (perfume['middle notes' as keyof typeof perfume] as Array<string>).map(m => <>{m+', '}</>)}</td>
          </tr>
          <tr>
            <td>Base Notes</td>
            <td>{(perfume['base notes' as keyof typeof perfume]) && (perfume['base notes' as keyof typeof perfume] as Array<string>).map(b => <>{b+', '}</>)}</td>
          </tr>
        </table>
      </div>
      
    </div>
  )
}

export default Perfume