/* global angular */

import 'ionic-sdk/release/js/ionic.bundle';
import centaurus from '../../core/services/centaurus.js';
import translate from '../../core/services/translate.service.js';

import importCentaurusTemplate from './import-centaurus.html';

class ImportCentaurusController {

	constructor($location, $routeParams, Keychain, Wallet) {

		this.$location = $location;
		this.Keychain = Keychain;
		this.Wallet = Wallet;

		const data = JSON.parse(window.atob($routeParams.data));
		this.cipher = data.cipher;

		this.account = {};
		this.minHeight = getMinHeight();

		function getMinHeight() {
			const headerHeight = 40;
			const buttonGroupHeight = 48 + 16 + 8;
			return `${window.innerHeight - (buttonGroupHeight + headerHeight)}px`;
		}
	}

	$onInit() {
		const numAccounts = Object.keys(this.Wallet.accounts).length;
		this.account.alias = translate.instant('account.defaultname', {number: numAccounts + 1});
	}

	importAccount() {
		const {secret, address} = centaurus.decrypt(this.cipher, this.account.password);
		this.Wallet.importAccount(address, secret, this.account.alias);
		this.$location.path('/');
	}
}

angular.module('app.component.import-centaurus', [])
.component('importCentaurus', {
	controller: ImportCentaurusController,
	controllerAs: 'vm',
	template: importCentaurusTemplate
});
