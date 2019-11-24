'use strict';

const ROLE = Object.freeze({
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
    USER: "USER",

});

const ACTION = Object.freeze({
    CREATE: "CREATE",
    READ: "READ",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
});

const permissionMap = new Map();

//значения мы уже прописали. Зачем их снова и снова, и снова, и снова прописывать

/*permissionMap.set("CREATE", "ADMIN, USER");
permissionMap.set("READ", "ADMIN, MODERATOR, USER");
permissionMap.set("UPDATE", "MODERATOR");
permissionMap.set("DELETE", "ADMIN");*/

permissionMap.set(
    ACTION.CREATE, [
        ROLE.ADMIN,
        ROLE.USER,
    ]);
permissionMap.set(
    ACTION.READ, [
        ROLE.ADMIN,
        ROLE.MODERATOR,
        ROLE.USER,
    ]);
permissionMap.set(
    ACTION.UPDATE, [
        ROLE.MODERATOR,
    ]);
permissionMap.set(
    ACTION.DELETE,
    [
        ROLE.ADMIN,
    ]);


//chech?
//function chechPermission(action, role) {
function checkPermission(action, role) {
    return permissionMap.get(action).includes(role);
}


//checkPermission(ACTION.DELETE,ROLE.USER);
