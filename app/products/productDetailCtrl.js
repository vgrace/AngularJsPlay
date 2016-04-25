(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductDetailCtrl", ["product", "productService", ProductDetailCtrl]);
    //product comes from the resolve param declared in state
    function ProductDetailCtrl(product, productService) {
        var vm = this;

        vm.product = product;
        vm.title = "Product detail: " + vm.product.productName;

        vm.marginPercent = productService.calculateMarginPercent(vm.product.price, vm.product.cost);

        if (vm.product.tags) {
            vm.product.tagList = vm.product.tags.toString(); 
        }
    }
}());