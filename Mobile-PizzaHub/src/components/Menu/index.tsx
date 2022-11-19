import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../@types/product';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from './styles';

export function Menu(){
  const [isProductModalVisible,setIsProducMotalVisible] = useState(false);
  const [selectedProuct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product){
    setIsProducMotalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setIsProducMotalVisible(false)}
        product={selectedProuct}
      />

      <FlatList
        ItemSeparatorComponent={Separator}
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        data={products}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.1.5:3333/uploads/${product.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight='600' style={{marginVertical: 8}}>
                {product.name}
              </Text>

              <Text size={14} color="#666">
                {product.description}
              </Text>

              <Text size={14} weight='600'>
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>

          </ProductContainer>
        )
        }
      />
    </>
  );
}
