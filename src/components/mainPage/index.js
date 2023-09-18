import {useParams} from "react-router-dom";
import Lab1 from "../lab1/lab1";
import PlotlyChart from "../chart/plotlyChart";
import RechartsChart from "../chart/RechartsChart";

const MainPage = () => {

    const {labId} = useParams();

    const selectedLab = () => {
        switch (labId) {
            case 1:
                return <Lab1/>;
            default :
                return <Lab1/>;
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