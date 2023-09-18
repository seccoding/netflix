import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {

    return (
        <div id="layout_header">
            <Link to="/">
                <span className="header_title">
                    NETFLIX
                </span>
            </Link>
            <div className="align_right">
                <span className="header_item">
                    <Link to="/search">영화 검색</Link>
                </span>
            </div>
        </div>
    );

}