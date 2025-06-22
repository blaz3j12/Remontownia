document.addEventListener("DOMContentLoaded", () => {
  // === NAWIGACJA SEKCJI ===
  const links = document.querySelectorAll("nav ul.nav-links a, .footer-link, a[data-section]");
  const sections = document.querySelectorAll("main .section");
  const logo = document.querySelector(".logo");

const consentPopup = document.getElementById('cookieConsent');
  const btnChangeDecision = document.getElementById('btnChangeDecision');

    btnChangeDecision.addEventListener("click", () => {
      console.log("Kliknięto przycisk zmiany decyzji");
      consentPopup.classList.remove("hidden");
    });

  function showSection(id) {
    sections.forEach(section => section.classList.remove("active"));
    const targetSection = document.getElementById(id);
    if (targetSection) targetSection.classList.add("active");

    links.forEach(link => {
      link.classList.toggle("active", link.dataset.section === id);
    });

    window.scrollTo(0, 0);
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.dataset.section;
      if (target) showSection(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if (logo) {
    logo.addEventListener("click", () => {
      showSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === COOKIES POPUP ===
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("rejectCookies");
  const form = document.getElementById("myForm");

function disablePage() {
  if (form) {
    form.style.display = "none"; // Ukrywamy formularz
    
    // Tworzymy komunikat, jeśli jeszcze nie istnieje
    let message = document.getElementById("cookieBlockedMessage");
    if (!message) {
        message = document.createElement("div");
        message.id = "cookieBlockedMessage";
        message.style.padding = "20px";
        message.style.backgroundColor = "#f8d7da";
        message.style.color = "#721c24";
        message.style.border = "1px solid #f5c6cb";
        message.style.borderRadius = "5px";
        message.style.marginTop = "10px";
        message.style.fontWeight = "bold";
        message.style.textAlign = "center";          // wyśrodkowanie tekstu
        message.style.maxWidth = "400px";             // maksymalna szerokość komunikatu
        message.style.marginLeft = "auto";            // wyśrodkowanie poziome elementu
        message.style.marginRight = "auto";           // wyśrodkowanie poziome elementu
        message.innerHTML = 'Ta treść jest niedostępna bez zgody na <a href="#" id="moreInf" class="footer-link" data-section="polityka-cookies">pliki cookies</a>.';
      form.parentNode.insertBefore(message, form.nextSibling);
    }
  }

  document.getElementById('moreInf').addEventListener('click', e => {
  e.preventDefault();
  // np. pokaz sekcję polityka-cookies:
  showSection('polityka-cookies');
});

  // Nakładka blokująca resztę strony (jak poprzednio)
  let blocker = document.getElementById("blocker");
  if (!blocker) {
    blocker = document.createElement("div");
    blocker.id = "blocker";
    blocker.style.position = "fixed";
    blocker.style.top = 0;
    blocker.style.left = 0;
    blocker.style.width = "100vw";
    blocker.style.height = "100vh";
    blocker.style.backgroundColor = "rgba(255,255,255,0.95)";
    blocker.style.zIndex = "9999";
    blocker.style.display = "flex";
    blocker.style.flexDirection = "column";
    blocker.style.justifyContent = "center";
    blocker.style.alignItems = "center";
    blocker.innerHTML = `
      <h2>Nie wyraziłeś zgody na pliki cookies</h2>
      <p>Niektóre funkcje strony zostały wyłączone.</p>
      <div class="cookie-block-buttons">
        <button id="goBack">Zmień decyzję</button>
        <button id="continueAnyway">Kontynuuj</button>
      </div>
    `;
    document.body.appendChild(blocker);

    document.getElementById("goBack").addEventListener("click", () => {
      blocker.style.display = "none";
      consentPopup.classList.remove("hidden");
    });

    document.getElementById("continueAnyway").addEventListener("click", () => {
      blocker.style.display = "none";
      document.body.classList.add('block-links');
      // Formularz pozostaje ukryty z komunikatem
    });
  } else {
    blocker.style.display = "flex";
  }
}


  const decision = localStorage.getItem("cookieConsent");

  if (!decision) {
    consentPopup?.classList.remove("hidden");
  } else if (decision === "declined") {
    disablePage();
  } else if (decision === "accepted") {
    // Załaduj tylko jeśli użytkownik się zgodził (np. Google Analytics, YouTube itp.)
    // Można tu umieścić np. dynamiczne załadowanie Google Analytics lub innych usług
    console.log("Cookies accepted – można załadować zewnętrzne skrypty");
  }

  acceptBtn?.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    consentPopup?.classList.add("hidden");
    location.reload(); // przeładuj stronę, aby załadować zewnętrzne skrypty jeśli trzeba
  });

  declineBtn?.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined");
    consentPopup?.classList.add("hidden");
    disablePage();
    document.body.classList.add('block-links');
  });

document.getElementById('moreInfo').addEventListener('click', function(event) {
  event.preventDefault();
  
  consentPopup.classList.add("hidden");
  
  document.body.classList.add('block-links');
});

document.getElementById('logo').addEventListener('click', (e) => {
  e.preventDefault();       // blokujemy domyślne działanie jeśli trzeba
  window.location.href = 'index.html';  // przejście i odświeżenie strony
});
  

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      imie: document.getElementById("imieInput").value.trim(),
      email: document.getElementById("emailInput").value.trim(),
      wiadomosc: document.getElementById("wiadomoscInput").value.trim(),
    };

    fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Wiadomość wysłana!");
          form.reset();
          showSection("home");
        } else {
          alert("Błąd podczas wysyłania wiadomości.");
        }
      })
      .catch((error) => {
        alert("Błąd sieci: " + error);
      });
  });
}


        // script.js

