import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View, StyleSheet,TouchableOpacity,TextInput } from 'react-native'
import {useRouter} from 'expo-router'

const register = () => {
    const router = useRouter();
        const replacePath = (path: any) => {
          router.replace(path);
        }

  return (
        <View style={styles.container}> 
          <View style={styles.formContainer}> 
              <MaterialCommunityIcons name="food-apple-outline" size={100} color="#4CAF50" margin={5}/>
              <Text style={styles.text}>Registrar-se</Text>
              <TextInput style={styles.form} placeholderTextColor= '#4CAF50' placeholder='Nome Completo' ></TextInput>
              <TextInput style={styles.form} placeholderTextColor= '#4CAF50' placeholder='E-mail'></TextInput>
              <TextInput style={styles.form} placeholderTextColor= '#4CAF50' placeholder='Senha' secureTextEntry></TextInput>
              <TextInput style={styles.form} placeholderTextColor= '#4CAF50' placeholder='Repetir Senha' secureTextEntry></TextInput>
              <TextInput style={styles.form} placeholderTextColor= '#4CAF50' placeholder='Telefone'></TextInput>
              <TouchableOpacity>
                <Text style={styles.button} onPress={() => {replacePath('login')}}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={styles.button} onPress={() => {replacePath('welcome')}}>Voltar</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
    formContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.00)',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center'
    },
    button:{
      color: '#fff',
      backgroundColor: '#4CAF50',
      width: 300,
      textAlign: 'center',
      padding: 10,
      margin: 5,
      borderRadius: 8,
      fontSize: 24
    },
    text: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 10
    },
    form:{ 
      fontSize: 24,  
      color: "#4CAF50",
      borderWidth: 2,
      borderColor: '#4CAF50',
      borderRadius: 10,
      width: 300,
      padding: 10,
      margin: 5,
    }
})

export default register