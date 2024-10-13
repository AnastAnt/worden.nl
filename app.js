/** @format */
document.addEventListener("DOMContentLoaded", () => {
  const wordForm = document.getElementById("wordForm");
  const wordInput = document.getElementById("word");
  const translationInput = document.getElementById("translation");
  const categoryInput = document.getElementById("category");
  const wordList = document.getElementById("wordList");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sortSelect");
  const startLearning = document.getElementById("startLearning");
  const categorySelect = document.getElementById("categorySelect");
  const learningTypeInputs = document.querySelectorAll(
    'input[name="learningType"]'
  );
  const card = document.getElementById("card");

  // Модальне вікно і його елементи
  const editModal = document.getElementById("editModal");
  const closeModal = document.querySelector(".close");
  const editForm = document.getElementById("editForm");
  const editWordInput = document.getElementById("editWord");
  const editTranslationInput = document.getElementById("editTranslation");
  const editCategoryInput = document.getElementById("editCategory");

  let currentEditIndex = null; // Зберігає індекс слова для редагування

  // Отримання слів з LocalStorage або пустий масив, якщо їх немає
  let words = JSON.parse(localStorage.getItem("words")) || [];

  // Функція для оновлення LocalStorage
  const updateLocalStorage = () => {
    localStorage.setItem("words", JSON.stringify(words));
  };

  // Відображення слів у вигляді списку
  const displayWords = (filteredWords = words) => {
    wordList.innerHTML = ""; // Очищуємо список
    filteredWords.forEach((wordObj, index) => {
      const wordDiv = document.createElement("div");
      wordDiv.className =
        "list-group-item list-group-item-action flex-column align-items-start mb-2";
      wordDiv.innerHTML = `
          <div class="d-flex w-100 justify-content-between align-items-center">
              <h5 class="mb-1">${wordObj.word}</h5>
              <p class="mb-1"><strong>${wordObj.translation}</strong></p>
          </div>
          <small>${wordObj.category}</small>
          <div class="learned-status ${
            wordObj.learned ? "learned" : ""
          }" onclick="toggleLearned(${index})" style="cursor: pointer;">
              ${wordObj.learned ? "✔" : "⬜"}
          </div>
          <button class="btn btn-warning btn-sm me-2" onclick="openEditModal(${index})">
              <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteWord(${index})">
              <i class="fas fa-trash"></i>
          </button>
        `;
      wordList.appendChild(wordDiv);
    });
  };

  // Додавання нового слова
  wordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newWord = wordInput.value.toLowerCase(); // Робимо слова в нижньому регістрі для перевірки дубліката
    const newTranslation = translationInput.value;
    const newCategory = categoryInput.value;

    // Перевіряємо, чи слово вже існує в списку
    const duplicateIndex = words.findIndex(
      (wordObj) => wordObj.word === newWord
    );
    if (duplicateIndex !== -1) {
      // Якщо слово вже існує, відкриваємо модальне вікно для редагування цього слова
      currentEditIndex = duplicateIndex;
      openEditModal(duplicateIndex, true); // true означає, що це дублікат
    } else {
      // Якщо дубліката немає, додаємо нове слово
      const newWordObj = {
        word: newWord,
        translation: newTranslation,
        category: newCategory,
        learned: false, // Нове слово завжди невивчене
      };
      words.push(newWordObj);
      updateLocalStorage();
      displayWords();
      wordForm.reset();
    }
  });

  // Функція для відображення модального вікна для редагування слова
  window.openEditModal = (index, isDuplicate = false) => {
    currentEditIndex = index;
    const wordObj = words[index];

    // Заповнюємо поля форми для редагування
    editWordInput.value = wordObj.word;
    editTranslationInput.value = wordObj.translation;
    editCategoryInput.value = wordObj.category;

    // Відкриваємо модальне вікно
    editModal.style.display = "block";

    if (isDuplicate) {
      alert("Це слово вже існує! Ви можете його редагувати.");
    }
  };

  // Закриття модального вікна
  closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Закриття модального вікна при кліку за межами вікна
  window.addEventListener("click", (event) => {
    if (event.target == editModal) {
      editModal.style.display = "none";
    }
  });

  // Збереження змін після редагування слова
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (currentEditIndex !== null) {
      words[currentEditIndex].word = editWordInput.value;
      words[currentEditIndex].translation = editTranslationInput.value;
      words[currentEditIndex].category = editCategoryInput.value;

      updateLocalStorage();
      displayWords();

      // Закриваємо модальне вікно після збереження
      editModal.style.display = "none";
    }
  });

  // Пошук слів
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredWords = words.filter(
      (wordObj) =>
        wordObj.word.toLowerCase().includes(searchTerm) ||
        wordObj.translation.toLowerCase().includes(searchTerm)
    );
    displayWords(filteredWords);
  });

  // Сортування за вибором користувача
  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;
    if (sortBy === "word") {
      words.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === "category") {
      words.sort((a, b) => a.category.localeCompare(b.category));
    }
    displayWords(); // Оновлення списку після сортування
  });

  // Початок вивчення
  let cardIndex = 0;
  let studyWords = [];
  let showingTranslation = false; // Перевірка, чи показується переклад

  startLearning.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLearningType = document.querySelector(
      'input[name="learningType"]:checked'
    ).value;
    if (selectedLearningType === "random") {
      // Фільтрація слів, які ще не вивчені
      const unlearnedWords = words.filter((wordObj) => !wordObj.learned);

      // Вибір 20 випадкових слів або менше, якщо таких менше
      studyWords = getRandomWords(unlearnedWords, 20);
    } else if (selectedLearningType === "category") {
      const selectedCategory = categorySelect.value;
      if (selectedCategory === "") {
        alert("Будь ласка, виберіть категорію.");
        return;
      }

      // Фільтрація слів за категорією і невивчені
      const categoryWords = words.filter(
        (wordObj) => wordObj.category === selectedCategory && !wordObj.learned
      );
      studyWords = getRandomWords(categoryWords, 20); // Вибір 20 або менше слів з категорії
    }

    if (studyWords.length === 0) {
      card.innerHTML = "<p>Немає слів для вивчення!</p>";
    } else {
      cardIndex = 0;
      showingTranslation = false;
      showCard();
    }
  });

  // Функція для відображення картки зі словом
  const showCard = () => {
    if (cardIndex < studyWords.length) {
      const word = studyWords[cardIndex].word;
      card.innerHTML = `
                      <p id="study-word" style="cursor: pointer;"><strong>${word}</strong></p>
                  `;
      const studyWordElement = document.getElementById("study-word");

      // Показ перекладу після кліку на слово
      studyWordElement.addEventListener("click", () => {
        if (!showingTranslation) {
          card.innerHTML += `<p><strong>Переклад:</strong> ${studyWords[cardIndex].translation}</p>`;
          showingTranslation = true;
        }
      });
    } else {
      // Завершення циклу вивчення
      card.innerHTML = `
              <p>Ви завершили вивчення всіх слів!</p>
              <button id="restartLearning" class="btn btn-primary">Почати знову</button>
              <button id="returnToWords" class="btn btn-secondary">Повернутися до списку</button>
          `;

      // Додавання обробників подій для кнопок "Почати знову" і "Повернутися до списку"
      document
        .getElementById("restartLearning")
        .addEventListener("click", () => {
          cardIndex = 0;
          showingTranslation = false;
          showCard();
        });

      document.getElementById("returnToWords").addEventListener("click", () => {
        card.innerHTML = ""; // Повертаємося до списку слів
      });
    }
  };

  // Свайп для перемикання карток
  let touchStartX = 0;
  let touchEndX = 0;

  card.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  card.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  const handleSwipe = () => {
    if (touchEndX < touchStartX - 50) {
      // Свайп вліво - показуємо наступне слово
      if (cardIndex < studyWords.length - 1) {
        cardIndex++;
        showingTranslation = false; // Скидаємо стан показу перекладу
        showCard();
      }
    } else if (touchEndX > touchStartX + 50) {
      // Свайп вправо - показуємо попереднє слово
      if (cardIndex > 0) {
        cardIndex--;
        showingTranslation = false; // Скидаємо стан показу перекладу
        showCard();
      }
    }
  };

  // Функція для вибору випадкових слів
  const getRandomWords = (wordArray, count) => {
    const shuffled = [...wordArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Відображення слів при завантаженні сторінки
  displayWords();
  updateCategorySelect(); // Оновлюємо список категорій при завантаженні

  // Функція для перемикання вивченого стану при кліку на галочку
  window.toggleLearned = (index) => {
    words[index].learned = !words[index].learned; // Перемикання стану
    updateLocalStorage();
    displayWords(); // Оновлення відображення
  };

  // Видалення слова
  window.deleteWord = (index) => {
    Swal.fire({
      title: "Ви впевнені?",
      text: "Це слово буде видалено!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Так, видалити!",
      cancelButtonText: "Скасувати",
    }).then((result) => {
      if (result.isConfirmed) {
        words.splice(index, 1);
        updateLocalStorage();
        displayWords();
        updateCategorySelect(); // Оновлюємо список категорій
        Swal.fire("Видалено!", "Слово було успішно видалено.", "success");
      }
    });
  };
});
