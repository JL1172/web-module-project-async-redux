import { connect } from "react-redux"
import React from "react"
import { StyledGraph } from "./styled/styledComponents";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { changeSymbol, submitSearch } from "./actions/symbolQueryAction";
import { Button, Spinner } from "reactstrap";

const Graph = (props) => {

    return (
        <StyledGraph>
            {!props.isFetching ? 
            <>
            {props.currentInformation.length > 0 && props.symbols.map(n => {
                if (n.displaySymbol === props.currentInformation[0]) {
                    return <h3>{n.description}</h3>
                }
                })}
            <div style = {{display : "flex"}}>
            <LineChart width={250} height={250} data={props.currentInformation}>
                <Line type="monotone" stroke="#8884d8" dataKey="c" />
                <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
                <XAxis dataKey="c" />
                <YAxis dataKey= "" />
                <Tooltip />
            </LineChart>
            <LineChart width={250} height={250} data={props.currentInformation}>
                <Line type="monotone" stroke="#8884d8" dataKey="h" />
                <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
                <XAxis dataKey="h" />
                <YAxis dataKey= "" />
                <Tooltip />
            </LineChart>
            </div>
            <select type="text" onChange={(e) => props.changeSymbol(e.target.value)} value={props.symbolInQue}>
                <option value="">Select Symbol To Search</option>
                {props.symbols.map((n, i) => {
                    const ray = [n.displaySymbol, n.description];
                    return <option key={i} value= {n.displaySymbol}>{n.displaySymbol} {n.description}</option>
                })}
            </select>
            <button onClick={() => props.submitSearch(props.symbolInQue)}>Search Security</button></>
        : 
        <Spinner style = {{width : "5rem", height : "5rem"}}
        className="m-5"
        color="primary"
      >
        {" "}
      </Spinner> }

        </StyledGraph>
    )
}

const mapStateToProps = state => {
    return {
        currentInformation: state.symbolQueryReducer.currentSecurityInformation,
        symbolInQue: state.symbolQueryReducer.symbolInQue,
        isFetching : state.symbolQueryReducer.isFetching,
    }
}

export default connect(mapStateToProps, { changeSymbol, submitSearch })(Graph);