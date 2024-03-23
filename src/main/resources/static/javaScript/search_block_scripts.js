// Получаем ссылки на элементы DOM
const searchInputField = document.getElementById('searchInputField'); //Сохраняем ссылку на элемент страницы (поле ввода в блоке поиска) по id
const searchSubmitButton = document.getElementById('searchSubmitButton'); //Сохраняем ссылку на элемент (кнопка ввода в блоке поиска) по id
const testId = document.getElementById('testId');





// Обработчик события для кнопки "Ввести"
searchSubmitButton.addEventListener('click', function() { //устанавливаем функцию (слушатель) на событие клика по объекту searchSubmitButton
    const inputValue = searchInputField.value; //Получаем значение из поля ввода по ссылке searchInputField

    // Создаем новый элемент для отображения текста
    const newTextElement = document.createElement('p'); //создаем новый элемент <p> для отображения текста
    newTextElement.textContent = inputValue; //Устанавливаем текстовое содержимое нового элемента равным полученному ранее значению

    // Добавляем новый элемент в соответствующий контейнер
    const middleInnerContainer = document.querySelector('.middle-inner-container'); //Сохраняем ссылку на элемент страницы (средний контейнер блока ввода) по классу
    middleInnerContainer.appendChild(newTextElement); //Добавляем новый элемент <p> внутрь контейнера '.middle-inner-container'

    searchInputField.value = ''; //Очищаем поле ввода после добавления текста
});

// Обработчик события для изменения размера поля ввода
/*
searchInputField.addEventListener('input', function() { //Устанавливаем функцию (слушатель) на событие ввода данных в поле объекта searchInputField
    this.style.width = (this.value.length * 8) + 'px'; //Устанавливаем ширину поля равной ширине его содержимого, умноженного на 8
});
 */