import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerVideos } from "../redux/actions";
import {connect} from "react-redux";

const SearchBar = (props) => {
    const [form, setForm] = useState({name:" "});

    const dispatch = useDispatch();

    const changeHandler = (event) => {
        const property = event.target.name
        let value = event.target.value
        setForm({
            ...form,
            [property]: value
        })
        handleSubmit(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(props.obtenerVideos(form.name))
    }

    return(
        <>
            <form>
                <label className="label">Escriba el nombre del juego a buscar</label>
                <input  type={"text"} 
                        name = 'name' 
                        value ={form.name} 
                        placeholder= "name..."
                        onChange={changeHandler}
                        />
            </form>
        </>
    )
}

const mapDispatchToProp = (dispatch) => {
    return {
        obtenerVideos: (name) => dispatch(obtenerVideos(name))
    }
}
export default connect(null, mapDispatchToProp)(SearchBar);