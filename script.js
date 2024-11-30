// Қызмет туралы ақпараттар
const serviceDetails = {
  facelift: {
    title: 'Бет Лифтинг',
    description: 'Бет лифтинг – бұл терінің серпімділігін қалпына келтіріп, әжімдерден арылуға арналған процедура. Ол сіздің бет пішініңізді жасартуға көмектеседі.'
  },
  rhinoplasty: {
    title: 'Мұрын Пластикасы',
    description: 'Мұрын пластикасы (ринопластика) – мұрынның формасын түзетіп, беттің жалпы эстетикасын жақсартатын хирургиялық процедура.'
  },
  liposuction: {
    title: 'Липосакция',
    description: 'Липосакция – бұл дененің әртүрлі аймақтарындағы артық майларды жоюға арналған хирургиялық процедура.'
  }
};

// Модаль элементтер
const modal = document.getElementById('details-modal');
const modalTitle = document.getElementById('details-title');
const modalDescription = document.getElementById('details-description');
const closeModalBtn = document.querySelector('.close-btn');

// "Толығырақ" батырмаларын басу
document.querySelectorAll('.btn-more').forEach((button) => {
  button.addEventListener('click', () => {
    const serviceKey = button.getAttribute('data-service');
    const details = serviceDetails[serviceKey];

    if (details) {
      modalTitle.textContent = details.title;
      modalDescription.textContent = details.description;
      modal.classList.add('show');
    }
  });
});

// Модальды жабу
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

// Терезеден тыс жерді басқанда жабу
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('show');
  }
});




// Тест бастау батырмасын басу
function startTest() {
  const question = confirm('Сіз теріңіздің серпімділігін жақсартқыңыз келе ме?');
  const result = question
    ? 'Бет Лифтинг процедурасын ұсынамыз.'
    : 'Сізге басқа процедуралар қажет болуы мүмкін. Бізбен байланысыңыз!';
  document.getElementById('test-result').innerText = result;
  document.getElementById('test-modal').style.display = 'block';
}

function closeTest() {
  document.getElementById('test-modal').style.display = 'none';
}




const questions = [
  {
    question: "Сіз теріңіздің серпімділігін жақсартқыңыз келе ме?",
    options: ["Иә", "Жоқ"],
    procedure: "Бет лифтинг",
  },
  {
    question: "Сіз мұрын формасын өзгерткіңіз келе ме?",
    options: ["Иә", "Жоқ"],
    procedure: "Мұрын пластикасы",
  },
  {
    question: "Сіз артық майлардан арылуды қалайсыз ба?",
    options: ["Иә", "Жоқ"],
    procedure: "Липосакция",
  },
];

let currentQuestionIndex = 0;
let selectedProcedures = [];

function startTest() {
  currentQuestionIndex = 0;
  selectedProcedures = [];
  document.getElementById("test-container").innerHTML = "";
  loadQuestion();
  document.getElementById("test-modal").classList.add("show");
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  const container = document.getElementById("test-container");
  container.innerHTML = `
    <p>${question.question}</p>
    <div class="test-options">
      ${question.options
        .map(
          (option, index) =>
            `<button class="btn-option" onclick="selectOption(${index})">${option}</button>`
        )
        .join("")}
    </div>
  `;
}

function selectOption(index) {
  const question = questions[currentQuestionIndex];
  if (index === 0) {
    selectedProcedures.push(question.procedure);
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const container = document.getElementById("test-container");
  const uniqueProcedures = [...new Set(selectedProcedures)];
  if (uniqueProcedures.length > 0) {
    container.innerHTML = `
      <h3>Сізге келесі процедуралар ұсынылады:</h3>
      <ul>
        ${uniqueProcedures
          .map((procedure) => `<li>${procedure}</li>`)
          .join("")}
      </ul>
    `;
  } else {
    container.innerHTML = "<p>Сізге ешқандай процедура қажет емес.</p>";
  }
  document.getElementById("next-question").style.display = "none";
}

// "Толығырақ" батырмаларын таңдау
document.querySelectorAll(".btn-discount").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Батырманың ата-анасындағы жеңілдік ақпаратын алу
    const discountCard = e.target.closest(".discount-card");
    const service = discountCard.querySelector("h3").innerText;
    const discount = discountCard.dataset.discount;

    // Нөмір қалдыру бөлімін көрсету
    const contactSection = document.getElementById("contact");
    contactSection.classList.remove("hidden");

    // Форманың "Қосымша ақпарат" өрісіне жеңілдік пен қызмет атауын енгізу
    const messageField = document.getElementById("user-message");
    messageField.value = `Қызмет: ${service}\nЖеңілдік: ${discount}`;

    // Нөмір қалдыру бөліміне жылжу
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
});


