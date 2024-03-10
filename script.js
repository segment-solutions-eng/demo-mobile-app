document.addEventListener("DOMContentLoaded", function () {
    // Initial setup
    applyConfigurations();
    renderProducts();
    setupModalEventListeners();
    setupConfirmationModalListeners();

    // Handle initial hash
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        loadContent(currentHash);
    } else {
        loadHomePageContent();
    }
});
function applyConfigurations() {
    setLogoAttributes();
    setBannerStyles();
    setBannerText();
    populateFooterNavigation();
}

function setLogoAttributes() {
    const logoImg = document.querySelector('header img');
    if (logoImg) {
        logoImg.src = config.header.logo;
        logoImg.alt = "Company Logo";
    }
}

function setBannerStyles() {
    // Apply dynamic banner background and text color from config
    const banner = document.querySelector('.bg-blue-200'); // Adjust this selector if needed
    if (banner) {
        banner.style.backgroundColor = config.colors.bannerColor;
        banner.style.color = config.colors.bannerTextColor;
    }
}

function setBannerText() {
    const bannerTextElement = document.getElementById('bannerText');
    if (bannerTextElement) {
        bannerTextElement.textContent = config.header.bannerText;
    }
}

function populateFooterNavigation() {
    const footerNav = document.querySelector('footer nav');
    if (footerNav) {
        footerNav.className = 'grid grid-cols-4 w-full'; // Ensure the grid layout spans the full width

        config.footer.navLinks.forEach(link => {
            const div = document.createElement('div');
            div.className = 'flex flex-col items-center justify-center w-full hover:bg-gray-700 cursor-pointer p-2'; // Added hover effect and padding

            const icon = document.createElement('i');
            icon.className = `${link.icon} fa-lg text-white`; // Ensured icons are white for visibility
            div.appendChild(icon);

            const label = document.createElement('span');
            label.className = 'text-white text-xs mt-2'; // Ensure label text is white for visibility
            label.textContent = link.label;
            div.appendChild(label);

            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = 'w-full h-full flex';
            anchor.appendChild(div); // Append the div to anchor for the entire area to be clickable

            // Attach an event listener to each anchor for dynamic content loading
            anchor.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor action
                const target = link.url.substring(1); // Remove the '#' from the URL
                window.location.hash = target; // Update the URL hash
                loadContent(target); // Load the content based on the target
            });


            footerNav.appendChild(anchor);
        });
    }
}


function loadContent(contentId) {
    switch (contentId) {
        case 'home':
            loadHomePageContent();
            break;
        case 'catalog':
            loadCatalogContent();
            break;
        case 'resources':
            loadResourcesContent();
            break;
        case 'profile':
            loadProfileContent();
            break;
        default:
            loadHomePageContent(); // Load home by default or show a 404 page/content not found message
    }
}


// Define functions like loadHomeContent, loadCatalogContent, etc., to update the #main-content

// Improved product rendering and modal handling
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.insertAdjacentHTML('beforeend', productCard);
        });
        setupModalEventListeners(); // Re-setup event listeners for dynamically added buttons
    }
}


function createProductCard(product) {
    // Dynamically create the product card with flex layout to keep the price and button anchored at the bottom
    return `
    <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
      <div class="p-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 class="text-xl text-center font-semibold mb-2">${product.name}</h3>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">${product.price}</span>
          <button data-product-id="${product.id}" style="background-color: ${config.colors.buttonColor};" class="action-button hover:bg-indigo-600 text-white px-3 py-1 rounded-full">${product.actionButtonTitle}</button>
        </div>
      </div>
    </div>
  `;
}



// Setup Modal Event Listeners - Improved to handle dynamic content
function setupModalEventListeners() {
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', handleActionButtonClick);
    });
}

// Handle Action Button Click - Shows Product Details Modal
function handleActionButtonClick(event) {
    const productId = event.target.dataset.productId;
    showProductDetailsModal(productId);
}

// Setup Confirmation Modal Listeners
function setupConfirmationModalListeners() {
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (confirmBtn) {
        // Apply the button color from config
        confirmBtn.style.backgroundColor = config.colors.buttonColor;
        confirmBtn.style.color = '#FFFFFF'; // Set text color to white for better visibility
        confirmBtn.className += ' hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'; // Add additional classes as needed

        confirmBtn.addEventListener('click', confirmAction);
    }
    if (cancelBtn) {
        // Optionally, apply styles to the cancel button as well for consistency
        // For example, if you have a secondary button color in your config, you could use that here
        // cancelBtn.style.backgroundColor = config.colors.secondaryButtonColor;
        // For simplicity, this example will not change the cancel button's appearance

        cancelBtn.addEventListener('click', cancelConfirmation);
    }
}


