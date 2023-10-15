import {NavLink} from "react-router-dom";
import "./appHeader.scss"

const AppHeader = () => {
    const activeLink = ({isActive}) =>  ({
        "color": isActive ? "#9f0013" : "inherit",
    })

    const data = [
        {
            label: "Lab1",
            id: 1
        },
        {
            label: "Lab2",
            id: 2
        },
        {
            label: "Lab3",
            id: 3
        },

    ]

    const renderLinks = () => {
        const links =  data.map(item => {
            return (
                <li
                    key={item.id}
                >
                    <NavLink
                        className={"dropdown-item"}
                        // style={activeLink}
                        to={`/lab/${item.id}`}
                    >
                        {item.label}
                    </NavLink>
                </li>
            )
        });

        return (
            <ul className="dropdown-menu">
                {links}
            </ul>
        )
    };



    const elements = renderLinks()
    return (
        <div className="appheader">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Labs
                </button>
                {elements}
            </div>
        </div>
    )
}

export default AppHeader;