(function () {
    "use strict";
    var app = angular
        .module("productResourceMock", ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var products = [
        {
            productId: 1,
            productName: "Leaf Rake",
            productCode: "GDN-0011",
            releaseDate: new Date(2009, 2, 19), //"March 19, 2009",
            description: "Leaf rake with 48-inch wooden handle.",
            cost: 9,
            price: 19.95,
            category: "garden",
            tags: [
            "leaf",
            "tool"
            ],
            imageUrl: "https://cdn2.iconfinder.com/data/icons/brush-set-free/512/leaf_cleaning_stick-128.png"
        },
        {
            productId: 2,
            productName: "Garden Cart",
            productCode: "GDN-0023",
            releaseDate: new Date(2010, 2, 18), //"March 18, 2010",
            description: "15 gallon capacity rolling garden cart",
            cost: 20,
            price: 32.99,
            category: "garden",
            tags: [
            "barrow",
            "cart",
            "wheelbarrow"
            ],
            imageUrl: "https://cdn1.iconfinder.com/data/icons/material-core/20/shopping-cart-128.png"
        },
        {
            productId: 5,
            productName: "Hammer",
            productCode: "TBX-0048",
            releaseDate: new Date(2013, 4, 21), //"May 21, 2013",
            description: "Curved claw steel hammer",
            cost: 1,
            price: 8.99,
            category: "toolbox",
            tags: [
            "tool"
            ],
            imageUrl: "https://cdn1.iconfinder.com/data/icons/iconnice-vector-icon/31/Vector-icons_86-128.png"
        },
        {
            productId: 8,
            productName: "Saw",
            productCode: "TBX-0022",
            releaseDate: new Date(2009, 4, 15), //"May 15, 2009",
            description: "15-inch steel blade hand saw",
            cost: 6.95,
            price: 11.55,
            category: "garden",
            tags: [
            "garden",
            "mower"
            ],
            imageUrl: "https://cdn0.iconfinder.com/data/icons/tools-hardware-1/64/tools-saw-hand-128.png"
        },
        {
            productId: 10,
            productName: "Video Game Controller",
            productCode: "GMG-0042",
            releaseDate: new Date(2002, 9, 15), //"October 15, 2002",
            description: "Standard two-button video game controller",
            cost: 2.22,
            price: 35.95,
            category: "gaming",
            tags: [
            "gaming",
            "controller",
            "video game"
            ],
            imageUrl: "https://cdn0.iconfinder.com/data/icons/free-misc-icon-set-2/512/game-128.png"
        }];

        //Get all products
        var productUrl = "/api/products";
        $httpBackend.whenGET(productUrl).respond(products);
        //Get one product
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) { 
            var product = { "productId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];
            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break; 
                    }
                }
            }
            return [200, product, {}]; 
        });
        //Save or update new product
        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);
            if (!product.productId) {
                //new product id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                //updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}];
        });

        //pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough(); 
    });
    
}());