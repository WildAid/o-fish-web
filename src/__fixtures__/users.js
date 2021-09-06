import { agency1 } from "./agencies"

export const fieldOfficer = {
    agency: {
        name: agency1.name,
        admin: false,
    },
    email: "field_oficer@example.com",
    global: {
        admin: false
    },
    name: {
        first: "Field",
        last: "Officer"
    }
}

export const globalAdminUser = {
    agency: {
        name: agency1.name,
        admin: false,
    },
    email: "global_admin@example.com",
    global: {
        admin: true
    },
    name: {
        first: "Global",
        last: "Admin"
    }
}

export const agencyAdminUser = {
    agency: {
        name: agency1.name,
        admin: true,
    },
    email: "agency_admin@example.com",
    global: {
        admin: false
    },
    name: {
        first: "Agency",
        last: "Admin"
    }
}