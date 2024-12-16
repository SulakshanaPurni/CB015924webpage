// Order Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
    const orderTableBody = document.querySelector("#order-table tbody");
    const paymentForm = document.getElementById("payment-form");

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function populateOrderSummary() {
        orderTableBody.innerHTML = "";

        cart.forEach(item => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;

            const priceCell = document.createElement("td");
            priceCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);

            orderTableBody.appendChild(row);
        });
    }

    function validateForm(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!name || !address || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all the required fields.");
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Card number must be exactly 16 digits.");
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("Expiration date must be in MM/YY format.");
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert("CVV must be exactly 3 digits.");
            return;
        }

        alert("Payment successful! Thank you for your purchase.");

        // Clear cart from localStorage and redirect to success page
        localStorage.removeItem("cart");
        window.location.href = "success.html";
    }

    populateOrderSummary();
    paymentForm.addEventListener("submit", validateForm);
});
