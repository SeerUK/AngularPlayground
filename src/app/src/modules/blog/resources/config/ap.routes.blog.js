(function(angular) {

    "use strict";

    angular.module("ap.modules.blog")
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("blog", {
                    abstract: true,
                    controller: "AbstractBlogCtrl",
                    templateUrl: "app/src/modules/blog/resources/views/master.html",
                    url: "/"
                })

                .state("blog.article-list", {
                    controller: "ArticleListCtrl",
                    templateUrl: "app/src/modules/blog/resources/views/article-list.html",
                    resolve: {
                        articles: function($http) {
                            return $http({ method: "GET", url: "api/articles.json" })
                                .then(function(result) {
                                    return result.data.articles;
                                })
                            ;
                        }
                    }
                })

                .state("blog.article-view", {
                    controller: "ArticleViewCtrl",
                    templateUrl: "app/src/modules/blog/resources/views/article-view.html",
                    url: "{slug}/",
                    resolve: {
                        article: function($http, $stateParams) {
                            return $http({ method: "GET", url: "api/articles.json" })
                                .then(function(result) {
                                    return result.data.articles[$stateParams.slug];
                                })
                            ;
                        }
                    }
                })
            ;
        })
    ;

})(angular);
