import {Form} from "react-bootstrap";

const RadioElems = ({types, onTypeChange, type}) => {
    return types.map(({id, label}) => {
        return <Form.Check
            style={{marginTop: 12, paddingLeft: 30, backgroundColor: "rgba(225,225,225,0.88)", borderRadius: 8}}
            key={id}
            type="radio"
            label={label}
            id={id}
            onChange={onTypeChange}
            checked={type === id}
        />
    })
}

const Radio = ({types, onTypeChange, type}) => {
    return (
        <Form.Group style={{display: "block", marginTop: 30}}>
            {
                <RadioElems types={types} type={type} onTypeChange={onTypeChange}/>
            }
        </Form.Group>
    )
}

export default Radio;