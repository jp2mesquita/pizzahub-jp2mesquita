
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
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}



export function OrdersBoard({icon, title, orders, onCancelOrder, onChangeOrderStatus} : OrdersBoardProps){

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

  async function handleChangeOrderStatus(){
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`,  {status});

    toast.success(`O pedido da  mesa ${selectedOrder?.table} teve o status  alterado!`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalOpen(false);
  }

  async function handleCancelOrder(){

    setIsLoading(true);

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
        onChangeOrderStatus={handleChangeOrderStatus}
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
