import { useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main(){
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const [selectedTable, setSelectedTable] = useState('');

  function handleSaveTable(table:string){
    alert(`main: ${table}`);
    setSelectedTable(table);
  }

  return(
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

      </Container>


      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalOpen(true)}>
              Novo Pedido
            </Button>)
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
