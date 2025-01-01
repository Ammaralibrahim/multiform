// Function to show the current step
function showStep(step) {
  // Hide all form steps by removing the 'active' class
  document.querySelectorAll('.form-step').forEach(stepElement => {
    stepElement.classList.remove('active');
  });
  
  // Show the current step by adding the 'active' class
  document.getElementById(`step${step}`).classList.add('active');
}

// Move to the next step in the form
function nextStep(step) {
  // Validate the current step before moving to the next
  if (validateStep(currentStep)) {
    currentStep = step;
    showStep(step);

    // If the last step (Step 7) is reached, show the modal
    if (step === 7) {
      showModal(); // Show modal when the form is completed
    }
  }
}

// Move to the previous step in the form
function prevStep(step) {
  currentStep = step;
  showStep(step);
}

// Validate the required fields in the current step
function validateStep(step) {
  // Get the current step element
  const currentStepElement = document.getElementById(`step${step}`);
  
  // Find all input elements marked as 'required' in the current step
  const inputs = currentStepElement.querySelectorAll('input[required]');
  
  // Check if all required fields are filled out
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert('Please fill out all required fields.'); // Alert if any required field is empty
      return false;
    }
  }
  
  // Return true if all required fields are filled
  return true;
}

// Update the range input value (for budget)
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');

// Listen for input changes and update the displayed value
rangeInput.addEventListener('input', function () {
  rangeValue.textContent = rangeInput.value; // Update the displayed range value dynamically
});

// Show the first step when the page loads
let currentStep = 1; // Start from Step 1
showStep(currentStep);

// Search functionality for the service dropdown
const services = [
  "Web Development",
  "App Development",
  "Graphic Design",
  "SEO Optimization",
  "Digital Marketing",
  "Content Writing",
  "Data Analysis"
];

const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');
const chev = document.getElementById('chev');

// Function to perform the search on the input field
function searchService() {
  const query = searchInput.value.toLowerCase(); // Get the user's query in lowercase
  resultsContainer.innerHTML = ""; // Clear the previous results

  // Filter the services array based on the query
  const filteredServices = services.filter(service => service.toLowerCase().includes(query));

  // If matching services are found, display them
  if (filteredServices.length > 0) {
    filteredServices.forEach(service => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.textContent = service;
      
      // When a service is clicked, select it
      item.onclick = () => selectService(service);
      resultsContainer.appendChild(item);
    });
  } else {
    // If no services match, show a "No results" message
    const noResultItem = document.createElement('div');
    noResultItem.classList.add('item');
    noResultItem.textContent = "No results found";
    resultsContainer.appendChild(noResultItem);
  }
}

// Function to select a service from the list
function selectService(service) {
  searchInput.value = service; // Set the input field to the selected service
  resultsContainer.innerHTML = ""; // Clear the results container
}

// Add an event listener for the search input to trigger search
searchInput.addEventListener('input', searchService);

// Toggle the visibility of the search results when the chevron is clicked
chev.addEventListener('click', () => {
  resultsContainer.style.display = resultsContainer.style.display === "block" ? "none" : "block";
});

// Show the modal when the form is completed
function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Display the modal
}

// Close the modal and reset the form when the close button is clicked
document.getElementById('closeModalBtn').addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none'; // Hide the modal
  resetForm(); // Reset the form fields and step to 1
});

// Handle form submission
document.getElementById('multiStepForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from being submitted
  resetForm(); // Reset the form
  showModal(); // Show the completion modal
});

// Function to reset the form to its initial state
function resetForm() {
  const form = document.getElementById('multiStepForm');
  form.reset(); // Reset all form fields to their initial values
  currentStep = 1; // Reset the step to 1
  showStep(currentStep); // Show the first step
}

// Initialize international phone number input with country flag and dial code
window.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.querySelector("#phone");
  
  // Initialize the international phone input using the intl-tel-input library
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "us", // Set the default country to the United States
    separateDialCode: true, // Show the dial code separately
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js" // Script to handle phone number formatting
  });

  // Get the country code and phone number
  const countryCode = iti.getSelectedCountryData().dialCode; // Get the dial code of the selected country
  const phoneNumber = iti.getNumber(); // Get the phone number in international format
});
