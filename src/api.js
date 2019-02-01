//Simulates getting contacts from an API
const ContactAPI = {
    contacts: [
        {
            contactId: 0,
            firstname: "Ben",
            lastname: "Solo",
            phone: "801-373-9120"
        },
        {
            contactId: 1,
            firstname: "John",
            lastname: "Smith",
            phone: "385-440-0115"
        },
        {
            contactId: 2,
            firstname: "Sally",
            lastname: "Jones",
            phone: "877-548-3003"
        }

    ],
    all: function() { return this.contacts},
    get: function(id) {
      const isContact = p => p.contactId === id
      return this.contacts.find(isContact)
    }
  }
  
  export default ContactAPI;
  