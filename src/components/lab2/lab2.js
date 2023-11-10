import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {clearData, data1Set, data2Set, data3Set, data4Set} from "../../actions";
import {Form} from "react-bootstrap";

const Lab2 = () => {
    const dispatch = useDispatch();

    const [h, setH] = useState(0.2);
    const start = -3;
    const end = 3;
    const epsilon = 0.0001;
    const [showFunc, setShowFunc] = useState(false);
    const [diffType, setDiffType] = useState("rightDiff");
    const diffTypes = [
        {id: "rightDiff", label: "Правая разность"},
        {id: "centralDiff", label: "Центральная разность"},
        {id: "centralDiffSecOrder2", label: "Центральная разность, вторая производная второго порядка"},
        {id: "centralDiffSecOrder4", label: "Центральная разность, вторая производная четвертого порядка"}
    ];


    // функция в явном виде
    const func = (x) => {
        return Math.atan(Math.sin(x));
    }

    // первая производная в явном виде
    const explicitFirstDiffFunc = (x) => {
        return Math.cos(x) / (1 + Math.sin(x) ** 2);
    }

    // вторая производная в явном виде
    const explicitSecondDiffFunc = (x) => {
        return - (Math.sin(x) ** 3 + Math.sin(x) + 2 * Math.sin(x) * (Math.cos(x) ** 2)) / ((1 + Math.sin(x) ** 2) ** 2)
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
    if(showFunc) {
        for (let x = start; x < end + epsilon; x += 0.001) {
            initialFuncPoints.push({
                x,
                y: func(x),
            })
        }
    }

    const diffArr = [];
    switch (diffType) {
        default:
        case "rightDiff":
            for (let x = start; x < end - h; x += h) {
                diffArr.push({
                    x,
                    y: rightDiff(x)
                })
            }
            break;
        case "centralDiff":
            for (let x = start; x < end - h; x += h) {
                diffArr.push({
                    x,
                    y: centralDiff(x)
                })
            }
            break;
        case "centralDiffSecOrder2":
            for (let x = start; x < end - h; x += h) {
                diffArr.push({
                    x,
                    y: centralDiffSecOrder2(x)
                })
            }
            break;
        case "centralDiffSecOrder4":
            for (let x = start; x < end - h; x += h) {
                diffArr.push({
                    x,
                    y: centralDiffSecOrder4(x)
                })
            }
            break;
    }

    const labelDiffArr =  diffTypes[diffTypes.findIndex(({id}) => id === diffType)].label;

    let deviation = [];
    let explicitDiffPoints = [];
    switch (diffType) {
        default:
        case "rightDiff":
        case "centralDiff":
            deviation = diffArr.map(({x,y}) => ({
                x,
                y: Math.abs(y - explicitFirstDiffFunc(x)),
            }));

            for (let x = start; x < end; x += 0.01) {
                explicitDiffPoints.push({
                    x,
                    y: explicitFirstDiffFunc(x)
                })
            }
            break;
        case "centralDiffSecOrder2":
        case "centralDiffSecOrder4":
            deviation = diffArr.map(({x,y}) => ({
                x,
                y: Math.abs(y - explicitSecondDiffFunc(x)),
            }));

            for (let x = start; x < end; x += 0.01) {
                explicitDiffPoints.push({
                    x,
                    y: explicitSecondDiffFunc(x)
                })
            }
            break;
    }

    const maxDeviation = Math.max(...deviation.map(i => i.y))

    useEffect(() => {
        dispatch(clearData())
    }, [dispatch]);

    useEffect(() => {
        dispatch(data2Set({
            name: "f(x)",
            data: initialFuncPoints,
        }));
    }, [diffType,initialFuncPoints]);
    useEffect(() => {
        dispatch(data1Set({
            name: labelDiffArr,
            data: diffArr,
        }));
    }, [diffType, diffArr]);
    useEffect(() => {
        dispatch(data3Set({
            name: "deviation",
            data: deviation
        }));
    }, [deviation, diffType]);
    useEffect(() => {
        dispatch(data4Set({
            name: "Explicit diff",
            data: explicitDiffPoints
        }));
    }, [explicitDiffPoints, diffType]);

    const onDiffTypeChange = (e) => {
        setDiffType(e.target.id)
    }

    const radioDiffType = () => {
        return diffTypes.map(({id, label}) => {
            return <Form.Check
                style={{marginTop: 12, paddingLeft: 30, backgroundColor: "rgba(225,225,225,0.88)", borderRadius: 8}}
                key={id}
                type="radio"
                label={label}
                id={id}
                onChange={onDiffTypeChange}
                checked={diffType === id}
            />
        })
    }

    document.title = "Lab 2";
    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab2</h2>

            <hr style={{marginBottom: "40px"}}/>

            <div className="form-check form-switch" style={{backgroundColor: "rgba(133,167,190,0.51)", borderRadius: "8px", paddingLeft: 45}}>
                <label className="form-check-label" htmlFor="flexCheckDefault" > Показать f(x) </label>
                <input className="form-check-input" type="checkbox" value='' id="flexCheckDefault"
                       onChange={() => setShowFunc(!showFunc)}
                />
            </div>

            <Form.Group style={{display: "block", marginTop: 30}}>
                {
                    radioDiffType()
                }
            </Form.Group>

            <div style={{backgroundColor: "rgba(133,167,190,0.51)", borderRadius: "8px", marginTop: 30, padding: 5}}>
                <label htmlFor={"valueN"} style={{fontSize: "20px", margin: "5px 10px 0px 5px"  }}>h = </label>
                <input name={"valueN"} value={h} type="text"
                       style={{textAlign: "center", width: "50px", borderRadius: "8px"}}
                       onChange={e => setH(+e.target.value)}
                />
                <input type="range" id="h" name="h"
                       min="0.001" max="1" value={h} step={0.001}
                       onChange={e => setH(+e.target.value)}
                       style={{display: "block", width: "100%", marginTop: 10, marginBottom: 10}}
                />
            </div>

            <div style={{marginTop: 30, backgroundColor: "rgba(255,23,23,0.32)", borderRadius: 8, paddingLeft: 10}}>
                Погрешность = {maxDeviation.toFixed(4)}
            </div>
        </div>
    )
}
export default Lab2;