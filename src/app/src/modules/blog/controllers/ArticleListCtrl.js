(function(angular) {

    "use strict";

    angular.module("ap.modules.blog")
        .controller("ArticleListCtrl", function($scope, articles) {
            $scope.articles = articles;
        })
    ;

})(angular);
