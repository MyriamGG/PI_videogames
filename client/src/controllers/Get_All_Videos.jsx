import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { obtenerVideos } from '../redux/actions.js';
import Paginadonumerico from './Paginadonumerico';
import Video from "./Video";

const Get_All_Videos = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(obtenerVideos())
    },[dispatch]);

    let allVideos = useSelector(state => state.videos);

    const ITEMS_PER_PAGE = 15;
    const [currentPage, setcurrentPage] = useState(1)

    const indexOfLastCharacters = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstCharacters = indexOfLastCharacters - ITEMS_PER_PAGE;
    const currentCharacters = allVideos.slice(indexOfFirstCharacters, indexOfLastCharacters)

    const paginado = (numberPage) => {
        setcurrentPage(numberPage);
    }

    return(
        <>
             <Paginadonumerico
                 itemsPerPage={ITEMS_PER_PAGE}
                 allVideos={allVideos.length}
                 paginado={paginado}
                 nropage={currentPage}
             />  
            {
                currentCharacters.map((video)=> 
                    <Video 
                        key={video.ID}
                        id = {video.ID}
                        name = {video.name} 
                        imagen = {video.imagen} 
                        rating = {video.rating}                 
                    /> )
            }   
        </>
        
    )
}

export default Get_All_Videos;