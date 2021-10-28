'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//User routes
Route.group(() => {
  Route.post("create", "UserController.createUser");
  Route.post("login", "UserController.login");
  Route.post("loginhandler", "UserController.loginHandler");
  Route.post("initiatepasswordreset", "UserController.initiatePasswordReset");
  Route.post("resetpassword", "UserController.resetPassword");
  Route.post("activateaccount", "UserController.activateAccount");
  Route.route("get", "UserController.fetch", ["GET", "POST"]);
}).prefix("User");


Route.group(() => {
  Route.post("create", "PermissionGroupController.createGroup");

  Route.post("update", "PermissionGroupController.updateGroup");

  Route.route("fetch", "PermissionGroupController.fetchGroups", [
    "GET",
    "POST"
  ]);

  Route.route("getgroup", "PermissionGroupController.getGroup", [
    "GET",
    "POST"
  ]);

  Route.post("delete", "PermissionGroupController.removeGroup");
})
  .prefix("PermissionGroups")
  .middleware(["auth"]);

Route.group(() => {
  Route.post("create", "PermissionController.createPermission");

  Route.route("fetch", "PermissionController.fetchPermissions", [
    "GET",
    "POST"
  ]);

  Route.route("getpermission", "PermissionController.getPermission", [
    "GET",
    "POST"
  ]);

  Route.post("update", "PermissionController.updatePermission");

  Route.post("delete", "PermissionController.removePermission");
})
  .prefix("Permission")
  .middleware(["auth"]);

Route.group(() => {
  Route.post("create", "RoleController.createRole");
  Route.post("update", "RoleController.updateRole");
  Route.route("fetch", "RoleController.fetchRoles", ["GET", "POST"]);
  Route.post("delete", "RoleController.removeRole");
  // Route.post("createrole", "RoleController.createOrganizationRole");
  // Route.route("fetchorganizationroles","RoleController.fetchOrganizationRoles",["GET", "POST"]);

  Route.route("getrole", "RoleController.getRole", ["GET", "POST"]);
})
  .prefix("Role")
  .middleware(["auth"]);