import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  background: rgba( 0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);

  display: flex;
  align-items: center;
  justify-content: center;
`;


export const ModalBody = styled.div`
  background: #fff;
  width: 30rem;
  padding: 2rem;
  border-radius: .5rem;

  header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
      font-size: 2.5rem;
    }
    button{
      line-height: 0;
      border: 0;
      background: transparent;
    }
  }

  .status-container{
    margin-top:  2rem;

    small{
      font-size: .875rem;
      opacity: .8;
    }

    div{
      margin-top: .5rem;
      display: flex;
      align-items: center;
      gap: .8rem;

    }
  }


`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong{
    font-weight: 500;
    font-size: .875rem;
    opacity: .8;
  }

  .order-items{
    margin-top: 1rem;


    .item{
      display: flex;


      & + .item{
        margin-top: 1rem;
      }

      picture{
        width: 3.5rem;
        height: 3rem;
        overflow: hidden;
        position: relative;
        img{
          position: absolute;
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: .5rem;
        }
      }


      .quantity{
        font-size: .875rem;
        color: #666;
        display: block;
        min-width: 1.25rem;
        margin-left: .75rem;

      }

      .product-details{
        margin-left: .25rem;
        strong{
          display: block;
          margin-bottom: .25rem;
        }

        span{
          font-size: .875rem;
          color: #666;
        }
      }
    }
  }

  .total{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    span{
      font-weight: 500;
      font-size: .875rem;
      opacity: .8;
    }
  }

`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  button:disabled{
    opacity: .5;
    cursor: not-allowed;
  }

  .primary{
    background-color: #333;
    border-radius: 3rem;
    border: 0;
    color: #fff;
    padding: .75rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;

  }

  .secondary{
    padding: .75rem 2.5rem;
    color: #d73035;
    font-weight: bold;
    border: 0;
    background: transparent;
    margin-top: .75rem;
  }
`;
