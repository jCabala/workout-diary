import React from 'react';
import Sidebar from './Sidebar';
import { usePageState } from '../../contexts/PageContext';
import Diary from './Diary';
import Goals from './Goals';
import { useUserState } from '../../contexts/UserContext';

const Dashboard = () => {
  const { page } = usePageState();

  return (
    <>
      <Sidebar />
      {page === 'diary' ? <Diary /> : page === 'goals' ? <Goals /> : <> </>}
    </>
  );
};

export default Dashboard;
