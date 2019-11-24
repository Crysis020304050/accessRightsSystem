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


function checkPermission(action, role) {
    if(permissionMap.has(action)){
        return permissionMap.get(action).includes(role);
    }
    return false;
}

class User {
    constructor(name, surname, email, role) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
    }

    static checkPermission(action, role1, role2) {

        /*forAllUsers*/

        const permissionMapCreate = new Map();
        const permissionMapRead = new Map();
        const permissionMapUpdate = new Map();
        const permissionMapDelete = new Map();

        permissionMapCreate.set(ROLE.ADMIN, [ROLE.ADMIN, ROLE.USER, ROLE.MODERATOR,]);
        permissionMapCreate.set(ROLE.MODERATOR, [ROLE.USER,]);
        permissionMapCreate.set(ROLE.USER, []);

        permissionMapRead.set(ROLE.ADMIN, [ROLE.ADMIN, ROLE.USER, ROLE.MODERATOR,]);
        permissionMapRead.set(ROLE.MODERATOR, [ROLE.USER, ROLE.MODERATOR,]);
        permissionMapRead.set(ROLE.USER, [ROLE.USER, ROLE.MODERATOR,]);

        permissionMapUpdate.set(ROLE.ADMIN, [ROLE.ADMIN, ROLE.USER, ROLE.MODERATOR,]);
        permissionMapUpdate.set(ROLE.MODERATOR, [ROLE.USER,]);
        permissionMapUpdate.set(ROLE.USER, []);

        permissionMapDelete.set(ROLE.ADMIN, [ROLE.ADMIN, ROLE.USER, ROLE.MODERATOR,]);
        permissionMapDelete.set(ROLE.MODERATOR, []);
        permissionMapDelete.set(ROLE.USER, []);


        /*forItself*/

        const permissionMapCreateSelf = new Map();
        const permissionMapReadSelf = new Map();
        const permissionMapUpdateSelf = new Map();
        const permissionMapDeleteSelf = new Map();

        permissionMapCreateSelf.set(ROLE.ADMIN, []);
        permissionMapCreateSelf.set(ROLE.MODERATOR, []);
        permissionMapCreateSelf.set(ROLE.USER, []);

        permissionMapReadSelf.set(ROLE.ADMIN, [ROLE.ADMIN,]);
        permissionMapReadSelf.set(ROLE.MODERATOR, [ROLE.MODERATOR,]);
        permissionMapReadSelf.set(ROLE.USER, [ROLE.USER,]);

        permissionMapUpdateSelf.set(ROLE.ADMIN, [ROLE.ADMIN,]);
        permissionMapUpdateSelf.set(ROLE.MODERATOR, [ROLE.MODERATOR,]);
        permissionMapUpdateSelf.set(ROLE.USER, [ROLE.USER,]);

        permissionMapDeleteSelf.set(ROLE.ADMIN, []);
        permissionMapDeleteSelf.set(ROLE.MODERATOR, []);
        permissionMapDeleteSelf.set(ROLE.USER, [ROLE.USER,]);


        if (role1 === role2) {
            switch (action) {
                case ACTION.CREATE:
                    return permissionMapCreateSelf.get(role1.role).includes(role2.role);

                case ACTION.READ:
                    return permissionMapReadSelf.get(role1.role).includes(role2.role);

                case ACTION.UPDATE:
                    return permissionMapUpdateSelf.get(role1.role).includes(role2.role);

                case ACTION.DELETE:
                    return permissionMapDeleteSelf.get(role1.role).includes(role2.role);

                default:
                    return false;

            }
        }

        else {
            switch (action) {
                case ACTION.CREATE:
                    return permissionMapCreate.get(role1.role).includes(role2.role);

                case ACTION.READ:
                    return permissionMapRead.get(role1.role).includes(role2.role);

                case ACTION.UPDATE:
                    return permissionMapUpdate.get(role1.role).includes(role2.role);

                case ACTION.DELETE:
                    return permissionMapDelete.get(role1.role).includes(role2.role);

                default:
                    return false;

            }
        }


    }


}

const admin = new User("Admin", "Adminov", "admin@gmail.com", ROLE.ADMIN);
const admin2 = new User("Admin2", "Adminov2", "admin2@gmail.com", ROLE.ADMIN);
const user = new User("User", "Userov", "user@gmail.com", ROLE.USER);
const user2 = new User("User2", "Userov2", "user2@gmail.com", ROLE.USER);
const moderator = new User("Moderator", "Moderatorov", "moder@gmail.com", ROLE.MODERATOR);
const moderator2 = new User("Moderator2", "Moderatorov2", "moder2@gmail.com", ROLE.MODERATOR);

