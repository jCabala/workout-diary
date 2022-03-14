import styled from 'styled-components';

export const SidebarStyled = styled.nav`
  height: 100vh;
  width: ${props => (props.opened ? '150px' : '50px')};
  transition: width 0.5s;

  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Hamburger = styled.div`
  align-self: flex-start;
  margin: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const SidebarLinks = styled.div`
  margin-top: 50px;

  width: 100%;

  border-bottom: 1px solid white;
`;

export const SidebarLink = styled.a`
  width: 100%;
  display: inline-flex;
  text-align: center;
  padding: 10px 0;
  align-self: flex-start;
  border-top: 1px solid white;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.colors.secondary : 'transparent'};
  span {
    overflow: hidden;
    color: white !important;
    width: 120px;

    font-weight: 500;
  }

  * {
    margin-left: 5px;
  }

  div {
    width: 30px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
