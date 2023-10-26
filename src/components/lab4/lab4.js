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
        // console.log(xMiddle)
        return xMiddle;
    }

    const newton = (x, epsilon) => {
        let xNext;
        while (true) {
            xNext = x - func(x) / derivativeFunc(x);
            if (Math.abs(xNext - x) < epsilon && Math.abs(func(xNext)) < epsilon) {
                break;
            }
            console.log(xNext)
            x = xNext;
        }
        return xNext;
    }

    console.log("epsilon9", epsilon9)

    console.log("end = ", dichotomy(start, end, epsilon9))
    console.log("end = ", dichotomy(start, end, epsilon6))
    console.log("end = ", dichotomy(start, end, epsilon3))

    console.log("end = ", newton((end - start) / 2, epsilon9))
    console.log("end = ", newton((end - start) / 2, epsilon6))
    console.log("end = ", newton((end - start) / 2, epsilon3))




    let initialFuncPoints = [];
    if (showFunc) {
        for (let x = start; x < end + epsilon3; x += 0.001) {
            initialFuncPoints.push({
                x,
                y: func(x),
            })
        }
    }







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

            <div className={"results"}>
                <h3>Метод Дихотомии</h3>
                <div className={"results__item"}>
                    <div className={"results__item__precision"}>Точность = {epsilon3}</div>
                    <div className={"results__item__root"}>x = {dichotomy(start, end, epsilon3)}</div>
                </div>
                <div className={"results__item"}>
                    <div className={"results__item__precision"}>Точность = {epsilon6}</div>
                    <div className={"results__item__root"}>x = {dichotomy(start, end, epsilon6)}</div>
                </div>
                <div className={"results__item"}>
                    <div className={"results__item__precision"}>Точность = {epsilon9}</div>
                    <div className={"results__item__root"}>x = {dichotomy(start, end, epsilon9)}</div>
                </div>
            </div>
            <div className={"results"}>
                <h3>Метод Ньютона</h3>
                <div className={"results__item"}>
                    <div className={"results__item__precision"}>Точность = {epsilon3}</div>
                    <div className={"results__item__root"}>x = {newton((end - start) / 2, epsilon3)}</div>
                </div>
                <div className={"results__item"}>
                    <div className={"results__item__precision"}>Точность = {epsilon6}</div>
                    <div className={"results__item__root"}>x = {newton((end - start) / 2, epsilon6)}</div>
                </div>
                <div className={"results__item"}>
                    <div className={"results__item__precision"}>Точность = {epsilon9}</div>
                    <div className={"results__item__root"}>x = {newton((end - start) / 2, epsilon9)}</div>
                </div>
            </div>


        </div>
    )
}

export default Lab4;