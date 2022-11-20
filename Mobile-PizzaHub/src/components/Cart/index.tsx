import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../@types/cartItem';
import { Product } from '../../@types/product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmModal } from '../OrderConfirmModal';
import { Text } from '../Text';
import { Actions, Image, ItemContainer, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles';

interface CartProps{
  cartItems: CartItem[]
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
  selectedTable: string
}

export function Cart({cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable}: CartProps){
  const [isLoading, setIsLoading] = useState(false);
  const isCartEmpty = cartItems.length < 1;
  const [isModalVisible, setIsmodalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) =>{
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder(){
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };

    setIsLoading(true);
    await api.post('/orders', payload );

    setIsLoading(false);
    setIsmodalVisible(true);
  }

  function handleOk(){
    onConfirmOrder();
    setIsmodalVisible(false);
  }

  return(
    <>
      <OrderConfirmModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {!isCartEmpty && (
        <FlatList
          style={{marginBottom: 20, maxHeight: 150}}
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={ ({item: cartItem}) => (
            <ItemContainer>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.1.5:3333/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{marginTop: 4}}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{marginRight: 24}}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </ItemContainer>
          )
          }
        />
      )}

      <Summary>

        <TotalContainer>
          {isCartEmpty
            ? (
              <>
                <Text color='#999'>Seu carrinho está vazio!</Text>
              </>
            )
            : (
              <>
                <Text color='#666'>Total</Text>
                <Text size={20} weight="600">{formatCurrency(total)}</Text>
              </>
            )
          }
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disable={isCartEmpty}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
