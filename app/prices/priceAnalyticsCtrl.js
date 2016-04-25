(function(){
    "use strict"; 

    //angular.module("productManagement")
    //  // Optional configuration
    //  .config(['ChartJsProvider', function (ChartJsProvider) {
    //    // Configure all charts
    //    ChartJsProvider.setOptions({
    //      colours: ['#FF5252', '#FF8A80'],
    //      responsive: false
    //    });
    //    // Configure all line charts
    //    ChartJsProvider.setOptions('Line', {
    //      datasetFill: false
    //    });
    //  }])
    //  .controller("PriceAnalyticsCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

    //  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    //  $scope.series = ['Series A', 'Series B'];
    //  $scope.data = [
    //    [65, 59, 80, 81, 56, 55, 40],
    //    [28, 48, 40, 19, 86, 27, 90]
    //  ];
    //  $scope.onClick = function (points, evt) {
    //    console.log(points, evt);
    //  };

    //  // Simulate async data update
    //  $timeout(function () {
    //    $scope.data = [
    //      [28, 48, 40, 19, 86, 27, 90],
    //      [65, 59, 80, 81, 56, 55, 40]
    //    ];
    //  }, 3000);
    //}]);

    angular.module("productManagement")
        .controller("PriceAnalyticsCtrl", ["$scope", "$filter", "products", "productService", PriceAnalyticsCtrl]);

    function PriceAnalyticsCtrl($scope, $filter, products, productService) {
        $scope.title = "Price Analytics";
        for (var i = 0; i < products.length; i++) {
            products[i].marginPercent = productService.calculateMarginPercent(products[i].price, products[i].cost);
            products[i].marginAmount = productService.calculateMarginAmount(products[i].price, products[i].cost);
        }
        var orderedProductsAmount = $filter("orderBy")(products, "marginAmount");
        var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

        var chartDataAmount = []; 
        for (var i = 0; i < filteredProductsAmount.length; i++) {
            chartDataAmount.push({
                x: filteredProductsAmount[i].productName,
                y: [filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount]
            });
        }

        $scope.dataAmount = {
            series: ["Cost", "Price", "Margin Amount"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            title: 'Top $ Margin Products',
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            legend: {
                display: true,
                //could be 'left, right'
                position: 'right'
            }
        }

        var orderedProductsPercent = $filter("orderBy")(products, "marginPercent");
        var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

        var chartDataPercent = [];
        for (var i = 0; i < filteredProductsPercent.length; i++) {
            chartDataPercent.push({
                x: filteredProductsPercent[i].productName,
                y: [filteredProductsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Margin %"],
            data: chartDataPercent
        }

        $scope.configPercent = {
            title: 'Top % Margin Products',
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                //could be 'left, right'
                position: 'right'
            }
        }
    }

}());