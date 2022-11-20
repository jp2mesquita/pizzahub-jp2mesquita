
import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';

import { Order } from '../../@types/Order';
import { OrderModal } from '../OrderModal';

import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps{
  icon: string,
  title: string,
  orders: Order[]
  onCancelOrder: (orderId: string) => void
}



export function OrdersBoard({icon, title, orders, onCancelOrder} : OrdersBoardProps){

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrderModal(order: Order){
    setIsModalOpen(true);
    setSelectedOrder(order);
  }

  function handleCloseOrderModal(){
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder(){

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da  mesa ${selectedOrder?.table} foi cancelado!`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalOpen(false);
  }

  return(
    <Board>

      <OrderModal
        visible={isModalOpen}
        order={selectedOrder}
        onClose={handleCloseOrderModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
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
