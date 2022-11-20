import { useState } from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../@types/category';

import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';


interface CategoriesProps {
  categories: Category[]
  onSelectCategory: (categoryId: string) => Promise<void>
}

export function Categories({categories, onSelectCategory}: CategoriesProps){

  const [selectedCategory, setSelectedCategory] = useState< string>('');

  function handleSelectCategory(categoryId: string){
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);

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
          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
            <Icon>

              <Text opacity={isSelected ? 1 : .3}>
                {category.icon}
              </Text>

            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : .3}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}

    >

    </FlatList>

  );
}
