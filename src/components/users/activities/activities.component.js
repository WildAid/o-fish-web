import React, { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import UserService from '../../../services/user.service';
import AuthService from "../../../services/auth.service";
import FieldDashboardComponent from "../../dashboards/field-dashboard.component";

const userService = UserService.getInstance();
const authService = AuthService.getInstance();

class UsersActivities extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    userService.getUserById(this.props.router.params.id).then(res => {
      this.setState({ user: res });
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="flex-column full-view align-center home">
        {user && <FieldDashboardComponent user={user} />}
      </div>
      
    );
  }
}

export default withRouter(UsersActivities);
