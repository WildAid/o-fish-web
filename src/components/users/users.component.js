import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import SearchPanel from "../partials/search-panel/search-panel.component";

import {
  USERS_ACTIVITIES_PAGE,
  EDIT_USER_PAGE,
} from "./../../root/root.constants";

import "./users.css";

const mockedData = [
  {
    id: "5eb002a09ef7923f9cc53026",
    name: {
      first: "Alyson",
      last: "Massey",
    },
    agency: "Swan",
    boardings: 6,
    warnings: 6,
    citations: 10,
  },
  {
    id: "5eb002a01fa2bfa5089b5203",
    name: {
      first: "Billie",
      last: "Rosa",
    },
    agency: "Israel",
    boardings: 22,
    warnings: 10,
    citations: 9,
  },
  {
    id: "5eb002a0dd19a820b61c24de",
    name: {
      first: "Monique",
      last: "Mckenzie",
    },
    agency: "Gitaring",
    boardings: 25,
    warnings: 3,
    citations: 6,
  },
  {
    id: "5eb002a0c75a0d10faf60495",
    name: {
      first: "Consuelo",
      last: "Valenzuela",
    },
    agency: "Gitaring",
    boardings: 15,
    warnings: 2,
    citations: 6,
  },
  {
    id: "5eb002a0b3793a29dfc4f508",
    name: {
      first: "Montgomery",
      last: "Travis",
    },
    agency: "Sellar",
    boardings: 28,
    warnings: 5,
    citations: 13,
  },
  {
    id: "5eb002a0ebf8c1d3352101fd",
    name: {
      first: "Theresa",
      last: "Oneill",
    },
    agency: "Sellar",
    boardings: 10,
    warnings: 11,
    citations: 3,
  },
  {
    id: "5eb002a08b31d400a198685c",
    name: {
      first: "Adele",
      last: "Moses",
    },
    agency: "Global",
    boardings: 31,
    warnings: 1,
    citations: 12,
  },
  {
    id: "5eb002a0a4f3b9d0c4f8a143",
    name: {
      first: "Hardy",
      last: "Bonner",
    },
    agency: "Sellar",
    boardings: 18,
    warnings: 7,
    citations: 9,
  },
  {
    id: "5eb002a039e4ebc1a55d6173",
    name: {
      first: "Lacey",
      last: "Mccall",
    },
    agency: "Swan",
    boardings: 22,
    warnings: 2,
    citations: 5,
  },
  {
    id: "5eb002a0f32af3e030449e32",
    name: {
      first: "Lourdes",
      last: "Flores",
    },
    agency: "Meetup",
    boardings: 17,
    warnings: 6,
    citations: 4,
  },
  {
    id: "5eb002a023bbc065d9cdb34c",
    name: {
      first: "Opal",
      last: "Ross",
    },
    agency: "Meetup",
    boardings: 30,
    warnings: 10,
    citations: 12,
  },
  {
    id: "5eb002a06f43517bb56d3a3e",
    name: {
      first: "Johns",
      last: "Coffey",
    },
    agency: "Global",
    boardings: 17,
    warnings: 1,
    citations: 1,
  },
  {
    id: "5eb002a066b0aedb2271f8e6",
    name: {
      first: "Joan",
      last: "Hood",
    },
    agency: "Global",
    boardings: 15,
    warnings: 3,
    citations: 12,
  },
  {
    id: "5eb002a0debea63b04e7d504",
    name: {
      first: "Hazel",
      last: "Acevedo",
    },
    agency: "Sellar",
    boardings: 11,
    warnings: 3,
    citations: 14,
  },
  {
    id: "5eb002a0b27b343ee4160073",
    name: {
      first: "Potter",
      last: "Norton",
    },
    agency: "Sellar",
    boardings: 18,
    warnings: 3,
    citations: 5,
  },
  {
    id: "5eb002a074b24935ae09c00d",
    name: {
      first: "Meyers",
      last: "Zimmerman",
    },
    agency: "Meetup",
    boardings: 1,
    warnings: 5,
    citations: 10,
  },
  {
    id: "5eb002a0448428d2be0540dc",
    name: {
      first: "Barry",
      last: "Nicholson",
    },
    agency: "Gitaring",
    boardings: 25,
    warnings: 6,
    citations: 5,
  },
  {
    id: "5eb002a0374c928e6b76ca62",
    name: {
      first: "Mccoy",
      last: "Black",
    },
    agency: "Gitaring",
    boardings: 9,
    warnings: 11,
    citations: 2,
  },
  {
    id: "5eb002a01e432d39975995e8",
    name: {
      first: "Tania",
      last: "James",
    },
    agency: "Gitaring",
    boardings: 10,
    warnings: 6,
    citations: 9,
  },
  {
    id: "5eb002a02b0cdf1e495a512e",
    name: {
      first: "Hull",
      last: "Mullins",
    },
    agency: "Meetup",
    boardings: 23,
    warnings: 9,
    citations: 1,
  },
  {
    id: "5eb002a0d1941ba943d1a07c",
    name: {
      first: "Watson",
      last: "Cross",
    },
    agency: "Meetup",
    boardings: 33,
    warnings: 1,
    citations: 14,
  },
  {
    id: "5eb002a0735fbd9b443b428e",
    name: {
      first: "Richards",
      last: "Hopkins",
    },
    agency: "Gitaring",
    boardings: 5,
    warnings: 6,
    citations: 8,
  },
  {
    id: "5eb002a0f91ff813144e854c",
    name: {
      first: "Natalia",
      last: "Pickett",
    },
    agency: "Meetup",
    boardings: 8,
    warnings: 11,
    citations: 12,
  },
  {
    id: "5eb002a0ad56407d31f989e2",
    name: {
      first: "Serrano",
      last: "Gonzalez",
    },
    agency: "Israel",
    boardings: 23,
    warnings: 8,
    citations: 13,
  },
  {
    id: "5eb002a025d8a2dd0bd4aeb6",
    name: {
      first: "Alissa",
      last: "Fry",
    },
    agency: "Israel",
    boardings: 39,
    warnings: 11,
    citations: 14,
  },
  {
    id: "5eb002a08386c86a1e448d14",
    name: {
      first: "Shannon",
      last: "Mcmahon",
    },
    agency: "Sellar",
    boardings: 18,
    warnings: 8,
    citations: 1,
  },
  {
    id: "5eb002a010d9681f31fc62de",
    name: {
      first: "Kerri",
      last: "Summers",
    },
    agency: "Meetup",
    boardings: 4,
    warnings: 1,
    citations: 6,
  },
  {
    id: "5eb002a01be0b078c279e460",
    name: {
      first: "Twila",
      last: "Shaw",
    },
    agency: "Global",
    boardings: 11,
    warnings: 9,
    citations: 5,
  },
  {
    id: "5eb002a02b8c838b17281ab7",
    name: {
      first: "Rhodes",
      last: "Riddle",
    },
    agency: "Meetup",
    boardings: 29,
    warnings: 7,
    citations: 14,
  },
  {
    id: "5eb002a0d9768fa7724d3c94",
    name: {
      first: "Holly",
      last: "Frost",
    },
    agency: "Israel",
    boardings: 25,
    warnings: 12,
    citations: 3,
  },
  {
    id: "5eb002a0eed0dc4b7471975b",
    name: {
      first: "Vaughn",
      last: "Head",
    },
    agency: "Israel",
    boardings: 20,
    warnings: 12,
    citations: 15,
  },
  {
    id: "5eb002a0307e474d5e05d02d",
    name: {
      first: "Fulton",
      last: "Talley",
    },
    agency: "Israel",
    boardings: 26,
    warnings: 12,
    citations: 1,
  },
  {
    id: "5eb002a0bc31483fa1ef13f8",
    name: {
      first: "Arnold",
      last: "Pate",
    },
    agency: "Global",
    boardings: 9,
    warnings: 12,
    citations: 7,
  },
  {
    id: "5eb002a02144d8d9feffc87d",
    name: {
      first: "David",
      last: "York",
    },
    agency: "Israel",
    boardings: 17,
    warnings: 9,
    citations: 1,
  },
  {
    id: "5eb002a08d947c85aa777189",
    name: {
      first: "Sweeney",
      last: "Livingston",
    },
    agency: "Global",
    boardings: 6,
    warnings: 6,
    citations: 2,
  },
  {
    id: "5eb002a0ff62242463fb7533",
    name: {
      first: "Esther",
      last: "Huff",
    },
    agency: "Global",
    boardings: 29,
    warnings: 2,
    citations: 8,
  },
  {
    id: "5eb002a0a74994dc7226a3e4",
    name: {
      first: "Gross",
      last: "Montgomery",
    },
    agency: "Swan",
    boardings: 36,
    warnings: 8,
    citations: 6,
  },
  {
    id: "5eb002a022f5fa5273cb421e",
    name: {
      first: "Henderson",
      last: "Kirk",
    },
    agency: "Sellar",
    boardings: 18,
    warnings: 10,
    citations: 2,
  },
  {
    id: "5eb002a06a0fc4e7fb603ffe",
    name: {
      first: "Wall",
      last: "Williams",
    },
    agency: "Meetup",
    boardings: 33,
    warnings: 12,
    citations: 3,
  },
  {
    id: "5eb002a08e53f5ea6a22ed59",
    name: {
      first: "Moses",
      last: "Burch",
    },
    agency: "Swan",
    boardings: 28,
    warnings: 6,
    citations: 9,
  },
  {
    id: "5eb002a0df9aaf9dc9ef4ce8",
    name: {
      first: "Terrell",
      last: "Russell",
    },
    agency: "Israel",
    boardings: 15,
    warnings: 3,
    citations: 5,
  },
  {
    id: "5eb002a0b301062bc6abd78d",
    name: {
      first: "Rosanne",
      last: "Bruce",
    },
    agency: "Sellar",
    boardings: 37,
    warnings: 7,
    citations: 1,
  },
  {
    id: "5eb002a0c6bc4af6524b8b4c",
    name: {
      first: "Carly",
      last: "Price",
    },
    agency: "Meetup",
    boardings: 30,
    warnings: 11,
    citations: 3,
  },
  {
    id: "5eb002a0a4d704f35670279d",
    name: {
      first: "Faye",
      last: "Cummings",
    },
    agency: "Meetup",
    boardings: 3,
    warnings: 6,
    citations: 6,
  },
  {
    id: "5eb002a0ce8dd90ed9547e49",
    name: {
      first: "Mcmahon",
      last: "Lane",
    },
    agency: "Israel",
    boardings: 13,
    warnings: 10,
    citations: 14,
  },
  {
    id: "5eb002a0a89911e2be3ada0b",
    name: {
      first: "Madeline",
      last: "Mccarty",
    },
    agency: "Swan",
    boardings: 31,
    warnings: 12,
    citations: 11,
  },
  {
    id: "5eb002a0fb6a265381a24466",
    name: {
      first: "Reyna",
      last: "Eaton",
    },
    agency: "Swan",
    boardings: 35,
    warnings: 6,
    citations: 11,
  },
  {
    id: "5eb002a014b5626a84ac6274",
    name: {
      first: "Tina",
      last: "Rodgers",
    },
    agency: "Sellar",
    boardings: 2,
    warnings: 12,
    citations: 4,
  },
  {
    id: "5eb002a042a2eb529ebc6349",
    name: {
      first: "Mcbride",
      last: "Schultz",
    },
    agency: "Swan",
    boardings: 2,
    warnings: 7,
    citations: 9,
  },
  {
    id: "5eb002a08fa69b44e78770a9",
    name: {
      first: "Velasquez",
      last: "Bates",
    },
    agency: "Sellar",
    boardings: 20,
    warnings: 10,
    citations: 15,
  },
  {
    id: "5eb002a062ae9e68ba02e8ac",
    name: {
      first: "Marlene",
      last: "Glover",
    },
    agency: "Swan",
    boardings: 28,
    warnings: 5,
    citations: 1,
  },
  {
    id: "5eb002a0b8269a57f2c8647c",
    name: {
      first: "Snyder",
      last: "Bowers",
    },
    agency: "Swan",
    boardings: 33,
    warnings: 12,
    citations: 2,
  },
  {
    id: "5eb002a0765ccedd22e7fb5a",
    name: {
      first: "Josefa",
      last: "Buckley",
    },
    agency: "Global",
    boardings: 18,
    warnings: 10,
    citations: 8,
  },
  {
    id: "5eb002a0e34510963d5bc645",
    name: {
      first: "Phoebe",
      last: "Kerr",
    },
    agency: "Gitaring",
    boardings: 17,
    warnings: 6,
    citations: 12,
  },
  {
    id: "5eb002a0d81f73bf68bcd330",
    name: {
      first: "Patsy",
      last: "Tillman",
    },
    agency: "Gitaring",
    boardings: 25,
    warnings: 7,
    citations: 7,
  },
  {
    id: "5eb002a012cd4766a03eccad",
    name: {
      first: "Miranda",
      last: "Gray",
    },
    agency: "Swan",
    boardings: 14,
    warnings: 1,
    citations: 6,
  },
  {
    id: "5eb002a018b30ba711c189e7",
    name: {
      first: "Mccray",
      last: "Hebert",
    },
    agency: "Sellar",
    boardings: 33,
    warnings: 1,
    citations: 9,
  },
  {
    id: "5eb002a0fad184a9c1d41efe",
    name: {
      first: "Rivera",
      last: "Castillo",
    },
    agency: "Global",
    boardings: 20,
    warnings: 8,
    citations: 5,
  },
  {
    id: "5eb002a04801d5fa3458984c",
    name: {
      first: "Kramer",
      last: "Zamora",
    },
    agency: "Meetup",
    boardings: 13,
    warnings: 10,
    citations: 1,
  },
  {
    id: "5eb002a04805468965e2ec46",
    name: {
      first: "Chase",
      last: "Strong",
    },
    agency: "Israel",
    boardings: 38,
    warnings: 1,
    citations: 14,
  },
  {
    id: "5eb002a02f3dc4c6da2aed3b",
    name: {
      first: "Alston",
      last: "Atkinson",
    },
    agency: "Global",
    boardings: 40,
    warnings: 10,
    citations: 2,
  },
  {
    id: "5eb002a08fe352a81991fa05",
    name: {
      first: "Gertrude",
      last: "Brock",
    },
    agency: "Global",
    boardings: 3,
    warnings: 4,
    citations: 12,
  },
  {
    id: "5eb002a0fb7a18e8e9eb8c29",
    name: {
      first: "Dunn",
      last: "Middleton",
    },
    agency: "Swan",
    boardings: 18,
    warnings: 10,
    citations: 2,
  },
  {
    id: "5eb002a013b0cc7450f896a7",
    name: {
      first: "Sexton",
      last: "Whitney",
    },
    agency: "Israel",
    boardings: 25,
    warnings: 7,
    citations: 7,
  },
  {
    id: "5eb002a05cfca3b24615f97f",
    name: {
      first: "Christa",
      last: "Powers",
    },
    agency: "Swan",
    boardings: 39,
    warnings: 4,
    citations: 13,
  },
  {
    id: "5eb002a0ed89b22af99725fe",
    name: {
      first: "Torres",
      last: "Lucas",
    },
    agency: "Gitaring",
    boardings: 29,
    warnings: 9,
    citations: 2,
  },
  {
    id: "5eb002a0cfbc43ce3aef12a4",
    name: {
      first: "Karin",
      last: "Ingram",
    },
    agency: "Sellar",
    boardings: 24,
    warnings: 8,
    citations: 9,
  },
  {
    id: "5eb002a0c00298e4725ee70c",
    name: {
      first: "Peck",
      last: "Velez",
    },
    agency: "Meetup",
    boardings: 18,
    warnings: 5,
    citations: 14,
  },
  {
    id: "5eb002a0a55072c35ed94bf7",
    name: {
      first: "Montoya",
      last: "Thompson",
    },
    agency: "Israel",
    boardings: 39,
    warnings: 11,
    citations: 10,
  },
  {
    id: "5eb002a0a5e354e9657511ba",
    name: {
      first: "Elena",
      last: "Ball",
    },
    agency: "Meetup",
    boardings: 21,
    warnings: 9,
    citations: 14,
  },
  {
    id: "5eb002a0f7999b263706afdd",
    name: {
      first: "Nancy",
      last: "Bradford",
    },
    agency: "Global",
    boardings: 13,
    warnings: 6,
    citations: 6,
  },
  {
    id: "5eb002a0cda4cddfd91373b1",
    name: {
      first: "Huff",
      last: "Bowen",
    },
    agency: "Global",
    boardings: 34,
    warnings: 5,
    citations: 4,
  },
  {
    id: "5eb002a0153f36162da17d3e",
    name: {
      first: "Fitzgerald",
      last: "Curtis",
    },
    agency: "Gitaring",
    boardings: 31,
    warnings: 10,
    citations: 5,
  },
  {
    id: "5eb002a0406335ae0e07f871",
    name: {
      first: "Zamora",
      last: "Rasmussen",
    },
    agency: "Gitaring",
    boardings: 12,
    warnings: 4,
    citations: 15,
  },
  {
    id: "5eb002a03ae9b36f97b5bb1c",
    name: {
      first: "Lupe",
      last: "Burton",
    },
    agency: "Israel",
    boardings: 35,
    warnings: 7,
    citations: 9,
  },
  {
    id: "5eb002a05497cb001c66eb23",
    name: {
      first: "Loraine",
      last: "Craig",
    },
    agency: "Israel",
    boardings: 12,
    warnings: 10,
    citations: 6,
  },
  {
    id: "5eb002a0d235ca2a5e83a7a8",
    name: {
      first: "Gina",
      last: "Vaughan",
    },
    agency: "Meetup",
    boardings: 2,
    warnings: 10,
    citations: 6,
  },
  {
    id: "5eb002a03081e554dcefeea3",
    name: {
      first: "Woodard",
      last: "Mcmillan",
    },
    agency: "Sellar",
    boardings: 31,
    warnings: 5,
    citations: 7,
  },
  {
    id: "5eb002a0b25364052a7aa4fc",
    name: {
      first: "Klein",
      last: "Mcfarland",
    },
    agency: "Swan",
    boardings: 28,
    warnings: 9,
    citations: 11,
  },
  {
    id: "5eb002a01bee36f84b09cde3",
    name: {
      first: "Dollie",
      last: "Clark",
    },
    agency: "Sellar",
    boardings: 31,
    warnings: 2,
    citations: 1,
  },
  {
    id: "5eb002a073a67bff6a366e04",
    name: {
      first: "Baird",
      last: "Reid",
    },
    agency: "Swan",
    boardings: 2,
    warnings: 7,
    citations: 4,
  },
  {
    id: "5eb002a0212b77d7e809975d",
    name: {
      first: "Sheena",
      last: "Jacobs",
    },
    agency: "Meetup",
    boardings: 19,
    warnings: 12,
    citations: 3,
  },
  {
    id: "5eb002a0a62b501dc440b00a",
    name: {
      first: "Colleen",
      last: "Marks",
    },
    agency: "Israel",
    boardings: 16,
    warnings: 5,
    citations: 10,
  },
  {
    id: "5eb002a0b5b8c439ef941d37",
    name: {
      first: "Myrtle",
      last: "Richardson",
    },
    agency: "Meetup",
    boardings: 27,
    warnings: 5,
    citations: 7,
  },
  {
    id: "5eb002a0547fb1597fb6ab9a",
    name: {
      first: "Garrison",
      last: "Hays",
    },
    agency: "Sellar",
    boardings: 27,
    warnings: 11,
    citations: 4,
  },
  {
    id: "5eb002a04a985ead90fd13de",
    name: {
      first: "Olivia",
      last: "Barry",
    },
    agency: "Meetup",
    boardings: 28,
    warnings: 8,
    citations: 5,
  },
  {
    id: "5eb002a0b4b3b8e1469b1e53",
    name: {
      first: "Pruitt",
      last: "Payne",
    },
    agency: "Israel",
    boardings: 22,
    warnings: 10,
    citations: 9,
  },
  {
    id: "5eb002a0172eafc7e7f111e3",
    name: {
      first: "Aurora",
      last: "Rios",
    },
    agency: "Sellar",
    boardings: 9,
    warnings: 3,
    citations: 4,
  },
  {
    id: "5eb002a07e638a51a1b8378b",
    name: {
      first: "Serena",
      last: "Woodward",
    },
    agency: "Sellar",
    boardings: 37,
    warnings: 10,
    citations: 2,
  },
  {
    id: "5eb002a0279c9112973d3072",
    name: {
      first: "Sandy",
      last: "Wilder",
    },
    agency: "Meetup",
    boardings: 32,
    warnings: 2,
    citations: 14,
  },
];

