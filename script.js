/**
 * K-Beauty Skincare Products App - JavaScript
 * This file contains all the interactive functionality for the skincare products application
 * 
 * Main Features:
 * - Product database with comprehensive Korean skincare products
 * - Category filtering system
 * - Search functionality
 * - Product sorting options
 * - Dynamic product card generation
 * - Responsive user interface interactions
 */

// ===== GLOBAL VARIABLES =====
// Store all products data - this acts as our database
let allProducts = [];

// Store currently displayed products (after filtering/searching)
let currentProducts = [];

// Store the current active category filter
let currentCategory = 'all';

// Store the current search term
let currentSearchTerm = '';

// ===== PRODUCT DATABASE =====
/**
 * Comprehensive database of Korean skincare products
 * Each product object contains:
 * - id: unique identifier
 * - name: product name
 * - brand: Korean brand name
 * - category: product category for filtering
 * - price: price in USD
 * - description: product description
 * - keyIngredients: main active ingredients
 * - icon: Font Awesome icon for visual representation
 */
const productsDatabase = [
    // CLEANSERS CATEGORY
    {
        id: 1,
        name: "Low pH Good Morning Gel Cleanser",
        brand: "COSRX",
        category: "cleanser",
        price: 12,
        description: "A gentle, low pH cleanser that effectively removes impurities without stripping the skin.",
        keyIngredients: "Tea Tree Oil, Betaine Salicylate",
        icon: "fas fa-pump-soap"
    },
    {
        id: 2,
        name: "Rice Water Bright Cleansing Foam",
        brand: "The Face Shop",
        category: "cleanser",
        price: 8,
        description: "Rice water and rice bran oil cleansing foam that brightens and moisturizes skin.",
        keyIngredients: "Rice Water, Rice Bran Oil",
        icon: "fas fa-pump-soap"
    },
    {
        id: 3,
        name: "Green Tea Cleansing Oil",
        brand: "Innisfree",
        category: "cleanser",
        price: 15,
        description: "Gentle cleansing oil infused with Jeju green tea for deep cleansing.",
        keyIngredients: "Green Tea Extract, Jojoba Oil",
        icon: "fas fa-pump-soap"
    },
    
    // MOISTURIZERS CATEGORY
    {
        id: 4,
        name: "Advanced Snail 92 All in One Cream",
        brand: "COSRX",
        category: "moisturizer",
        price: 18,
        description: "Lightweight yet deeply moisturizing cream with 92% snail secretion filtrate.",
        keyIngredients: "Snail Secretion Filtrate, Hyaluronic Acid",
        icon: "fas fa-tint"
    },
    {
        id: 5,
        name: "Water Sleeping Mask",
        brand: "Laneige",
        category: "moisturizer",
        price: 34,
        description: "Overnight hydrating mask that works while you sleep for plump, dewy skin.",
        keyIngredients: "Hydro Ionized Mineral Water, Evening Primrose",
        icon: "fas fa-tint"
    },
    {
        id: 6,
        name: "Moisture Barrier Cream",
        brand: "Etude House",
        category: "moisturizer",
        price: 16,
        description: "Rich cream that strengthens skin barrier and provides long-lasting hydration.",
        keyIngredients: "Ceramides, Panthenol",
        icon: "fas fa-tint"
    },
    
    // SERUMS CATEGORY
    {
        id: 7,
        name: "Vitamin C 23% Serum",
        brand: "By Wishtrend",
        category: "serum",
        price: 17,
        description: "High-concentration vitamin C serum for brightening and anti-aging benefits.",
        keyIngredients: "L-Ascorbic Acid, Tocopherol",
        icon: "fas fa-eye-dropper"
    },
    {
        id: 8,
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        brand: "The Ordinary",
        category: "serum",
        price: 7,
        description: "Reduces appearance of skin blemishes and congestion with niacinamide and zinc.",
        keyIngredients: "Niacinamide, Zinc PCA",
        icon: "fas fa-eye-dropper"
    },
    {
        id: 9,
        name: "Snail 96 Mucin Power Essence",
        brand: "COSRX",
        category: "serum",
        price: 25,
        description: "Concentrated essence with 96% snail secretion for skin repair and hydration.",
        keyIngredients: "Snail Secretion Filtrate, Sodium Hyaluronate",
        icon: "fas fa-eye-dropper"
    },
    
    // SPF/SUNSCREEN CATEGORY
    {
        id: 10,
        name: "Aloe Soothing Sun Cream SPF50+",
        brand: "COSRX",
        category: "spf",
        price: 13,
        description: "Lightweight, non-greasy sunscreen with aloe for soothing protection.",
        keyIngredients: "Aloe Barbadensis Leaf Extract, Zinc Oxide",
        icon: "fas fa-sun"
    },
    {
        id: 11,
        name: "Perfect UV Protection Cream Triple Care SPF50+",
        brand: "Missha",
        category: "spf",
        price: 9,
        description: "Multi-functional sunscreen that provides UV protection, whitening, and anti-aging.",
        keyIngredients: "Titanium Dioxide, Niacinamide",
        icon: "fas fa-sun"
    },
    {
        id: 12,
        name: "Daily UV Protection Sun Fluid SPF50+",
        brand: "Innisfree",
        category: "spf",
        price: 12,
        description: "Lightweight fluid sunscreen perfect for daily use under makeup.",
        keyIngredients: "Green Tea Extract, Zinc Oxide",
        icon: "fas fa-sun"
    },
    
    // TONERS CATEGORY
    {
        id: 13,
        name: "AHA/BHA Clarifying Treatment Toner",
        brand: "COSRX",
        category: "toner",
        price: 17,
        description: "Exfoliating toner with AHA and BHA for smoother, clearer skin.",
        keyIngredients: "Glycolic Acid, Betaine Salicylate",
        icon: "fas fa-spray-can"
    },
    {
        id: 14,
        name: "Green Tea Seed Serum",
        brand: "Innisfree",
        category: "toner",
        price: 19,
        description: "Hydrating toner serum with Jeju green tea for antioxidant protection.",
        keyIngredients: "Green Tea Extract, Hyaluronic Acid",
        icon: "fas fa-spray-can"
    },
    {
        id: 15,
        name: "Wonder Miracle Patch",
        brand: "Some By Mi",
        category: "toner",
        price: 14,
        description: "pH-balancing toner that prepares skin for better absorption of skincare.",
        keyIngredients: "Centella Asiatica, Niacinamide",
        icon: "fas fa-spray-can"
    },
    
    // FACE MASKS CATEGORY
    {
        id: 16,
        name: "Real Squeeze Aloe Mask",
        brand: "Innisfree",
        category: "mask",
        price: 1,
        description: "Soothing sheet mask with fresh aloe vera for instant hydration.",
        keyIngredients: "Aloe Barbadensis Leaf Juice",
        icon: "fas fa-mask"
    },
    {
        id: 17,
        name: "Honey Mask Pack",
        brand: "Skinfood",
        category: "mask",
        price: 8,
        description: "Nourishing wash-off mask with honey for soft, supple skin.",
        keyIngredients: "Honey Extract, Royal Jelly",
        icon: "fas fa-mask"
    },
    {
        id: 18,
        name: "Centella Unscented Serum",
        brand: "Purito",
        category: "mask",
        price: 7,
        description: "Calming sheet mask with centella asiatica for sensitive skin.",
        keyIngredients: "Centella Asiatica Extract",
        icon: "fas fa-mask"
    },
    
    // EXFOLIANTS CATEGORY
    {
        id: 19,
        name: "BHA Blackhead Power Liquid",
        brand: "COSRX",
        category: "exfoliant",
        price: 22,
        description: "Gentle BHA exfoliant that unclogs pores and reduces blackheads.",
        keyIngredients: "Betaine Salicylate, Niacinamide",
        icon: "fas fa-scrubber"
    },
    {
        id: 20,
        name: "AHA 7 Whitehead Power Liquid",
        brand: "COSRX",
        category: "exfoliant",
        price: 17,
        description: "AHA exfoliant that removes dead skin cells for smoother texture.",
        keyIngredients: "Glycolic Acid, Hyaluronic Acid",
        icon: "fas fa-scrubber"
    },
    {
        id: 21,
        name: "Rice Enzyme Powder",
        brand: "Tatcha",
        category: "exfoliant",
        price: 65,
        description: "Gentle enzyme powder exfoliant that polishes skin to silky smoothness.",
        keyIngredients: "Rice Enzyme, Papain",
        icon: "fas fa-scrubber"
    }
];

