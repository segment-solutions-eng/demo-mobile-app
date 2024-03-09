document.addEventListener("DOMContentLoaded", function () {
  applyConfigurations();
  renderProducts();
  setupModalEventListeners(); //Product Detail Modal
  setupConfirmationModalListeners(); //Confirmation Window Modal
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

    // Dynamic Intent and Close Button Implementation
    const modalFooter = document.querySelector('#productDetailsModal .flex.justify-center.gap-4.mb-4');
    modalFooter.innerHTML = ''; // Clear existing buttons

    // Intent Button
    const intentButton = document.createElement('button');
    intentButton.textContent = product.intentButtonLabel;
    intentButton.className = 'intent-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
    intentButton.addEventListener('click', () => {
      document.getElementById('productDetailsModal').classList.add('hidden', 'opacity-0');
      const confirmModal = document.getElementById('confirmationModal');
      if (confirmModal) {
        confirmModal.classList.remove('hidden');
        confirmModal.classList.add('opacity-100');
      } else {
        console.error('Confirmation modal not found');
      }
    });

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
    closeButton.addEventListener('click', hideProductDetailsModal);

    // Append buttons to the modal footer
    modalFooter.appendChild(intentButton);
    modalFooter.appendChild(closeButton);

    document.getElementById('productDetailsModal').classList.remove('hidden');
  }
}

function hideProductDetailsModal() {
  document.getElementById('productDetailsModal').classList.add('hidden');
}
