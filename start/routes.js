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
  return { greeting: 'Hello world this is the HMIP Backend APP' }
})

//User routes
Route.group(() => {
  Route.post("create", "UserController.createUser");
  Route.post("login", "UserController.login");
  Route.post("loginhandler", "UserController.loginHandler");
  Route.post("initiatepasswordreset", "UserController.initiatePasswordReset");
  Route.post("resetpassword", "UserController.resetPassword");
  Route.post("activateaccount", "UserController.activateAccount");
  Route.route("fetch", "UserController.fetchUsers", ["GET", "POST"]);
  Route.route("getUser", "UserController.getUser", [
    "GET",
    "POST"
  ]);
 // Route.route("count", "UserController.fetchUsersCount", ["GET", "POST"]);

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

  Route.delete("delete", "PermissionGroupController.removeGroup");
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
  Route.delete("delete", "PermissionController.removePermission");
})
.prefix("Permission")
.middleware(["auth"]);
//Permission
Route.group(() => {
  Route.post("create", "RoleController.createRole");
  Route.post("update", "RoleController.updateRole");
  Route.route("fetch", "RoleController.fetchRoles", ["GET", "POST"]);
  Route.delete("delete", "RoleController.removeRole");
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
//NmmipColumnHeader
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
//NmmipDataGroups
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
          Route.route("count", "NmmipStateController.fetchNmmipStateCount", [
            "GET",
            "POST"
          ]);
})
.prefix("NmmipStates")
.middleware(["auth"]);      
//NmmipStates
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
.middleware(["auth"]); 
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
.middleware(["auth"]); 
//EmploymentSector

Route.group(() => {
  Route.post("create", "EmploymentStatusController.createEmploymentStatus");
              
  Route.route("fetch", "EmploymentStatusController.fetchEmploymentStatuses", [
  "GET",
  "POST"
  ]);
              
  Route.route("get", "EmploymentStatusController.getEmploymentStatus", [
  "GET",
  "POST"
  ]);
  Route.post("update", "EmploymentStatusController.updateEmploymentStatus");
  Route.delete("delete", "EmploymentStatusController.removeEmploymentStatus");
  })            
.prefix("EmploymentStatus")
.middleware(["auth"]); 
//EmploymentStatus
Route.group(() => {
  Route.post("create", "OwnershipTypeController.createOwnershipType");
              
  Route.route("fetch", "OwnershipTypeController.fetchOwnershipTypes", [
  "GET",
  "POST"
  ]);
  Route.post("update", "OwnershipTypeController.updateOwnershipType");
     
  Route.route("get", "OwnershipTypeController.getOwnershipType", [
  "GET",
  "POST"
  ]);
  Route.delete("delete", "OwnershipTypeController.removeOwnershipType");
  })            
.prefix("OwnershipType")
.middleware(["auth"]);
//OwnershipType
Route.group(() => {
  Route.post("create", "PropertyTypeController.createPropertyType");
              
  Route.route("fetch", "PropertyTypeController.fetchPropertyTypes", [
  "GET",
  "POST"
  ]);
  Route.post("update", "PropertyTypeController.updatePropertyType");
     
  Route.route("get", "PropertyTypeController.getPropertyType", [
  "GET",
  "POST"
  ]);
  Route.delete("delete", "PropertyTypeController.removePropertyType");
  })            
.prefix("PropertyType")
.middleware(["auth"]);
//PropertyType
Route.group(() => {
  Route.post("create", "QuestionnaireController.createQuestionnaire");
              
  Route.route("fetch", "QuestionnaireController.fetchQuestionnaires", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "QuestionnaireController.getQuestionnaire", [
  "GET",
  "POST"
  ]);
  Route.delete("delete", "QuestionnaireController.removeQuestionnaire");
  })            
