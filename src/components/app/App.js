import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from "../mainPage";
import AppHeader from "../appHeader/AppHeader";
import "../../styles/index.scss"
import "bootstrap"

const App = () => {

    return (
        <Router>
            <AppHeader/>
            <main className={"container"}>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"/lab/:labId"} element={<MainPage/>}/>
                </Routes>
            </main>
        </Router>
    )
}

export default App;