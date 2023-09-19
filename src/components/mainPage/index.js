import {useParams} from "react-router-dom";
import Lab1 from "../lab1/lab1";
import PlotlyChart from "../chart/plotlyChart";
import RechartsChart from "../chart/RechartsChart";
import Lab2 from "../lab2/lab2";

const MainPage = () => {

    const {labId} = useParams();

    const selectedLab = () => {
        switch (+labId) {
            case 1:
                return <Lab1/>;
            case 2:
                return <Lab2/>;
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