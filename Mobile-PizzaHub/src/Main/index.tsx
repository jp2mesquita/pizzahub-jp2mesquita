import { useState } from 'react';
import { CartItem } from '../@types/cartItem';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { products } from '../mocks/products';
import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main(){
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      quantity: 1,
      product: products[0]
    },
    {
      quantity: 2,
      product: products[1]
    }
  ]);

  function handleSaveTable(table:string){
    alert(`main: ${table}`);
    setSelectedTable(table);
  }

  function handleCancelOrder(){
    setSelectedTable('');
  }

  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

      </Container>


      <Footer>
        <FooterContainer>
          {selectedTable
            ? (
              <Cart
                cartItems={cartItems}
              />
            )
            : (
              <Button onPress={() => setIsTableModalOpen(true)}>
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
