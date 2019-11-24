'use strict';

const ROLE = Object.freeze( {
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
    USER: "USER",

});

const ACTION = Object.freeze( {
    CREATE: "CREATE",
    READ:"READ",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
});

const permissionMap = new Map();
permissionMap.set("CREATE","ADMIN, USER");
permissionMap.set("READ","ADMIN, MODERATOR, USER");
permissionMap.set("UPDATE","MODERATOR");
permissionMap.set("DELETE","ADMIN");

function chechPermission(action, role) {
    return permissionMap.get(action).includes(role);
}
