(function () {
    angular
        .module("productManagement")
        .controller("ProductEditCtrl", ["product", "$state", "productService", ProductEditCtrl]);

    function ProductEditCtrl(product, $state, productService) {
        var vm = this;
        vm.product = product;//Not using a copy, since we always get the latest data from the server see resolve in state declarations
        vm.priceOption = "percent";

        //This is a function so that the value is calulated every time the user enters data
        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost); 
        }

        /*Calculate price based on markup*/
        vm.calculatePrice = function () {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(vm.product.cost, vm.markupAmount); 
            }

            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercentage(vm.product.cost, vm.markupPercent);
            }

            vm.product.price = price; 
        }

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.dt = new Date();

        //$event represents the original event object
        vm.open = function ($event) {
            $event.preventDefault(); //prevent default action from being activated
            $event.stopPropagation();
            vm.opened = !vm.opened; 
        }

        //vm.submit = function (isValid)//alt. prevent form submittal
        vm.submit = function ()
        {
            //if (isValid) {
                vm.product.$save(function (data) {
                    toastr.success("Save successful");
                }); //$save is a $Resource function
                console.log('saved');
            //}
            //else {
            //    alert("Please correct the validation errors first");
            //}

        }

        vm.cancel = function(){
            $state.go('productList');
        }

        //TAGS
        vm.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            }
            else {
                alert("Please enter one or more tags separated by commas"); 
            }
        }
        vm.removeTag = function (idx) {
            vm.product.tags.splice(idx, 1); 
        }
    }
}());