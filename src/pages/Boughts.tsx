import { AxiosInstance } from 'axios';
import {useState, useEffect} from 'react'

function Boughts({api, access}: {api: AxiosInstance, access: string}) {
  
  const [items, setItems] = useState<Array<object>>([]);

  async function handleGet() {
    try {
      const response = await api.get('boughts/', {
        headers: {
          'Authorization': 'Bearer '+access
        }
      })
  
      if (response.status === 401) throw 'authorization';
      if (response.status === 200) {
        const data = await response.data;
        setItems(data)
      }
    } catch (error) {
      if (error === 'authorization') {
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
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Boughts