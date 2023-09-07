import {useDispatch} from "react-redux";
import {dataToChartSet, initialDataSet} from "../../actions";
import {useEffect, useState} from "react";


const Lab1 = () => {
    const dispatch = useDispatch();

    const [n, setN] = useState(10);
    const [xType, setXType] = useState("linear");
    const a = 0;
    const b = 10;
    const step = (b - a) / n;
    const epsilon = 0.0001;

    let xArr = [];
    switch (xType) {
        case "linear":
            for (let x = 0; x < b + epsilon; x += step) {
                xArr.push(x);
            }
            break;
        case "cos":
            for (let k = 0; k < n + 1 ; k++) {
                const t = (b - a) / 2
                const x = Math.cos(Math.PI * (k + 1) * .5 / n ) * t + t ;
                xArr.push(x)
            }
            break;

    }

    const data = xArr.map((x) => ({
        x,
        y: Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7,
    }))
    // for (let x = 0; x < b + epsilon; x += step) {
    //     const y = Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7;
    //     data.push({x,y});
    // }

    const product = (xArr, x, i) => {
        let result = 1;
        for (let j = 0; j <= n; j++ ) {
            if (j === i) {
                continue;
            }
            result *= x - xArr[j];
        }
        return result;
    }

    // const xArr = data.map(item => item.x);

    const lagrangePolynomial = (x) => {
        let result = 0;
        for (let i = 0; i < n + 1; i++ ) {
            result += data[i].y * product(xArr, x, i) / product(xArr, data[i].x, i)
        }
        return result;
    }

    const dataOut = [];
    for (let x = a; x < b + epsilon; x += 0.1) {
        dataOut.push({x, y: lagrangePolynomial(x)})
    }

    let data3 =[]
    for (let x = a; x < b + epsilon; x += .01) {
        const y = Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7
        data3.push({x,y})
    }


    // console.log(data[0])
    // console.log(dataOut[0])
    // console.log(data.at(-1))
    // console.log(dataOut.at(-1))


    useEffect(() => {
        dispatch(initialDataSet(data));
    }, [data, xType]);
    useEffect(() => {
        dispatch(dataToChartSet(dataOut));
    }, [dataOut, xType]);



    return (
        <>
            <h2>Lab1</h2>
            {Formula()}
            <div className="form-check" onChange={e => setXType(e.target.id)}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="linear" checked/>
                <label className="form-check-label" htmlFor="flexRadioDefault1" >Linear</label>
            </div>
            <div className="form-check" onChange={e => setXType(e.target.id)}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="cos"/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">Cos</label>
            </div>
            <label htmlFor={"valueN"}>n = </label>
            <input name={"valueN"} value={n} type="number" onChange={e => setN(+e.target.value)}/>
        </>
    )
}

const Formula = () => {
    return (
            <math display="block" className="tml-display" style={{display: "block"}}>
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