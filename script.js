document.addEventListener("DOMContentLoaded", function () {
  applyConfigurations();
  renderProducts();
  setupEventListeners();
});

function applyConfigurations() {
  setLogoAttributes();
  applyStylesToElements();
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

function applyStylesToElements() {
  document.querySelector('header').style.backgroundColor = config.colors.headerColor;
  document.querySelector('footer').style.backgroundColor = config.colors.footerColor;
  const banner = document.querySelector('.bg-blue-200');
  if (banner) banner.style.backgroundColor = config.colors.bannerColor;
}

function setBannerText() {
  const bannerTextElement = document.getElementById('bannerText');
  if (bannerTextElement) {
    bannerTextElement.textContent = config.header.bannerText;
    bannerTextElement.style.color = config.colors.bannerTextColor;
  }
}

function populateFooterNavigation() {
  const footerNav = document.querySelector('footer nav');
  config.footer.navLinks.forEach(link => {
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.textContent = link.label;
    anchor.classList.add('btn-nav');
    footerNav.appendChild(anchor);
  });
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
  return `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover object-center">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-700">${product.description}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-xl font-bold">$${product.price}</span>
                    <button data-product-id="${product.id}" style="background-color: ${config.colors.buttonColor}" class="action-button hover:bg-indigo-600 text-white px-3 py-1 rounded-full">${product.actionButtonTitle}</button>
                </div>
            </div>
        </div>
    `;
}

function setupEventListeners() {
  document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', handleActionButtonClick);
  });

  const cancelButton = document.getElementById('cancelButton');
  if (cancelButton) {
    cancelButton.addEventListener('click', function () {
      window.location.href = 'index.html'; // Navigate to the home page
    });
  }
}

function handleActionButtonClick(event) {
  const productId = event.target.dataset.productId;
  window.location.href = `product-details.html?id=${productId}`; // Redirect to the Product Details page
}
