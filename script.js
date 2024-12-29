let currentStep = 1; // Başlangıç adımı

// Adımları göstermek ve zaman çizelgesini güncellemek için kullanılan fonksiyon
function showStep(step) {
  // Tüm adımları gizle
  document.querySelectorAll('.form-step').forEach((stepElement) => {
    stepElement.classList.remove('active');
  });
  
  // Geçerli adımdaki formu göster
  document.getElementById(`step${step}`).classList.add('active');
  
  // Zaman çizelgesindeki adımları güncelle
  for (let i = 1; i <= 5; i++) {
    const stepElement = document.getElementById(`timeline-step${i}`);
    if (i < step) {
      stepElement.classList.add('completed');
      stepElement.classList.remove('active');
    } else if (i === step) {
      stepElement.classList.add('active');
      stepElement.classList.remove('completed');
    } else {
      stepElement.classList.remove('completed');
      stepElement.classList.remove('active');
    }
  }
}

// Bir sonraki adıma geçmek için kullanılan fonksiyon
function nextStep(step) {
  if (validateStep(currentStep)) { // Mevcut adımı doğrula
    currentStep = step;
    showStep(step); // Geçerli adıma geçiş
  }
}

// Bir önceki adıma geri dönmek için kullanılan fonksiyon
function prevStep(step) {
  currentStep = step;
  showStep(step); // Geçerli adıma geri dön
}

// Adımda zorunlu alanları kontrol etmek için kullanılan fonksiyon
function validateStep(step) {
  const currentStepElement = document.getElementById(`step${step}`);
  const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
  
  // Zorunlu alanların tümü dolu mu kontrol et
  for (let input of inputs) {
    if (!input.value) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return false; // Eğer boş alan varsa geçişi engelle
    }
  }
  
  return true; // Tüm zorunlu alanlar doluysa geçişi sağla
}

// Sayfa yüklendiğinde başlangıç adımını göster
showStep(currentStep);
