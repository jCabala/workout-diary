import styled from 'styled-components';

export const TablesContainer = styled.div`
  table {
    border: 1px solid ${({ theme }) => theme.colors.primary};

    thead {
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
      border-radius: 12px !important;
    }

    tbody {
      tr {
        td {
          div {
            display: flex;
            justify-content: center;
            align-items: center;

            button {
              margin: 0 10px;
              border: none;
              border-radius: 50%;

              width: 40px;
              height: 40px;

              @media (max-width: 400px) {
                width: 30px;
                height: 30px;
                font-size: 10px !important;
                margin: 0 5px;
              }
              transition: transform 0.2s ease-in;

              &:hover {
                transform: scale(0.9);
              }
            }
          }
        }
      }
    }
  }

  h3 {
    font-weight: 700;
    background: -webkit-linear-gradient(${({ theme }) => theme.text.gradient});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    margin-top: 30px;
  }
`;

export const AccomplishedBtn = styled.button`
  background: green;
`;

export const DeleteBtn = styled.button`
  background: red;
`;