function closeTest() {
  document.getElementById("test-modal").classList.remove("show");
}
// "Таңдау" батырмасын басқанда нөмір қалдыру бөліміне ауысу
document.querySelectorAll(".btn-select").forEach((button) => {
  button.addEventListener("click", (e) => {
    const service = e.target.dataset.service; // Батырмадағы қызмет атауы

    // Нөмір қалдыру бөлімін көрсету
    const contactSection = document.getElementById("contact");
    contactSection.classList.remove("hidden"); // Жасырылған бөлімді көрсету

    // Қызмет атауын форма өрісіне енгізу
    const messageField = document.getElementById("user-message");
    messageField.value = `Қызмет: ${service}`;

    // Нөмір қалдыру бөліміне ауысу
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
});

let currentPage = 0; // Қазіргі бет нөмірі
const reviewBook = document.querySelector(".review-book");

// Алдыңғы/Келесі беттерді көрсету
function updatePages() {
  const pages = document.querySelectorAll(".review-page");
  pages.forEach((page, index) => {
    page.classList.remove("active");
    if (index === currentPage) {
      page.classList.add("active");
    }
  });
}

// Алдыңғы батырма
document.querySelector(".btn-prev").addEventListener("click", () => {
  const pages = document.querySelectorAll(".review-page");
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  updatePages();
});

// Келесі батырма
document.querySelector(".btn-next").addEventListener("click", () => {
  const pages = document.querySelectorAll(".review-page");
  currentPage = (currentPage + 1) % pages.length;
  updatePages();
});

// Жаңа пікір қосу
document.getElementById("review-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const text = document.getElementById("review-text").value.trim();
  const author = document.getElementById("review-author").value.trim();

  // Тексеру: мәтін мен автор толтырылған ба
  if (!text || !author) {
    alert("Пікір мен атыңызды толтырыңыз!");
    return;
  }

  // Жаңа пікір жасау
  const newReview = document.createElement("div");
  newReview.className = "review-page";
  newReview.innerHTML = `
    <p class="review-text">"${text}"</p>
    <p class="review-author">- ${author}</p>
  `;

  // Жаңа пікірді кітапқа қосу
  reviewBook.appendChild(newReview);

  // Барлық беттерді қайта алу және соңғы бетке ауысу
  const pages = document.querySelectorAll(".review-page");
  currentPage = pages.length - 1; // Соңғы бетке ауысу
  updatePages();

  // Форманы тазалау
  document.getElementById("review-form").reset();

  alert("Сіздің пікіріңіз сәтті қосылды!");
});

// Алғашқы бет жаңарту
updatePages();



document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("user-name").value.trim();
  const phone = document.getElementById("user-phone").value.trim();
  const message = document.getElementById("user-message").value.trim();

  if (!name || !phone) {
    alert("Атыңызды және телефон нөміріңізді толтырыңыз!");
    return;
  }

  // Telegram Bot Token және Chat ID
  const botToken = "7258929771:AAHCEau9m5j_cVN4RDHuvwIbP-B7ZB5flMw"; // Өз Bot Token
  const chatId = "7563746123"; // Өз Chat ID
  const text = `📞 Жаңа өтініш:\n\n👤 Аты: ${name}\n📱 Телефон: ${phone}\n✉️ Хабарлама: ${message || "Жоқ"}`;

  // Telegram API-ға хабарлама жіберу
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      }
    );

    if (response.ok) {
      // Хабарлама жіберілсе
      alert("Сіздің өтінішіңіз қабылданды!");
      document.getElementById("contact-form").reset();
    } else {
      // Қате болса
      alert("Өтінішті жіберу кезінде қате болды.");
    }
  } catch (error) {
    alert("Қосылу кезінде қате болды. Қайта көріңіз.");
    console.error(error);
  }
});
