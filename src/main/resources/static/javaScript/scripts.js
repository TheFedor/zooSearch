function submitForm() {
    var inputValue = document.getElementById('inputField').value;
    console.log(inputValue); // Выводим значение в консоль
    document.getElementById('inputField').style.color = '#006400'; // Устанавливаем темно-зеленый цвет текста
    inputField.style.fontWeight = 'bold'; // Устанавливаем полужирный шрифт
}

document.getElementById('inputField').addEventListener('input', function() {
    this.style.color = '#000'; // Когда поле начинает редактироваться, устанавливаем черный цвет текста
    inputField.style.fontWeight = 'normal'; // Убираем полужирный шрифт после редактирования
});