let currentStep = 1; // Başlangıç adımı

// Toplam adım sayısını belirleyin
const totalSteps = document.querySelectorAll(".form-step").length;

// Adım değiştirici fonksiyon
function showStep(step, direction = "forward") {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const nextStepElement = document.getElementById(`step${step}`);

  // Mevcut adımı gizle
  currentStepElement.classList.remove("active");
  if (currentStep <= 6) {
    currentStepElement.classList.add(
      direction === "forward" ? "slide-out-left" : "slide-out-right"
    );
  }

  // Yeni adımı göster
  nextStepElement.classList.add("active");
  if (step <= 6) {
    nextStepElement.classList.add(
      direction === "forward" ? "slide-in-right" : "slide-in-left"
    );
  }

  // Geçiş tamamlanınca sınıfları sıfırla
  setTimeout(() => {
    currentStepElement.classList.remove("slide-out-left", "slide-out-right");
    nextStepElement.classList.remove("slide-in-left", "slide-in-right");
  }, 600); // CSS animasyon süresi ile senkronize olmalı

  currentStep = step; // Geçerli adımı güncelle
}

function completeForm() {
  // Modalı göster
  showModal();
}

// İleri adım
function nextStep() {
  if (validateStep(currentStep)) {
    const nextStep = currentStep + 1;

    // Step 6'ya özel durum
    if (currentStep === 6) {
      completeForm(); // Formu sıfırla ve modalı göster
      return; // İşlemi bitir
    }

    if (nextStep > totalSteps) {
      showModal(); // Son adımda modal göster
    } else {
      showStep(nextStep); // Bir sonraki adıma geç
    }
  }
}

// Geri adım
function prevStep() {
  const prevStep = currentStep - 1;
  if (prevStep >= 1) {
    showStep(prevStep, "backward");
  }
}

const searchField = document.getElementById("search"); // Get the search input element
const container = document.getElementById("container"); // Get the container element that wraps the input and dropdown
const firstStepTitle = document.getElementById("firstStepTitle"); // Get the container element for the title of the first step

let isMovedUp = false; // To track if the container is already moved up

// Listen for the click event on the search input field
searchField.addEventListener("click", function () {
  if (window.innerWidth <= 768 && !isMovedUp) { // Only apply for mobile screens and when the container is not already moved
    document.body.style.position = "relative"; // Ensure the body is in relative position
    container.style.transform = "translateY(-140px)"; // Move the entire container up by 140px
    isMovedUp = true; // Mark that the container has been moved up
  }
});

// Listen for when the user clicks anywhere outside the search input field
document.addEventListener("click", function (event) {
  if (!searchField.contains(event.target) && isMovedUp) {
    container.style.transform = "translateY(0)"; // Reset the container position
    isMovedUp = false; // Mark that the container has been reset
  }
});


// Validation logic for each step
function validateStep(step) {
  const currentStepElement = document.getElementById(`step${step}`);
  const inputs = currentStepElement.querySelectorAll("input[required]");

  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Please fill out all required fields.");
      return false;
    }
  }

  // Special validation for step 5 (checkbox validation)
  if (step === 5) {
    const checkboxes = currentStepElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    if (!Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
      alert("Please select at least one additional feature.");
      return false;
    }
  }

  // Special validation for step 6 (terms and conditions checkbox)
  if (step === 6) {
    const termsCheckbox = document.getElementById("terms");
    if (!termsCheckbox.checked) {
      alert("You must accept the terms and conditions to proceed.");
      return false;
    }
  }

  return true;
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideSearchInput = searchInput.contains(event.target);
  const isClickInsideResults = resultsContainer.contains(event.target);
  const isClickInsideChevron = chev.contains(event.target);

  if (
    !isClickInsideSearchInput &&
    !isClickInsideResults &&
    !isClickInsideChevron
  ) {
    resultsContainer.style.display = "none"; // Hide the dropdown
  }
});

// Update the displayed range input value dynamically
const rangeInput = document.getElementById("rangeInput"); // Range input element
const rangeValue = document.getElementById("rangeValue"); // Element to display the range value

rangeInput.addEventListener("input", function () {
  rangeValue.textContent = rangeInput.value; // Update the displayed value whenever the range input changes
});

// Initialize the first step when the page loads
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
  "Hosting Services",
];

const searchInput = document.getElementById("search"); // Search input field
const resultsContainer = document.getElementById("results"); // Container for search results
const chev = document.getElementById("chev"); // Chevron icon for toggling dropdown

// Function to filter and display services based on search query
function searchService() {
  const query = searchInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive matching
  resultsContainer.innerHTML = ""; // Clear previous search results

  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(query)
  ); // Filter services by query

  // Display filtered services or "No results found"
  if (filteredServices.length > 0) {
    filteredServices.forEach((service) => {
      const item = document.createElement("div"); // Create a div for each service
      item.classList.add("item"); // Add a class for styling
      item.textContent = service; // Set the service name as text
      item.onclick = () => selectService(service); // Add click event to select service
      resultsContainer.appendChild(item); // Append the service item to the container
    });
  } else {
    const noResultItem = document.createElement("div"); // Create a div for "No results found"
    noResultItem.classList.add("item"); // Add a class for styling
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
searchInput.addEventListener("click", () => {
  resultsContainer.style.display = "block"; // Show the dropdown when input is clicked
  searchService(); // Call the search service function to display the options
});

// Add event listener to handle input changes and filter the dropdown content
searchInput.addEventListener("input", searchService);

// Toggle the visibility of the search results when the chevron icon is clicked
chev.addEventListener("click", () => {
  resultsContainer.style.display =
    resultsContainer.style.display === "block" ? "none" : "block";
});

function showModal() {
  // Show modal and overlay
  document.getElementById("modal").style.display = "block";
}

document.getElementById("closeModalBtn").addEventListener("click", function () {
  // Hide modal and overlay
  document.getElementById("modal").style.display = "none";

  // Trigger form submission programmatically
  document.getElementById("multiStepForm").submit();

  // Reload the page after form submission
  location.reload();
});

// Prevent default form submission and show modal on submit
document
  .getElementById("multiStepForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default behavior of form submission
    resetForm(); // Reset all form fields
    showModal(); // Display the modal
  });

// Function to reset the form to its initial state
function resetForm() {
  const form = document.getElementById("multiStepForm"); // Get the form element
  form.reset(); // Clear all form inputs
  currentStep = 1; // Reset to the first step
  showStep(currentStep); // Display the first step
}

// Initialize the phone number input with intl-tel-input library
window.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector("#phone"); // Get the phone input field
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "us", // Set the default country to the US
    separateDialCode: true, // Display the country code separately
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js", // Include the utils script for formatting
  });

  // Example: Get the selected country code and formatted phone number
  const countryCode = iti.getSelectedCountryData().dialCode; // Get the country dial code
  const formattedPhoneNumber = iti.getNumber(); // Get the formatted phone number
  console.log(countryCode, formattedPhoneNumber); // Log to console for testing
});



