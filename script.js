// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch configuration
  fetch('config.json')
    .then(response => response.json())
    .then(config => {
      // Set logo in header
      const logoImg = document.querySelector('header img');
      if (logoImg) {
        logoImg.src = config.header.logo;
        logoImg.alt = "Company Logo";
      }

      // Set banner text
      const bannerTextElement = document.querySelector('.bg-blue-200 h2');
      if (bannerTextElement) {
        bannerTextElement.textContent = config.header.bannerText;
      }

      // Populate footer navigation links
      const footerNav = document.querySelector('footer ul');
      if (footerNav) {
        config.footer.navLinks.forEach(link => {
          const listItem = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = link.url;
          anchor.textContent = link.label;
          anchor.classList.add('hover:text-gray-300');
          listItem.appendChild(anchor);
          footerNav.appendChild(listItem);
        });
      }
    })
    .catch(error => console.error('Error fetching configuration:', error));

  // Fetch products and render product cards
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const productGrid = document.getElementById('productGrid');

      products.forEach(product => {
        const productCard = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover object-center">
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-700">${product.description}</p>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-xl font-bold">$${product.price}</span>
                  <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full">${product.actionButtonTitle}</button>
                </div>
              </div>
            </div>
          `;

        productGrid.insertAdjacentHTML('beforeend', productCard);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
});
