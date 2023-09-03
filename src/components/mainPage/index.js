import {useParams} from "react-router-dom";
import Lab1 from "../lab1/lab1";
import Chart from "../chart/Chart";

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
                <Chart/>
            </div>
        </div>

    )

}

export default MainPage;