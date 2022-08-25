import React, { Component } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AuthService from "../../../../services/auth.service";
import CustomMenuService from "../../../../services/custom-menu.service";

import { withTranslation } from "react-i18next";

const authService = AuthService.getInstance();
const customMenuService = CustomMenuService.getInstance();

class ActivitySection extends Component {

  state = {
    activities: [],
    gear: [],
    fisheries: [],
  }

  componentDidMount() {
    customMenuService.getMenus(authService.user.agency.name).then(res => {
      this.setState({
        activities: res.activities,
        gear: res.gear,
        fisheries: res.fisheries,
      })
    })
  }

  handleChange = (field, value) => {
    const newActivities = {
      ...this.props.inspection,
      [field]: { name: value },
    }

    this.props.onChange("inspection", newActivities);
  };

  render() {
    const { t } = this.props;
    const { activities, gear, fisheries } = this.state;


    return (
      <>
        <section className="box-shadow white-bg margin-top padding-bottom">
          <div className="table-name border-bottom">
            {t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
          </div>
          <div className="padding-25">
            <div>
              <div className="flex-row justify-between">
                <h3 className="item-name">
                  {t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
                </h3>
                <AttachFileIcon className="blue-color" />
              </div>
              <div className="flex-row justify-between padding-bottom margin-bottom">
                <FormControl className="full-view required-field">
                  <InputLabel id={'activities-section-activity'}>
                    {t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
                  </InputLabel>
                  <Select
                    labelId={'activities-section-activity'}
                    name="activity"
                    onChange={(e) =>
                      this.handleChange("activity", e.target.value)
                    }
                    required
                  >
                    {
                      activities.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex-row justify-between">
              <h3 className="item-name">
                {t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}
              </h3>
              <AttachFileIcon className="blue-color" />
            </div>
            <div className="flex-row justify-between padding-bottom margin-bottom">
              <FormControl className="full-view">
                <InputLabel id={'activities-section-fishery'}>
                  {t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}
                </InputLabel>
                <Select
                  labelId={'activities-section-fishery'}
                  name="fishery"
                  onChange={(e) => this.handleChange("fishery", e.target.value)}
                  required
                >
                  {
                    fisheries.map((item) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div className="flex-row justify-between">
              <h3 className="item-name">
                {t("BOARDING_PAGE.VIEW_BOARDING.GEAR")}
              </h3>
              <AttachFileIcon className="blue-color" />
            </div>
            <div className="flex-row justify-between padding-bottom margin-bottom">
            <FormControl className="full-view">
                <InputLabel id={'activities-section-gear'}>
                  {t("BOARDING_PAGE.VIEW_BOARDING.GEAR")}
                </InputLabel>
                <Select
                  labelId={'activities-section-gear'}
                  name="gear"
                  onChange={(e) => this.handleChange("gearType", e.target.value)}
                >
                  {
                    gear.map((item) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withTranslation("translation")(ActivitySection);
