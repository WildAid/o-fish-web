//@flow

import Root from "./root.component";

import Login from "../components/login/login.component";
import Home from "../components/home/home.component";
import Boardings from "../components/boardings/boardings.routes-render";
import Vessels from "../components/vessels/vessels.component";
import Crew from "../components/crew/crew.component";
import UsersMain from "../components/users/users.routes-render";
import Users from "../components/users/users.component";
import Agencies from "../components/agencies/agencies.component";
import AgenciesMain from "../components/agencies/agencies.routes-render";
import Forms from "../components/forms/forms.component";
import SearchResults from "../components/search-results/search-results.component";
import RestorePassword from "../components/restore-password/restore-password.component";

//Boardings sub components
import BoardingsMain from "../components/boardings/boardings.component";
import BoardingEditPage from "../components/boardings/boarding-edit/boarding-edit.component";
import BoardingViewPage from "../components/boardings/boarding-view/boarding-view.component";
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
  //Boardings sub routes
  NEW_BOARDING_PAGE,
  EDIT_BOARDING_PAGE,
  VIEW_BOARDING_PAGE,
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
    auth: false,
    exact: false,
  },
  {
    path: PROFILE_PAGE,
    component: NewUser,
    auth: false,
    exact: false,
  },
  {
    path: BOARDINGS_PAGE,
    component: Boardings,
    auth: true,
    exact: false,
    routes: [
      {
        path: BOARDINGS_PAGE,
        component: BoardingsMain,
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
    component: Vessels,
    auth: true,
    exact: false,
  },
  {
    path: CREW_PAGE,
    component: Crew,
    auth: true,
    exact: false,
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