.prefix("Questionnaire")
//.middleware(["auth"]);
//Questionnaire
Route.group(() => {
  Route.post("create", "SecondaryIncomeController.createSecondaryIncome");
              
  Route.route("fetch", "SecondaryIncomeController.fetchSecondaryIncomes", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "SecondaryIncomeController.getSecondaryIncome", [
  "GET",
  "POST"
  ]);
  Route.post("update", "SecondaryIncomeController.updateSecondaryIncome");

  Route.delete("delete", "SecondaryIncomeController.removeSecondaryIncome");
  })            
.prefix("SecondaryIncome")
.middleware(["auth"]);
//SecondaryIncome
Route.group(() => {
  Route.post("create", "TypeOfBuyerController.createTypeOfBuyer");
              
  Route.route("fetch", "TypeOfBuyerController.fetchTypeOfBuyers", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "TypeOfBuyerController.getTypeOfBuyer", [
  "GET",
  "POST"
  ]);
  Route.post("update", "TypeOfBuyerController.updateTypeOfBuyer");

  Route.delete("delete", "TypeOfBuyerController.removeTypeOfBuyer");
  })            
.prefix("TypeOfBuyer")
.middleware(["auth"]);
//TypeOfBuyer
Route.group(() => {
  Route.post("create", "LgaController.createLga");
              
  Route.route("fetch", "LgaController.fetchLgas", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "LgaController.getLga", [
  "GET",
  "POST"
  ]);
  Route.post("update", "LgaController.updateLga");

  Route.delete("delete", "LgaController.removeLga");
  })            
.prefix("Lga")
.middleware(["auth"]);
//Lga
Route.group(() => {
  Route.post("create", "NmmipIndicatorController.createNmmipIndicator");
              
  Route.route("fetch", "NmmipIndicatorController.fetchNmmipIndicators", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipIndicatorController.getNmmipIndicator", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipIndicatorController.updateNmmipIndicator");

  Route.delete("delete", "NmmipIndicatorController.removeNmmipIndicator");
  Route.route("count", "NmmipIndicatorController.fetchNmmipIndicatorCount", [
    "GET",
    "POST"
    ]); 
  })            
.prefix("NmmipIndicators")
.middleware(["auth"]);
//NmmipIndicators
Route.group(() => {
  Route.post("create", "NmmipIndicatorViewController.createNmmipIndicatorView");
              
  Route.route("fetch", "NmmipIndicatorViewController.fetchNmmipIndicatorViews", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipIndicatorViewController.getNmmipIndicatorView", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipIndicatorViewController.updateNmmipIndicatorView");

  Route.delete("delete", "NmmipIndicatorViewController.removeNmmipIndicatorView");
  })            
.prefix("NmmipIndicatorViews")
.middleware(["auth"]);
//NmmipIndicatorViews

Route.group(() => {
  Route.post("create", "NmmipTableController.createNmmipTable");
              
  Route.route("fetch", "NmmipTableController.fetchNmmipTables", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipTableController.getNmmipTable", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipTableController.updateNmmipTable");

  Route.delete("delete", "NmmipTableController.removeNmmipTable");
  })            
.prefix("NmmipTables")
.middleware(["auth"]);
//NmmipTables

Route.group(() => {
  Route.post("create", "NmmipLocationController.createNmmipLocation");
              
  Route.route("fetch", "NmmipLocationController.fetchNmmipLocations", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipLocationController.getNmmipLocation", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipLocationController.updateNmmipLocation");

  Route.delete("delete", "NmmipLocationController.removeNmmipLocation");
  Route.route("count", "NmmipLocationController.fetchNmmipLocationCount", [
    "GET",
    "POST"
    ]);
  })            
.prefix("NmmipLocations")
.middleware(["auth"]);
//NmmipLocations

Route.group(() => {
  Route.post("create", "NmmipValueController.createNmmipValue");
              
  Route.route("fetch", "NmmipValueController.fetchNmmipValues", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipValueController.getNmmipValue", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipValueController.updateNmmipValue");

  Route.delete("delete", "NmmipValueController.removeNmmipValue");
  })            
