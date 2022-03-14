import { createContext, useContext, useEffect, useState } from 'react';

const Page = createContext();

const PageContext = ({ children }) => {
  const [page, setPage] = useState('diary');

  return <Page.Provider value={{ page, setPage }}>{children}</Page.Provider>;
};

export const usePageState = () => useContext(Page);
export default PageContext;