// Show and Hide Modals with State Reset
function showProductDetailsModal(productId) {
    resetAllModals(); // Ensure that all other modals are hidden and their states reset
    populateProductDetailsModal(productId); // Populate the modal with product details
    document.getElementById('productDetailsModal').classList.remove('hidden'); // Show the Product Details Modal
}

function populateProductDetailsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found');
        return;
    }

    // Set product details in the modal
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name; // Ensure alt text is updated for accessibility
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price;

    // Handle product tags
    const modalProductTags = document.getElementById('modalProductTags');
    modalProductTags.innerHTML = ''; // Clear existing tags
    product.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2';
        tagElement.textContent = tag;
        modalProductTags.appendChild(tagElement);
    });

    // Handle product features
    const modalProductFeatures = document.getElementById('modalProductFeatures');
    modalProductFeatures.innerHTML = ''; // Clear existing features
    product.features.forEach(feature => {
        const featureItem = document.createElement('li');
        featureItem.textContent = feature;
        featureItem.className = 'feature-item'; // Use this class for styling if needed
        modalProductFeatures.appendChild(featureItem);
    });

    // Add or update dynamic buttons (Intent and Close) within the modal
    const buttonContainer = document.querySelector('.intent-cancel-container');
    buttonContainer.innerHTML = ''; // Clear existing buttons

    // Intent Button (e.g., Buy Now, Add to Cart)
    const intentButton = document.createElement('button');
    intentButton.textContent = product.intentButtonLabel;
    intentButton.className = 'intent-button hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
    intentButton.style.backgroundColor = config.colors.buttonColor; // Set button color from config
    intentButton.style.color = '#FFFFFF'; // Optional: Set text color to white
    intentButton.onclick = () => showConfirmationModal();
    buttonContainer.appendChild(intentButton);

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
    closeButton.onclick = hideProductDetailsModal;
    buttonContainer.appendChild(closeButton);
}

function hideProductDetailsModal() {
    document.getElementById('productDetailsModal').classList.add('hidden');
}

function showConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('hidden');
    document.getElementById('productDetailsModal').classList.add('hidden'); // Hide product details when showing confirmation
}


function hideConfirmationModal() {
    document.getElementById('confirmationModal').classList.add('hidden');
}

function confirmAction() {
    hideConfirmationModal();
    // Implement action confirmation logic here
}

function cancelConfirmation() {
    showProductDetailsModal(window.lastSelectedProductId); // Show the last viewed product details modal
    hideConfirmationModal();
}

// New function to reset and hide all modals
function resetAllModals() {
    hideProductDetailsModal();
    hideConfirmationModal();
    // Add any additional reset logic here
}



// Home Page
function loadHomePageContent() {
    const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Home</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
    document.getElementById('main-content').innerHTML = content;
    renderProducts();
}

// Catalog Page (same as Home)
function loadCatalogContent() {
    const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Catalog</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
    document.getElementById('main-content').innerHTML = content;
    renderProducts(); // Assuming this function renders your products
}

function loadResourcesContent() {
    const content = document.getElementById('main-content');
    // Reset the inner HTML to include a consistent outer structure
    content.innerHTML = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Resources</h2>
      <div id="accordionContainer" class="flex flex-col divide-y divide-gray-200 mx-4">
        <!-- Accordion items will be dynamically added here -->
      </div>
    </div>
  `;

    const accordionContainer = document.getElementById('accordionContainer'); // Get the newly added accordion container

    config.resources.forEach((category) => {
        const categoryHeader = document.createElement('button');
        categoryHeader.innerHTML = `<span class="accordion-title">${category.category}</span> <span class="indicator">+</span>`;
        categoryHeader.className = 'accordion-header py-4 px-6 text-left text-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out rounded-md shadow-sm my-2 flex justify-between items-center';

        const categoryContent = document.createElement('div');
        categoryContent.className = 'accordion-content overflow-hidden transition-max-height duration-700 ease-in-out';
        categoryContent.style.maxHeight = '0';

        category.items.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'pl-10 p-4 hover:bg-gray-50';
            itemElement.innerHTML = `<a href="${item.url}" target="_blank" class="text-blue-600 hover:underline">${item.title}</a>
                               <p class="text-gray-600">${item.description}</p>`;
            categoryContent.appendChild(itemElement);
        });

        categoryHeader.addEventListener('click', () => {
            const expanded = categoryContent.style.maxHeight !== '0px';
            categoryContent.style.maxHeight = expanded ? '0' : `${categoryContent.scrollHeight}px`;
            categoryHeader.querySelector('.indicator').textContent = expanded ? '+' : '-';
        });

        accordionContainer.appendChild(categoryHeader);
        accordionContainer.appendChild(categoryContent);
    });
}





// Profile Page
function loadProfileContent() {
    const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Profile</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
    document.getElementById('main-content').innerHTML = content;

}
