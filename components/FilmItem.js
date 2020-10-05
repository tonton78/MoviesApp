/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {getImageFromApi} from '../API/TMDB';
import moment from 'moment';

// Definir list favorie persisté (1.5j)
// cancel favori (1j)
// GIT: creer un compte github et enrengister tt ton trvail (voir video sur internet)
// ameliormer le search (text input) (1.5)
// pouvoir trier par note et par année (1j)
// page par defaut quand aucun lettre n'est tapé (1j)
// date de sortie display en fonction de la lagngue du telephone dd/mm/aaaa fr et mm/dd/aaaa anglais (1j)
// total en jours ====> 10.5j
// si no result ecrire 'pas de resultat pour cette recherche'

export default class FilmItem extends React.Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Image/ic_favorite.png')}
        />
      );
    }
  }
  render() {
    const {film, displayDetailsForfilms} = this.props;

    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailsForfilms(film.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />

        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {this._displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text
              style={[
                styles.vote_text,
                {color: film.vote_average >= 5 ? 'green' : 'red'},
              ]}>
              {film.vote_average}
            </Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}{' '}
            </Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti {moment (film.release_date).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {height: 190, flexDirection: 'row'},
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,

    flexWrap: 'wrap',
    paddingRight: 5,
  },

  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
})