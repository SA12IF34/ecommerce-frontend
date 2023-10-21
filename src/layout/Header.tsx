import {RefObject, useRef, useEffect, useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai';
import {TbShoppingCartCheck} from 'react-icons/tb';
import { AxiosInstance } from 'axios';
import { Context } from '../context/ContextProvider';
import companies from '../utils/companies.json';
import gender from '../utils/gender.json';
import notes from '../utils/top_notes.json';
import accords from '../utils/accords.json';

type props = {
  authenticated: boolean,
  api: AxiosInstance
}

function Header({authenticated, api}: props) {

  const {setSearchData} = useContext(Context)
  const navigate = useNavigate();

  const searchRef = useRef() as RefObject<HTMLInputElement>;
  const companyRef = useRef() as RefObject<HTMLSelectElement>;
  const genderRef = useRef() as RefObject<HTMLSelectElement>;
  const notesRef = useRef() as RefObject<HTMLSelectElement>;
  const accordsRef = useRef() as RefObject<HTMLSelectElement>;

  const [state, setState] = useState<number>(0);

  async function handleSearch() {
    const notSearch = searchRef.current?.value === '';
    const notCompany = companyRef.current?.value === 'company';
    const notGender = genderRef.current?.value === 'gender';
    const notNotes = notesRef.current?.value === 'notes';
    const notAccords = accordsRef.current?.value === 'accords';

    if (!notSearch || !notCompany || !notGender || !notNotes || !notAccords) {
      const response = await api.post('search/', {
        'filters': {
          'name': searchRef.current?.value,
          'company': companyRef.current?.value,
          'for_gender': genderRef.current?.value,
          'main accords': accordsRef.current?.value,
          'top notes': notesRef.current?.value
        }
      })

      if (response.status === 200) {
        const data = await response.data;
        setSearchData(data['data']);
        navigate('/search')
      }


    } else if (notSearch && notCompany && notGender && notNotes && notAccords) {
      const response = await api.get('search/');
      if (response.status === 200) {
        const data = await response.data;
        setSearchData(data['data']);
        
      }
    }
  }

  useEffect(() => {
    handleSearch();
    
  }, [state])


  return (
    <header>
      <div>
        <Link to={'/'}>
        <h1 className='title'>ScentChan</h1>
        </Link>
      </div>
      <div className='search'>
        <div className='field'>
          <input type="text" onChange={() => {setState(state+1)}} placeholder='search by perfume name' ref={searchRef} />
          <button>
            <AiOutlineSearch />
          </button>
        </div>
        <div className='options'>
          <select defaultValue={'company'} onChange={() => {setState(state+1)}} name="company" id="company" ref={companyRef}>
            <option value="company">company</option>
            {companies['companies'].map(c => {
              return (
                <option value={c}>{c}</option>
              )
            })}
          </select>
          <select defaultValue={'gender'} onChange={() => {setState(state+1)}} name="gender" id="gender" ref={genderRef}>
            <option value="gender">Gender</option>
            {gender['gender'].map(g => {
              return (
                <option value={g}>{g}</option>
              )
            })}
          </select>
          <select defaultValue={'notes'} onChange={() => {setState(state+1)}} name="notes" id="notes" ref={notesRef}>
            <option value="notes">Notes</option>
            {notes['top_notes'].map(n => {
              return (
                <option value={n}>{n}</option>
              )
            })}
          </select>
          <select defaultValue={'accords'} onChange={() => {setState(state+1)}} name="accords" id="accords" ref={accordsRef}> 
            <option value="accords">Accords</option>
            {accords['accords'].map(a => {
              return (
                <option value={a}>{a}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className='account'>
        {authenticated ? 
        <>
          <Link to={'/boughts'}>
            <button>
              <TbShoppingCartCheck />
            </button>
          </Link>
          <Link to={'/cart'}>
            <button>
              <AiOutlineShoppingCart />
            </button>
          </Link>
          <button>
            Log Out
          </button>
        </> : 
        <>
          <Link to={'/sign-in'}>
            <button>Sign In</button>
          </Link>
          <Link to={'/sign-up'}>
            <button>Sign Up</button>
          </Link>
        </>}
      </div>
    </header>
  )
}

export default Header;