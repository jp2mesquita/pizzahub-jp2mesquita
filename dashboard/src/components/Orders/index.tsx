import { Order } from '../../@types/Order';
import { OrdersBoard } from '../OrdersBoard';
import {  Container } from './styles';

const orders: Order[] =[
  {
    _id: '6375086608e9851510ca7d68',
    table: '123',
    status: 'WAITNG',
    products: [
      {
        _id: '6374f94989b4c428b1f118f3',
        quantity: 3,
        product:{
          name: 'Pizza quatro queijos',
          imagePath: '1668610377549-quatro-queijos.png',
          price: 40,
        }
      },
      {
        _id: '637505a264828de9200a9c03',
        quantity: 2,
        product:{
          name: 'Coca Cola',
          imagePath: '1668613538099-coca-cola.png',
          price: 7,
        }
      }
    ]
  }];

export function Orders(){
  return(
    <Container>
      <OrdersBoard
        icon='⏱️'
        title="Fila de espera"
        orders={orders}
      />

      <OrdersBoard
        icon='🧑‍🍳'
        title="Fila de espera"
        orders={[]}
      />

      <OrdersBoard
        icon='✅'
        title="Pronto"
        orders={[]}

      />
    </Container>
  );
}
