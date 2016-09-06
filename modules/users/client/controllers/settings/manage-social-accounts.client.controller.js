(function () {
    'use strict';

    angular
        .module('users')
        .controller('SocialAccountsController', SocialAccountsController);

    SocialAccountsController.$inject = ['$scope', '$http', 'Authentication'];

    function SocialAccountsController($scope, $http, Authentication) {
        var vm = this;

        vm.user = Authentication.getUser();
        vm.hasConnectedAdditionalSocialAccounts = hasConnectedAdditionalSocialAccounts;
        vm.isConnectedSocialAccount = isConnectedSocialAccount;
        vm.removeUserSocialAccount = removeUserSocialAccount;

        // Check if there are additional accounts
        function hasConnectedAdditionalSocialAccounts() {
            return (vm.user.additionalProvidersData && Object.keys(vm.user.additionalProvidersData).length);
        }

        // Check if provider is already in use with current user
        function isConnectedSocialAccount(provider) {
            return vm.user.provider === provider || (vm.user.additionalProvidersData && vm.user.additionalProvidersData[provider]);
        }

        // Remove a user social account
        function removeUserSocialAccount(provider) {
            vm.success = vm.error = null;

            $http.delete('/api/users/accounts', {
                params: {
                    provider: provider
                }
            }).success(function (response) {
                // If successful show success message and clear form
                vm.success = true;
                Authentication.setUser(response);
                vm.user = Authentication.getUser();
            }).error(function (response) {
                vm.error = response.message;
            });
        }
    }
}());
