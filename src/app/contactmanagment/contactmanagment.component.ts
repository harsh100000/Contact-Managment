import { Component } from '@angular/core';

@Component({
  selector: 'app-contactmanagment',
  templateUrl: './contactmanagment.component.html',
  styleUrl: './contactmanagment.component.css'
})
export class ContactmanagmentComponent {
  contactId: number = 0;
  contactName: string = "";
  contactPhone: string = "";
  contactEmail: string = "";
  allContacts: Contact[] = [];
  isEditing: boolean = false;
  editingIndex: number | null = null;
  totalContacts: number = this.allContacts.length;
  constructor() {
    this.allContacts = this.getContacts();
  }

  createContact() {
    if (this.isEditing) {
      this.saveEdit();
    } 
    else {
      let contact: Contact = {
        contactId : this.getRandomTaskId(),
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        contactEmail: this.contactEmail,
      };
      this.allContacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(this.allContacts));
      this.clearForm();
    }
  }

  editContact(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    const contact = this.allContacts[index];
    this.contactName = contact.contactName;
    this.contactPhone = contact.contactPhone;
    this.contactEmail = contact.contactEmail;
  }

  saveEdit() {
    if (this.editingIndex !== null) {
      this.allContacts[this.editingIndex] = {
        contactId: this.allContacts[this.editingIndex].contactId,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        contactEmail: this.contactEmail
      };
      localStorage.setItem("contacts", JSON.stringify(this.allContacts));
      this.isEditing = false;
      this.editingIndex = null;
      this.clearForm();
    }
  }

  getContacts(): Contact[] {
    const jsonString = localStorage.getItem("contacts");
    if (jsonString) {
      this.allContacts = JSON.parse(jsonString);
    }
    return this.allContacts;
  }

  deleteContact(index: number) {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.allContacts = JSON.parse(storedContacts);
    }
    this.allContacts.splice(index, 1);
    let updatedContacts = JSON.stringify(this.allContacts);
    localStorage.setItem('contacts', updatedContacts);

    this.updateContactCount();
  }

  clearForm(): void {
    this.contactName = "";
    this.contactPhone = "";
    this.contactEmail = "";
  }

  updateContactCount(): void {
    this.totalContacts = this.allContacts.length;
  }

  getRandomTaskId(): string {
    const characterSet = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    return result;
  }

}

interface Contact {
  contactId:string,
  contactName: string,
  contactPhone: string,
  contactEmail: string,
}



/*  working code with local storage only update not working
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactmanagment',
  templateUrl: './contactmanagment.component.html',
  styleUrl: './contactmanagment.component.css'
})
export class ContactmanagmentComponent {
  contactId: number = 0;
  contactName: string = "";
  contactPhone: string = "";
  contactEmail: string = "";
  allContacts: Contact[] = [];
  totalContacts: number = this.allContacts.length;
  constructor() {
    this.allContacts = this.getContacts();
  }

  // Variables for editing a contact
  editName: string = "";
  editPhone: string = "";
  editEmail: string = "";
  editIndex: number | null = null;
  isEditFormVisible: boolean = false;

  createContact() {
    let contact: Contact = {
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      contactEmail: this.contactEmail,
    };
    this.allContacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(this.allContacts));
    // console.log(this.allContacts);
    this.clearForm();
  }

  getContacts(): Contact[] {
    const jsonString = localStorage.getItem("contacts");
    if (jsonString) {
      this.allContacts = JSON.parse(jsonString);
    }
    // console.log(jsonString);
    return this.allContacts;
  }

  deleteContact(index: number) {
    const storedContacts = localStorage.getItem('contacts');
    if(storedContacts)
    {
      this.allContacts = JSON.parse(storedContacts);
    }
    this.allContacts.splice(index,1);
    let updatedContacts = JSON.stringify(this.allContacts);
    localStorage.setItem('contacts', updatedContacts);

    this.updateContactCount();
  }

  editContact(index: number) {
    const contact = this.allContacts[index];
    this.editName = contact.contactName;
    this.editPhone = contact.contactPhone;
    this.editEmail = contact.contactEmail;
    this.editIndex = index;
    this.isEditFormVisible = true;
  }

  saveContact(): void {
    if (this.editIndex !== null) {
      this.allContacts[this.editIndex] = {
        contactName: this.editName,
        contactPhone: this.editPhone,
        contactEmail: this.editEmail,
      };
      this.clearEditForm();
    }
  }

  closeEditForm(): void {
    this.clearEditForm();
  }

  clearEditForm(): void {
    this.editName = "";
    this.editPhone = "";
    this.editEmail = "";
    this.editIndex = null;
    this.isEditFormVisible = false;
  }

  clearForm(): void {
    this.contactName = "";
    this.contactPhone = "";
    this.contactEmail = "";
  }

  updateContactCount(): void {
    this.totalContacts = this.allContacts.length;
  }

}

interface Contact {
  contactName: string,
  contactPhone: string,
  contactEmail: string,
}
*/