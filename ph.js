document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalPriceElement = document.getElementById("total-price");
    const addToFavoritesButton = document.getElementById("add-to-favourites");
    const applyFavoritesButton = document.getElementById("apply-favourites");
    const buyNowButton = document.getElementById("buy-now");

    let cart = [];
    let favorites = [];

    
    function updateCart() {
        cartTableBody.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    
    document.querySelectorAll(".medicine .actions button:first-child").forEach((button) => {
        button.addEventListener("click", (e) => {
            const medicineDiv = e.target.closest(".medicine");
            const name = medicineDiv.querySelector("label").textContent.trim();
            const quantityInput = medicineDiv.querySelector("input[type='number']");
            const price = parseFloat(medicineDiv.querySelector(".price").textContent.replace("$", ""));

            const quantity = parseInt(quantityInput.value, 10);
            if (quantity > 0) {
                const existingItem = cart.find((item) => item.name === name);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ name, quantity, price });
                }
                updateCart();
            } else {
                alert("Please enter a valid quantity.");
            }
        });
    });

    
    document.querySelectorAll(".medicine .actions .heart-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const medicineDiv = e.target.closest(".medicine");
            const name = medicineDiv.querySelector("label").textContent.trim();
            if (!favorites.includes(name)) {
                favorites.push(name);
                alert(`${name} added to favorites!`);
            } else {
                alert(`${name} is already in favorites.`);
            }
        });
    });

    
    applyFavoritesButton.addEventListener("click", () => {
        favorites.forEach((fav) => {
            const medicineDiv = Array.from(document.querySelectorAll(".medicine"))
                .find((med) => med.querySelector("label").textContent.trim() === fav);

            if (medicineDiv) {
                const name = medicineDiv.querySelector("label").textContent.trim();
                const price = parseFloat(medicineDiv.querySelector(".price").textContent.replace("$", ""));
                const existingItem = cart.find((item) => item.name === name);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ name, quantity: 1, price });
                }
            }
        });
        updateCart();
    });

    
    buyNowButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for your purchase!");
            cart = [];
            updateCart();
        }
    });

    
    addToFavoritesButton.addEventListener("click", () => {
        if (favorites.length === 0) {
            alert("No favorites to save!");
        } else {
            alert("Favorites saved!");
        }
    });
});

document.getElementById("buy-now").addEventListener("click", () => {
    localStorage.setItem("currentOrder", JSON.stringify(cart));
    window.location.href = "checkout.html";
});
