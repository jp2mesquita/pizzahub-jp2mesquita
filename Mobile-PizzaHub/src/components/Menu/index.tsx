import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../@types/product';

import { formatCurrency } from '../../utils/formatCurency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from './styles';

interface MenuProps{
  onAddToCart: (product: Product) => void
  products: Product[]
}

export function Menu({ onAddToCart, products }:MenuProps){
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
        onAddToCart={onAddToCart}
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

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>

          </ProductContainer>
        )
        }
      />
    </>
  );
}
