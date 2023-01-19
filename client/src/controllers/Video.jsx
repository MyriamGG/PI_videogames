import React from "react";
import { Link } from "react-router-dom";
const Video = (props) => {

    return (
        <>
            
            <div className="row">
                <div className="column">
                    <div className="card_btn">
                    <img src={props.imagen} alt={props.name} width='200px' height='150px'/> 

                    <Link to={`/videoDetail/${props.id}`}>
                        <p className="texto_video">{props.name}</p>
                    </Link> 
                    <p className="texto_video">rating: {props.rating}</p>
                </div>
           </div>
           </div>
        </>
    )
}

export default Video;