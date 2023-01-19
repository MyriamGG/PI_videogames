import axios from 'axios';
export const VIDEOS = 'OBT_VIDEOS';
export const GET_VIDEO_DETAIL = 'GET_VIDEO_DETAIL';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const CREATE_VIDEOS = 'CREATE_VIDEOS';
export const PUT_VIDEOGAME = 'PUT_VIDEOGAME';
export const GENEROS = "GENEROS";
export const FILTER_VIDEOS_BY_OPTIONS = "FILTER_VIDEOS_BY_OPTIONS";
export const FILTER_VIDEOS_BY_CREATION = "FILTER_VIDEOS_BY_CREATION";
export const ORDENAR_VIDEOS_BY_ALFA_RATING= "ORDENAR_VIDEOS_BY_ALFA_RATING";
export const DEL_VIDEOGAME="DEL_VIDEOGAME";

export const  obtenerVideos = (name) => {
    if (name === undefined) name = " ";
    
    return async (dispatch) => {
        let pedidoApi = await axios.get(`http://localhost:3001/videogame?search=${name}`);
        return dispatch({type:VIDEOS, payload: pedidoApi.data }) //datos enviados al reducer.js
    }
} 

export function getVideoDetail(id){

    return async function(dispatch){
        try{
           
        let json= await axios.get(`http://localhost:3001/videogame/${id}`);
        return dispatch({
            type: GET_VIDEO_DETAIL,
            payload:json.data
        })
    } catch (error) {
        console.log(error && alert("failed to load videosgames ❌"))
    }
    }
}

export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
}

export const crearVideos = (video) => {
    return async function (){
        try{
        let json = await axios.post('http://localhost:3001/videogame/create', video)
        return json;
        } catch (error) {
            console.log(error && alert("failed to create videosgames ❌"))
        }
    }
}

export const putVideoGame = (video, ID) => {
    try{
        console.log("ID putVideoGame", ID);
        return async function() {
            let json = await axios.put(`http://localhost:3001/videogame/actuality/${ID}`, video)
            return json;
        }
    } catch (error) {
        console.log(error && alert("failed to actuality videosgames ❌"))
    }
}

export const delVideoGame = (ID) => {

    try{
        return async function() {
            let json = await axios.delete(`http://localhost:3001/videogame/delete/${ID}`)
            return json;
        }
    } catch (error) {
        console.log(error && alert("failed to delete videosgames ❌"))
    }
}

export const generos = () => {
    try{
        return async (dispatch) => {
            let pedidoApi = await axios.get("http://localhost:3001/genres");
            dispatch({type:GENEROS, payload: pedidoApi.data }) //datos enviados al reducer.js
    }
    } catch (error) {
        console.log(error && alert("failed to load genres ❌"))
    }
} 

export const filterVideosbyOptions = (payload) => {

    return{
        type: FILTER_VIDEOS_BY_OPTIONS,
        payload
    }
}

export const  filterVideosbyCreation = (payload) => {

    return{
        type: FILTER_VIDEOS_BY_CREATION,
        payload
    }
}

export const orderbyalfa_Rating_asc_desc = (payload) => {

    return {
        type: ORDENAR_VIDEOS_BY_ALFA_RATING,
        payload,
    }
}

