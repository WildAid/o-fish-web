# WildAid O-FISH Web App

The [WildAid Marine Program](https://marine.wildaid.org/) works to protect vulnerable marine environments.

O-FISH (Officer Fishery Information Sharing Hub) is a multi-platform application that enables officers to browse and record boarding report data from their mobile devices.

<BR><BR>Developers are expected to follow the <A HREF="https://www.mongodb.com/community-code-of-conduct">MongoDB Community Code of Conduct</A> guidelines.

This repo implements the O-FISH web app.

Details on installing all applications making up the solution can be found [here](http://wildaid.github.io/).

## Prerequisites

This is the Web app for O-FISH. To build and use the app, you must [use the sandbox realm-app-id](https://wildaid.github.io/contribute/sandbox.html) or [build your own foundation](http://wildaid.github.io/build).

Setting up MongoDB Charts is optional, but note that the Dashboard view will show errors if you don't - other functionality will be uneffected.

`git` and `Node.js` must be installed.

## Building and running the app:

1. `git clone https://github.com/WildAid/o-fish-web`
1. `cd o-fish-web`
1. `npm install`
1. Set your configuration data in `src/config.js` (leave the `chartId` values as they are if you haven't set up [MongoDB Charts](https://www.mongodb.com/products/charts) for the sample data - if you have then you can get the ids from the Charts UI):
```js
module.exports = {
    appName: 'ofish-web',
    realmServiceName: "mongodb-atlas",
    realmAppId: 'wildaid-xxxxx',
    database: 'wildaid',
    chartsConfig: {
      baseUrl: "https://charts.mongodb.com/charts-wildaid-xxxxx",
      "boardings": {
        chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      "boarding-compliance":{
        chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      "patrol-hours":{
        chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      "compliance-rate":{
        chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      "boardings-count-chart":{
        chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      },
      "citations-and-warnings":{
        chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }
    }
  }
```
5. `npm start` (for local testing)
1. `npm run build` (for deployment)


## Code and architecture highlights:

This application uses React and is based on the React Services Architecture rather than Redux (if interested in why, read [Dan Abramov's (Co-author of Redux) opinion on the topic](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367).

All services use as a singleton object. There is no dependency injection needed because there is no service inheritance.

### Key code snippets:

#### Services

Found in `/src/services`. Here you will find all of the basic interaction with the MongoDB Realm service.

Connect MongoDB Realm - `stitch.service.js`:

```js
get client() {
    return this._localStitchClient;//For use the stitch client from another services
  }

  get database() {
    if (!this._database) {
      throw new Error("You are not logged in! Please, login first.");
    }
    return this._database;
  }

  constructor() {
    this._localStitchClient = Stitch.initializeDefaultAppClient(config.realmAppId);

    // The database object will be available only after authentication
    this._database = null;
  }

  // This method should be called from Login form with the Realm user credentials:
  authenticateStitch(login, pass) {
    return this._localStitchClient.auth
      .loginWithCredential(new UserPasswordCredential(login, pass))
      .then((user) => {
        this.reinitializeClient();
        return user;
      });
  }

  //After stitch authentication, you can connect to the database
  reinitializeClient() {
    this._database = this._localStitchClient
      .getServiceClient(RemoteMongoClient.factory, config.realmServiceName)
      .db(config.database);
  }
```

There are also examples of calling Realm functions:

```js
getVesselsWithFacet(limit, offset, search, filter) {
    return this._localStitchClient.callFunction("searchFacetByVessels", [limit, offset, search, filter]);
  }
```

`auth.service.js` uses `EventEmitter` to fire an `authorized` event when authentication is complete:

```js
this.emit("authorized", user);
```

Other components subscribe to that event, for example the user profile component uses it as a trigger to display user information.


#### Authentication

Authentication is invoked from `/src/root/root.component.js` through the `renderRoutes` method (`/src/helpers/map-routing.js`).

This method checks if the user is already authenticated and redirects the user to the login page if not:

```js
const auth = authService.isStitchAuthenticated;
if (route.auth){
  if (!auth){
    return <Redirect to="/login" />;
  } else {
    if (!authService.isAuthenticated){
      return authService.reauthenticateUser().then(()=>{
        return <Redirect to={route.path} />
      });
    }
  }
}

if (route.redirectTo) return <Redirect to={route.redirectTo} />;

if (route.routes){
  return <route.component isLoggedIn={auth} {...props} routes={route.routes}/>;
} else {
  return <route.component isLoggedIn={auth} {...props} />;
}
};
```

#### MongoDB Charts

`src/charts/chart-box.component.js` is a React-ready component to embed MongoDB Charts:

```js
export default function ChartBox({ options, className })
```

Example chart options:

```js
const chartOptions = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300, // in seconds.
  useAuthenticatedAccess: true,
  chartId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  filter: {exampleField: "someValue"}
};
```

#### Pages

The code for each page is in `/src`.

Common components are in `/src/partials`.