.prefix("NmmipValues")
.middleware(["auth"]);
//NmmipValues

Route.group(() => {
  Route.post("create", "NmmipMdAsInNigeriaController.createNmmipMDAsInNigeria");
              
  Route.route("fetch", "NmmipMdAsInNigeriaController.fetchNmmipMDAsInNigerias", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipMdAsInNigeriaController.getNmmipMDAsInNigeria", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipMdAsInNigeriaController.updateNmmipMDAsInNigeria");

  Route.delete("delete", "NmmipMdAsInNigeriaController.removeNmmipMDAsInNigeria");
  })            
.prefix("NmmipMDAsInNigeria")
.middleware(["auth"]);
//NmmipMDAsInNigeria

Route.group(() => {
  Route.post("create", "NmmipRowHeaderController.createNmmipRowHeader");
              
  Route.route("fetch", "NmmipRowHeaderController.fetchNmmipRowHeaders", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipRowHeaderController.getNmmipRowHeader", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipRowHeaderController.updateNmmipRowHeader");

  Route.delete("delete", "NmmipRowHeaderController.removeNmmipRowHeader");
  })            
.prefix("NmmipRowHeaders")
.middleware(["auth"]);
//NmmipRowHeaders

Route.group(() => {
  Route.post("create", "NmmipRowController.createNmmipRow");
              
  Route.route("fetch", "NmmipRowController.fetchNmmipRows", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipRowController.getNmmipRow", [
  "GET",
  "POST"
  ]);
  Route.post("update", "NmmipRowController.updateNmmipRow");

  Route.delete("delete", "NmmipRowController.removeNmmipRow");
  })            
.prefix("NmmipRows")
.middleware(["auth"]);
//NmmipRows

Route.group(() => {
  Route.post("create", "NmmipNredcSurveyFormController.createNmmipNredcSurveyForm");
              
  Route.route("fetch", "NmmipNredcSurveyFormController.fetchNmmipNredcSurveyForms", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipNredcSurveyFormController.getNmmipNredcSurveyForm", [
  "GET",
  "POST"
  ]);
 // Route.post("update", "NmmipNredcSurveyFormController.updateNmmipRow");

  Route.delete("delete", "NmmipNredcSurveyFormController.removeNmmipNredcSurveyForm");
  })            
.prefix("NmmipNredcSurveyForm")
.middleware(["auth"]);
//NmmipNredcSurveyForm

Route.group(() => {
  Route.post("create", "NmmipEnumeratorController.createNmmipEnumerator");

  Route.route("fetch", "NmmipEnumeratorController.fetchNmmipEnumerators", [
    "GET",
    "POST"
  ]);

  Route.route("get", "NmmipEnumeratorController.getNmmipEnumerator", [
    "GET",
    "POST"
  ]);
  Route.post("update", "NmmipEnumeratorController.updateNmmipEnumerator");
  Route.delete("delete", "NmmipEnumeratorController.removeNmmipEnumerator");
})
.prefix("NmmipEnumerators")
.middleware(["auth"]);      
//NmmipEnumerators

Route.group(() => {
  Route.post("create", "NmmipEkitiSurveyFormController.createNmmipEkitiSurveyForm");
              
  Route.route("fetch", "NmmipEkitiSurveyFormController.fetchNmmipEkitiSurveyForms", [
  "GET",
  "POST"
  ]);     
  Route.route("get", "NmmipEkitiSurveyFormController.getNmmipEkitiSurveyForm", [
  "GET",
  "POST"
  ]);
  Route.delete("delete", "NmmipEkitiSurveyFormController.removeNmmipEkitiSurveyForm");
  })            
.prefix("NmmipEkitiSurveyForm")
.middleware(["auth"]);
//NmmipEkitiSurveyForm


//ADMIN ROUTES
Route.group(() => {
 
  Route.route("count", "DashboardController.fetchUsersCount", ["GET", "POST"]);

}).prefix("Dashboard");