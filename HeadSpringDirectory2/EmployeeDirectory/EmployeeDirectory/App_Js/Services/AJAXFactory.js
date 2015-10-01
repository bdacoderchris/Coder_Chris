app.factory('AJAXFactory', ['$http', '$q', function ($http, $q) {

    var get = function (url) {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {
            def.resolve(data);
        }).error(function (data) {
            def.reject(data);
        })
        return def.promise;
    }

    var post = function (url, data) {
        var def = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: data
        }).success(function (data) {
            def.resolve(data);
        }).error(function (data) {
            def.reject(data);
        });
        return def.promise;
    }

    var del = function (url, data) {
        var def = $q.defer();
        $http({
            method: 'DELETE',
            url: url,
            data: data
        }).success(function (data) {
            def.resolve(data);
        }).error(function (data) {
            def.reject(data);
        })
        return def.promise;
    }

    return {
        get: get,
        post: post,
        del: del
    }
}])