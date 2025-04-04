function authorizeRole(user, authorizedRoles) {
    return authorizedRoles.filter(role => role == user.role).length > 0;
}

module.exports = {
    authorizeRole
}