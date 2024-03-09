document.addEventListener("DOMContentLoaded", function () {
  applyConfigurations();
  renderProducts();
  setupModalEventListeners();
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
    config.footer.navLinks.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.textContent = link.label;
      anchor.className = 'btn-nav text-white'; // Apply styles as needed
      footerNav.appendChild(anchor);
    });
  }
}

function renderProducts() {
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    products.forEach(product => {
      const productCard = createProductCard(product);
      productGrid.insertAdjacentHTML('beforeend', productCard);
    });
  }
}

function createProductCard(product) {
  // Dynamically create the action button with a style attribute for the background color
  return `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover object-center">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-700">${product.description}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-xl font-bold">$${product.price}</span>
                    <button data-product-id="${product.id}" style="background-color: ${config.colors.buttonColor};" class="action-button hover:bg-indigo-600 text-white px-3 py-1 rounded-full">${product.actionButtonTitle}</button>
                </div>
            </div>
        </div>
    `;
}

function setupModalEventListeners() {
  document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function (event) {
      const productId = event.target.dataset.productId;
      showProductDetailsModal(productId);
    });
  });
}

function showProductDetailsModal(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    // Update modal content
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `$${product.price}`;

    const buttonContainer = document.querySelector('#productDetailsModal .flex');

    // Intent Button
    const intentButton = document.createElement('button');
    intentButton.textContent = product.intentButtonLabel;
    intentButton.className = 'intent-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform';
    intentButton.onclick = () => {
      // Placeholder for intent action
    };

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform';
    closeButton.onclick = hideProductDetailsModal;

    // Clear previous buttons and append new ones
    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(intentButton);
    buttonContainer.appendChild(closeButton);

    // Show the modal
    document.getElementById('productDetailsModal').classList.remove('hidden');
  }
}

function hideProductDetailsModal() {
  document.getElementById('productDetailsModal').classList.add('hidden');
}