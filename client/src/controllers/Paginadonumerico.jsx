import React from "react";

const Paginadonumerico = (props) => {

    let page = [];

    for (let i = 0; i < Math.ceil(props.allVideos/props.itemsPerPage); i++){
        page.push(i+1);
    }
    return(
        <>
            <div>
                <h1 className="titulo">Pagina: {props.nropage}</h1>
            </div>
            <nav>
                <ul className="ul">
                    {page && page.map(number =>  
                        <li className="number" key={number}>
                            <a onClick={() => props.paginado(number)} className="btn_paginado">{number}</a>
                        </li>
                        )}
                </ul>
            </nav>
        </>
    )
}

export default Paginadonumerico;