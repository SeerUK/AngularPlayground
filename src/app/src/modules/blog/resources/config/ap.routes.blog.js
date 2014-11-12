(function(angular) {

    "use strict";

    angular.module("ap.modules.blog")
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("blog", {
                    abstract: true,
                    controller: "AbstractBlogCtrl",
                    templateUrl: "app/src/modules/core/resources/views/master.html"
                })

                .state("blog.article-list", {
                    controller: "ArticleListCtrl",
                    templateUrl: "app/src/modules/blog/resources/views/article-list.html",
                    url: "/",
                    resolve: {
                        articles: function(ArticleGateway) {
                            return ArticleGateway.fetch();
                        }
                    }
                })

                .state("blog.article-view", {
                    controller: "ArticleViewCtrl",
                    templateUrl: "app/src/modules/blog/resources/views/article-view.html",
                    url: "/{slug}/",
                    resolve: {
                        article: function($stateParams, ArticleGateway) {
                            return ArticleGateway.fetchOneBySlug($stateParams.slug);
                        }
                    }
                })
            ;
        })
    ;

})(angular);
