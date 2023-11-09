import {useEffect, useState} from "react";
import {data1Set, data2Set, data4Set} from "../../actions";
import {useDispatch} from "react-redux";
import Radio from "../util/Radio";

const Lab5 = () => {
    const dispatch = useDispatch();

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
    ];

    const u0Func = (x) => {
        return x * Math.atan(x) - Math.exp(x);
    }

    const explicitUArr = [];
    for (let x = start; x < end + epsilon; x += epsilon) {
        explicitUArr.push({
            x,
            y: u0Func(x)
        })
    }
    // dUdX = v
    const dUdX = ({v}) => {
        return v;
    }

    const dVdX = ({x, u, v}) => {
        return -2 * x * v / (1 + x ** 2) + 2 * u / (1 + x ** 2) + (2 + (1 - 2 * x - x ** 2) * Math.exp(x)) / (1 + x ** 2)
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

    const rungeKutta4 = (h, u0, v0) => {
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

        let k11, k12, k13, k14, k21, k22, k23, k24;
        for (let i = 0; i < arr.length - 1; i++) {
            k11 =dUdX(arr[i]);
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


    let solution = [];
    switch (solutionType) {
        default:
        case "eulerMethod":
            solution = euler(h05, uFrom0, vFrom0).map(({x, u}) => ({x, y: u}));
            break;
        case "rungeKuttaMethod":
            solution = rungeKutta4(h05, uFrom0, vFrom0).map(({x, u}) => ({x, y: u}));
            break;
        case "adamsMethod":
            break;
    }

    const label = solutionTypes[solutionTypes.findIndex(({id}) => id === solutionType)].label;

    useEffect(() => {
        dispatch(data1Set({
            name: label,
            data: solution,
        }));
    }, [solutionType, solution]);

    useEffect(() => {
        dispatch(data2Set({
            name: "Аналитическое решение",
            data: explicitUArr
        }));
    }, [dispatch, explicitUArr]);

    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab5</h2>

            <hr style={{marginBottom: "40px"}}/>

            <Radio type={solutionType}
                   types={solutionTypes}
                   onTypeChange={e => setSolutionType(e.target.id)}
            />

        </div>
    )
}

export default Lab5;