import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

import '../App.css';


function Perfume({name}: {name: string}) {

  const [perfume, setPerfume] = useState<object>({})

  async function getPerfume() {
    const response = await api.post('perfume/', {'perfume': name})
    if (response.status === 200) {
      const data = await response.data;
      setPerfume(data);
    }
  }

  useEffect(() => {
    getPerfume();
  }, [])

  return (
    <Link to={`/perfume/${perfume['name' as keyof typeof perfume]}`}>
      <div className='perfume'>
        <img src={perfume['image' as keyof typeof perfume]} alt="" />
        <br />
        <span>{perfume['name' as keyof typeof perfume] && (perfume['name' as keyof typeof perfume] as string).length > 16 ? (perfume['name' as keyof typeof perfume] as string).slice(0, 17): (perfume['name' as keyof typeof perfume])}</span> 
        <br />
        <br />
        <div>
          <span>$30</span>
          <span className='womenmen'>{perfume['for_gender' as keyof typeof perfume]}</span>
        </div>
      </div>
    </Link>
  )
}

function Home() {
  return (
    <div className='home'>
      <main className='hero grid-main'>
        <div className='content'> 
          <h1>Welcome to our store, get top perfumes with lowest prices</h1>
          <br />
          <Link to={'/search'}>
            <button>search</button>
          </Link>
        </div>
      </main>
      <section className='popular grid-main'>
        <div>
          <h2>Popular perfumes</h2>
          <br />
          <div className='perfumes'>
            <Perfume name={'Club de Nuit Intense Man'} />
            <Perfume name={'Light Blue'} />
            <Perfume name={'The One for Men Eau de Parfum'} />
          </div>
        </div>
      </section>
      <section className='men grid-main'>
        <div>
            <h2>Best perfumes for office men</h2>
            <br />
            <div className='perfumes'>
              <Perfume name={"Prada L'Homme"} />
              <Perfume name={'Eros'} />
              <Perfume name={'Acqua di Giò Profumo'} />
            </div>
          </div>
      </section>
      <section className='women grid-main'>
        <div>
          <h2>Best perfumes for office women</h2>
          <br />
          <div className='perfumes'>
            <Perfume name={'Good Girl'} />
            <Perfume name={'Shalimar Eau de Parfum'} />
            <Perfume name={"J'adore"} />
          </div>
        </div>
      </section>
      <section className='search-trigger grid-main'>
        <div>
          <h2>Looking for certain thing?</h2>
          <br />
          <Link to={'/search'}>
          <button>use our advanced search</button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home