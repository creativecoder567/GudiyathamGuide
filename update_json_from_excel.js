const XLSX = require('xlsx');

// Read the Excel file
const wb = XLSX.readFile('Gym_Database.xlsx');

// Read services_details sheet
const wsDetails = wb.Sheets['services_details'];
const detailsData = XLSX.utils.sheet_to_json(wsDetails);
console.log('Details data length:', detailsData.length);

// Read categories first
const wsServices = wb.Sheets['Gym_Database_services'];
const categoriesData = XLSX.utils.sheet_to_json(wsServices);
console.log('Categories loaded:', categoriesData.length);

// Create a map from type to id
const typeToId = {};
categoriesData.forEach(cat => {
    typeToId[cat.type] = cat.id;
});
console.log('Type to ID map:', typeToId);

// Transform to match current JSON structure, adding more fields
const servicesData = detailsData.map(row => ({
    service_id: typeToId[row.service_type] || 0,
    name: row.name,
    location: row.location,
    contact: row.phone,
    image: `images/${row.service_type}.svg`,
    email: row.email || '',
    website: row.website || '',
    rating: row.rating || 0,
    description: row.description || '',
    opening_hours: row.opening_hours || '',
    services_offered: row.services_offered || ''
}));

// Write to services-data.json
const fs = require('fs');
fs.writeFileSync('data/services-data.json', JSON.stringify(servicesData, null, 2));

// Transform categories to include image field
const categoriesWithImages = categoriesData.map(cat => ({
    ...cat,
    image: `images/${cat.type}.svg`
}));

// Write categories to categories-data.json
fs.writeFileSync('data/categories-data.json', JSON.stringify(categoriesWithImages, null, 2));

console.log('services-data.json and categories-data.json updated from Excel!');