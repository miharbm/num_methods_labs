import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {data1Set, data2Set, data4Set} from "../../actions";

const Lab2 = () => {
    const dispatch = useDispatch();

    const [h, setH] = useState(0.3);
    const start = -3;
    const end = 3;
    const epsilon = 0.0001;


    const func = (x) => {
        return Math.atan(Math.sin(x));
    }



    // правая разность, первая производная
    const rightDiff = (x) => {
        return (func(x + h) - func(x)) / h;
    }

    // центральная разность, первая производная
    const centralDiff = (x) => {
        return (func(x + h) - func(x - h)) / (2 * h);
    }

    // вторая производная, центральные разности, второй порядок точности
    const centralDiffSecOrder2 = (x) => {
        return (func(x + h) - 2 * func(x) + func(x - h)) / (h ** 2)
    }

    // вторая производная, центральные разности, четвертый порядок точности
    const centralDiffSecOrder4 = (x) => {
        return (-func(x-2*h) + 16 * func(x-h) - 30 * func(x) + 16 * func(x + h) - func(x + 2 * h)) / (12 * h**2)
    }

    let initialFuncPoints = [];
    for (let x = start; x < end + epsilon; x += 0.001) {
        initialFuncPoints.push({
            x,
            y: func(x),
        })
    }

    let rightDiffArr = [];
    for (let x = start; x < end - h; x += h) {
        rightDiffArr.push({
            x,
            y: rightDiff(x)
        })
    }

    let centralDiffArr = [];
    for (let x = start + h; x < end - h; x += h) {
        centralDiffArr.push({
            x,
            y: centralDiff(x)
        })
    }

    useEffect(() => {
        dispatch(data2Set({
            name: "f(x)",
            data: initialFuncPoints,
        }));
    }, [initialFuncPoints]);
    useEffect(() => {
        dispatch(data1Set({
            name: "right diff",
            data: rightDiffArr,
        }));
    }, [rightDiffArr]);
    useEffect(() => {
        dispatch(data4Set({
            name: "central diff",
            data: centralDiffArr,
        }));
    }, [centralDiffArr]);

    document.title = "Lab 2";
    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab2</h2>
            <hr style={{marginBottom: "40px"}}/>
            <label htmlFor={"valueN"} style={{fontSize: "20px", marginRight: "10px"}}>h = </label>
            <input name={"valueN"} value={h} type="text"
                   style={{textAlign: "center", width: "50px", marginTop: "20px"}}
                   onChange={e => setH(+e.target.value)}
            />
            <input type="range" id="h" name="h"
                   min="0.01" max="1" value={h} step={0.01}
                   onChange={e => setH(+e.target.value)}
                   style={{display: "block", width: "100%", marginTop: 10}}
            />
        </div>
    )
}
export default Lab2;