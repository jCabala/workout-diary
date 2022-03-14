import {
  SidebarStyled,
  Hamburger,
  SidebarLinks,
  SidebarLink,
} from '../styles/Sidebar.styled';
import { GiHamburgerMenu } from 'react-icons/gi';

import { AiOutlineClose } from 'react-icons/ai';
import { BiLogOut, BiBookContent } from 'react-icons/bi';

import { CgGym } from 'react-icons/cg';
import { useState } from 'react';
import { usePageState } from '../../contexts/PageContext';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { page, setPage } = usePageState();

  const links = [
    {
      name: 'diary',
      icon: <BiBookContent color='white' size='1.5rem' />,
      text: 'Diary',
    },
    {
      name: 'goals',
      icon: <CgGym color='white' size='1.5rem' />,
      text: 'Goals',
    },
    {
      name: 'logout',
      icon: <BiLogOut color='white' size='1.5rem' />,
      text: 'LogOut',
      fn: async () => await signOut(auth),
    },
  ];

  return (
    <SidebarStyled opened={open}>
      <Hamburger onClick={() => setOpen(!open)}>
        {!open ? (
          <GiHamburgerMenu color='white' size='1.5rem' />
        ) : (
          <AiOutlineClose color='white' size='1.5rem' />
        )}
      </Hamburger>
      <SidebarLinks>
        {links.map(({ name, icon, text, fn }) => (
          <SidebarLink
            key={name}
            active={page === name}
            onClick={fn ? fn : () => setPage(name)}
          >
            <div>{icon}</div>
            {open && <span>{text}</span>}
          </SidebarLink>
        ))}
      </SidebarLinks>
    </SidebarStyled>
  );
};

export default Sidebar;
