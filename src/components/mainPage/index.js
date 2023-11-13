import {useParams} from "react-router-dom";
import Lab1 from "../lab1/lab1";
import PlotlyChart from "../chart/plotlyChart";
import Lab2 from "../lab2/lab2";
import Lab3 from "../lab3/lab3";
import Lab4 from "../lab4/lab4";
import Lab5 from "../lab5/lab5";
import Lab6 from "../lab6/lab6";

const MainPage = () => {

    const {labId} = useParams();

    const selectedLab = () => {
        switch (+labId) {
            case 1:
                return <Lab1/>;
            case 2:
                return <Lab2/>;
            case 3:
                return <Lab3/>;
            case 4:
                return <Lab4/>;
            case 5:
                return <Lab5/>;
            case 6:
                return <Lab6/>;
            default :
                return "SELECT LAB";
        }
    }

    return (
        <div className={"row"}>
            <div className={"col-4"}>
                {selectedLab()}
            </div>
            <div className={"col-8"}>
                <PlotlyChart/>
                {/*<RechartsChart/>*/}
            </div>
        </div>

    )

}

export default MainPage;