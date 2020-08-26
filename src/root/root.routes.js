//@flow

import Root from "./root.component";

import Login from "../components/login/login.component";
import Home from "../components/home/home.component";
import Boardings from "../components/boardings/boardings.component";
import Vessels from "../components/vessels/vessels.component";
import Crew from "../components/crew/crew.component";
import UsersMain from "../components/users/users.routes-render";
import Users from "../components/users/users.component";
import Agencies from "../components/agencies/agencies.component";
import AgenciesMain from "../components/agencies/agencies.routes-render";
import Forms from "../components/forms/forms.component";
import SearchResults from "../components/search-results/search-results.component";
import RestorePassword from "../components/restore-password/restore-password.component";
import Profile from "../components/profile/profile.component";
import ViolationsPage from "../components/violations/violations.component";

//Boardings sub components
import BoardingsMain from "../components/boardings/boardings.routes-render";
import BoardingEditPage from "../components/boardings/boarding-edit/boarding-edit.component";
import BoardingViewPage from "../components/boardings/boarding-view/boarding-view.component";
//Crew sub components
import CrewMain from "../components/crew/crew.routes-render";
import CrewViewPage from "../components/crew/crew-view/crew-view.component";
//Vessels sub components
import VesselsMain from "../components/vessels/vessels.routes-render";
import VesselViewPage from "../components/vessels/vessel-view/vessel-view.component";
//Users sub components
import UsersActivities from "../components/users/activities/activities.component";
import NewUser from "../components/users/new-user/new-user.component";
import ViewUser from "../components/users/view-user/view-user.component";
import EditUser from "../components/users/edit-user/edit-user.component";
//Agencies sub components
import NewAgency from "../components/agencies/new-agency/new-agency.component";
import ViewAgency from "../components/agencies/view-agency/view-agency.component";
import EditAgency from "../components/agencies/edit-agency/edit-agency.component";

import mapRouting from "../helpers/map-routing";

import {
  LOGIN_PAGE,
  HOME_PAGE,
  BOARDINGS_PAGE,
  VESSELS_PAGE,
  CREW_PAGE,
  USERS_PAGE,
  AGENCIES_PAGE,
  FORMS_PAGE,
  SEARCH_RESULTS_PAGE,
  RESTORE_PASSWORD_PAGE,
  PROFILE_PAGE,
  VIOLATIONS_PAGE,
  //Boardings sub routes
  NEW_BOARDING_PAGE,
  EDIT_BOARDING_PAGE,
  VIEW_BOARDING_PAGE,
  //Crew sub routes
  VIEW_CREW_PAGE,
  //Vessels sub routes
  VIEW_VESSEL_PAGE,
  //Users sub routes
  EDIT_USER_PAGE,
  VIEW_USER_PAGE,
  NEW_USER_PAGE,
  USERS_ACTIVITIES_PAGE,
  //Agencies sub routes
  EDIT_AGENCIES_PAGE,
  VIEW_AGENCIES_PAGE,
  NEW_AGENCIES_PAGE,
} from "./root.constants";

const routes = [
  {
    path: LOGIN_PAGE,
    component: Login,
    exact: false,
  },
  {
    path: HOME_PAGE,
    component: Home,
    auth: true,
    exact: false,
  },
  {
    path: PROFILE_PAGE,
    component: Profile,
    auth: true,
    exact: false,
  },
  {
    path: VIOLATIONS_PAGE,
    component: ViolationsPage,
    auth: true,
    exact: false,
  },
  {
    path: BOARDINGS_PAGE,
    component: BoardingsMain,
    auth: true,
    exact: false,
    routes: [
      {
        path: BOARDINGS_PAGE,
        component: Boardings,
        exact: true,
      },
      {
        path: VIEW_BOARDING_PAGE,
        component: BoardingViewPage,
        exact: true,
      },
      {
        path: EDIT_BOARDING_PAGE,
        component: BoardingEditPage,
        exact: true,
      },
      {
        path: NEW_BOARDING_PAGE,
        component: BoardingEditPage,
        exact: true,
      },
    ],
  },
  {
    path: VESSELS_PAGE,
    component: VesselsMain,
    auth: true,
    exact: false,
    routes: [
      {
        path: VESSELS_PAGE,
        exact: true,
        component: Vessels,
      },
      {
        path: VIEW_VESSEL_PAGE,
        exact: true,
        component: VesselViewPage,
      },
    ],
  },
  {
    path: CREW_PAGE,
    component: CrewMain,
    auth: true,
    exact: false,
    routes: [
      {
        path: CREW_PAGE,
        exact: true,
        component: Crew,
      },
      {
        path: VIEW_CREW_PAGE,
        exact: true,
        component: CrewViewPage,
      },
    ],
  },
  {
    path: USERS_PAGE,
    component: UsersMain,
    auth: true,
    exact: false,
    routes: [
      {
        path: USERS_PAGE,
        exact: true,
        component: Users,
      },
      {
        path: EDIT_USER_PAGE,
        exact: true,
        component: EditUser,
      },
      {
        path: VIEW_USER_PAGE,
        exact: true,
        component: ViewUser,
      },
      {
        path: USERS_ACTIVITIES_PAGE,
        exact: true,
        component: UsersActivities,
      },
      {
        path: NEW_USER_PAGE,
        exact: true,
        component: NewUser,
      },
    ],
  },
  {
    path: AGENCIES_PAGE,
    component: AgenciesMain,
    auth: true,
    exact: false,
    routes: [
      {
        path: AGENCIES_PAGE,
        exact: true,
        component: Agencies,
      },
      {
        path: EDIT_AGENCIES_PAGE,
        exact: true,
        component: EditAgency,
      },
      {
        path: VIEW_AGENCIES_PAGE,
        exact: true,
        component: ViewAgency,
      },
      {
        path: NEW_AGENCIES_PAGE,
        exact: true,
        component: NewAgency,
      },
    ],
  },
  {
    path: FORMS_PAGE,
    component: Forms,
    auth: true,
    exact: false,
  },
  {
    path: SEARCH_RESULTS_PAGE,
    component: SearchResults,
    auth: true,
    exact: false,
  },
  {
    path: RESTORE_PASSWORD_PAGE,
    component: RestorePassword,
    exact: false,
  },
  {
    path: "/",
    redirectTo: LOGIN_PAGE,
    exact: true,
    component: Login,
  },
  {
    path: "*",
    redirectTo: HOME_PAGE,
  },
];

const withRoot = [
  {
    path: "/",
    exact: false,
    component: Root,
    routes,
  },
];

export default mapRouting(withRoot);
