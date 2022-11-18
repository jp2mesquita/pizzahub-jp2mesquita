import { useState } from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../mocks/categories';
import { Text } from '../Text';
import { Category, Icon } from './styles';

export function Categories(){

  const [selectedCategory, setSelectedCategory] = useState< string>('');

  function handleSelectCategory(categoryId: string){
    const cetegory = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(cetegory);
  }

  return (

    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingRight: 24}}
      data={categories}
      keyExtractor={category => category._id}
      renderItem={ ({item: category}) => {
        const isSelected = selectedCategory === category._id;

        return(
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>

              <Text opacity={isSelected ? 1 : .3}>
                {category.icon}
              </Text>

            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : .3}>
              {category.name}
            </Text>
          </Category>
        );
      }}

    >

    </FlatList>

  );
}
