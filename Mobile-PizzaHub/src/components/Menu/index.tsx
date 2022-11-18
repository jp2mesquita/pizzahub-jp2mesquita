import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';

import { Product, ProductImage, ProductDetails, Separator, AddToCartButton } from './styles';

export function Menu(){
  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      style={{marginTop: 32}}
      contentContainerStyle={{paddingHorizontal: 24}}
      data={products}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => (
        <Product>
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

        </Product>
      )
      }
    />
  );
}
