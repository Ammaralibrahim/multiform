// Function to show the current step with a smooth transition effect
function showStep(step, direction = 'forward') {
  const currentStepElement = document.getElementById(`step${currentStep}`); // Get the current step element
  const nextStepElement = document.getElementById(`step${step}`); // Get the next step element

  // Add the appropriate sliding effect based on the direction
  if (direction === 'forward') {
    currentStepElement.classList.add('slide-out-right');  // Slide current step out to the right
    nextStepElement.classList.add('slide-in-left');      // Slide next step in from the left
  } else {
    currentStepElement.classList.add('slide-out-left');  // Slide current step out to the left
    nextStepElement.classList.add('slide-in-right');     // Slide next step in from the right
  }

  // Make the next step visible and ensure it's initially hidden before animation
  nextStepElement.style.display = 'block';

  // Add a small delay to allow the current step to transition out before showing the next step
  setTimeout(() => {
    // Remove the slide effects from the current step after transition
    currentStepElement.classList.remove('active', 'slide-out-left', 'slide-out-right');

    // Add the active class to the next step
    nextStepElement.classList.add('active');

    // Remove the sliding effect from the next step after the animation completes (matching CSS duration)
    setTimeout(() => {
      nextStepElement.classList.remove('slide-in-left', 'slide-in-right');
    }, 500); // 500ms matches the CSS animation duration
  }, 500);

  // Update the global variable to reflect the new current step
  currentStep = step;
}


// Function to move to the next step
function nextStep(step) {
  if (validateStep(currentStep)) { // Validate the current step before moving forward
    showStep(step); // Show the desired step

    // If the last step (Step 7) is reached, display the modal
    if (step === 7) {
      showModal();
    }
  }
}

// Function to move to the previous step
function prevStep(step) {
  showStep(step); // Show the previous step without validation
}

// Function to validate inputs of the current step
function validateStep(step) {
  const currentStepElement = document.getElementById(`step${step}`); // Get the current step element
  const inputs = currentStepElement.querySelectorAll('input[required]'); // Get all required inputs in the current step

  // 5. Step checkbox validation (check at least one checkbox is selected)
  if (step === 5) {
    const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked); // Check if at least one checkbox is selected
    if (!isChecked) {
      alert('Please select at least one additional feature.');
      return false; // Prevent step change
    }
  }

  // Step 6 checkbox validation (terms and conditions checkbox)
  if (step === 6) {
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
      alert('You must accept the terms and conditions to proceed.');
      return false; // Prevent step change
    }
  }

  // Validate all required input fields in other steps
  for (let input of inputs) {
    if (!input.value.trim()) { // If any required input is empty
      alert('Please fill out all required fields.');
      return false; // Prevent step change
    }
  }
  
  return true; // If all validations pass
}



// Update the displayed range input value dynamically
const rangeInput = document.getElementById('rangeInput'); // Range input element
const rangeValue = document.getElementById('rangeValue'); // Element to display the range value

rangeInput.addEventListener('input', function () {
  rangeValue.textContent = rangeInput.value; // Update the displayed value whenever the range input changes
});

// Initialize the first step when the page loads
let currentStep = 1; // Set the initial step to 1
showStep(currentStep); // Display the first step

// Search functionality for the dropdown
const services = [
  "Web Development",
  "App Development",
  "Graphic Design",
  "SEO Optimization",
  "Digital Marketing",
  "Content Writing",
  "Data Analysis",
  "Video Editing",
  "3D Animation",
  "Social Media Management",
  "Copywriting",
  "Brand Strategy",
  "Business Consulting",
  "E-Commerce Development",
  "Web Design",
  "Mobile App Design",
  "Logo Design",
  "Photography Services",
  "Event Management",
  "Online Advertising",
  "Public Relations",
  "Virtual Assistance",
  "Email Marketing",
  "Project Management",
  "Market Research",
  "Cloud Solutions",
  "UX/UI Testing",
  "CRM Development",
  "SEO Audits",
  "Affiliate Marketing",
  "App Localization",
  "IT Support",
  "Tech Support",
  "Video Production",
  "App Maintenance",
  "Hosting Services"
];


const searchInput = document.getElementById('search'); // Search input field
const resultsContainer = document.getElementById('results'); // Container for search results
const chev = document.getElementById('chev'); // Chevron icon for toggling dropdown

// Function to filter and display services based on search query
function searchService() {
  const query = searchInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive matching
  resultsContainer.innerHTML = ""; // Clear previous search results

  const filteredServices = services.filter(service => service.toLowerCase().includes(query)); // Filter services by query

  // Display filtered services or "No results found"
  if (filteredServices.length > 0) {
    filteredServices.forEach(service => {
      const item = document.createElement('div'); // Create a div for each service
      item.classList.add('item'); // Add a class for styling
      item.textContent = service; // Set the service name as text
      item.onclick = () => selectService(service); // Add click event to select service
      resultsContainer.appendChild(item); // Append the service item to the container
    });
  } else {
    const noResultItem = document.createElement('div'); // Create a div for "No results found"
    noResultItem.classList.add('item'); // Add a class for styling
    noResultItem.textContent = "No results found"; // Set the text
    resultsContainer.appendChild(noResultItem); // Append to the container
  }
}

// Function to select a service and fill it in the search input
function selectService(service) {
  searchInput.value = service; // Set the selected service in the input field
  resultsContainer.innerHTML = ""; // Clear the search results
}

// Add an event listener to the search input to display results when clicked
searchInput.addEventListener('click', () => {
  resultsContainer.style.display = "block"; // Show the dropdown when input is clicked
  searchService(); // Call the search service function to display the options
});

// Add event listener to handle input changes and filter the dropdown content
searchInput.addEventListener('input', searchService);

// Toggle the visibility of the search results when the chevron icon is clicked
chev.addEventListener('click', () => {
  resultsContainer.style.display = resultsContainer.style.display === "block" ? "none" : "block";
});
// Function to display the modal upon form completion
function showModal() {
  const modal = document.getElementById('modal'); // Get the modal element
  modal.style.display = 'block'; // Set the modal to be visible
}

// Event listener for closing the modal and resetting the form
document.getElementById('closeModalBtn').addEventListener('click', function () {
  const modal = document.getElementById('modal'); // Get the modal element
  modal.style.display = 'none'; // Hide the modal
  resetForm(); // Reset the form fields and step
});

// Prevent default form submission and show modal on submit
document.getElementById('multiStepForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default behavior of form submission
  resetForm(); // Reset all form fields
  showModal(); // Display the modal
});

// Function to reset the form to its initial state
function resetForm() {
  const form = document.getElementById('multiStepForm'); // Get the form element
  form.reset(); // Clear all form inputs
  currentStep = 1; // Reset to the first step
  showStep(currentStep); // Display the first step
}

// Initialize the phone number input with intl-tel-input library
window.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.querySelector("#phone"); // Get the phone input field
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "us", // Set the default country to the US
    separateDialCode: true, // Display the country code separately
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js" // Include the utils script for formatting
  });

  // Example: Get the selected country code and formatted phone number
  const countryCode = iti.getSelectedCountryData().dialCode; // Get the dial code
  const phoneNumber = iti.getNumber(); // Get the full phone number
});
