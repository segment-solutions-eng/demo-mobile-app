document.addEventListener("DOMContentLoaded", function () {
  applyConfigurations();
  renderProducts();
  setupModalEventListeners(); //Product Detail Modal
  setupConfirmationModalListeners(); //Confirmation Window Modal
  loadHomePageContent();
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
        e.preventDefault(); // Prevent the default anchor action
        const target = link.url.substring(1); // Remove the '#' from the URL

        switch (target) {
          case 'home':
            loadHomePageContent(); // Function to load the home content
            break;
          case 'catalog':
            loadCatalogContent(); // Adjust these functions as necessary
            break;
          case 'resources':
            // loadResourcesContent();
            break;
          case 'profile':
            // loadProfileContent();
            break;
          default:
            loadHomePageContent(); // Default to home if no match
        }
      });

      footerNav.appendChild(anchor);
    });
  }
}


function loadContent(contentId) {
  // Implement content loading logic here
  // For example:
  switch (contentId) {
    case 'home':
      loadHomeContent();
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
      console.error('Unknown content ID:', contentId);
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
                    <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                    <p class="text-gray-700 mb-4">${product.description}</p>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xl font-bold">$${product.price}</span>
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
    document.getElementById('modalProductPrice').textContent = `$${product.price}`;

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
      modalProductFeatures.appendChild(featureItem);
    });

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



// Home Page
function loadHomePageContent() {
  const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-3xl font-bold text-center">Home</h2>
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
      <h2 class="text-3xl font-bold text-center">Catalog</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
  document.getElementById('main-content').innerHTML = content;
  renderProducts(); // Assuming this function renders your products
}

// Resources Page
function loadResourcesContent() {
  const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-3xl font-bold text-center">Resources</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
  document.getElementById('main-content').innerHTML = content;

}

// Profile Page
function loadProfileContent() {
  const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-3xl font-bold text-center">Profile</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
  document.getElementById('main-content').innerHTML = content;

}

// Function to populate the resources section with links and descriptions
function populateResources() {
  const resourcesList = document.getElementById('resources-list');
  if (resourcesList) {
    config.resources.forEach(resource => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <a href="${resource.url}" class="text-blue-500 font-semibold">${resource.title}</a>
        <p class="text-gray-700">${resource.description}</p>
      `;
      resourcesList.appendChild(listItem);
    });
  }
}