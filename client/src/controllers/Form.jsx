import { useState } from "react";
import {connect} from "react-redux";
import { crearVideos, generos, putVideoGame  } from "../redux/actions";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import {Link, useHistory} from "react-router-dom";

const initialForm = {
      ID: "",
      name: "",
      imagen: "",
      description: "",
      released: 2022/12/26,
      rating: 0,
      platforms: [],
      genres: []
    }

const initialGenre = {
    genre: {    
        racing: false,
        shooter: false,
        adventure: false,
        action: false,
        RPG: false,
        fighting: false,
        puzzle: false,
        strategy: false,
        arcade: false,
        simulation: false,
        sports: false,
        card: false,
        family: false,
        board: false,
        educational: false,
        casual: false,
        indie: false,
        massively: false,
        platformer: false}}    
    
const initialError = {
        name: "",
        imagen: "",
        description: "",
        released: "",
        rating: "",
        platforms: "",
        genres: ""
    }

let generoArr = [];

const Form = (props) => {

    const [form, setForm] = useState(initialForm);
    const [genres, setGenres] = useState(initialGenre);
    const [error, setError] = useState(initialError);

    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(generos());
    },[dispatch]);


    const handleReset = (event) => {
        setForm(initialForm)
        generoArr = [];
        setGenres(initialGenre)
        setError(initialError)   
    }

    const submitHandler = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(crearVideos(form));
        alert ('Video game create successfuly! ✓')
        handleReset();
        history.push("/home");
    }

    const submitHandlerActual = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(putVideoGame(form, props.ID));
        alert ('Video game updated successfuly! ✓')
        handleReset();
        history.push("/home");
    }

    const changeHandler = (event) => {
        const property = event.target.name
        let value = event.target.value

        let mgeError = "Falta Dato";

        if (value.length === 0) setError({[property]: mgeError})
            else setError("");
        if (property === 'platforms') value = value.split(',');
        if (property === "imagen" && value &&
            !(value.match(
                /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
              ) !== null
            )
          ) {
            mgeError = "El link provisto no es una imagen"
            setError ({[property]: mgeError});
          }

        setForm({
            ...form,
            [property]: value
        })
    }


    const numchangeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        const mgeError = "Debe tomar valor entre 1 y 10"
        if (value < 1 || value > 11) setError({[property]: mgeError});
            else setError("")
        const valueNum = Number(event.target.value);

        setForm({
            ...form,
            [property]: valueNum
        })
    }

    const generoChangeHandler = (event) => {
     
        const propertyG = "genres"  
        setError("")
        let nameGenre = event.target.name;
        const infoGenre = props.genres.find((genero) => genero.name === nameGenre);
        const valueGenre = event.target.checked;

        const propertyGenre = nameGenre;
        setGenres({
            ...genres,
            [propertyGenre]: valueGenre
        })     

        const value = infoGenre.ID;
            
        if (event.target.checked === true) { 
            if (!generoArr.includes(value)) generoArr.push(value);
        } else { 
                const filteredArray = generoArr.filter((item) => item !== value)
                generoArr = filteredArray;
            }

        let mgeError = "Falta Dato";
        if (generoArr.length === 0) setError({[propertyG]: mgeError})
        setForm({
            ...form,
            [propertyG]: generoArr,
        })
    } 

    return(
        <>
            <div className="fondo_form">
                <div className="posicion_form">
                    <form className={error && "error"} >
                        <div className="borde_form">
                            <h2 className="titulo">Complete el formulario</h2>
                            <div>
                                <label className="texto" htmlFor="name">Nombre:</label>
                                <input 
                                    name = 'name' 
                                    value ={form.name} 
                                    onChange={changeHandler}
                                />
                            </div>
                            {error.name && <p>{error.name}</p>}
                
                            <div>
                                <label className="texto" htmlFor="imagen">Imagen:</label>
                                <input  
                                    name = 'imagen'
                                    value ={form.imagen} 
                                    onChange={changeHandler} 
                                />
                            </div>
                            {error.imagen && <p>{error.imagen}</p>}

                            <div>
                                <label className="texto" htmlFor="description" >Descripcion:</label>
                                <input  
                                    name = 'description' 
                                    value ={form.description} 
                                    onChange={changeHandler}
                                />
                            </div>
                            {error.description && <p>{error.description}</p>}

                            <div>
                                <label className="texto" htmlFor="released" >Fecha de Creación:</label>
                                <input  type={"date"} 
                                        name = 'released' 
                                        value ={form.released} 
                                        onChange={changeHandler}
                                />
                            </div> 
                            {error.released && <p>{error.released}</p>}

                            <div>
                                <label className="texto" htmlFor="rating" >Rating:</label>
                                <input  type={"number"} 
                                        name = 'rating' 
                                        value ={form.rating} 
                                        onChange={numchangeHandler}
                                />
                            </div>
                            {error.rating && <p>{error.rating}</p>}

                            <div>
                                <label className="texto" htmlFor="platforms" >Plataformas:</label>
                                <input  type={"array"} 
                                        name = 'platforms' 
                                        value ={form.platforms} 
                                        onChange={changeHandler}
                                />
                            </div> 
                            {error.platforms && <p>{error.platforms}</p>}
                        </div>
                        <div className="borde_form">
                            <div>
                                <h3 className="titulo">Seleccione Generos</h3>
                            </div>
                            <div className="row">
                                <div>
                                    <label htmlFor="Racing">Racing</label>
                                    <input  type={"checkbox"}
                                        name='Racing'
                                        value = {genres.genre.racing}
                                        onChange={generoChangeHandler}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Shooter">Shooter</label>
                                    <input  type={"checkbox"}
                                        name='Shooter'
                                        value = {genres.genre.shooter}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Adventure">Adventure</label>
                                    <input  type={"checkbox"}
                                        name='Adventure'
                                        value = {genres.genre.adventure}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Action">Action</label>
                                    <input  type={"checkbox"}
                                        name='Action'
                                        value = {genres.genre.action}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="RPG">RPG</label>
                                    <input  type={"checkbox"}
                                        name='RPG'
                                        value = {genres.genre.RPG}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Fighting">Fighting</label>
                                    <input  type={"checkbox"}
                                        name='Fighting'
                                        value = {genres.genre.fighting}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Puzzle">Puzzle</label>
                                    <input  type={"checkbox"}
                                        name='Puzzle'
                                        value = {genres.genre.puzzle}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <label htmlFor="Strategy">Strategy</label>
                                    <input  type={"checkbox"}
                                        name='Strategy'
                                        value = {genres.genre.strategy}
                                        onChange={generoChangeHandler} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Arcade">Arcade</label>
                                    <input  type={"checkbox"}
                                        name='Arcade'
                                        value = {genres.genre.arcade}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Simulation">Simulation</label>
                                    <input  type={"checkbox"}
                                        name='Simulation'
                                        value = {genres.genre.simulation}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Sports">Sports</label>
                                    <input  type={"checkbox"}
                                        name='Sports'
                                        value = {genres.genre.sports}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Card">Card</label>
                                    <input  type={"checkbox"}
                                        name='Card'
                                        value = {genres.genre.card}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Family">Family</label>
                                    <input  type={"checkbox"}
                                        name='Family'
                                        value = {genres.genre.family}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Board Games">Board Games</label>
                                    <input  type={"checkbox"}
                                        name='Board Games'
                                        value = {genres.genre.board}
                                        onChange={generoChangeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <label htmlFor="Educational">Educational</label>
                                    <input  type={"checkbox"}
                                        name='Educational'
                                        value = {genres.genre.educational}
                                        onChange={generoChangeHandler}
                                    />
                                </div>
                  
                                <div>
                                    <label htmlFor="Casual">Casual</label>
                                    <input  type={"checkbox"}
                                        name='Casual'
                                        value = {genres.genre.casual}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Indie">Indie</label>
                                    <input  type={"checkbox"}
                                        name='Indie'
                                        value = {genres.genre.indie}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Massively Multiplayer">Massively Multiplayer</label>
                                    <input  type={"checkbox"}
                                        name='Massively Multiplayer'
                                        value = {genres.genre.massively}
                                        onChange={generoChangeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Platformer">Platformer</label>
                                    <input  type={"checkbox"}
                                        name='Platformer'
                                        value = {genres.genre.platformer}
                                        onChange={generoChangeHandler}
                                    />
                                </div>
                                {error.genres && <p>{error.genres}</p>}
                            </div>
                        </div>
                    </form>

                    <Link to="/home">
                        <button  type= "submit" onClick={submitHandler} hidden={props.ID? true : false} disabled={!form.name || !form.imagen || !form.description || form.platforms.length === 0 || form.genres.length === 0 || error}>CREAR</button>
                        <button  type="submit" onClick={submitHandlerActual} hidden={props.ID? false : true} disabled={(!form.name && !form.imagen && !form.description && form.platforms.length === 0 && form.genres.length === 0) || error}>Actualizar</button>
                    </Link> 

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        genres: state.genres
    }
}


const mapDispatchToProp = (dispatch) => {
    return {
        crearVideos: () => dispatch(crearVideos()),
        putVideoGame: () => dispatch(putVideoGame())
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Form);


