let currentStep = 1; // Start from Step 1

// Function to show the current step
function showStep(step) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach((stepElement) => {
    stepElement.classList.remove('active');
  });
  
  // Show the current step
  document.getElementById(`step${step}`).classList.add('active');
}

// Function to move to the next step
function nextStep(step) {
  if (validateStep(currentStep)) { // Validate current step
    currentStep = step;
    showStep(step);
  }
}

// Function to go back to the previous step
function prevStep(step) {
  currentStep = step;
  showStep(step);
}

// Validate the current step
function validateStep(step) {
  const currentStepElement = document.getElementById(`step${step}`);
  const inputs = currentStepElement.querySelectorAll('input[required]');
  
  // Check if all required fields are filled
  for (let input of inputs) {
    if (!input.value) {
      alert('Please fill out all required fields.');
      return false; // Prevent moving to the next step if a field is empty
    }
  }
  
  return true; // Allow moving to the next step if all required fields are filled
}

// Update the range input value
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');

rangeInput.addEventListener('input', function () {
  rangeValue.textContent = rangeInput.value; // Update the range value
});

// Show the first step on page load
showStep(currentStep);


// Sample data for demonstration
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

// Function to filter and display results based on the search input
function searchService() {
  const query = searchInput.value.toLowerCase();
  resultsContainer.innerHTML = ""; // Clear previous results

  // Filter services based on the query
  const filteredServices = services.filter(service => service.toLowerCase().includes(query));

  // Display results
  if (filteredServices.length > 0) {
    filteredServices.forEach(service => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.textContent = service;
      item.onclick = () => selectService(service); // Click handler to select a service
      resultsContainer.appendChild(item);
    });
  } else {
    const noResultItem = document.createElement('div');
    noResultItem.classList.add('item');
    noResultItem.textContent = "No results found";
    resultsContainer.appendChild(noResultItem);
  }
}

// Function to handle the selection of a service
function selectService(service) {
  searchInput.value = service; // Set the input to the selected service
  resultsContainer.innerHTML = ""; // Clear results after selection
}

// Event listener for input field to search as the user types
searchInput.addEventListener('input', searchService);

// Optional: Toggle result container visibility when clicking the chevron
chev.addEventListener('click', () => {
  resultsContainer.style.display = resultsContainer.style.display === "block" ? "none" : "block";
});
