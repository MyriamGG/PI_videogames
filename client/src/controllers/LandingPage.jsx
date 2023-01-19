import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div>
            <h1 className = "titulo">
               BIENVENIDOS A LA API DE VIDEOS JUEGOS
            </h1>
            <img className= "imagen_fondo" src="https://cdn.pixabay.com/photo/2017/11/06/12/20/controller-2923485__340.png" alt= "Imagen de VideoGame"/>
            <br/>
            <Link to="App.css" rel="stylesheet"></Link>
            <Link className= "linkVideo" to="/home">INGRESAR</Link>
        </div>
    )
}