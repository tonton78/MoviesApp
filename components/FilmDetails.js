import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text,ActivityIndicator,ScrollView,Image, ImageBackground, AsyncStorage} from 'react-native'
import {getDetailsFilmsFromApi} from '../API/TMDB'
import {getImageFromApi} from '../API/TMDB'
import {connect } from 'react-redux'
import moment from 'moment'
class FilmDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          film: undefined, 
          isLoading: true 
        }   
    }











    async componentDidMount(){
        getDetailsFilmsFromApi(this.props.route.params.idFilm).then(data => {
            this.setState({
              film: data,
              isLoading: false
            })
        })

        try {
          const value = await AsyncStorage.getItem('telephone')
          if(value !== null) {
            // value previously stored
            console.log("***************** async storage", JSON.parse(value))
          }
        } catch(e) {
          // error reading value
        }
    }
    componentDidUpdate(){
        console.log("componentDidUpdate:") 
        console.log(this.props.favoritesFilms)
    }

    
    _displayLoading (){
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size= 'large' color="#FF0000"/>
                </View>
            )
        }
     }
     _toggleFavorite (){
         const action ={type:"TOGGLE_FAVORITE", value: this.state.film }
         this.props.dispatch(action)

     }
     _displayFavoriteImage(){
         var sourceImage = require ('../Image/ic_favorite_border.png')
         if (this.props.favoritesFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
            // Film dans nos favoris
            sourceImage = require('../Image/ic_favorite.png')
          }
          return (
            <Image
              style={styles.favorite_image}
              source={sourceImage}
            />
          )


     }
     _displayFilm() {
         const film = this.state.film
        if (film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
                <ImageBackground style={styles.image}
                    source={{uri:getImageFromApi (film.backdrop_path) }}>
                      <TouchableOpacity style={styles.favorite_container}
                 onPress={()=> this._toggleFavorite()} >
                     {this._displayFavoriteImage()}
                      </TouchableOpacity>
                      
                </ImageBackground>
                    
                <Text style= {styles.title_text}> {film.title}</Text>
                
                <View style= {styles.header_container}>
                 <Text style= {styles.description_text}> {film.overview}</Text>
                </View> 
                <View  style = {styles.vote_container}>
                <Text style = {[styles.vote_text, {color : film.vote_average>= 5 ? 'green' : 'red'}]}>{film.vote_average}</Text>
                </View>
                <View style ={styles.date_container}> 
                 <Text style={styles.date_text}> Sorti le {moment (film.release_date).format('DD/MM/YYYY')}</Text>
                 </View>
              {/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue. Après tout vous êtes aussi là pour ça non ? :)*/}
            </ScrollView>
          )
        }
    }

  render() {
     console.log(this.props);
    return (
      <View style={styles.main_container}>
        
        {this._displayFilm ()}
        {this._displayLoading ()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
 },
  scrollview_container : {
      flex:1
  },
  favorite_image:{
      width:40,
      height: 40,
      marginLeft:20,
      marginTop:10,
  },
  image : {
    height: 200,
    margin: 5,
    backgroundColor: 'gray',
    flexDirection:'row',
  },
  favorite_container:{
      alignItems:'center',
  },
  title_text : {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      textAlign: 'center'
    },
    header_container: {
        flex: 4,
        flexDirection: 'row',

    },
    description_text : {
        
      fontSize: 14,
      fontStyle: 'italic',
      textAlign: 'center',
      margin: 5,

    },
    vote_container: {
        flex: 1,
        
        
        
    },
    vote_text: {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666',
        marginTop: 15,
        
    },
    date_container: {
        flex:1,
    },
    date_text:{
        textAlign: 'center',
        fontSize: 26,
        marginTop: 15,
    },
})

const mapStateToProps = (state) => {
    return {
        favoritesFilms: state.togglefavorite.favoritesFilms
    }
}
export default connect(mapStateToProps)(FilmDetails);
