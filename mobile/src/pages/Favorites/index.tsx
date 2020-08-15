import React, { useState  } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native'

//Importação do cabeçalho
import PageHeader from '../../components/PageHeader';
import AsyncStorage from '@react-native-community/async-storage';

//importação de componentes da página
import TeacherItem, { Teacher } from '../../components/TeacherItem';
//importação do css
import styles from './styles';

function Favorites () {
   const [favorites, setFavorites] = useState([]);
   //favoritos do aplicativo
   function loadFavorites () {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }
  useFocusEffect(() => {
    loadFavorites();
  });
  return(
    <View style={styles.container}>
      <PageHeader title= "Meus proffys favoritos" />

      <ScrollView 
        style={styles.teacherlist}
        contentContainerStyle= {{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
      {favorites.map((teacher: Teacher) => {
        return (
          <TeacherItem 
            key={teacher.id}
            teacher={teacher}
            favorited
          />
        );
      })}
      </ScrollView>
    </View>
  );
}

export default Favorites;