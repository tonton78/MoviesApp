/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDB';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilmList from './FilmList';

class Search extends React.Component {
  _LoadFilms() {
    this.setState({isLoading: true});
    if (this.searchedTex.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedTex).then((data) =>
        this.setState({films: data.results, isLoading: false}),
      );
    }
  }
  _displayDetailsforfilms = (idFilm) => {
    this.props.navigation.navigate('FilmDetails', {idFilm: idFilm});
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {films: [], isLoading: false};

    this.searchedTex = '';
  }

  _searchTextInputChanged(text) {
    this.searchedTex = text;
  }
  _searchFilms() {
    this.setState(
      {
        films: [],
      },
      () => {
        this._LoadFilms();
      },
    );
  }

  

  render() {
    
    return (
      <LinearGradient
        colors={['gold', 'red']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.main_container}>
          <TextInput
            onSubmitEditing={() => this._searchFilms()}
            onChangeText={(text) => this._searchTextInputChanged(text)}
            style={styles.textinput}
            placeholder="Titre du film"
          />
          <TouchableOpacity onPress={() => this._searchFilms()}>
            <LinearGradient
              colors={['red', 'gold']}
              style={styles.searchbutton}>
              <Text style={styles.searchbuttontext}> Rechercher </Text>
            </LinearGradient>
          </TouchableOpacity>
          {this.searchedTex === '' ? (
              <View style={styles.main_container2}> 
              <Text style={styles.nosearchtext}> AUCUNE RECHERCHE A ETE ENTRER , VOUS AVEZ FAIT SALLE VIDE </Text>
             
              <Image style = {styles.nosearch_image} source= {require('../Image/ic_tele.jpeg')}/>
              </View>
          ) : (
            <FilmList
              films={this.state.films}
              navigation={this.props.navigation}
              loadFilms={this._LoadFilms}
            />
          )}
          {this._displayLoading()}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  searchbutton: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 8,
  },
  searchbuttontext: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Kailasa',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

  main_container: {
    marginTop: 60,
    flex: 1,
  },
  main_container2: {
    flex: 1,
  },
  nosearchtext:{

    fontSize: 24,
    color: 'black',
    fontFamily: 'Kailasa',
    alignSelf: 'center',
    
      
  },
  container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nosearch_image: {
    width: 300,
    height: 180,
    marginLeft: 60,
  },
  textinput: {
    marginLeft: 10,
    fontSize: 20,
    marginRight: 10,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 30,
    borderWidth: 3,
  },
});
const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.togglefavorite.favoritesFilms,
  };
};

export default connect(mapStateToProps)(Search);
