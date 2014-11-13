(function(angular) {

    "use strict";

    angular.module("ap.modules.core")
        .factory("Cache", function($q) {

            var Cache = {};
            var pendingActions = {};
            var prefix = "Cache_";

            /**
             * Generate a cache key
             *
             * @param {String} key
             *
             * @return {String}
             */
            var generateKey = function(key) {
                return prefix + key;
            };

            /**
             * Get an item from the cache
             *
             * @param {String} key
             *
             * @return {Mixed}
             */
            Cache.get = function(key) {
                var deferred = $q.defer();

                pendingActions[key] = pendingActions[key] || $q.when();
                pendingActions[key].finally(function() {
                    var item = JSON.parse(localStorage.getItem(generateKey(key)));

                    if (item !== null && typeof item === "object") {
                        var now = new Date() / 1000 | 0;

                        if (
                            item.value &&
                            item.expires % 1 === 0 &&
                            (item.expires === 0 || item.expires > now)
                        ) {
                            deferred.resolve(item.value);
                        } else {
                            deferred.reject();
                        }
                    } else {
                        deferred.reject();
                    }
                });

                pendingActions[key] = deferred.promise;

                return deferred.promise;
            };

            /**
             * Set an item in the cache
             *
             * @param {String}  key
             * @param {Mixed}   value
             * @param {Integer} ttl
             *
             * @return {Mixed}
             */
            Cache.set = function(key, value, ttl) {
                if (typeof value === "function") {
                    return Cache.set(key, value(), ttl);
                }

                var deferred = $q.defer();

                pendingActions[key] = pendingActions[key] || $q.when();
                pendingActions[key].finally(function() {
                    // Transform value into promise
                    value = $q.when(value);
                    value.then(
                        function(value) {
                            var expires = (ttl !== undefined)
                                ? (new Date() / 1000 | 0) + ttl
                                : 0;

                            try {
                                localStorage.setItem(generateKey(key), JSON.stringify({
                                    value: value,
                                    expires: expires
                                }));

                                deferred.resolve(value);
                            } catch(e) {
                                if (
                                    e.name === 'QuotaExceededError' ||
                                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
                                ) {
                                    console.warn("[Cache]", "localStorage storage limit reached.");
                                    deferred.reject(e);
                                } else {
                                    throw e;
                                }
                            }
                        },
                        function() {
                            deferred.reject();
                        }
                    )
                });

                pendingActions[key] = deferred.promise;

                return deferred.promise;
            };

            /**
             * Wrap get/set so that functionality can be easily cached
             *
             * @param  {String}   key
             * @param  {Function} callback
             * @param  {Integer}  ttl
             *
             * @return {Mixed}
             */
            Cache.proxy = function(key, value, ttl) {
                var deferred = $q.defer();

                Cache.get(key).then(function(value) {
                    deferred.resolve(value);
                }, function() {
                    // Force new queue to be created
                    delete pendingActions[key]

                    Cache.set(key, value, ttl).then(function(value) {
                        deferred.resolve(value);
                    }, function() {
                        deferred.reject();
                    });
                });

                return deferred.promise;
            };

            /**
             * Remove an item from the cache
             *
             * @param {String} key
             */
            Cache.delete = function(key) {
                var deferred = $q.defer();

                pendingActions[key] = pendingActions[key] || $q.when();
                pendingActions[key].finally(function() {
                    localStorage.removeItem(generateKey(key));

                    deferred.resolve();
                });

                pendingActions[key] = deferred.promise;

                return deferred.promise;
            };

            /**
             * Flush the entire cache
             */
            Cache.empty = function() {
                Object.keys(localStorage).forEach(function(key) {
                    if (key.substr(0, prefix.length) === prefix) {
                        Cache.delete(key.substr(prefix.length));
                    }
                })
            };

            return Cache;
        })
    ;

})(angular);
