import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/ContextProvider';

import '../App.css';


function Search() {

  const {searchData} = useContext(Context);

  return (
    <div className='searchPage grid-main'>
      <div className='products'>
        {searchData.length > 0 ? searchData.map((data: object) => {
          return (
            <Link to={`/perfume/${data['name' as keyof typeof data]}`}>
              <div className='perfume'>
                <img src={data['image' as keyof typeof data]} alt="" />
                <br />
                <span >{(data['name' as keyof typeof data])}</span> {/* if longer than 17 charecters, crop it */}
                <br />
                <br />
                <div>
                  <span>$30</span>
                  <span className='womenmen'>{data['for_gender' as keyof typeof data]}</span>
                </div>
              </div>
            </Link>
          )
        }): 
        <>
          <h2 style={{margin: '50px'}}>Sorry, we don't have this perfume</h2>
        </>}
      </div>
    </div>
  )
}

export default Search;