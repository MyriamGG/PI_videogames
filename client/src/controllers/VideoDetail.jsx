import React from "react";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {Link , useParams, useHistory} from 'react-router-dom';
import { getVideoDetail, delVideoGame } from "../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import { cleanDetail } from "../redux/actions";
import Form from "../controllers/Form";

const VideoDetail = () => { 
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [mostrarComponente, setMostrarComponente] = useState(true);

    useEffect(() => {
        dispatch(getVideoDetail(id));
  
        return function(){
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);

    const myVideo = useSelector((state) => state.detail);
    const handleRegreso = () => {
        history.push("/home");
    } 

    const handleDelete = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(delVideoGame(id));
        alert ('Video game deleted successfuly! ✓')
        handleRegreso();
    }

    return(
        <>
            <div className="fondo_detail">
                <h2 className="titulo">Detalle de Videos</h2>

                <Link className= "linkVideo" to="/home">
                    <button className="boton_detail" onChange={handleRegreso}>VOLVER</button>
                </Link> 
                <div >
                    <img className="imagen_detail" src= {myVideo.imagen} alt="imagen de video juego"/>
                <p className="texto_detail">nombre:</p> <p className="margen_detail">{myVideo.name}</p>
                <p className="texto_detail">descripcion:</p> <p className="margen_detail"> {myVideo.description? myVideo.description.replace(/<[^>]*>?/g, '') : ''}</p>
                <p className="texto_detail">released:</p> <p className="margen_detail"> {myVideo.released}</p>
                <p className="texto_detail">rating:</p> <p className="margen_detail"> {myVideo.rating}</p>
                <p className="texto_detail">platforms: </p> <p className="margen_detail">{myVideo.platforms}</p>
                <p className="texto_detail">genres: </p> <p className="margen_detail">{myVideo.genres?myVideo.genres.map(genre => genre.name):''}</p>
                </div>
                <div className="row">
                    <button onClick={() => setMostrarComponente(!mostrarComponente)} hidden= {id.length > 10? false: true} >
                        {!mostrarComponente ? `Ocultar` : `Modificar Datos`}  
                    </button>
                    <button onClick={handleDelete} hidden={id.length > 10? false : true}>Borrar VideoGame</button>
                </div>    
                    <div>
                        {!mostrarComponente && <Form ID={id}/>}
                    </div>
            </div>
        </>
    )
}
const mapDispatchToProp = (dispatch) => {
    return {
        delVideoGame: (id) => dispatch(delVideoGame(id)),
    }
}
export default connect(null, mapDispatchToProp)(VideoDetail);