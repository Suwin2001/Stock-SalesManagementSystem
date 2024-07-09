document.addEventListener("DOMContentLoaded", function() {
    fetch("fetch_products.php")
        .then(response => response.json())
        .then(data => {
            let tableContent = "";

            data.forEach(product => {
                tableContent += `<tr>
                    <td>PPGH${product.id}</td>
                    <td>${product.product_code}</td>
                    <td>${product.product_name}</td>
                    <td>${product.product_qty}</td>
                    <td>Rs.${product.price}</td>
                    <td>${product.product_location}</td>
                    <td class="textcenter" style="text-align: center;"><button class="btn_addcart" onclick="addToCart('${product.id}', '${product.product_code}', '${product.product_name}', ${product.price})">Add to Cart</button></td>
                </tr>`;
            });

            document.querySelector(".product-table tbody").innerHTML = tableContent;
        })
        .catch(error => console.error('Error fetching the products:', error));
});


function searchProduct() {
    const searchValue = document.getElementById("search-input").value.toLowerCase();
    const tableRows = document.querySelectorAll(".product-table tbody tr");

    tableRows.forEach(row => {
        const productName = row.cells[2].textContent.toLowerCase();
        if (productName.includes(searchValue)) {
            row.style.display = ""; // Show row
        } else {
            row.style.display = "none"; // Hide row
        }
    });
}

function resetSearch() {
    document.getElementById("search-input").value = "";
    const tableRows = document.querySelectorAll(".product-table tbody tr");

    tableRows.forEach(row => {
        row.style.display = ""; // Show all rows
    });
}

function openForm() {
    document.getElementById("popupForm").style.display = "flex";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("removeProductForm").style.display = "none";
    document.getElementById("updateProductForm").style.display = "none";
}

function openRemoveForm() {
    document.getElementById("removeProductForm").style.display = "flex";
}

function openUpdateForm() {
    document.getElementById("updateProductForm").style.display = "flex";
}

function openCart() {
    document.getElementById("cartPanel").style.right = "0";
}

function closeCart() {
    document.getElementById("cartPanel").style.right = "-450px";
}

// Example function to add a row to the table
function addRowToTable(product) {
    const row = `<tr>
        <td>${product.id}</td>
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.qty}</td>
        <td>$${product.price}</td>
        <td>${product.location}</td>
        <td class="textcenter" style="text-align: center;"><button class="btn_addcart" onclick="addToCart('${product.id}', '${product.code}', '${product.name}', ${product.price})">Add to Cart</button></td>
    </tr>`;
    document.querySelector(".product-table tbody").innerHTML += row;
}
