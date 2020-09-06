//Routes
export const LOGIN_PAGE = "/login";
export const HOME_PAGE = "/home";
export const BOARDINGS_PAGE = "/boardings";
export const VESSELS_PAGE = "/vessels";
export const CREW_PAGE = "/crew";
export const USERS_PAGE = "/users";
export const AGENCIES_PAGE = "/agencies";
export const FORMS_PAGE = "/forms";
export const PROFILE_PAGE = "/profile";
export const VIOLATIONS_PAGE = "/violations/:filter";
export const PHOTOS_PAGE = "/photos/:filter";
export const NOTES_PAGE = "/notes/:filter";
export const SEARCH_RESULTS_PAGE = "/search_results";
export const RESTORE_PASSWORD_PAGE = "/restore_password";

//Boardings subroutes
export const FIND_USERS_PAGE = "/boardings/find_users";
export const NEW_BOARDING_PAGE = "/boardings/new";
export const EDIT_BOARDING_PAGE = "/boardings/edit/:id";
export const VIEW_BOARDING_PAGE = "/boardings/view/:id";
export const BOARDING_FILTERED_PAGE = "/boardings/:id";


//Crew sub routes
export const VIEW_CREW_PAGE = "/crew/view/:filter";

//Vessels sub routes
export const VIEW_VESSEL_PAGE = "/vessels/view/:filter";

//Users subroutes
export const NEW_USER_PAGE = "/users/new_user";
export const USERS_ACTIVITIES_PAGE = "/users/activities";
export const EDIT_USER_PAGE = "/users/edit/:id";
export const VIEW_USER_PAGE = "/users/view_user";

//Agencies subroutes
export const NEW_AGENCIES_PAGE = "/agencies/new_agency";
export const EDIT_AGENCIES_PAGE = "/agencies/edit_agency/:id";
export const VIEW_AGENCIES_PAGE = "/agencies/view_agency/:id";
