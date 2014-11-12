(function(angular) {

    "use strict";

    angular.module("ap.modules.core")
        .factory("FlashMessenger", function() {

            var messages = {};
            var FlashMessenger = {};

            /**
             * Get a flash message
             *
             * @param {String} key
             *
             * @return {Mixed}
             */
            FlashMessenger.get = function(key) {
                return messages[key];
            };

            /**
             * Set a flash message
             *
             * @param {String} key
             * @param {Mixed} value
             *
             * @return {Object}
             */
            FlashMessenger.set = function(key, value) {
                messages[key] = value;

                return FlashMessenger;
            };

            return FlashMessenger;
        })
    ;

})(angular);
