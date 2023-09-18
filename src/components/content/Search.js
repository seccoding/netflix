import { useRef, useState } from "react";
import MovieList from "./MovieList";

import "./Search.css"

export default function Search() {

    const searchRef = useRef()
    const [searchKeyword, setSearchKeyword] = useState()

    function search() {
        let keyword = searchRef.current.value
        setSearchKeyword(keyword)
    }

    console.log(searchKeyword)

    return (
        <div>
            <div id="search_area">
                <input type="text" placeholder="영화 이름" ref={searchRef} />
                <div></div>
                <button onClick={search}>검색</button>
            </div>

            <div>
                <MovieList genreId={undefined} searchKeyword={searchKeyword} />
            </div>
        </div>
    );

}