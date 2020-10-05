const API_TOKEN= "14575e81557798a75bdd224a5559eaca"

export function getFilmsFromApiWithSearchedText (text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return fetch (url) 
   .then((response)=> response.json())
   .catch ((error)=> console.error(error))
}

export function getImageFromApi (name) {
    return'https://image.tmdb.org/t/p/w300'+ name

}
export function getDetailsFilmsFromApi (id) {
    const url = 'https://api.themoviedb.org/3/movie/'+ id +'?api_key=' + API_TOKEN + '&language=fr'
    return fetch (url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}