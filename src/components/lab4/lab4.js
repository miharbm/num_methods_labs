import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {data1Set, data4Set} from "../../actions";
import CheckBox from "../util/CheckBox";
import "./lab4.scss"

const Lab4 = () => {
    const dispatch = useDispatch();

    const epsilon3 = 1e-3;
    const epsilon6 = 1e-6;
    const epsilon9 = 1e-9;

    const start = 0;
    const end = 10;
    const [showFunc, setShowFunc] = useState(true);


    // функция в явном виде
    const func = (x) => {
        return Math.exp(Math.sin(x / 2)) - Math.atan(x) + 1;
    }

    const derivativeFunc = (x) => {
        return 0.5 * Math.exp(Math.sin(x / 2)) *  Math.cos(x / 2)  - 1 / (1 + x**2);
    }

    let iteration = 0;
    const dichotomy = (xLeft, xRight, epsilon) => {
        let xMiddle = 0.5 * (xRight + xLeft);
        if (xRight - xLeft > epsilon && Math.abs(func(xMiddle)) > epsilon) {
            if (func(xLeft) * func(xMiddle) < 0) {
                xMiddle = dichotomy(xLeft, xMiddle, epsilon);
            }
            if (func(xRight) * func(xMiddle) < 0) {
                xMiddle = dichotomy(xMiddle, xRight, epsilon);
            }
        }
        iteration ++;
        return xMiddle;
    }

    const newton = (x, epsilon) => {
        iteration = 0;
        let xNext;
        while (true) {
            xNext = x - func(x) / derivativeFunc(x);
            if (Math.abs(xNext - x) < epsilon && Math.abs(func(xNext)) < epsilon) {
                break;
            }
            x = xNext;
            iteration++;
        }
        return xNext;
    }

    let initialFuncPoints = [];
    if (showFunc) {
        for (let x = start; x < end + epsilon3; x += epsilon3) {
            initialFuncPoints.push({
                x,
                y: func(x),
            })
        }
    }

    const rootsDichotomy = [];
    iteration = 0;
    rootsDichotomy.push({precision: epsilon3, root: dichotomy(start, end, epsilon3), iterations: iteration})
    iteration = 0;
    rootsDichotomy.push({precision: epsilon6, root: dichotomy(start, end, epsilon6), iterations: iteration})
    iteration = 0;
    rootsDichotomy.push({precision: epsilon9, root: dichotomy(start, end, epsilon9), iterations: iteration});

    const rootsNewton = [];
    rootsNewton.push({precision: epsilon3, root: newton(dichotomy(start, end, epsilon3), epsilon3), iterations: iteration})
    rootsNewton.push({precision: epsilon6, root: newton(dichotomy(start, end, epsilon3), epsilon6), iterations: iteration})
    rootsNewton.push({precision: epsilon9, root: newton(dichotomy(start, end, epsilon3), epsilon9), iterations: iteration});





    // useEffect(() => {
    //     dispatch(data1Set({
    //         name: labelIntegral,
    //         data: deviation,
    //     }));
    // }, [integralType,deviation]);
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



    document.title = "Lab 4";
    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab4</h2>

            <hr style={{marginBottom: "40px"}}/>

            <CheckBox value={showFunc} setFunc={setShowFunc} text={"Показать f(x)"}/>

            <Results methodName={"Метод Дихотомии"} roots={rootsDichotomy}/>
            <Results methodName={"Метод Ньютона"} roots={rootsNewton}/>

        </div>
    )
}

const Results = ({methodName, roots}) => {
    return (
        <div className={"results"}>
            <h3>{methodName}</h3>
            {roots.map(({precision,root, iterations}, i) => (
                <ResultItem key={i}
                            precision={precision}
                            root={root}
                            iterations={iterations}/>
            ))}
        </div>
    )
}

const ResultItem = ({precision, root, iterations}) => {
    return (
        <div className={"results__item"}>
            <div className={"results__item__precision"}>Точность = {precision}</div>
            <div className={"results__item__result"}>
                <div className="results__item__root">x = {root}</div>
                <div className="results__item__iterations">Кол-во итераций = {iterations}</div>
            </div>
        </div>
    )
}

export default Lab4;