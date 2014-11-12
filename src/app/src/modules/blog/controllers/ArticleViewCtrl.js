(function(angular) {

    "use strict";

    angular.module("ap.modules.blog")
        .controller("ArticleViewCtrl", function($scope, $sce, article) {
            $scope.article = article;
            $scope.article.content = $sce.trustAsHtml(article.content);
        })
    ;

})(angular);
