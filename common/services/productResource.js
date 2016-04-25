(function () {
    "use strict";
    angular
    .module("common.services")
    .factory("productResource", ["$resource", productResource]); //min-safe array contains parameters

    function productResource($resource) {
        return $resource("/api/products/:productId"); 
    }
}());