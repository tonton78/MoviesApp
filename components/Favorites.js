import React from 'react';
import {StyleSheet, Text, View,AsyncStorage,Platform} from 'react-native';
import FilmList from './FilmList';
import {connect} from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'


class Favorites extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={['gold', 'red']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
      <View style={styles.main_container}>
        <Text style={styles.text}>Mes Favoris</Text>
        <FilmList
          style={styles.favoritelist}
          films={this.props.favoritesFilms}
          navigation={this.props.navigation}
        />
      </View>
      </LinearGradient>
    );
  }
}





const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Kailasa',
    fontSize: 20,
    marginTop: 40,

    backgroundColor: 'gold',
  },
  main_container: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'column',
  },
  container:{
    flex:1,
  }
})


const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.togglefavorite.favoritesFilms,
  };
};
export default connect(mapStateToProps)(Favorites);
