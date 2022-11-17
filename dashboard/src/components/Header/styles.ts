import styled from 'styled-components';


export const Container = styled.header`
  background-color: #d73035;
  display: flex;
  justify-content: center;
  height: 12.375rem;
  align-items: center;

`;

export const Content = styled.div`
  width: min(100vw, 76rem);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details{
    h1{
      color: #fff;
      font-size: 2rem;
    }

    h2{
      color: #fff;
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.9;
      margin-top: .375rem;

    }
  }
`;
