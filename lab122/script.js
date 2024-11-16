document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form')
    const contactsContainer = document.getElementById('contacts-container')

    let contacts = JSON.parse(localStorage.getItem('contacts')) || []

    function saveContacts() {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }

    function displayContacts() {
      contactsContainer.innerHTML = ''
      for (let i = 0; i < contacts.length; i++) {
        const contactCard = document.createElement('div')
        contactCard.classList.add('contact-card')
        contactCard.innerHTML = `
          <p><strong>Nombre:</strong> ${contacts[i].name}</p>
          <p><strong>Teléfono:</strong> ${contacts[i].phone}</p>
          <p><strong>Email:</strong> ${contacts[i].email}</p>
          <p><strong>Dirección:</strong> ${contacts[i].address}</p>
          <button onclick="editContact(${i})">Editar</button>
          <button onclick="deleteContact(${i})">Eliminar</button>
        `
        contactsContainer.appendChild(contactCard)
      }
    }

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault()

      const name = document.getElementById('name').value
      const phone = document.getElementById('phone').value
      const email = document.getElementById('email').value
      const address = document.getElementById('address').value

      if (name === '' || phone === '') {
        alert('Por favor, llena al menos el nombre y el teléfono')
        return
      }

      const newContact = {
        name: name,
        phone: phone,
        email: email,
        address: address
      }

      const editingIndex = contactForm.getAttribute('data-editing-index')
      
      if (editingIndex !== null) {
        contacts[editingIndex] = newContact
        contactForm.removeAttribute('data-editing-index')
      } else {
        contacts.push(newContact)
      }

      saveContacts()
      displayContacts()
      contactForm.reset()
    })

    window.editContact = function(index) {
      const contact = contacts[index]
      document.getElementById('name').value = contact.name
      document.getElementById('phone').value = contact.phone
      document.getElementById('email').value = contact.email
      document.getElementById('address').value = contact.address
      contactForm.setAttribute('data-editing-index', index)
    }

    window.deleteContact = function(index) {
        const newContacts = []
        for (let i = 0; i < contacts.length; i++) {
            if (i !== index) {
                newContacts.push(contacts[i])
            }
        }
        contacts = newContacts
        saveContacts()
        displayContacts()
    }
    
})