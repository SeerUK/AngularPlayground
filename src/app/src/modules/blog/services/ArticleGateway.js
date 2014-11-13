(function(angular) {

    "use strict";

    angular.module("ap.modules.blog")
        .factory("ArticleGateway", function($http, $q, Cache, HttpException, NotFoundException) {

            /**
             * Make a request to the 'API'
             *
             * @return {Object}
             */
            var doRequest = function() {
                Cache.set("foo", "bar");
                Cache.get("foo").then(function(value) {
                    console.log(value);
                });

                Cache.delete("foo");

                // console.log("Deleting... ", "foo");
                // Cache.delete("foo");

                Cache.get("foo").then(function(value) {
                    console.log(value);
                }, function() {
                    console.log("Missing");
                });

                return Cache.proxy("blog.articles", function() {
                    return $http({ method: "GET", url: "api/articles.json" })
                        .then(
                            function(result) {
                                return result.data.articles;
                            },
                            function(reason) {
                                throw new HttpException(null, reason.statusText, reason.status);
                            }
                        )
                    ;
                });
            };

            return {
                /**
                 * Fetch all articles
                 *
                 * @return {Object}
                 */
                fetch: function() {
                    return doRequest()
                        .catch(function(error) {
                            if (error instanceof HttpException && error.status === 404) {
                                throw new NotFoundException(error, "articles");
                            }

                            throw error;
                        })
                    ;
                },

                /**
                 * Fetch a single article by it's slug
                 *
                 * @return {Object}
                 */
                fetchOneBySlug: function(slug) {
                    return doRequest()
                        .then(function(result) {
                            if (result[slug]) {
                                return result[slug];
                            } else {
                                throw new NotFoundException(null, "article", { slug: slug });
                            }
                        })
                        .catch(function(error) {
                            if (error instanceof HttpException && error.status === 404) {
                                throw new NotFoundException(error, "articles");
                            }

                            throw error;
                        })
                    ;
                }
            };
        })
    ;

})(angular);
