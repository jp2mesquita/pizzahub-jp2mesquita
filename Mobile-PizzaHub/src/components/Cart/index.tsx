import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../@types/cartItem';
import { formatCurrency } from '../../utils/formatCurency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { Actions, Image, ItemContainer, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles';

interface CartProps{
  cartItems: CartItem[]
}

export function Cart({cartItems}: CartProps){

  const isCartEmpty = cartItems.length < 1;

  return(
    <>
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
                <TouchableOpacity style={{marginRight: 24}}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity>
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
                <Text size={20} weight="600">{formatCurrency(120)}</Text>
              </>
            )
          }
        </TotalContainer>

        <Button
          onPress={() => alert('Pedido confirmado!')}
          disable={isCartEmpty}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
