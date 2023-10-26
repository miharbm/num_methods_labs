const CheckBox = ({value, setFunc, text, style}) => {
    return (
        <div className="form-check form-switch" style={{backgroundColor: "rgba(133,167,190,0.51)", borderRadius: "8px", paddingLeft: 45, ...style}}>
            <label className="form-check-label" htmlFor="flexCheckDefault" > {text} </label>
            <input className="form-check-input" type="checkbox" checked={value} id="flexCheckDefault"
                   onChange={() => setFunc(!value)}
            />
        </div>
    )
}

export default CheckBox;