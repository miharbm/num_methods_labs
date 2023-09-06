import {useDispatch} from "react-redux";
import {dataToChartSet, initialDataSet} from "../../actions";
import {useEffect, useState} from "react";


const Lab1 = () => {
    const dispatch = useDispatch();

    const data = []
    const [n, setN] = useState(10);
    //     const n = 6 ;
    const a = 0;
    const b = 10;
    const step = (b - a) / n;



    for (let x = 0; x < b +  0.0001; x += step) {
        console.log(x)
        const y = Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7;
        data.push({x,y});
    }

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

    const xArr = data.map(item => item.x);

    const lagrangePolynomial = (x) => {
        let result = 0;
        for (let i = 0; i < n + 1; i++ ) {
            result += data[i].y * product(xArr, x, i) / product(xArr, data[i].x, i)
        }
        return result;
    }

    const dataOut = [];
    for (let x = a; x < b + 0.001; x += 0.1) {
        dataOut.push({x, y: lagrangePolynomial(x)})
    }

    let data3 =[]
    for (let x = a; x < b + 0.00001; x += .01) {
        const y = Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7
        data3.push({x,y})
    }


    // console.log(data[0])
    // console.log(dataOut[0])
    // console.log(data.at(-1))
    // console.log(dataOut.at(-1))


    useEffect(() => {
        dispatch(initialDataSet(data));
    }, [data]);
    useEffect(() => {
        dispatch(dataToChartSet(dataOut));
    }, [dataOut]);



    return (
        <>
            <h2>Lab1</h2>
            {Formula()}
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