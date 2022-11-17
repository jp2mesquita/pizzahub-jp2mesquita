
import { useState } from 'react';
import { Order } from '../../@types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps{
  icon: string,
  title: string,
  orders: Order[]
}

export function OrdersBoard({icon, title, orders} : OrdersBoardProps){

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenOrderModal(order: Order){
    setIsModalOpen(true);
    setSelectedOrder(order);
  }

  function handleCloseOrderModal(){
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  return(
    <Board>

      <OrderModal
        visible={isModalOpen}
        order={selectedOrder}
        onClose={handleCloseOrderModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 &&
        orders.map(order => (
          <OrdersContainer key={order._id}>
            <button
              type='button'
              onClick={() => handleOpenOrderModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>

          </OrdersContainer>
        ))
      }

    </Board>
  );
}
