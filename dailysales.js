// This JS file is to fetch the daily sales from daily_sales table

let choosedDate = null; 

function handleDateClick(date) {
    console.log("Date clicked: " + date);
    choosedDate = date;
    updateTodayDate();
    fetchSalesData(date);
}

function fetchSalesData(date) {
    fetch('fetch_sales.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: date })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateSalesTable(data.sales);
        } else {
            const errorMessage = data.message || 'No sales found for the selected date';
            displayError(errorMessage);
        }
    })
    .catch(error => console.error('Error fetching sales data:', error));
}

function displayError(message) {
    const errorModal = document.getElementById('checkoutPopup');
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = message;
    errorModal.style.display = 'block';

    const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', function() {
        location.reload(); // Refresh the page
    });

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', function() {
        errorModal.style.display = 'none'; 
    });
}
//Created By RAMIYA

function updateSalesTable(sales) {
    const tbody = document.querySelector('.dailysales-table tbody');
    tbody.innerHTML = ''; // Clear the table

    let total = 0;  

    sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.product_code}</td>
            <td>${sale.product_name}</td>
            <td>${sale.product_qty}</td>
            <td>Rs.${parseFloat(sale.price).toFixed(2)}</td>
        `;
        tbody.appendChild(row);

        // Add sale price to total
        total += parseFloat(sale.price);
    });

    // Display total
    const totalElement = document.querySelector('.dailytotal');
    totalElement.textContent = `Total: Rs.${total.toFixed(2)}`;
}

window.onload = function() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentdate = currentDate.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    let tableHTML = "<table class='calendar'>";
    let dateCounter = 1;
    //Created By RAMIYA

    for (let row = 0; row < 4; row++) {
        tableHTML += "<tr>";
        for (let col = 0; col < 8; col++) {
            if (dateCounter <= daysInMonth) {
                tableHTML += `<td onclick="handleDateClick('${currentYear}-${currentMonth + 1}-${dateCounter}')">${dateCounter}</td>`;
                dateCounter++;
            } else {
                tableHTML += "<td></td>";
            }
        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    document.querySelector(".dateselection").innerHTML = tableHTML;
    document.querySelector(".currentmonthpre").innerHTML = monthNames[currentMonth] + " " + currentYear;
    updateTodayDate();
}

function updateTodayDate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    if (choosedDate) {
        document.querySelector(".todaydate").innerHTML = choosedDate;
    } else {
        document.querySelector(".todaydate").innerHTML = "Select a date";
    }
}


function refreshme(){
        location.reload(); // Refresh the page
}