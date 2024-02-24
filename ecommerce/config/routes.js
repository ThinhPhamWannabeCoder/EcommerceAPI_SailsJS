/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    // AUTH
    "POST /api/v1/auth/register": { 
        action: "v1/auth/register",
        csrf: false,
    },
    "POST /api/v1/auth/login": {
        action: "v1/auth/login",
        csrf: false
    },
    "GET /api/v1/auth/logout": "v1/auth/logout",
    "POST /api/v1/auth/forgot-password": "v1/auth/forgot-password",
    // Verification
    "GET /api/v1/auth/verify": "v1/auth/verify",
    "POST /api/v1/auth/reset-password": "v1/auth/reset-password",
    

    // USERS
    
    "GET /api/v1/users": "v1/users/get-info",

    // 'GET /csrfToken': 'security/grant-csrf-token' 

    // PRRODUCTS
    "GET /api/v1/products": {
        action: "v1/products/get-all"
    },
    // Store
    "POST /api/v1/products/create": "v1/products/create",
    "DELETE /api/v1/products/:productsId" : "v1/products/delete",
    "PUT /api/v1/products/:productsId/update":"v1/products/update",
    "GET /api/v1/test/error": "v1/test/err"
};
