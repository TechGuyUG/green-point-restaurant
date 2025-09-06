 // Menu Header Slider
        let menuSlideIndex = 0;
        const menuSlides = document.querySelectorAll('.menu-slide');
        
        function showNextMenuSlide() {
            menuSlides[menuSlideIndex].classList.remove('active');
            menuSlideIndex = (menuSlideIndex + 1) % menuSlides.length;
            menuSlides[menuSlideIndex].classList.add('active');
        }
        
        setInterval(showNextMenuSlide, 5000);

// Cart Functionality
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const closeCart = document.querySelector('.close-cart');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        const clearCartBtn = document.querySelector('.clear-cart');
        const checkoutBtn = document.querySelector('.checkout-btn');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        let cart = [];

// Toggle Cart
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.toggle('active');
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });

// Add to Cart
    addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
                
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
                
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
        name,
        price,
        quantity: 1
        });
    }
                
    updateCart();
        cartSidebar.classList.add('active');
    });
});

const overlay = document.createElement('div');
overlay.classList.add('cart-overlay');
document.body.appendChild(overlay);

cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Update Cart Display
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            let itemCount = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                itemCount += item.quantity;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">UGX ${itemTotal.toLocaleString()}</div>
                    <div>
                        <button class="cart-item-remove" data-index="${index}">&times;</button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            cartTotal.textContent = `UGX ${total.toLocaleString()}`;
            cartCount.textContent = itemCount;
            
// Add event listeners to remove buttons
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }

        // Clear Cart
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            updateCart();
        });

        // Checkout
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // In a real implementation, you would send the order to your backend
            let orderSummary = 'Order Summary:\n\n';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                orderSummary += `${item.name} x ${item.quantity} - UGX ${itemTotal.toLocaleString()}\n`;
                total += itemTotal;
            });
            
            orderSummary += `\nTotal: UGX ${total.toLocaleString()}`;
            
            checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let customerName = document.getElementById('customerName').value.trim();
    let customerAddress = document.getElementById('customerAddress').value.trim();

    if (!customerName || !customerAddress) {
        alert("Please enter your Name and Delivery Address before ordering.");
        return;
    }

    let orderSummary = `New Order from ${customerName}\n\nDelivery Address: ${customerAddress}\n\nItems:\n`;
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        orderSummary += `${item.name} x ${item.quantity} - UGX ${itemTotal.toLocaleString()}\n`;
        total += itemTotal;
    });

    orderSummary += `\nTotal: UGX ${total.toLocaleString()}`;

    // Send to WhatsApp
    let phone = "256787150374"; // your WhatsApp number
    let whatsappMessage = encodeURIComponent(orderSummary);
    let url = "https://wa.me/" + phone + "?text=" + whatsappMessage;
    window.open(url, "_blank");

    // Clear cart
    cart = [];
    updateCart();
    cartSidebar.classList.remove('active');
    document.getElementById('customerName').value = "";
    document.getElementById('customerAddress').value = "";
});
        });
        document.addEventListener('DOMContentLoaded', function() {
            // Create popup elements
            const popupContainer = document.createElement('div');
            popupContainer.className = 'image-popup-container';
            popupContainer.style.display = 'none';
            popupContainer.style.position = 'fixed';
            popupContainer.style.top = '0';
            popupContainer.style.left = '0';
            popupContainer.style.width = '100%';
            popupContainer.style.height = '100%';
            popupContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
            popupContainer.style.zIndex = '1000';
            popupContainer.style.justifyContent = 'center';
            popupContainer.style.alignItems = 'center';
            popupContainer.style.flexDirection = 'column';
            popupContainer.style.display = 'none';
            
            const popupImage = document.createElement('img');
            popupImage.style.maxWidth = '80%';
            popupImage.style.maxHeight = '80%';
            popupImage.style.borderRadius = '5px';
            
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.marginTop = '20px';
            closeButton.style.padding = '10px 20px';
            closeButton.style.backgroundColor = '#e74c3c';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '5px';
            closeButton.style.cursor = 'pointer';
            
            popupContainer.appendChild(popupImage);
            popupContainer.appendChild(closeButton);
            document.body.appendChild(popupContainer);
            
            // Add click event to all item images
            const itemImages = document.querySelectorAll('.item-image');
            itemImages.forEach(image => {
                image.style.cursor = 'pointer';
                image.addEventListener('click', function() {
                    popupImage.src = this.src;
                    popupImage.alt = this.alt;
                    popupContainer.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
                });
            });
            
            // Close popup when clicking close button or outside the image
            closeButton.addEventListener('click', closePopup);
            popupContainer.addEventListener('click', function(e) {
                if (e.target === popupContainer) {
                    closePopup();
                }
            });
            
            // Close popup when pressing Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && popupContainer.style.display === 'flex') {
                    closePopup();
                }
            });
            
            function closePopup() {
                popupContainer.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });