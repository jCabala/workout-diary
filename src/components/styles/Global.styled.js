import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    *{ 
        margin: 0; 
        padding: 0; 
        box-sizing: border-box;
        
    }

    button{
      color: white !important;
    }

    a{
        text-decoration: none;
        color: white;
    }
`;

export const Section = styled.section`
  margin-left: 80px;
  margin-right: 30px;
  margin-top: 20px;
`;

export const SectionTitle = styled.h1`
  font-weight: 700;
  background: -webkit-linear-gradient(${({ theme }) => theme.text.gradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Dividor = styled.div`
  width: 128px;
  height: 16px;
  margin: 10px 0;
  background: ${({ theme }) =>
    `linear-gradient(${theme.colors.primary}, ${theme.colors.secondary})`};
  border-radius: 12px;
`;

export const AddButton = styled.button`
  background: ${({ theme }) =>
    `linear-gradient(${theme.colors.primary}, ${theme.colors.secondary})`};
  border-radius: 50%;
  border: none;
  padding: 10px;
  position: fixed;
  transition: transform 0.5s;
  right: 10px;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 700px) {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  z-index: 1;
`;

export const ColoredText = styled.span`
  background: ${({ theme }) =>
    `linear-gradient(${theme.colors.primary}, ${theme.colors.secondary})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