// script.js

const calendarGrid = document.getElementById("calendar-grid");
const yearDisplay = document.getElementById("year-display");
const monthDisplay = document.getElementById("month-display");
const adminPanel = document.getElementById("admin-panel");
const adminCalendar = document.getElementById("admin-calendar");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const confirmBtn = document.getElementById("confirm-btn");
const dateList = document.getElementById("date-list");

// Nowe elementy dla panelu admina
const adminPrevBtn = document.getElementById("admin-prev-month");
const adminNextBtn = document.getElementById("admin-next-month");
const adminMonthDisplay = document.getElementById("admin-month-display");

let unavailableRanges = JSON.parse(localStorage.getItem("unavailableRanges") || "[]");
let currentDate = new Date(); // dzisiejsza data
let viewedMonth = new Date(currentDate); // miesiąc w widoku użytkownika
let adminViewedMonth = new Date(currentDate); // miesiąc wyświetlany w panelu admina

let adminStartDate = null;
let adminEndDate = null;

const secretCode = "admin123";
let inputBuffer = "";

// Funkcje pozostają bez zmian...

// 🔧 Lokalny format daty: YYYY-MM-DD
function toLocalDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 📦 Sprawdza, czy dana data znajduje się w jednym z zablokowanych zakresów
function isDateInUnavailableRanges(dateStr) {
  const date = new Date(dateStr);
  return unavailableRanges.some(range => {
    return new Date(range.start) <= date && date <= new Date(range.end);
  });
}

// 🧑‍💼 Ukryty kod do odblokowania panelu admina
document.addEventListener("keydown", (e) => {
  if (e.key.length === 1) inputBuffer += e.key;
  if (inputBuffer.length > secretCode.length) {
    inputBuffer = inputBuffer.slice(-secretCode.length);
  }

  if (inputBuffer === secretCode) {
    adminPanel.classList.add("visible");
    adminPanel.style.display = "block";
    generateCalendar(new Date(), adminCalendar, true);
    renderDateList();
    updateAdminMonthDisplay();
    alert("Panel administratora odblokowany!");
  }
});

// 📅 Generowanie kalendarza (dla użytkownika lub admina)
function generateCalendar(baseDate, container, isAdmin = false) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  if (!isAdmin) {
    yearDisplay.textContent = year;
    monthDisplay.textContent = baseDate.toLocaleString("pl-PL", {
      month: "long"
    }).replace(/^\w/, c => c.toUpperCase());
  } else {
    // Dla admina nie ustawiamy yearDisplay, ale aktualizujemy nagłówek admina
    adminMonthDisplay.textContent = `${baseDate.toLocaleString("pl-PL", { month: "long" }).replace(/^\w/, c => c.toUpperCase())} ${year}`;
  }

  container.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = firstDay.getDay() || 7;

  for (let i = 1; i < firstWeekday; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    container.appendChild(empty);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dateStr = toLocalDateString(date);
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = day;

    if (isDateInUnavailableRanges(dateStr)) {
      dayDiv.classList.add("unavailable");
    }

    const todayStr = toLocalDateString(currentDate);
    if (!isAdmin && dateStr === todayStr) {
      dayDiv.classList.add("today");
    }

    if (isAdmin) {
      dayDiv.addEventListener("click", () => handleAdminDateClick(dateStr, dayDiv));
    }

    container.appendChild(dayDiv);
  }

  // 🔄 Przycisk cofania tylko jeśli nie jesteśmy w bieżącym miesiącu (tylko w widoku użytkownika)
  if (!isAdmin) {
    prevBtn.style.display = isSameMonth(viewedMonth, currentDate) ? "none" : "inline-block";
  }
}

