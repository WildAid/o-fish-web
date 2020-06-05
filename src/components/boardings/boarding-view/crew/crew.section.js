import React, { Component } from "react";

import TextViewer from "../../../partials/text-viewer/text-viewer";

export default class CrewSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      crew: props.dataObject.crew,
      captain: props.dataObject.captain,
    };
  }

  render() {
    const { crew, captain } = this.state;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">Captain</div>
        <section className="flex-row justify-between box-shadow padding white-bg margin-top">
          <TextViewer mainText={captain.name} subText="Name" />
          <TextViewer mainText={captain.license} subText="License Number" />
          <TextViewer mainText="No photos" subText="Photos" />
          <TextViewer
            mainText={captain.attachments.notes[0]}
            subText="Notes"
          />
        </section>
        <div className="item-name margin-left margin-top margin-bottom">
          Crew
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr className="table-row row-head">
                <td>Name</td>
                <td>License Number</td>
                <td>Photos</td>
                <td>Notes</td>
              </tr>
            </thead>
            <tbody>
              {crew.map((item, ind) => (
                <tr className="table-row row-body" key={ind}>
                  <td>{item.name}</td>
                  <td>{item.license}</td>
                  <td>No photos</td>
                  <td>{item.attachments.notes[0]}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