// ===== DOM ELEMENTS =====
/**
 * Get references to important DOM elements
 * These will be used throughout the application for manipulation
 */
const searchInput = document.getElementById('searchInput');
const productsGrid = document.getElementById('productsGrid');
const productsCount = document.getElementById('productsCount');
const sortSelect = document.getElementById('sortSelect');
const loadingIndicator = document.getElementById('loadingIndicator');
const noProductsMessage = document.getElementById('noProductsMessage');
const categoryFilters = document.getElementById('categoryFilters');

// ===== INITIALIZATION =====
/**
 * Initialize the application when DOM is fully loaded
 * This ensures all elements are available before we try to manipulate them
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('K-Beauty App initializing...'); // Debug log
    
    // Copy database to working arrays
    allProducts = [...productsDatabase];
    currentProducts = [...allProducts];
    
    // Set up event listeners for user interactions
    setupEventListeners();
    
    // Display all products initially
    displayProducts(currentProducts);
    
    // Update the products count display
    updateProductsCount();
    
    console.log('K-Beauty App initialized successfully!'); // Debug log
});

// ===== EVENT LISTENERS SETUP =====
/**
 * Set up all event listeners for user interactions
 * This centralizes all event handling setup
 */
function setupEventListeners() {
    // Search input - listen for typing (with debounce for performance)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        // Clear previous timeout to debounce rapid typing
        clearTimeout(searchTimeout);
        
        // Wait 300ms after user stops typing before searching
        searchTimeout = setTimeout(() => {
            searchProducts();
        }, 300);
    });
    
    // Search input - listen for Enter key press
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Sort select - listen for changes
    sortSelect.addEventListener('change', sortProducts);
    
    console.log('Event listeners set up successfully'); // Debug log
}

