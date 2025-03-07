import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import {useRouter} from 'expo-router'

const welcome = () => {
  const router = useRouter();
  const replacePath = (path: any) => {
    router.replace(path);
  }
  
  return (
    <View style={styles.container}> 
      <View style={styles.formContainer}> 
          <MaterialCommunityIcons name="food-apple-outline" size={200} color="#4CAF50" margin={5}/>
          <Text style={styles.text}>Bem-vindo ao </Text>
          <Text style={{fontSize: 24, margin: 15}}>KarlaNutriAI</Text>
          <TouchableOpacity>
            <Text style={styles.button} onPress={() => {replacePath('login')}}>Logar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={styles.button} onPress={() => {replacePath('register')}}>Registrar-se</Text>
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
    fontWeight: "bold"
  }
})

export default welcome