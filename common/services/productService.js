//CUSTOM SERVICE
(function () {
    "use strict"; 
    angular.module("common.services")
        .factory("productService", productService); 
        
        function productService(){
            function calculateMarginPercent(price, cost) {
                var margin = 0;
                if (price && cost) {
                    margin = (100 * (price-cost))/price; 
                }
                margin = Math.round(margin);
                return margin; 
            }

            function calculateMarginAmount(price, cost) {
                var margin = 0;
                if (price && cost) {
                    margin = price - cost; 
                }
                return margin; 
            }

            function calculatePriceFromPercentage(cost, percent) {
                var price = 0;
                if (cost && percent) {
                    price = cost + (cost * percent / 100);
                    price = (Math.round(price * 100) / 100); 
                }
                return price; 
            }

            function calculatePriceFromAmount(cost, amount) {
                var price = 0; 
                if (cost && amount) {
                    price = cost + amount;
                    price = (Math.round(price * 100)) / 100; 
                }
                return price; 
            }

            //Public API
            return {
                calculateMarginPercent: calculateMarginPercent,
                calculateMarginAmount: calculateMarginAmount,
                calculatePriceFromMarkupPercentage: calculatePriceFromPercentage,
                calculatePriceFromMarkupAmount: calculatePriceFromAmount
            }
        }
}()); 