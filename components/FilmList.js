import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import FilmItem from './FilmItem';
import {connect} from 'react-redux';


class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
  }

  _displayDetailsforfilms = (idFilm) => {
    this.props.navigation.navigate('FilmDetails', {idFilm: idFilm});
  };

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        extraData={this.props.favoritesFilms}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log('onEndReached');
        }}
        renderItem={({item}) => (
          <FilmItem
            film={item}
            isFilmFavorite={
              this.props.favoritesFilms.findIndex(
                (film) => film.id === item.id,
              ) !== -1
                ? true
                : false
            }
            displayDetailsForfilms={this._displayDetailsforfilms}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.togglefavorite.favoritesFilms,
  };
};
export default connect(mapStateToProps)(FilmList);
