import './Navigation.css'
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <ul className={"navigation-list"}>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/products/add"}>Add Product</Link>
                </li>
            </ul>
        </nav>
    )
}