/* global angular */

import 'ionic-sdk/release/js/ionic.bundle';
import contacts from '../../core/services/contacts.js';

import addContactModal from '../modals/add-contact.html';
import contactListTemplate from './contact-list.html';

class ContactListController {
	constructor(Modal) {
		this.Modal = Modal;

		this.names		= contacts.getNames();
		this.minHeight	= this.getMinHeight();
	}

	addContact() {
		this.Modal.show(addContactModal);
	}

	getMinHeight() {
		const headerHeight = 40;
		const buttonGroupHeight = 48 + 16 + 8;
		return `${window.innerHeight - (buttonGroupHeight + headerHeight)}px`;
	}
}

angular.module('app.component.contact-list', [])
.component('contactList', {
	controller: ContactListController,
	controllerAs: 'vm',
	template: contactListTemplate
});
