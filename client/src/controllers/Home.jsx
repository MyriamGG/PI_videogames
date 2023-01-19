import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {connect} from "react-redux";
import { obtenerVideos, filterVideosbyOptions, generos, filterVideosbyCreation, orderbyalfa_Rating_asc_desc } from '../redux/actions';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import Get_All_Videos from './Get_All_Videos';

const Home = (props) => {
    const [orden, setOrden] = useState('');

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(generos());
    },[dispatch]);


    const handleFilterOptions = (event) =>{
        dispatch(filterVideosbyOptions(event.target.value))
    }

    const handleFiltercreations = (event) => {
        dispatch(filterVideosbyCreation(event.target.value))
    }
    const handleAlfa_Rating = (event) => {
        event.preventDefault();
        dispatch(orderbyalfa_Rating_asc_desc(event.target.value))
        setOrden(`ordenado ${event.target.value}`)
    }
    const handleClick = (event) => {
        dispatch(obtenerVideos())     
    }

    return(
        <>
            <div className='fondo_color'>
                <SearchBar/>
                <button className="cajita" onClick={handleClick}>Recargar Pagina</button>
                <Link className = "caja" to='/form'>Crear Nuevo Video</Link>
                            
                <div>
                    <select onChange={e => handleFiltercreations(e)}>
                        <option>Elegir Opcion de Creacion</option>
                        <option value="All">Todos</option>
                        <option value="created">Creados</option>
                        <option value="api">Existente</option>
                    </select>
                    <select name= 'generos' onChange={e => handleFilterOptions(e)}>
                        <option>Elegir Opcion de Genero</option>
                        <option value="All">Todos</option>
                        {props.genres.map(genero => 
                            <option key={genero.name} value={genero.name}>{genero.name}</option>
                        )}
                    </select>
                    <select onChange={handleAlfa_Rating}>
                        <option>Elegir Opcion de Orden</option>
                        <option value="Alfa_asc"> Alfabetico Ascendente </option>
                        <option value="Alfa_desc">Alfabetico Descendente</option>
                        <option value="Rating_asc"> Rating Ascendente </option>
                        <option value="Rating_desc"> Rating Descendente </option>
                    </select>
                </div>
                <Get_All_Videos/>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        genres: state.genres,
    }
}

export default connect(mapStateToProps)(Home);