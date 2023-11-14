import {useEffect, useMemo, useState} from "react";
import {clearData, data1Set, data2Set, data3Set, data4Set} from "../../actions";
import {useDispatch} from "react-redux";
import Radio from "../util/Radio";
import CheckBox from "../util/CheckBox";

const Lab6 = () => {
    const dispatch = useDispatch();
    const [showFunc, setShowFunc] = useState(true);

    const start = 0;
    const end = 1;

    const h05 = 0.05;
    const epsilon = 0.0001;

    const alpha = [-1, 1, 1];
    const beta = [1.9266, 1, 0];

    const [solutionType, setSolutionType] = useState("1lvl");
    const solutionTypes = [
        {id: "1lvl", label: "Первый порядок"},
        {id: "2lvl", label: "Второй порядок"},
    ];


    const u0Func = (x) => {
        return Math.cos(x) + 2 * Math.log(1 + x);
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


    const getXArr = (start, end, h) => {
        const arr = [];
        for (let x = start; x < end + epsilon; x += h) {
            arr.push(x)
        }
        return arr;
    }

    const q = (x) => {
        return 1 / (1 + x);
    }

    const r = (x) => {
        return Math.tan(x) / (1 + x);
    }

    const f = (x) => {
        return 2 * Math.tan(x) * Math.log(1 + x) / (1 + x) - Math.cos(x);
    }

    const solve1 = (xArr, h) => {
        const arr = xArr.map(x => ({
            x,
            A: null,
            B: null,
            C: null,
            G: null,
        }));

        arr[0].A = 0;
        arr[0].B = - (alpha[1] + alpha[2] / h);
        arr[0].C = - alpha[2] / h;
        arr[0].G = alpha[0];

        arr.at(-1).A = 0;
        arr.at(-1).B = - beta[1];
        arr.at(-1).C = 0;
        arr.at(-1).G = beta[0];


        let x;
        for (let i = 1; i < arr.length - 1; i++) {
            x = arr[i].x;
            arr[i] = {
                x: x,
                A: 1 / (h ** 2) - q(x) / (2 * h),
                B: 2 / (h ** 2) - r(x),
                C: 1 / (h ** 2) + q(x) / (2 * h),
                G: f(x),
            }
        }

        return solveMatrix(arr);
    }

    const solve2 = (xArr, h) => {
        const arr = xArr.map(x => ({
            x,
            A: null,
            B: null,
            C: null,
            G: null,
        }));

        arr[0].A = 0;
        arr[0].B = - (alpha[1] / 2 + alpha[2] / h);
        arr[0].C = alpha[1] / 2 - alpha[2] / h;
        arr[0].G = alpha[0];

        arr.at(-1).A = beta[1] / 2 - beta[2] / h;
        arr.at(-1).B = - beta[1] / 2 - beta[2] / h;
        arr.at(-1).C = 0;
        arr.at(-1).G = beta[0];

        let x;
        for (let i = 1; i < arr.length - 1; i++) {
            x = arr[i].x;
            arr[i] = {
                x: x,
                A: 1 / (h ** 2) - q(x) / (2 * h),
                B: 2 / (h ** 2) - r(x),
                C: 1 / (h ** 2) + q(x) / (2 * h),
                G: f(x),
            }
        }

        return solveMatrix(arr);
    }

    const solveMatrix = (arr) => {
        arr[0].s = arr[0].C / arr[0].B
        arr[0].t = - arr[0].G / arr[0].B

        for (let i = 1; i < arr.length; i++) {
            arr[i].s = arr[i].C / (arr[i].B - arr[i].A * arr[i - 1].s);
            arr[i].t = (arr[i].A * arr[i - 1].t - arr[i].G) / (arr[i].B - arr[i].A * arr[i - 1].s);
        }

        arr.at(-1).u = arr.at(-1).t

        for (let i = arr.length - 2; i > - 1; i--) {
            arr[i].u = arr[i].s * arr[i + 1].u + arr[i].t
        }

        return arr.map(({x, u}) => ({x, y: u}))
    }



    let solution = [];
    switch (solutionType) {
        default:
        case "1lvl":
            solution = solve1(getXArr(start, end, h05), h05);
            break;
        case "2lvl":
            solution = solve2(getXArr(start - h05 / 2, end + h05 / 2, h05), h05);
            break;
    }

    const label = solutionTypes[solutionTypes.findIndex(({id}) => id === solutionType)].label;

    const deviation = solution.map(({x, y}) => ({
        x,
        y: Math.abs(y - u0Func(x)),
    }));

    useEffect(() => {
        dispatch(clearData())
    }, [dispatch]);

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

    // useEffect(() => {
    //     dispatch(data4Set({
    //         name: "Погрешность рунге при шаге 0.05",
    //         data: solutionType === "ruleRunge" ? deviationRunge05() :  []
    //     }));
    // }, [deviation, solutionType]);

    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab6</h2>

            <hr style={{marginBottom: "40px"}}/>

            <CheckBox value={showFunc} setFunc={setShowFunc} text={<div>Показать U<sub>0</sub>(x)</div>}/>

            <Radio type={solutionType}
                   types={solutionTypes}
                   onTypeChange={e => setSolutionType(e.target.id)}
            />

        </div>
    )
}

export default Lab6;