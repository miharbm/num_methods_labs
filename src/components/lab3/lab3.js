import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {data1Set, data2Set, data3Set, data4Set} from "../../actions";
import {Form} from "react-bootstrap";
import CheckBox from "../util/CheckBox";

const Lab3 = () => {
    const dispatch = useDispatch();
    const epsilon = 0.0001;

    // const [h, setH] = useState(0.2);
    let h = epsilon;

    const start = -1;
    const end = 1;
    const [showFunc, setShowFunc] = useState(false);
    const [logCoordinates, setLogCoordinates] = useState(false);
    const [integralType, setIntegralType] = useState("rectangleLeft");
    const integralTypes = [
        {id: "rectangleLeft", label: "Прямоугольник левый"},
        {id: "rectangleRight", label: "Прямоугольник правый"},
        {id: "rectangleCentral", label: "Прямоугольник центральный"},
        {id: "trapezoid", label: "Трапеция"},
        {id: "simpson", label: "Симпсона"},
    ];


    // функция в явном виде
    const func = (x) => {
        return x ** 5 * Math.sin(x);
    }

    // первообразная в явном виде
    const explicitIntegral = (x) => {
        return - (x**5 * Math.cos(x)) + 5 * x**4 * Math.sin(x)
            + 20 * x**3 * Math.cos(x) -  60 * x**2 * Math.sin(x)
            - 120 * x * Math.cos(x) + 120 * Math.sin(x);
    }

    const rectangleIntegral = (type) => {
        let square = 0;
        let additive;

        switch (type) {
            case "left" :
                additive = 0;
                break;
            case "right" :
                additive = h;
                break;
            case "central" :
                additive = h / 2;
                break;
            default:
                additive = 0;
        }

        for (let x = start; x < end + epsilon; x += h) {
            square += h * func(x + additive)
        }

        return square;
    }

    const trapezoidIntegral = () => {
        let square = 0;

        for (let x = start; x < end - h + epsilon; x += h) {
            square += h * 0.5 * (func(x) + func(x + h));
        }

        return square;
    }

    const simpsonIntegral = () => {
        let square = 0;

        for (let x = start; x < end - h + epsilon; x += h) {
            square += 1 / 6 * h * (func(x) + 4 * func(x + h / 2) + func(x + h));
        }

        return square;
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

    const numIntegral = explicitIntegral(end) - explicitIntegral(start);

    const deviationFromStep = ( integral, typeRectangleIntegral = null) => {
        const deviation = [];

        for (let n  = 5; n  < 200; n += 1) {
            h = (end - start) / n;
            if (logCoordinates) {
                deviation.push({
                    x: Math.log(h),
                    y: Math.log(Math.abs(integral(typeRectangleIntegral) -  numIntegral))
                })
            } else {
                deviation.push({
                    x: h,
                    y: Math.abs(integral(typeRectangleIntegral) -  numIntegral)
                })
            }

        }

        return deviation;
    }


    let deviation = [];
    switch (integralType) {
        default:
        case "rectangleLeft":
            deviation = deviationFromStep(rectangleIntegral, "left")
            break;
        case "rectangleRight":
            deviation = deviationFromStep(rectangleIntegral, "right")
            break;
        case "rectangleCentral":
            deviation = deviationFromStep(rectangleIntegral, "central")
            break;
        case "trapezoid":
            deviation = deviationFromStep(trapezoidIntegral)
            break;
        case "simpson":
            deviation = deviationFromStep(simpsonIntegral)
            break;
    }

    const labelIntegral =  integralTypes[integralTypes.findIndex(({id}) => id === integralType)].label;

    const tga = (arr) => {
        return (arr.at(-1).y - arr.at(1).y) / (arr.at(-1).x - arr.at(1).x);
    }

    useEffect(() => {
        dispatch(data1Set({
            name: labelIntegral,
            data: deviation,
        }));
    }, [integralType,deviation]);
    useEffect(() => {
        dispatch(data4Set({
            name: "func",
            data: initialFuncPoints,
        }));
    }, [initialFuncPoints, showFunc]);
    // useEffect(() => {
    //     dispatch(data3Set({
    //         name: "deviation",
    //         data: deviation
    //     }));
    // }, [deviation, diffType]);
    // useEffect(() => {
    //     dispatch(data4Set({
    //         name: "Explicit diff",
    //         data: explicitDiffPoints
    //     }));
    // }, [explicitDiffPoints, diffType]);

    const onIntegralTypeChange = (e) => {
        setIntegralType(e.target.id)
    }

    const radioDiffType = () => {
        return integralTypes.map(({id, label}) => {
            return <Form.Check
                style={{marginTop: 12, paddingLeft: 30, backgroundColor: "rgba(225,225,225,0.88)", borderRadius: 8}}
                key={id}
                type="radio"
                label={label}
                id={id}
                onChange={onIntegralTypeChange}
                checked={integralType === id}
            />
        })
    }

    const showTga = (tga) => {
        if (!logCoordinates)
            return null
        return (
            <div style={{marginTop: 15, backgroundColor: "rgba(225,225,225,0.88)", borderRadius: 8, paddingLeft: 10}}>
                Угол наклона = {tga.toFixed(4)}
            </div>
        )
    }

    document.title = "Lab 3";
    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab3</h2>

            <hr style={{marginBottom: "40px"}}/>

            <CheckBox value={showFunc} setFunc={setShowFunc} text={"Показать f(x)"}/>

            <Form.Group style={{display: "block", marginTop: 30}}>
                {
                    radioDiffType()
                }
            </Form.Group>

            <CheckBox value={logCoordinates} setFunc={setLogCoordinates} text={"Логарифмические координаты"} style={{marginTop: 30}}/>

            {showTga(tga(deviation))}


        </div>
    )
}
export default Lab3;