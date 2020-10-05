
import React from 'react'
import Search from '../components/Search';
import FilmDetails from '../components/FilmDetails'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer}from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Favorites from '../components/Favorites'
import Options from '../components/Options'
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();






export default class Navi extends React.Component {

  render() {
    SearchStackNavigator= () =>
    
  
    <Stack.Navigator screenOptions= {{
      headerStyle : {backgroundColor :'orange'}
    }}>
      
      <Stack.Screen name="Search" component={Search} />
      
      <Stack.Screen name="FilmDetails" component={FilmDetails} />
      <Stack.Screen name="Favoris" component={Favorites} />
      <Stack.Screen name= "Options" component = {Options}/>
    </Stack.Navigator>
    

    return (
      
       <NavigationContainer>
         
       <Tab.Navigator>
        <Tab.Screen name="Recherche" component= {SearchStackNavigator}/> 
        <Tab.Screen name="Favoris" component= {Favorites} />
        <Tab.Screen name="Options" component = {Options}/>
       </Tab.Navigator>
       
       </NavigationContainer>
       
     
     
    )
     

    

      
    
  }
  
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  },
})