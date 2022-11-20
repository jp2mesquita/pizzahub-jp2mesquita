import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { api } from '../utils/api';

import { CartItem } from '../@types/cartItem';
import { Product } from '../@types/product';
import { Category } from '../@types/category';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';

import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main(){
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts ] = useState<Product[]>([]);
  const [categories, setCategories ] = useState<Category[]>([]);


  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsReponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsReponse.data);
      setIsLoading(false);
    });

  }, []);

  function handleSaveTable(table:string){
    setSelectedTable(table);
  }

  function handleResetOrder(){
    setSelectedTable('');
    setCartItems([]);
  }




  function handleAddToCart(product: Product){
    if(!selectedTable){
      setIsTableModalOpen(true);
    }

    setCartItems((prevState) => {
      const itemIndex =  prevState.findIndex(cartItem =>cartItem.product._id ===  product._id);

      if( itemIndex < 0){
        return prevState.concat({
          quantity: 1,
          product
        });
      }
      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product){
    setCartItems((prevState) => {
      const itemIndex =  prevState.findIndex(
        cartItem =>cartItem.product._id ===  product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1){


        newCartItems.splice(itemIndex, 1);
        return newCartItems;

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;

    });
  }


  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading
          ? (
            <CenteredContainer>

              <ActivityIndicator
                color="#d730335"
                size="large"
              />
            </CenteredContainer>
          )
          : (
            <>
              <CategoriesContainer>
                <Categories
                  categories={categories}
                />
              </CategoriesContainer>

              {products.length > 0
                ?(
                  <MenuContainer>
                    <Menu
                      onAddToCart={handleAddToCart }
                      products={products}
                    />
                  </MenuContainer>
                )
                : (
                  <CenteredContainer>
                    <Empty/>
                    <Text color="#666" style={{marginTop: 24}}>Nenhum produdo foi encontrado</Text>
                  </CenteredContainer>
                )

              }
            </>
          )
        }

      </Container>


      <Footer>
        <FooterContainer>
          {selectedTable
            ? (
              <Cart
                cartItems={cartItems}
                onAdd={handleAddToCart}
                onDecrement={handleDecrementCartItem}
                onConfirmOrder={handleResetOrder}
              />
            )
            : (
              <Button
                onPress={() => setIsTableModalOpen(true)}
                disable={isLoading}
              >
                Novo Pedido
              </Button>
            )

          }

        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onSave={handleSaveTable}
      />

    </>
  );
}
