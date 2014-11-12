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
                return $http({ method: "GET", url: "api/articles.json" });
            };

            return {
                /**
                 * Fetch all articles
                 *
                 * @return {Object}
                 */
                fetch: function() {
                    var deferred = $q.defer();
                    var response = doRequest();

                    response.then(function(result) {
                        deferred.resolve(result.data.articles);
                    });

                    return deferred.promise;
                },

                /**
                 * Fetch a single article by it's slug
                 *
                 * @return {Object}
                 */
                fetchOneBySlug: function(slug) {
                    var deferred = $q.defer();
                    var response = doRequest();

                    response.then(function(result) {
                        deferred.resolve(result.data.articles[slug]);
                    });

                    return deferred.promise;
                }
            };
        })
    ;

})(angular);
