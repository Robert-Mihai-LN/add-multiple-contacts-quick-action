import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import GENDER_IDENTITY_FIELD from '@salesforce/schema/Contact.GenderIdentity';
import {} from 'lightning/platformShowToastEvent';
export default class AddMultipleContacts extends LightningElement {
    @track
    contacts = [];
    genderOptions = [];

    // Get the object data
    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    contactObjectInfo;

    // Get the values from the picklist field
    @wire(getPicklistValues, { 
        recordTypeId: '$contactObjectInfo.data.defaultRecordTypeId', 
        fieldApiName: GENDER_IDENTITY_FIELD 
    })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.genderOptions = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        } else if (error) {
            console.error('Error fetching picklist values:', error);
        }
 
 
    }
    connectedCallback() {
        this.addNewClickHandler();
    }
    addNewClickHandler(e){
        this.contacts.push({
            tempId:Date.now(),

        })
    }

    deleteClickHandler(e){
        let tempId = e.target.dataset.tempId;
        this.contacts = this.contacts.filter(c=> c.tempId !== tempId);
    }
    showToastMessage(message,title='Error',variant='error'){
        const event = new ShowToastEvent({title,message,variant});
        this.dispatchEvent(event);

    }
}
