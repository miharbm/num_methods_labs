import {useEffect, useMemo, useState} from "react";
import {data1Set, data2Set, data3Set, data4Set} from "../../actions";
import {useDispatch} from "react-redux";
import Radio from "../util/Radio";
import CheckBox from "../util/CheckBox";

const Lab5 = () => {
    const dispatch = useDispatch();
    const [showFunc, setShowFunc] = useState(true);

    const start = 0;
    const end = 1;
    const h05 = 0.05;
    const h1 = 0.1;
    const epsilon = 0.0001;
    const uFrom0 = -1;
    const vFrom0 = -1; // то же что и dUFrom0

    const [solutionType, setSolutionType] = useState("eulerMethod");
    const solutionTypes = [
        {id: "eulerMethod", label: "Метод Эйлера"},
        {id: "rungeKuttaMethod", label: "Метод Рунге - Кутта 4 порядка"},
        {id: "adamsMethod", label: "Метод Адамса"},
        {id: "ruleRunge", label: "Правило Рунге"},
    ];

    const u0Func = (x) => {
        return x * Math.atan(x) - Math.exp(x);
    }

    const explicitUArr = useMemo(() => {
        const arr = [];
        for (let x = start; x < end + epsilon; x += epsilon) {
            arr.push({
                x,
                y: u0Func(x)
            })
        }
        return arr;
    }, []);

    // dUdX = v
    const dUdX = ({v}) => {
        return v;
    }

    const dVdX = ({x, u, v}) => {
        return -2 * x * v / (1 + x ** 2) + 2 * u / (1 + x ** 2) + (2 + (1 - 2 * x - x ** 2) * Math.exp(x)) / (1 + x ** 2)
    }

    const getXArr = (start, end, h) => {
        const arr = [];
        for (let x = start; x < end + epsilon; x += h) {
            arr.push(x)
        }
        return arr;
    }

    const euler = (h, u0, v0) => {
        const arr = [];
        for (let x = start; x < end + epsilon; x += h) {
            arr.push({
                x,
                v: null,
                u: null
            })
        }

        arr[0].u = u0;
        arr[0].v = v0;

        for (let i = 0; i < arr.length - 1; i++) {
            arr[i + 1].u = arr[i].u + h * dUdX(arr[i]);
            arr[i + 1].v = arr[i].v + h * dVdX(arr[i]);
        }

        return arr;
    }

    const rungeKutta4 = (xArr, h, u0, v0) => {
        const arr = xArr.map(x => ({
            x,
            v: null,
            u: null
        }));
        arr[0].u = u0;
        arr[0].v = v0;

        let k11, k12, k13, k14, k21, k22, k23, k24;
        for (let i = 0; i < arr.length - 1; i++) {
            k11 = dUdX(arr[i]);
            k21 = dVdX(arr[i]);

            k12 = dUdX({
                x: arr[i].x + h / 2,
                u: arr[i].u + h / 2 * k11,
                v: arr[i].v + h / 2 * k21});
            k22 = dVdX({
                x: arr[i].x + h / 2,
                u: arr[i].u + h / 2 * k11,
                v: arr[i].v + h / 2 * k21});

            k13 = dUdX({
                x: arr[i].x + h / 2,
                u: arr[i].u + h / 2 * k12,
                v: arr[i].v + h / 2 * k22});
            k23 = dVdX({
                x: arr[i].x + h / 2,
                u: arr[i].u + h / 2 * k12,
                v: arr[i].v + h / 2 * k22});

            k14 = dUdX({
                x: arr[i].x + h,
                u: arr[i].u + h * k13,
                v: arr[i].v + h * k23});
            k24 = dVdX({
                x: arr[i].x + h,
                u: arr[i].u + h * k13,
                v: arr[i].v + h * k23});

            arr[i + 1].u = arr[i].u + h / 6 * (k11 + 2 * k12 + 2 * k13 + k14);
            arr[i + 1].v = arr[i].v + h / 6 * (k21 + 2 * k22 + 2 * k23 + k24);
        }

        return arr;
    };

    const adams = (xArr, h, u0, v0) => {
        const rungeSolution = rungeKutta4(getXArr(-2 * h, 0, h).reverse(), -h, u0, v0).reverse();
        const arr = [];
        rungeSolution.forEach(t => arr.push(t));
        xArr.slice(1).forEach(x => arr.push({
            x,
            v: null,
            u: null,
        }));

        let k11, k12, k13, k21, k22, k23;
        for (let i = 2; i < arr.length - 1; i++) {
            k11 = dUdX(arr[i]);
            k21 = dVdX(arr[i]);

            k12 = dUdX(arr[i - 1]);
            k22 = dVdX(arr[i - 1]);

            k13 = dUdX(arr[i - 2]);
            k23 = dVdX(arr[i - 2]);

            arr[i + 1].u = arr[i].u + h / 12 * (23 * k11 - 16 * k12 + 5 * k13);
            arr[i + 1].v = arr[i].v + h / 12 * (23 * k21 - 16 * k22 + 5 * k23);
        }


        return arr.slice(2);
        // return arr;
    }


    let solution = [];
    switch (solutionType) {
        default:
        case "eulerMethod":
            solution = euler(h05, uFrom0, vFrom0).map(({x, u}) => ({x, y: u}));
            break;
        case "rungeKuttaMethod":
            solution = rungeKutta4(getXArr(start, end, h05), h05, uFrom0, vFrom0)
                .map(({x, u}) => ({x, y: u}));
            break;
        case "adamsMethod":
            solution = adams(getXArr(start, end, h05), h05, uFrom0, vFrom0)
                .map(({x, u}) => ({x, y: u}));
            break;
        case "ruleRunge":
            if (showFunc === true) {
                setShowFunc(false)
            }
            const s1 = rungeKutta4(getXArr(start, end, h05), h05, uFrom0, vFrom0)
                .map(({x, u}) => ({x, y: u}));
            const s2 = rungeKutta4(getXArr(start, end, h1), h1, uFrom0, vFrom0)
                .map(({x, u}) => ({x, y: u}));
            solution = s2.map(({x, y}, i) => ({x, y: Math.abs(y - s1[2 * i].y) / 15}))
            break;
    }

    const label = solutionTypes[solutionTypes.findIndex(({id}) => id === solutionType)].label;

    const deviation = solutionType === "ruleRunge" ? [] : solution.map(({x, y}) => ({
        x,
        y: Math.abs(y - u0Func(x)),
    }));

    const deviationRunge05 = () => {
        return  rungeKutta4(getXArr(start, end, h05), h05, uFrom0, vFrom0)
            .map(({x, u}) => ({
                x,
                y: Math.abs(u - u0Func(x)),
            }))
    };
    useEffect(() => {
        dispatch(data1Set({
            name: label,
            data: solution,
        }));
    }, [solutionType, solution]);

    useEffect(() => {
        dispatch(data2Set({
            name: "Аналитическое решение",
            data: showFunc ? explicitUArr : []
        }));
    }, [dispatch, explicitUArr, showFunc]);

    useEffect(() => {
        dispatch(data3Set({
            name: "deviation",
            data: deviation
        }));
    }, [deviation, solutionType]);

    useEffect(() => {
        dispatch(data4Set({
            name: "Погрешность рунге при шаге 0.05",
            data: solutionType === "ruleRunge" ? deviationRunge05() :  []
        }));
    }, [deviation, solutionType]);

    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab5</h2>

            <hr style={{marginBottom: "40px"}}/>

            <CheckBox value={showFunc} setFunc={setShowFunc} text={<div>Показать U<sub>0</sub>(x)</div>}/>

            <Radio type={solutionType}
                   types={solutionTypes}
                   onTypeChange={e => setSolutionType(e.target.id)}
            />

        </div>
    )
}

export default Lab5;