import {useDispatch} from "react-redux";
import {data1Set, data2Set, data3Set, data4Set, dataToChartSet, deviationSet, initialDataSet} from "../../actions";
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";


const Lab1 = () => {
    const dispatch = useDispatch();

    const [n, setN] = useState(10);
    const [xType, setXType] = useState("linear");
    const xTypes = ["linear", "cos"];
    const a = 0;
    const b = 10;
    const step = (b - a) / (n - 1);
    const lagrangeStep = step / 4;
    const epsilon = 0.0001;

    let xArr = [];
    switch (xType) {
        default:
        case "linear":
            for (let k = 0; k < n; k++) {
                xArr.push(k * step);
            }
            break;
        case "cos":
            for (let k = 0; k < n; k++) {
                const t = (a + b) / 2;
                const x = Math.cos(Math.PI * (2 * k + 1) / (2 * n))  * t + t ;
                xArr.push(x)
            }
            break;

    }

    const initialFunc = (x) => {
        return Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7;
    }

    const initialPoints = xArr.map((x) => ({
        x,
        y: initialFunc(x),
    }))

    const product = (x, i) => {
        let result = 1;
        for (let j = 0; j < n; j++ ) {
            if (j === i) {
                continue;
            }
            result *= x - xArr[j];
        }
        return result;
    }

    const lagrangePolynomial = (x) => {
        let result = 0;
        for (let i = 0; i < n; i++ ) {
            result += initialPoints[i].y * product(x, i) / product(initialPoints[i].x, i)
        }
        return result;
    }

    const interpolated = [];
    for (let x = a; x < b + epsilon; x += lagrangeStep) {
        interpolated.push({
            x,
            y: lagrangePolynomial(x)
        })
    }

    let initialFuncPoints = []
    for (let x = a; x < b + epsilon; x += .01) {
        const y = Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7
        initialFuncPoints.push({x,y})
    }

    const deviation = interpolated.map(({x, y}) => ({
        x,
        y: Math.abs(y - initialFunc(x)),
    }));



    useEffect(() => {
        dispatch(data2Set(initialFuncPoints));
    }, [initialPoints, xType]);
    useEffect(() => {
        dispatch(data1Set(interpolated));
    }, [interpolated, xType]);
    useEffect(() => {
        dispatch(data3Set(deviation));
    }, [deviation, xType]);
    useEffect(() => {
        dispatch(data4Set(initialPoints));
    }, [deviation, xType]);

    const onXTypeChange = (e) => {
        setXType(e.target.id)
    }

    const radioXType = () => {
        return xTypes.map(type => {
            return <Form.Check
                style={{marginRight: "20px"}}
                key={type}
                type="radio"
                label={type}
                id={type}
                onChange={onXTypeChange}
                checked={xType === type}
            />
        })
    }

    document.title = "Lab 1";
    return (
        <div style={{position: "sticky", top: "15px"}}>
            <h2>Lab1</h2>
            <hr style={{marginBottom: "40px"}}/>
            {Formula()}
            <Form.Group style={{display: "flex", marginTop: "20px"}}>
                {
                    radioXType()
                }
            </Form.Group>
            <label htmlFor={"valueN"} style={{fontSize: "20px", marginRight: "10px"}}>n = </label>
            <input name={"valueN"} value={n} type="number"
                   style={{textAlign: "center", width: "50px", marginTop: "20px"}}
                   onChange={e => setN(+e.target.value)}
            />
        </div>
    )
}



const Formula = () => {
    return (
            <math display="block" className="tml-display" style={{display: "block", fontSize: "20px"}}>
            <mrow>
                <mi>f</mi>
                <mo form="prefix" stretchy="false">(</mo>
                <mi>x</mi>
                <mo form="postfix" stretchy="false">)</mo>
                <mo>=</mo>
                <msup>
                    <mi>sin</mi>
                    <mn>5</mn>
                </msup>
                <mo>⁡</mo>
                <mo form="prefix" stretchy="false">(</mo>
                <mi>x</mi>
                <mo>−</mo>
                <mn>2</mn>
                <mo form="postfix" stretchy="false">)</mo>
                <mo>+</mo>
                <msup>
                    <mi>cos</mi>
                    <mn>7</mn>
                </msup>
                <mo>⁡</mo>
                <mo form="prefix" stretchy="false">(</mo>
                <mfrac>
                    <mi>x</mi>
                    <mn>10</mn>
                </mfrac>
                <mo form="postfix" stretchy="false">)</mo>
                <mo separator="true">,</mo>
                <mtext>
                </mtext>
                <mtext>
                </mtext>
                <mtext>
                </mtext>
                <mi>x</mi>
                <mo>∈</mo>
                <mo form="prefix" stretchy="false">[</mo>
                <mn>0,10</mn>
                <mo form="postfix" stretchy="false">]</mo>
            </mrow>
        </math>
    )
}

export default Lab1;