// ===== PRODUCT DISPLAY FUNCTIONS =====
/**
 * Display products in the grid
 * @param {Array} products - Array of product objects to display
 */
function displayProducts(products) {
    console.log(`Displaying ${products.length} products`); // Debug log
    
    // Show loading indicator
    showLoading(true);
    
    // Simulate loading time for better UX (remove in production if not needed)
    setTimeout(() => {
        // Clear the products grid
        productsGrid.innerHTML = '';
        
        // Check if there are products to display
        if (products.length === 0) {
            showNoProductsMessage(true);
            showLoading(false);
            return;
        }
        
        // Hide no products message
        showNoProductsMessage(false);
        
        // Create and append product cards
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        // Add fade-in animation to new cards
        const cards = productsGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            // Stagger the animations for a nice effect
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 50);
        });
        
        // Hide loading indicator
        showLoading(false);
        
        console.log('Products displayed successfully'); // Debug log
    }, 500); // 500ms delay for loading effect
}

/**
 * Create a product card HTML element
 * @param {Object} product - Product object containing all product data
 * @returns {HTMLElement} - Complete product card element
 */
function createProductCard(product) {
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id); // For potential future use
    
    // Build the card HTML content
    card.innerHTML = `
        <!-- Product image placeholder with icon -->
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        
        <!-- Product name -->
        <div class="product-name">${product.name}</div>
        
        <!-- Product brand -->
        <div class="product-brand">${product.brand}</div>
        
        <!-- Product category tag -->
        <div class="product-category">${formatCategoryName(product.category)}</div>
        
        <!-- Product description -->
        <div class="product-description">${product.description}</div>
        
        <!-- Product price -->
        <div class="product-price">$${product.price.toFixed(2)}</div>
        
        <!-- Key ingredients -->
        <div class="product-ingredients">Key ingredients: ${product.keyIngredients}</div>
    `;
    
    return card;
}

