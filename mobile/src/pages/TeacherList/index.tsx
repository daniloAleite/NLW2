import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import TeacherItem, { Teacher } from '../../components/TeacherItem';

//Importação do cabeçalho
import PageHeader from '../../components/PageHeader';

//importação da conexão do banco
import api from '../../services/api';

//importação do css
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList () {

  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] =useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  const [isFilterVisivle, setIsFilterVisivle ] = useState(false);

  //favoritos do aplicativo
  function loadFavorites () {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersId = favoritedTeachers.map( (teacher: Teacher) =>{
          return teacher.id
        });
        setFavorites(favoritedTeachersId);
      }
    });
  }
 useFocusEffect(() => {
   loadFavorites();
 });

//Ativa e desativa o filtro da página de professores
  function handleToggleFiltersVisible(){
    setIsFilterVisivle(!isFilterVisivle);
  }

  //busca de professores
  async function handleFilterSubmit () {
    loadFavorites();
    
    const response =await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setIsFilterVisivle(false)
    setTeachers(response.data);
  }

  return(
    <View style={styles.container}>
      <PageHeader 
        title= "Proffys disponíveis"
        headerRight={(
          <BorderlessButton>
            <Feather 
              name="filter" 
              size={20} 
              color="#FFF" 
              onPress={handleToggleFiltersVisible}
            />
          </BorderlessButton>
        )}
      >
        {isFilterVisivle && (
          <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={text => setSubject(text)}
            placeholder="Qual é a matéria?" 
            placeholderTextColor= "#c1bccc"
          />
        
          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da Semamna</Text>
              <TextInput
                style={styles.input}
                value={week_day}
                onChangeText={text => setWeek_day(text)}
                placeholder="Qual o dia?" 
                placeholderTextColor= "#c1bccc"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={text => setTime(text)}
                placeholder="Qual horário?" 
                placeholderTextColor= "#c1bccc"
              />
            </View>
          </View>
          <RectButton 
            style={styles.submitButton}
            onPress={handleFilterSubmit}
          >
            <Text style={styles.submitButtonText}>
              Filtrar
            </Text>
          </RectButton>
        </View>
        )}
        
      </PageHeader>
      <ScrollView 
        style={styles.teacherlist}
        contentContainerStyle= {{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) =>{
          return (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={ favorites.includes(teacher.id)}
          />
            );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;