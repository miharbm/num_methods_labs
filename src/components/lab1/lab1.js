import {useDispatch} from "react-redux";
import {dataToChartSet} from "../../actions";
import {useEffect} from "react";


const Lab1 = () => {
    const dispatch = useDispatch();

    const data = []

    for (let x = 0; x < 10; x += .1) {
        const y = Math.sin(x - 2) ** 5 + Math.cos(x * 0.1) ** 7

        data.push({x,y})
    }

    useEffect(() => {
        dispatch(dataToChartSet(data));
    }, []);


    return (
        <>
            <h2>Lab1</h2>
            {Formula()}
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