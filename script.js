// Function to show the current step
function showStep(step) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(stepElement => {
    stepElement.classList.remove('active');
  });

  // Show the active step
  document.getElementById(`step${step}`).classList.add('active');
}

// Move to the next step
function nextStep(step) {
  // Validate the current step
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
  const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');

  // Check if all required fields are filled
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert('Please fill out all required fields.');
      return false;
    }
  }
  return true;
}

// Show modal after form submission
function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Show modal when form is complete
}

// Close modal and reset the form after modal close
document.getElementById('closeModalBtn').addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none'; // Hide modal

  resetForm(); // Reset form after modal close
  showStep(1); // Go back to Step 1
});

// Reset the form and move to Step 1
function resetForm() {
  const form = document.getElementById('multiStepForm');
  form.reset(); // Reset all form fields

  // Reset all form steps' active classes
  document.querySelectorAll('.form-step').forEach(stepElement => {
    stepElement.classList.remove('active');
  });

  currentStep = 1; // Reset to Step 1
  showStep(currentStep); // Show Step 1 after reset
}

// Initialize the first step and form validation
let currentStep = 1;
showStep(currentStep); // Initial setup to show Step 1

// Initialize phone number input with country code using intl-tel-input
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phone');
  window.intlTelInput(phoneInput, {
    initialCountry: 'us',
    preferredCountries: ['us', 'gb', 'ca'],
    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js', // Required for validation
  });
});

// Update the selected budget value based on the slider
document.getElementById('rangeInput').addEventListener('input', function() {
  document.getElementById('rangeValue').textContent = this.value;
});

// Dropdown search (for Step 6)
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  const services = ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Digital Marketing'];
  const filteredServices = services.filter(service => service.toLowerCase().includes(query));

  filteredServices.forEach(service => {
    const div = document.createElement('div');
    div.textContent = service;
    resultsContainer.appendChild(div);
  });
});

// Toggle dropdown visibility
document.getElementById('chev').addEventListener('click', function() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.style.display = resultsContainer.style.display === 'none' || resultsContainer.style.display === '' ? 'block' : 'none';
});
