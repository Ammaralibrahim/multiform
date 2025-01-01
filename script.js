// Function to show the current step
function showStep(step) {
  document.querySelectorAll('.form-step').forEach(stepElement => {
    stepElement.classList.remove('active');
  });
  document.getElementById(`step${step}`).classList.add('active');
}

// Move to the next step
function nextStep(step) {
  if (validateStep(currentStep)) {
    currentStep = step;
    showStep(step);

    // If the last step is reached (Step 7), show the modal
    if (step === 7) {
      showModal(); // Show modal on step 7
    }
  }
}

// Move to the previous step
function prevStep(step) {
  currentStep = step;
  showStep(step);
}

// Validate the current step
function validateStep(step) {
  const currentStepElement = document.getElementById(`step${step}`);
  const inputs = currentStepElement.querySelectorAll('input[required]');
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert('Please fill out all required fields.');
      return false;
    }
  }
  return true;
}

// Update the range input value
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');

rangeInput.addEventListener('input', function () {
  rangeValue.textContent = rangeInput.value; // Update the range value
});

// Show the first step on page load
let currentStep = 1; // Start from Step 1
showStep(currentStep);

// Search functionality for dropdown
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

function searchService() {
  const query = searchInput.value.toLowerCase();
  resultsContainer.innerHTML = "";

  const filteredServices = services.filter(service => service.toLowerCase().includes(query));

  if (filteredServices.length > 0) {
    filteredServices.forEach(service => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.textContent = service;
      item.onclick = () => selectService(service);
      resultsContainer.appendChild(item);
    });
  } else {
    const noResultItem = document.createElement('div');
    noResultItem.classList.add('item');
    noResultItem.textContent = "No results found";
    resultsContainer.appendChild(noResultItem);
  }
}

function selectService(service) {
  searchInput.value = service;
  resultsContainer.innerHTML = "";
}

searchInput.addEventListener('input', searchService);

chev.addEventListener('click', () => {
  resultsContainer.style.display = resultsContainer.style.display === "block" ? "none" : "block";
});

// Show the modal
function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Close the modal and reset to step 1
document.getElementById('closeModalBtn').addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  resetForm(); // Reset form when modal closes
});

// Form submission handler
document.getElementById('multiStepForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission
  resetForm(); // Reset the form
  showModal(); // Show modal
});

// Function to reset the form
function resetForm() {
  const form = document.getElementById('multiStepForm');
  form.reset(); // Reset all form fields
  currentStep = 1; // Reset to step 1
  showStep(currentStep); // Show step 1
}


window.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.querySelector("#phone");
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "us", // default country
    separateDialCode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js" // for formatting
  });

  // To get the country code and phone number
  const countryCode = iti.getSelectedCountryData().dialCode;
  const phoneNumber = iti.getNumber();
});