/**
 * Format category names for display (capitalize and make readable)
 * @param {string} category - Raw category name
 * @returns {string} - Formatted category name
 */
function formatCategoryName(category) {
    // Handle special cases
    const specialCases = {
        'spf': 'SPF/Sunscreen',
        'mask': 'Face Mask',
        'exfoliant': 'Exfoliant'
    };
    
    // Return special case or capitalize first letter
    return specialCases[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

// ===== FILTERING FUNCTIONS =====
/**
 * Filter products by category
 * @param {string} category - Category to filter by ('all' for no filter)
 */
function filterByCategory(category) {
    console.log(`Filtering by category: ${category}`); // Debug log
    
    // Update current category
    currentCategory = category;
    
    // Update active filter button visual state
    updateActiveFilterButton(category);
    
    // Apply filters and display results
    applyFiltersAndDisplay();
}

/**
 * Update the visual state of filter buttons
 * @param {string} activeCategory - The currently active category
 */
function updateActiveFilterButton(activeCategory) {
    // Remove active class from all filter buttons
    const filterButtons = categoryFilters.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to the selected button
    const activeButton = categoryFilters.querySelector(`[data-category="${activeCategory}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// ===== SEARCH FUNCTIONS =====
/**
 * Search products based on user input
 * Searches through product names, brands, descriptions, and ingredients
 */
function searchProducts() {
    // Get search term and clean it up
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log(`Searching for: "${searchTerm}"`); // Debug log
    
    // Update current search term
    currentSearchTerm = searchTerm;
    
    // Apply filters and display results
    applyFiltersAndDisplay();
}

/**
 * Check if a product matches the search term
 * @param {Object} product - Product object to check
 * @param {string} searchTerm - Search term to match against
 * @returns {boolean} - True if product matches search term
 */
function productMatchesSearch(product, searchTerm) {
    if (!searchTerm) return true; // Empty search matches everything
    
    // Fields to search through
    const searchableFields = [
        product.name,
        product.brand,
        product.description,
        product.keyIngredients,
        product.category
    ];
    
    // Check if any field contains the search term
    return searchableFields.some(field => 
        field.toLowerCase().includes(searchTerm)
    );
}

// ===== SORTING FUNCTIONS =====
/**
 * Sort products based on selected criteria
 */
function sortProducts() {
    const sortValue = sortSelect.value;
    console.log(`Sorting by: ${sortValue}`); // Debug log
    
    // Create a copy of current products to sort
    let sortedProducts = [...currentProducts];
    
    // Apply sorting based on selected value
    switch (sortValue) {
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'brand-asc':
            sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            console.warn(`Unknown sort value: ${sortValue}`); // Debug warning
    }
    
    // Display sorted products
    displayProducts(sortedProducts);
}

// ===== UTILITY FUNCTIONS =====
/**
 * Apply both category filter and search, then display results
 * This is the main function that combines filtering and searching
 */
function applyFiltersAndDisplay() {
    console.log('Applying filters and search...'); // Debug log
    
    // Start with all products
    let filteredProducts = [...allProducts];
    
    // Apply category filter first
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentCategory
        );
        console.log(`After category filter: ${filteredProducts.length} products`); // Debug log
    }
    
    // Apply search filter
    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            productMatchesSearch(product, currentSearchTerm)
        );
        console.log(`After search filter: ${filteredProducts.length} products`); // Debug log
    }
    
    // Update current products and display
    currentProducts = filteredProducts;
    displayProducts(currentProducts);
    updateProductsCount();
}

/**
 * Update the products count display
 */
function updateProductsCount() {
    const count = currentProducts.length;
    productsCount.textContent = count;
    
    // Add some visual feedback for the count
    productsCount.style.transform = 'scale(1.1)';
    setTimeout(() => {
        productsCount.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Show or hide the loading indicator
 * @param {boolean} show - Whether to show the loading indicator
 */
function showLoading(show) {
    if (show) {
        loadingIndicator.style.display = 'block';
        productsGrid.style.display = 'none';
    } else {
        loadingIndicator.style.display = 'none';
        productsGrid.style.display = 'grid';
    }
}

/**
 * Show or hide the no products message
 * @param {boolean} show - Whether to show the no products message
 */
function showNoProductsMessage(show) {
    noProductsMessage.style.display = show ? 'block' : 'none';
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====
/**
 * Get products by category (utility function for potential future use)
 * @param {string} category - Category to get products for
 * @returns {Array} - Array of products in the specified category
 */
function getProductsByCategory(category) {
    if (category === 'all') {
        return [...allProducts];
    }
    return allProducts.filter(product => product.category === category);
}

/**
 * Get product by ID (utility function for potential future use)
 * @param {number} id - Product ID to find
 * @returns {Object|null} - Product object or null if not found
 */
function getProductById(id) {
    return allProducts.find(product => product.id === id) || null;
}

/**
 * Get all unique categories from products (utility function)
 * @returns {Array} - Array of unique category names
 */
function getAllCategories() {
    const categories = allProducts.map(product => product.category);
    return [...new Set(categories)]; // Remove duplicates
}

/**
 * Get products by brand (utility function for potential future use)
 * @param {string} brand - Brand name to filter by
 * @returns {Array} - Array of products from the specified brand
 */
function getProductsByBrand(brand) {
    return allProducts.filter(product => 
        product.brand.toLowerCase() === brand.toLowerCase()
    );
}

// ===== DEBUG AND DEVELOPMENT FUNCTIONS =====
/**
 * Console log all products (for debugging)
 */
function debugLogAllProducts() {
    console.table(allProducts);
}

/**
 * Console log current filter state (for debugging)
 */
function debugLogFilterState() {
    console.log({
        currentCategory,
        currentSearchTerm,
        currentProductsCount: currentProducts.length,
        totalProductsCount: allProducts.length
    });
}

// Make debug functions available globally for console use
window.debugLogAllProducts = debugLogAllProducts;
window.debugLogFilterState = debugLogFilterState;

// ===== ERROR HANDLING =====
/**
 * Global error handler for any JavaScript errors
 */
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
    
    // You could show a user-friendly error message here
    // For now, we'll just log it to the console
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// ===== PERFORMANCE MONITORING =====
/**
 * Simple performance monitoring (optional)
 */
if (window.performance && window.performance.mark) {
    // Mark when script finishes loading
    window.performance.mark('k-beauty-script-loaded');
    
    // Log performance info after DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        window.performance.mark('k-beauty-dom-ready');
        
        // Measure time from script load to DOM ready
        if (window.performance.measure) {
            try {
                window.performance.measure(
                    'k-beauty-init-time', 
                    'k-beauty-script-loaded', 
                    'k-beauty-dom-ready'
                );
                
                const measures = window.performance.getEntriesByName('k-beauty-init-time');
                if (measures.length > 0) {
                    console.log(`K-Beauty app initialization took ${measures[0].duration.toFixed(2)}ms`);
                }
            } catch (e) {
                // Performance API not fully supported, ignore
            }
        }
    });
}

console.log('K-Beauty Skincare App script loaded successfully!'); // Final confirmation