﻿//Factory to handle user login and authorization
app.factory('LoginFactory', ['$http', '$q', '$location', '$firebase', '$firebaseArray',
    function ($http, $q, $location, $firebase, $firebaseArray) {
    var ref = new Firebase('https://headspring.firebaseio.com/');

    
    function login(user) {
            return ref.authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            })
        }
    

    function authDataCallback(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider)
        } else {
            console.log("User is logged out");
        }
    }

    ref.onAuth(authDataCallback);

    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    }
    return {
        login: login,
        authDataCallback: authDataCallback,
        authHandler: authHandler
    }
}])