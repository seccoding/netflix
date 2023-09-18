import axios from "axios";
import { useEffect, useState } from "react";

import "./Popup.css"
import { Movie } from "./MovieList";

export default function Popup( {id, setViewModal} ) {

    const [detail, setDetail] = useState({})
    const [credit, setCredit] = useState()
    const [similar, setSimilar] = useState()

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3cc0c46b7fd6181b12a5d89d2a40c0a8&language=ko-KR`)
             .then(response => {
                setDetail(response.data)
             })
        
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=3cc0c46b7fd6181b12a5d89d2a40c0a8&language=ko-KR`)
             .then(response => {
                setCredit(response.data.cast)
             })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=3cc0c46b7fd6181b12a5d89d2a40c0a8&language=ko-KR`)
             .then(response => {
                setSimilar(response.data.results)
             })
    }, [])

    return (
        <div className="popup">
            <div className="popup_wrapper">
                <div className="popup_header">
                    <span onClick={() => setViewModal(false)}>X</span>
                </div>
                <img src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} />
                <div className="popup_content">
                    <h3>{detail.title}</h3>
                    <h4>{detail.original_title}</h4>

                    <div className="credit">
                        <ul>
                            {
                                credit && credit.map((cast) => 
                                <li style={{color: "#FFF"}}>
                                    {cast.character} ({cast.name})
                                </li>)
                            }
                        </ul>
                    </div>

                    <div className="tagline">
                        {detail.tagline}
                    </div>
                    <div className="overview">
                        {detail.overview}
                    </div>
                    <div className="similar">
                        {
                            similar && similar.map(similarMovie => <Movie key={similarMovie.id}
                                                               id={similarMovie.id}
                                                               title={similarMovie.title}
                                                               posterPath={similarMovie.poster_path} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}