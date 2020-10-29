import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//import PhotosOverview from "./../../../partials/overview-pages/photo-overview/photo-overview.component";

class ViolationsSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.count,
      data: 
        props.dataObject.inspection &&
        props.dataObject.inspection.summary &&
        Array.isArray(props.dataObject.inspection.summary.violations)
          ? props.dataObject.inspection.summary.violations
          : [],
    };
  }


  render() {
    const { t } = this.props;
    const { data } = this.state;
    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top margin-bottom">
          {t("SEARCH.VIOLATIONS")}
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead> 
              <tr className="table-row row-head border-bottom">
                <td>{t("FILTER.MAIN.VIOLATIONS.VIOLATION")}</td>
                <td>{t("FILTER.MAIN.VIOLATIONS.RESULT")}</td>
                <td>{t("FILTER.MAIN.VIOLATIONS.WHO")}</td>
                <td>{t("FILTER.MAIN.VIOLATIONS.PHOTOS")}</td>
                <td>{t("FILTER.MAIN.VIOLATIONS.NOTES")}</td>
              </tr>
            </thead>
            <tbody>
              { data[0] ? data.map((item, ind) => (
                <tr className="table-row row-body" key={ind}>
                  <td><strong>{item.offence.code}</strong><br />{item.offence.explanation}</td>
                  <td>{item.disposition}</td>
                  <td>{item.crewMember.name}</td>
                  <td>{item.attachments 
                    // ? <PhotosOverview photos={item.attachments.photoIDs} />
                    ? item.attachments.photoIDs
                    : 'N/A'}</td>
                  <td>{item.attachments 
                    ? item.attachments.notes.map((note) => (
                     `${note}`
                      ))
                    : 'N/A'}</td>
                </tr>
              )) : <tr className="table-row row-body"><td>N/A</td></tr> }
            </tbody>
          </table>
        </div>
      </div>
    );
  }


}


export default withTranslation("translation")(ViolationsSection);

//TODO: Remove - this looks like edit code, not view code
//  setFieldValue = (name, value) => {
//
//  }
//
//  addNew = (name, value) => {
//    const newData = [...this.state.data];
//    newData.push({});
//    this.setState({data: newData});
//  }
//
//  deleteItem(itemNo) {
//    const newData = [...this.state.data];
//    newData.splice(itemNo - 1);
//    this.setState({data: newData});
//  }
//
//  getItems(values){
//    let itemNo = 0;
//    return (values.map(item => (
//      <section>
//          <div className="row">
//            <h3>Violation {++itemNo}</h3>
//            <div class='section-buttons'>
//              <Button variant="outlined" onClick={this.deleteItem.bind(this, itemNo)}>
//                <Icon>delete_outlined</Icon>
//              </Button>
//              <Button variant="outlined">
//                <Icon>attachment</Icon>
//              </Button>
//            </div>
//          </div>
//          <div className="row">
//            <TextField label="Violation:" style={{width: "45%"}} name="description" value={item.description} className="half-row" onChange={e => this.setFieldValue("description", e.target.value)}/>
//            <TextField label="Result of violation:" style={{width: "45%"}} name="disposition"  className="half-row" value={item.disposition} onChange={e => this.setFieldValue("disposition", e.target.value)}/>
//          </div>
//      </section>
//    )))
//  }
//
//  render() {
//    const values = this.state.data;
//    return (
//        <div class='violations-section section'>
//          <div className="row" style={{margin: 0, padding: "10px 2em"}}>
//            <h2 style={{marginTop: 0}}>Violations</h2>
//            <div className="add-link">
//              <Button onClick={this.addNew}>
//                <Icon>add</Icon>
//                <span>Add violation</span>
//              </Button>
//            </div>
//          </div>
//          {this.getItems(values)}
//        </div>
//    )
//  }
