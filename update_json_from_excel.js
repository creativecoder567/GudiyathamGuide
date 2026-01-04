const XLSX = require('xlsx');
const fs = require('fs');

// Helper function to find a key in an object in a case-insensitive way
function findValueByKey(obj, key) {
    const keyToFind = key.toLowerCase();
    for (const k in obj) {
        if (k.toLowerCase() === keyToFind) {
            return obj[k];
        }
    }
    return undefined;
}

// Read the Excel file
const wb = XLSX.readFile('Gym_Database.xlsx');

// Read services_details sheet
const wsServiceDetails = wb.Sheets['services_details'];
const serviceDetailsData = XLSX.utils.sheet_to_json(wsServiceDetails);
console.log('Service Details data length:', serviceDetailsData.length);

// Read service categories
const wsServiceCategories = wb.Sheets['Gym_Database_services'];
const serviceCategoriesData = XLSX.utils.sheet_to_json(wsServiceCategories);
console.log('Service Categories loaded:', serviceCategoriesData.length);

// Create a map from service type to id
const serviceTypeToId = {};
serviceCategoriesData.forEach(cat => {
    serviceTypeToId[cat.type] = cat.id;
});
console.log('Service Type to ID map:', serviceTypeToId);

// Transform services data
const servicesData = serviceDetailsData.map(row => ({
    service_id: serviceTypeToId[row.service_type] || 0,
    name: row.name,
    location: row.location,
    contact: row.phone,
    image: `images/${row.service_type}.svg`,
    email: row.email || '',
    website: row.website || '',
    rating: row.rating || 0,
    description: row.description || '',
    opening_hours: row.opening_hours || '',
    services_offered: row.services_offered || '',
    isActive: String(findValueByKey(row, 'isActive')).toLowerCase() === 'true',
    isAvailable: String(findValueByKey(row, 'isAvailable')).toLowerCase() === 'true'
}));

// Write to services-data.json
fs.writeFileSync('data/services-data.json', JSON.stringify(servicesData, null, 2));

// Transform service categories to include image field
const serviceCategoriesWithImages = serviceCategoriesData.map(cat => ({
    ...cat,
    image: `images/${cat.type}.svg`,
    isActive: String(findValueByKey(cat, 'isActive')).toLowerCase() === 'true',
    isAvailable: String(findValueByKey(cat, 'isAvailable')).toLowerCase() === 'true'
}));

// Write service categories to categories-data.json
fs.writeFileSync('data/categories-data.json', JSON.stringify(serviceCategoriesWithImages, null, 2));

console.log('services-data.json and categories-data.json updated from Excel!');

// Read sales_details sheet
const wsSalesDetails = wb.Sheets['sales_details'];
const salesDetailsData = XLSX.utils.sheet_to_json(wsSalesDetails);
console.log('Sales Details data length:', salesDetailsData.length);

// Read sales categories
const wsSalesCategories = wb.Sheets['sales_categories'];
const salesCategoriesData = XLSX.utils.sheet_to_json(wsSalesCategories);
console.log('Sales Categories loaded:', salesCategoriesData.length);

// Create a map from sales type to id
const salesTypeToId = {};
salesCategoriesData.forEach(cat => {
    salesTypeToId[cat.type] = cat.id;
});
console.log('Sales Type to ID map:', salesTypeToId);

// Transform sales data
const salesData = salesDetailsData.map(row => ({
    service_id: salesTypeToId[row.category_type] || 0,
    name: row.name,
    location: row.location,
    contact: row.phone,
    image: `images/${row.category_type}.jpeg`,
    email: row.email || '',
    website: row.website || '',
    rating: row.rating || 0,
    description: row.description || '',
    opening_hours: row.opening_hours || '',
    products: row.products || '',
    isActive: String(findValueByKey(row, 'isActive')).toLowerCase() === 'true',
    isAvailable: String(findValueByKey(row, 'isAvailable')).toLowerCase() === 'true'
}));

// Write to sales-data.json
fs.writeFileSync('data/sales-data.json', JSON.stringify(salesData, null, 2));

// Transform sales categories to include image field
const salesCategoriesWithImages = salesCategoriesData.map(cat => ({
    ...cat,
    image: `images/${cat.type}.jpeg`,
    isActive: String(findValueByKey(cat, 'isActive')).toLowerCase() === 'true',
    isAvailable: String(findValueByKey(cat, 'isAvailable')).toLowerCase() === 'true'
}));

// Write sales categories to sales-categories-data.json
fs.writeFileSync('data/sales-categories-data.json', JSON.stringify(salesCategoriesWithImages, null, 2));

console.log('sales-data.json and sales-categories-data.json updated from Excel!');