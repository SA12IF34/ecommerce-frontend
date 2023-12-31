import {createContext, useState, useEffect, ReactNode} from 'react';
import { api } from '../api';

const Context = createContext<any>({});
export {Context};

function ContextProvider({children}: {children: ReactNode}) {
 
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<Array<object>>([{}]);

  let num = 1;

  async function handleRefreshTokens(refresh: string): Promise<void> {
    const response = await api.post('token/refresh/', {
        'refresh': refresh
    })

    if (response.status === 200) {
        const credentials = await response.data;
        window.localStorage.setItem('access', credentials['access']);
        window.localStorage.setItem('refresh', credentials['refresh']);
      
        setAccess(credentials['access']);
        setRefresh(credentials['refresh']);
        setAuthenticated(true);
        num = 0;
    }
  }

  useEffect(() => {
    
    if (window.localStorage.getItem('refresh') && num === 1) {
      const refreshToken = window.localStorage.getItem('refresh') as string;  
      handleRefreshTokens(refreshToken);
    }

    setInterval(() => {
        const refreshToken = window.localStorage.getItem('refresh') as string;
        handleRefreshTokens(refreshToken);
    }, 900000)

  }, []);


  const data = {
    access: access,
    setAccess: setAccess,
    refresh: refresh,
    setRefresh: setRefresh,
    authenticated: authenticated,
    searchData: searchData,
    setSearchData: setSearchData
  }

  return (
    <Context.Provider value={data}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider;