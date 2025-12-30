# GudiyathamGuide

This project is a web application for Gudiyatham Guide, a local guide for the town of Gudiyatham.

## Features

*   **Services:** View a list of services available in Gudiyatham.
*   **Service Details:** View details of a specific service.
*   **Sales:** View a list of products available for sale.
*   **Sales Details:** View details of a specific product.
*   **Coming Soon:** Services and products that are not yet available are marked as "Coming Soon".
*   **Bus Timings:** View bus timings.
*   **Contact:** Contact the Gudiyatham Guide team.

## How to run

1.  Clone the repository.
2.  Open `index.html` in your browser.

## How to update data

1.  Open `Gym_Database.xlsx`.
2.  Update the sheets `services_details`, `Gym_Database_services`, `sales_details`, and `sales_categories`.
3.  Run the script `update_json_from_excel.js` using `node update_json_from_excel.js`. This will update the JSON files in the `data` directory.