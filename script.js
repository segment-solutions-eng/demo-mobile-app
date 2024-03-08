// script.js

document.addEventListener("DOMContentLoaded", function() {
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
                  <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full">Add to Cart</button>
                </div>
              </div>
            </div>
          `;
  
          productGrid.insertAdjacentHTML('beforeend', productCard);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  });
  