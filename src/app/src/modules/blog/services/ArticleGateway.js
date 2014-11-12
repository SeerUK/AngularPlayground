(function(angular) {

    "use strict";

    angular.module("ap.modules.blog")
        .factory("ArticleGateway", function($http, $q) {

            /**
             * Make a request to the 'API'
             *
             * @return {Object}
             */
            var doRequest = function() {
                return $http({ method: "GET", url: "api/articles.json" })
                    .success(function(result) {
                        return result.data.articles;
                    })
                    .error(function(result, status) {
                        throw new Error("Request failed, status: " + status);
                    })
                ;
            };

            return {
                /**
                 * Fetch all articles
                 *
                 * @return {Object}
                 */
                fetch: function() {
                    return doRequest();
                },

                /**
                 * Fetch a single article by it's slug
                 *
                 * @return {Object}
                 */
                fetchOneBySlug: function(slug) {
                    return doRequest().then(function(result) {
                        if (result[slug]) {
                            return result[slug];
                        } else {
                            throw new Error("No article found with slug: \"" + slug + "\"");
                        }
                    });
                }
            };
        })
    ;

})(angular);
