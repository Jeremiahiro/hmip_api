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
//PermissionGroups
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
//Permission
Route.group(() => {
  Route.post("create", "RoleController.createRole");
  Route.post("update", "RoleController.updateRole");
  Route.route("fetch", "RoleController.fetchRoles", ["GET", "POST"]);
  Route.post("delete", "RoleController.removeRole");
  Route.route("getrole", "RoleController.getRole", ["GET", "POST"]);
})
.prefix("Role")
.middleware(["auth"]);
// Role

Route.group(() => {
    Route.post("create", "FeedbackFormController.createFeedback");
  
    Route.route("fetch", "FeedbackFormController.fetchFeedbacks", [
      "GET",
      "POST"
    ]);
  
    Route.route("get", "FeedbackFormController.getFeedback", [
      "GET",
      "POST"
    ]);
})
.prefix("FeedbackForm")
// FeedbackForm
Route.group(() => {
      Route.post("create", "NmmipColumnHeaderController.createNmmipColumnHeader");
    
      Route.route("fetch", "NmmipColumnHeaderController.fetchNmmipColumnHeaders", [
        "GET",
        "POST"
      ]);
    
      Route.route("get", "NmmipColumnHeaderController.getNmmipColumnHeader", [
        "GET",
        "POST"
      ]);
      Route.post("update", "NmmipColumnHeaderController.updateNmmipColumnHeader");
      Route.delete("delete", "NmmipColumnHeaderController.removeNmmipColumnHeader");
})
.prefix("NmmipColumnHeader")
.middleware(["auth"]);

Route.group(() => {
        Route.post("create", "NmmipDataGroupController.createNmmipDataGroup");
      
        Route.route("fetch", "NmmipDataGroupController.fetchNmmipDataGroups", [
          "GET",
          "POST"
        ]);
      
        Route.route("get", "NmmipDataGroupController.getNmmipDataGroup", [
          "GET",
          "POST"
        ]);
        Route.post("update", "NmmipDataGroupController.updateNmmipDataGroup");
        Route.delete("delete", "NmmipDataGroupController.removeNmmipDataGroup");
})
.prefix("NmmipDataGroups")
.middleware(["auth"]);

Route.group(() => {
          Route.post("create", "NmmipStateController.createNmmipState");
        
          Route.route("fetch", "NmmipStateController.fetchNmmipStates", [
            "GET",
            "POST"
          ]);
        
          Route.route("get", "NmmipStateController.getNmmipState", [
            "GET",
            "POST"
          ]);
          Route.post("update", "NmmipStateController.updateNmmipState");
          Route.delete("delete", "NmmipStateController.removeNmmipState");
})
.prefix("NmmipStates")
.middleware(["auth"]);      
    
Route.group(() => {
Route.post("create", "SexController.createSex");
            
Route.route("fetch", "SexController.fetchSexes", [
"GET",
"POST"
]);
            
Route.route("get", "SexController.getSex", [
"GET",
"POST"
]);
Route.post("update", "SexController.updateSex");
Route.delete("delete", "SexController.removeSex");
})            
.prefix("Sex")
//.middleware(["auth"]); 
//Sex

Route.group(() => {
  Route.post("create", "EmploymentSectorController.createEmploymentSector");
              
  Route.route("fetch", "EmploymentSectorController.fetchEmploymentSectors", [
  "GET",
  "POST"
  ]);
              
  Route.route("get", "EmploymentSectorController.getEmploymentSector", [
  "GET",
  "POST"
  ]);
  Route.post("update", "EmploymentSectorController.updateEmploymentSector");
  Route.delete("delete", "EmploymentSectorController.removeEmploymentSector");
  })            
.prefix("EmploymentSector")
//.middleware(["auth"]); 
  