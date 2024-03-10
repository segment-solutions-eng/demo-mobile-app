document.addEventListener("DOMContentLoaded", function () {
  applyConfigurations();
  renderProducts();
  setupModalEventListeners(); //Product Detail Modal
  setupConfirmationModalListeners(); //Confirmation Window Modal

  const currentHash = window.location.hash.substring(1); // Get the current hash, removing the '#'
  if (currentHash) {
    loadContent(currentHash); // Load the content if there is a hash
  } else {
    loadHomePageContent(); // Default to home content if no hash
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


function renderProducts() {
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.innerHTML = ''; // Clear existing products if any
    products.forEach(product => {
      const productCard = createProductCard(product);
      productGrid.insertAdjacentHTML('beforeend', productCard);
    });
    setupModalEventListeners(); // Reattach event listeners to the action buttons
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



function setupModalEventListeners() {
  document.querySelectorAll('.action-button').forEach(button => {
    button.removeEventListener('click', handleActionButtonClick); // Remove existing event listener to avoid duplication
    button.addEventListener('click', handleActionButtonClick); // Add new event listener
  });
}

function handleActionButtonClick(event) {
  const productId = event.target.dataset.productId;
  showProductDetailsModal(productId);
}


function setupConfirmationModalListeners() {
  const confirmModal = document.getElementById('confirmationModal');
  const confirmBtn = document.getElementById('confirmBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  if (confirmBtn && cancelBtn) {
    // Attach event listeners if elements exist
    confirmBtn.addEventListener('click', function () {
      window.location.href = 'confirmation.html'; // Redirect to confirmation page
    });

    cancelBtn.addEventListener('click', function () {
      confirmModal.classList.add('hidden', 'opacity-0');
      document.getElementById('productDetailsModal').classList.remove('hidden');
      document.getElementById('productDetailsModal').classList.add('opacity-100');
    });
  } else {
    console.log('Confirmation buttons or modal not found');
  }
}


function showProductDetailsModal(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `${product.price}`;

    const modalProductTags = document.getElementById('modalProductTags');
    modalProductTags.innerHTML = '';
    product.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tagElement.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2';
      modalProductTags.appendChild(tagElement);
    });

    const modalProductFeatures = document.getElementById('modalProductFeatures');
    modalProductFeatures.innerHTML = '';
    product.features.forEach(feature => {
      const featureItem = document.createElement('li');
      featureItem.textContent = feature;
      featureItem.className = 'feature-item'; // Add class for styling
      modalProductFeatures.appendChild(featureItem);
    });

    // Apply background color to the entire right half of the modal
    const rightColumn = document.querySelector('#productDetailsModal .right-column');
    if (rightColumn) {
      rightColumn.style.backgroundColor = config.colors.modalDetailsBackground;
    }

    // Apply more padding to the features list
    const featuresList = document.getElementById('modalProductFeatures');
    if (featuresList) {
      featuresList.classList.add('pl-10'); // You can adjust this value as needed
    }

    // Clear any existing buttons and add padding between them
    const buttonContainer = document.querySelector('.intent-cancel-container');
    buttonContainer.innerHTML = '';
    buttonContainer.className = 'intent-cancel-container flex flex-col space-y-4 mb-4';

    // Intent Button (e.g., Add to Cart or Buy Now)
    const intentButton = document.createElement('button');
    intentButton.textContent = product.intentButtonLabel;
    intentButton.className = 'intent-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
    intentButton.style.backgroundColor = config.colors.buttonColor;
    intentButton.addEventListener('click', () => {
      // Show the confirmation modal
      document.getElementById('productDetailsModal').classList.add('hidden');
      document.getElementById('confirmationModal').classList.remove('hidden');
    });

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
    closeButton.addEventListener('click', hideProductDetailsModal);

    // Append buttons to the button container
    buttonContainer.appendChild(intentButton);
    buttonContainer.appendChild(closeButton);

    // Show the modal
    document.getElementById('productDetailsModal').classList.remove('hidden');
  }
}

function hideProductDetailsModal() {
  document.getElementById('productDetailsModal').classList.add('hidden');
}

function showConfirmationModal() {
  // Set the content of the confirmation modal if needed
  document.getElementById('confirmationModal').classList.remove('hidden');
  document.getElementById('productDetailsModal').classList.add('hidden');
}

function hideConfirmationModal() {
  document.getElementById('confirmationModal').classList.add('hidden');
  document.getElementById('productDetailsModal').classList.remove('hidden');
}

function cancelConfirmation() {
  hideConfirmationModal();
  // Restore any other state as necessary
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
