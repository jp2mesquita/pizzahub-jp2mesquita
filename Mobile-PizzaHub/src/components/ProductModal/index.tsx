import { FlatList, Modal } from 'react-native';
import { Product } from '../../@types/product';
import { formatCurrency } from '../../utils/formatCurency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { CloseButton, Footer, FooterContainer, Image, Ingredient, IngredientsContainer, ModalBody, ModalHeader, PriceContainer } from './styles';



interface ProductModalProps{
  visible: boolean
  onClose: () => void
  product: Product | null
}

export function ProductModal( { visible, onClose, product }: ProductModalProps){

  if(!product){
    return null;
  }

  return(
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.1.5:3333/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton
          onPress={onClose}
        >
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <ModalHeader>
          <Text weight='600' size={24}>{product.name}</Text>
          <Text color='#666' style={{marginTop: 8}}>
            {product.description}
          </Text>
        </ModalHeader>

        {product.ingredients.length > 0 && (
          <IngredientsContainer >
            <Text weight='600' color='#666'>Ingredientes</Text>

            <FlatList
              style={{marginTop: 16}}
              data={product.ingredients}
              keyExtractor={ ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={ ( {item: ingredient }) => (
                <Ingredient>
                  <Text> {ingredient.icon}</Text>
                  <Text size={14} color="#666" style={{marginLeft: 20}}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )

        }

      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button
            onPress={() => alert('Adicionar ao pedido')}
          >
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>

    </Modal>
  );
}