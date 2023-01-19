import { 
    GET_VIDEO_DETAIL, 
    VIDEOS, 
    CREATE_VIDEOS, 
    GENEROS, 
    FILTER_VIDEOS_BY_OPTIONS, 
    FILTER_VIDEOS_BY_CREATION, 
    ORDENAR_VIDEOS_BY_ALFA_RATING,
    CLEAN_DETAIL,
    PUT_VIDEOGAME,
    DEL_VIDEOGAME
} from '../redux/actions';

let initialState = {
    videos: [], 
    detail: [], 
    myvideo: [], 
    genres: [],
    copiaVideos: [],
}

export default function rootReducer(state = initialState, action){ //action recibe type y payload de action.js
    switch(action.type){
        case VIDEOS:
            return {
                ...state,
                videos: action.payload,
                copiaVideos: action.payload,
            }
        case GET_VIDEO_DETAIL:
            return{
                ...state,
                detail: action.payload,
            }
        case CREATE_VIDEOS || PUT_VIDEOGAME || DEL_VIDEOGAME:
            return{
                ...state,
            }
   
        case GENEROS:
            return {
                ...state,
                genres: action.payload
            }
        case FILTER_VIDEOS_BY_OPTIONS:
            let allVideos = state.copiaVideos;
            const optionfiltered =  allVideos.filter(el => {
                for (let i = 0; i < el.genres.length; i++ ){
                  if (el.genres[i].name === action.payload) 
                  {
                  return el
                  }
                }})
            if (optionfiltered.length === 0 && action.payload !== "All") console.log(alert("no existe videojuego con ese filtro ❌"))
            const optionfiltered2 = action.payload === "All"? allVideos : optionfiltered
       
            return {
                ...state,
                videos: optionfiltered2,
            }
        case FILTER_VIDEOS_BY_CREATION:
            const allVideosCreated = state.copiaVideos
            const createdfiltered = action.payload === 'created'? allVideosCreated.filter((el) =>  typeof el.ID !== "number") : allVideosCreated.filter(el => typeof el.ID === "number")
            if (createdfiltered.length === 0) console.log(alert("no existe videojuego con ese filtro ❌"))
            const createdfiltered2 = action.payload === "All"? state.copiaVideos : createdfiltered

            return{
                ...state,
                videos: createdfiltered2,
            }
        case ORDENAR_VIDEOS_BY_ALFA_RATING:
            const orderVideo = action.payload === "Alfa_asc" ? state.videos.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)) : action.payload === "Alfa_desc" ? state.videos.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0)) : action.payload === "Rating_asc"? state.videos.sort((a, b) => (a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0)) : state.videos.sort((a, b) => (a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0))

            return{
                ...state,
                videos: orderVideo
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {}
            }
        default:
            return {...state};
    }
}