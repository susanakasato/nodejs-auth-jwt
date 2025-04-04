const ROLES = {
    ADMIN: "admin",
    BASIC: "basic"
}


const users = [
    {
        id: 1,
        username: "David",
        password: "$2b$05$VkZsmpyHsEmDRdfh.c03P.SD2Qs4i0.4.nkVG3IiMw9P.bov3l3n2",
        role: ROLES.ADMIN
    },
    {
        id: 2,
        username: "Mary",
        password: "$2b$05$Aip8ZsqS5Zl3duQm5Ub2me2kPJQEwTQPM5SlIx.oxEfZI1bNMu1zy",
        role: ROLES.BASIC
    },
    {
        id: 3,
        username: "Bob",
        password: "$2b$05$EsAF2k0alfhXhZ/l2/YLxOlQ09mSgRA8hXK.gJsk4uarRb0OIRxkm",
        role: ROLES.BASIC
    }
];

const projects = [
    {
        id: 1,
        name: "David's project",
        user: {
            id: 1
        }
    }, {
        id: 2,
        name: "Mary's project",
        user: {
            id: 2
        }
    }, {
        id: 3,
        name: "Mary's second project",
        user: {
            id: 2
        }
    }, {
        id: 4,
        name: "Mary's third project",
        user: {
            id: 2
        }
    }
]

function getUserByUsername(username) {
    return users.filter(user => user.username == username)[0];
}

function getRole(role) {
    switch(role) {
        case "admin":
            return ROLES.ADMIN;
        default:
            return ROLES.BASIC;
    }
}

function getProjectByUserId(id) {
    return projects.filter(project => project.user.id == id);
}

module.exports = {
    users,
    ROLES,
    projects,
    getUserByUsername,
    getRole,
    getProjectByUserId
}