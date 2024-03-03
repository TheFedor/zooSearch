function filterAnimals() {
    var input, filter, select, options, option, i, txtValue;
    input = document.getElementById('inputField');
    filter = input.value.toUpperCase();
    select = document.getElementById('animalSelect');
    options = select.getElementsByTagName('option');

    for (i = 0; i < options.length; i++) {
        option = options[i];
        txtValue = option.textContent || option.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}

function showPhoto() {
    var select = document.getElementById('animalSelect');
    var selectedOption = select.options[select.selectedIndex];
    var photoLink = selectedOption.getAttribute('data-photo');
    displayPhoto(photoLink);
}

function displayPhoto(photoLink) {
    var animalPhoto = document.getElementById('animalPhoto');
    if (photoLink) {
        animalPhoto.src = photoLink;
        animalPhoto.classList.add('visible');
    } else {
        animalPhoto.classList.remove('visible');
    }
}