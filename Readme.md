Multi-Step Form with Service Selection and User Details
This project is a Multi-Step Form designed to collect user details step-by-step. It includes multiple sections where users can:

Search for a Service
Choose a Service
Set a Budget
Provide Location
Select Additional Features
Enter User Details
Complete the Form
Additionally, the form integrates an international phone number input using the intl-tel-input library, which ensures users can easily input their phone numbers with the correct country dial code.

Features
Searchable Service List: Users can search and select a service.
Step-by-Step Navigation: The form progresses in a sequential manner with a clear "Back" and "Next" functionality.
Budget Slider: Users can select their budget using a range slider.
User Location Input: Users are prompted to enter their location in a text area.
Additional Features Selection: Checkboxes allow users to select any additional features they want.
User Details Input: Users are prompted to enter personal details like name, email, phone number, and company name.
Form Validation: Ensures that required fields are completed before allowing the user to proceed.
Modal Display: After completing the form, a modal appears thanking the user and confirming the submission.
Libraries and Tools Used
HTML5, CSS3, and JavaScript: Core technologies for building the front-end functionality.
Intl-Tel-Input: A popular JavaScript library for formatting international phone numbers, providing country flags, and dial codes.
Link to the library: intl-tel-input on CDN
Font Awesome: For displaying icons such as the chevron for dropdown menus.
CSS for Styling: External and custom stylesheets for designing the form layout.
Installation Instructions
Clone this Repository

bash
Copy code
git clone https://github.com/your-username/multi-step-form.git
cd multi-step-form
Download Required Libraries The external libraries are hosted on CDN, so you don't need to download them manually. However, make sure to have an internet connection when running the form to load them.

Run the Project You can simply open the index.html file in any browser to view the form in action.

Project Structure
plaintext
Copy code
multi-step-form/
├── index.html         # Main HTML file containing the form
├── style.css          # External and custom stylesheets for form styling
├── script.js          # JavaScript file containing form logic and interactions
├── README.md          # This documentation file
index.html
This file contains the structure of the form. It includes:

The form with multiple steps.
Service selection and location input.
Budget slider and feature selection.
User details input section.
Modal popup for form submission completion.
style.css
This file contains the styling for the form. It defines the layout, colors, buttons, and other UI elements.

script.js
This file contains the logic for the multi-step form, including:

Handling the steps with the showStep() function.
Validating each step with the validateStep() function.
The search functionality for services.
International phone input initialization using intl-tel-input.
How to Use
Navigating through the Form:
The user will be guided through the following steps:

Step 1: Search for a service.
Step 2: Choose a service from the options.
Step 3: Set a budget using a range slider.
Step 4: Provide location (a textarea field).
Step 5: Select additional features (checkboxes).
Step 6: Enter personal details like name, email, and phone number.
Step 7: Confirmation of the form submission.
Validating Input:
The form validates the required fields before allowing the user to move to the next step. If any required field is left empty, the user will be prompted to complete it.

Phone Number Input:
The phone number input field uses the intl-tel-input library, which automatically shows the flag and dial code for the selected country. The user can select a country or let the default country (US) remain.

Completing the Form:
Once the user reaches Step 7, they will see a "Thank You" message, and the form will reset. The form also displays a modal confirming the successful submission.

Modal and Form Reset:
When the form is completed, a modal will show up with a "Thank You" message. The form is then reset, and the user can either close the modal or continue using the form.

Form Validation
Each step contains required fields, ensuring that users cannot proceed without filling them out.
The validation is done using JavaScript in the validateStep() function, which checks for empty required fields.
Additional Features
Searchable Service Dropdown:
Users can search for services by typing in the search bar. The search results are dynamically displayed below the input field. Clicking on a service will select it.

Budget Slider:
A range slider is provided to set a budget. The selected value will dynamically update in the display area.

International Phone Number Input:
The phone input field is enhanced using the intl-tel-input library, allowing the user to enter their phone number along with the country dial code. This ensures that phone numbers are properly formatted.