// 📆 Porównywanie miesięcy
function isSameMonth(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

// 🔁 Nawigacja miesiącami dla użytkownika
prevBtn.addEventListener("click", () => {
  viewedMonth.setMonth(viewedMonth.getMonth() - 1);
  generateCalendar(viewedMonth, calendarGrid);
});

nextBtn.addEventListener("click", () => {
  viewedMonth.setMonth(viewedMonth.getMonth() + 1);
  generateCalendar(viewedMonth, calendarGrid);
});

// 🔁 Nawigacja miesiącami dla panelu admina
adminPrevBtn.addEventListener("click", () => {
  adminViewedMonth.setMonth(adminViewedMonth.getMonth() - 1);
  generateCalendar(adminViewedMonth, adminCalendar, true);
  updateAdminMonthDisplay();
});

adminNextBtn.addEventListener("click", () => {
  adminViewedMonth.setMonth(adminViewedMonth.getMonth() + 1);
  generateCalendar(adminViewedMonth, adminCalendar, true);
  updateAdminMonthDisplay();
});

// Aktualizacja nagłówka miesiąca i roku w panelu admina
function updateAdminMonthDisplay() {
  const year = adminViewedMonth.getFullYear();
  const monthName = adminViewedMonth.toLocaleString("pl-PL", { month: "long" }).replace(/^\w/, c => c.toUpperCase());
  adminMonthDisplay.textContent = `${monthName} ${year}`;
}

// 📌 Zaznaczanie dat w panelu admina
function handleAdminDateClick(dateStr, el) {
  if (!adminStartDate) {
    adminStartDate = dateStr;
    el.classList.add("selected");
  } else if (!adminEndDate) {
    adminEndDate = dateStr;
    el.classList.add("selected");
  } else {
    adminStartDate = dateStr;
    adminEndDate = null;
    adminCalendar.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"));
    el.classList.add("selected");
  }
}

// ✅ Zatwierdzenie zakresu dat przez admina
confirmBtn.addEventListener("click", () => {
  if (!adminStartDate || !adminEndDate) {
    alert("Wybierz datę początkową i końcową.");
    return;
  }

  const start = new Date(adminStartDate);
  const end = new Date(adminEndDate);

  if (end < start) {
    alert("Data końcowa nie może być przed początkową.");
    return;
  }

  unavailableRanges.push({
    start: toLocalDateString(start),
    end: toLocalDateString(end),
  });

  localStorage.setItem("unavailableRanges", JSON.stringify(unavailableRanges));
  adminStartDate = null;
  adminEndDate = null;

  generateCalendar(viewedMonth, calendarGrid);
  generateCalendar(adminViewedMonth, adminCalendar, true);
  renderDateList();
});

// 📃 Wyświetlanie listy zablokowanych zakresów z opcją usuwania
function renderDateList() {
  dateList.innerHTML = "";
  const sorted = [...unavailableRanges].sort((a, b) => new Date(a.start) - new Date(b.start));

  sorted.forEach(range => {
    const li = document.createElement("li");
    const start = new Date(range.start);
    const end = new Date(range.end);

    const startLabel = `${start.getDate()} ${start.toLocaleString("pl-PL", { month: "long" })}`;
    const endLabel = `${end.getDate()} ${end.toLocaleString("pl-PL", { month: "long" })}`;
    li.textContent = `od ${startLabel} do ${endLabel}`;

    const btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "Usuń";
    btn.onclick = () => {
      unavailableRanges = unavailableRanges.filter(r => !(r.start === range.start && r.end === range.end));
      localStorage.setItem("unavailableRanges", JSON.stringify(unavailableRanges));
      generateCalendar(viewedMonth, calendarGrid);
      generateCalendar(adminViewedMonth, adminCalendar, true);
      renderDateList();
    };

    li.appendChild(btn);
    dateList.appendChild(li);
  });
}

// 🔄 Start aplikacji
generateCalendar(viewedMonth, calendarGrid);

})