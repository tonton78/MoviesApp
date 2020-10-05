const initialeState = {favoritesFilms: [] }

function togglefavorite (state = initialeState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoritesFilmsIndex =state.favoritesFilms.findIndex(item => item.id === action.value.id)
            if (favoritesFilmsIndex !== -1) {
                nextState = {...state,favoritesFilms: state.favoritesFilms.filter ((item,index) => index !== favoritesFilmsIndex)
                }

            }
            else {
                nextState = {...state,favoritesFilms: [...state.favoritesFilms, action.value]

                }
            }
            return nextState || state
        default:
            return state
    }
    
}
export default togglefavorite