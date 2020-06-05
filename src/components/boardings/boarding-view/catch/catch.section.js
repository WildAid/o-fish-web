import React, { Component } from "react";

export default class CatchSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      data:
        props.dataObject.inspection &&
        props.dataObject.inspection.actualCatch &&
        Array.isArray(props.dataObject.inspection.actualCatch)
          ? props.dataObject.inspection.actualCatch
          : [],
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top margin-bottom">
          Catches
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr className="table-row row-head">
                <td>Species</td>
                <td>Count</td>
                <td>Weight</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, ind) => (
                <tr className="table-row row-body" key={ind}>
                  <td>{item.fish}</td>
                  <td>{item.number}</td>
                  <td>{`${item.weight} ${item.unit}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
