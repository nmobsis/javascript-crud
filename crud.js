// Retrieve items from local storage or initialize an empty array
let records = JSON.parse(localStorage.getItem('records')) || [];

// Function to render the table
function renderTable() {
    const tableBody = document.getElementById('recordTable');
    tableBody.innerHTML = '';

    records.forEach((record, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>${record.phone}</td>
            <td>
                <button onclick="showEditForm(${index})">Edit</button>
                <button onclick="deleteRecord(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to add a new record
function addRecord(name, email, phone) {
    const newRecord = {
        id: Date.now(), // Unique ID based on timestamp
        name,
        email,
        phone
    };

    records.push(newRecord);
    localStorage.setItem('records', JSON.stringify(records));
    renderTable();
}

// Function to show the edit form
function showEditForm(index) {
    const record = records[index];
    document.getElementById('editId').value = record.id;
    document.getElementById('editName').value = record.name;
    document.getElementById('editEmail').value = record.email;
    document.getElementById('editPhone').value = record.phone;

    document.getElementById('editHeading').classList.remove('hidden');
    document.getElementById('editForm').classList.remove('hidden');
}

// Function to update a record
function updateRecord(id, name, email, phone) {
    const index = records.findIndex(record => record.id === id);
    if (index !== -1) {
        records[index] = { id, name, email, phone };
        localStorage.setItem('records', JSON.stringify(records));
        renderTable();
    }
}

// Function to delete a record
function deleteRecord(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        records.splice(index, 1);
        localStorage.setItem('records', JSON.stringify(records));
        renderTable();
    }
}

// Form submission handler for adding records
document.getElementById('itemForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    addRecord(name, email, phone);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
});

// Form submission handler for updating records
document.getElementById('editForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;

    updateRecord(id, name, email, phone);

    document.getElementById('editForm').classList.add('hidden');
    document.getElementById('editHeading').classList.add('hidden');
});

// Cancel button handler for edit form
document.getElementById('cancelEdit').addEventListener('click', () => {
    document.getElementById('editForm').classList.add('hidden');
    document.getElementById('editHeading').classList.add('hidden');
});

// Initial render
renderTable();