class UsersMain extends React.Component {
  state = {
    users: [],
    total: mockedData.length,
    limit: 50,
    offset: 0,
    activitiesAmount: [],
    page: 1
  };

  handlePageChange = (e, page) => {
    const { limit } = this.state;

    const newOffset = (page - 1) * limit;

    const paginatedUsers = mockedData.slice(newOffset, newOffset + limit);
    this.setState({ users: paginatedUsers, page: page });
  };

  checkUsers = (e, user) => {
    const { activitiesAmount } = this.state;

    let newActivities = [...activitiesAmount];

    if (e.target.checked) {
      newActivities.push(user);
    } else {
      newActivities = newActivities.filter((el) => {
        return el.id !== user.id;
      });
    }

    this.setState({ activitiesAmount: newActivities });
  };

  componentDidMount() {
    const { limit, offset } = this.state;

    const paginatedUsers = mockedData.slice(offset, offset + limit);
    this.setState({ users: paginatedUsers });
  }

  render() {
    const { users, total, limit, activitiesAmount, page } = this.state;

    return (
      <div className="padding-bottom flex-column align-center">
        <SearchPanel />
        <div className="flex-row standard-view">
          <div className="items-amount">{total} Users</div>
        </div>
        <div className="flex-row standard-view">
          <NavLink to={USERS_ACTIVITIES_PAGE}>
            <button className="blue-btn">
              See Activity
              {activitiesAmount.length ? `(${activitiesAmount.length})` : ""}
            </button>
          </NavLink>
          <button className="blue-btn">+ Filter</button>
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr className="table-row row-head">
                <td>
                  <div className="flex-row align-center">
                    <input className="check-item" type="checkbox" />
                    <p>Name</p>
                  </div>
                </td>
                <td>Agency</td>
                <td>Boardings</td>
                <td>Citations</td>
                <td>Warnings</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users.map((item, ind) => (
                <tr className="table-row row-body" key={ind}>
                  <td>
                    <div className="flex-row align-center">
                      <input
                        className="check-item"
                        type="checkbox"
                        onChange={(e) => this.checkUsers(e, item)}
                      />
                      <div className="user-img">
                        <img
                          className="full-view"
                          src={require("../../assets/user-icon.png")}
                          alt="no logo"
                        />
                      </div>
                      <p>{`${item.name.first} ${item.name.last}`}</p>
                    </div>
                  </td>
                  <td>{item.agency || "No number"}</td>
                  <td>{item.boardings}</td>
                  <td>{item.citations}</td>
                  <td>{item.warnings}</td>
                  <td>
                    <NavLink to={EDIT_USER_PAGE}>
                      <div className="edit-img">
                        <img
                          className="full-view"
                          src={require("../../assets/edit-icon.png")}
                          alt="no icon"
                        />
                      </div>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          count={Math.ceil(total / limit)}
          shape="rounded"
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default withRouter(UsersMain);
