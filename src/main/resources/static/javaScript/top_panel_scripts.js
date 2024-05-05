//получаем контейнер top-panel
var topPanel = document.getElementById('top-panel');

//список для маршрутного листа (будет хранить массивы поочередно [name, x_coordinateOfEntrance, yCoordinateOfEntrance] ; [nameId, mainWay (bool)])
var routeList = [];
//создание общей переменной-счетчика
var counter = 0;


function addToRouteList(name, bool) { //Функция для добавления в маршрутный лист (bool=true - значит животное)
    //console.log('добавляем в маршрутный лист по имени: ' + name)
    //ищем аватарку для добавления
    var imgSrc;
    var buildingName;
    if (bool) { //ищем по списку животных
        for (var i = 0; i < locationOfAnimals.length; ++i) {
            if (locationOfAnimals[i][0].toLowerCase() === name.toLowerCase()){ //если нашли животное
                imgSrc = locationOfAnimals[i][1];
                buildingName = locationOfAnimals[i][5];
                break;
            }
        }
    } else { //ищем по списку структур
        for (var i = 0; i < locationOfStructures.length; ++i) {
            if (locationOfStructures[i][0].toLowerCase() === name.toLowerCase()) {
                imgSrc = locationOfStructures[i][1];
                buildingName = locationOfStructures[i][4];
                break;
            }
        }
    }
    //теперь ищем адреса входов
    var thisEntrances = [];
    for (var i = 0; i < entrances.length; ++i) {
        if (entrances[i][0].toLowerCase() === buildingName.toLowerCase()) {
            var array = [entrances[i][1], entrances[i][2]];
            thisEntrances.push(array);
        }
    }

    //рассматриваем три случая: что это первая запись маршрутного листа, вторая или большая
    //здесь пока смухлюем и решим что у всех зданий один вход
    var name = name + '▶' + counter;
    counter += 1;
    var routeInnerArray = [name, thisEntrances[0][0], thisEntrances[0][1]];
    if (routeList.length === 0) {
        routeList.push(routeInnerArray);
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //console.log('добавили: ' + routeList[routeList.length-1]);
    } else if (routeList.length === 1) {
        routeList.push([counter + '▶arrow', true]);
        routeList.push(routeInnerArray);
        //добавляем главный переход в маршрутный лист
        addArrowTranslationBetweenImagesOfRouteList(counter, true);
        counter += 1;
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //console.log('добавили: ' + routeList[routeList.length-2] + '  а также: '  + routeList[routeList.length-1]);
        //строим новый путь на карте
        //console.log('Внешнее начало поиска пути. routeList:' + routeList);
        drawShortestRoadOnMap();
        //console.log('Внешнее окончание поиска пути');
    } else {
        routeList.push([counter + '▶arrow', false]);
        routeList.push(routeInnerArray);
        //добавляем стандартный переход в маршрутный лист
        addArrowTranslationBetweenImagesOfRouteList(counter, false);
        counter += 1;
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //console.log('добавили: ' + routeList[routeList.length-2] + '  а также: '  + routeList[routeList.length-1]);
        //строим новый путь на карте
        //console.log('Внешнее начало поиска пути');
        drawShortestRoadOnMap();
        //console.log('Внешнее окончание поиска пути');
    }
    //console.log('текущий routeList:');
    //for (var i = 0; i < routeList.length; ++i) {
        //console.log(i  + ': ' + routeList[i]);
    //}
    //console.log('Размер routeList: ' + routeList.length);
    //console.log(' ');
}

//Функция для добавления главных и обычных стрелок-переходов на top panel
function addArrowTranslationBetweenImagesOfRouteList(nameId, mainArrow) {
    var img = document.createElement('img');
    var specialId = nameId + '▶arrow';
    if (mainArrow) { //если стрелка главного перехода
        img.src = '../photosOfRouteListTransition/Главный-переход.png';
    } else {
        img.src = '../photosOfRouteListTransition/Переход.png';
    }
    img.style.height = '100%';
    img.style.width = 'auto';
    img.style.objectFit = 'cover';
    img.id = specialId;
    img.onclick = function () {
        makeArrowToMain(specialId);
    }
    topPanel.appendChild(img);
}

function makeArrowToMain(nameId) { // функция для перевода стрелки-перехода марш. листа в главную
    //console.log('меняем главную стрелку на ' + nameId);
    //Для начала убираем прошлую mainWay
    //console.log('ищем старую главную стрелку ');
    for (var i = 1; i < routeList.length; i+=2) {
        //console.log(i + '- ' + routeList[i][0]);
        if (routeList[i][1]) {
            //console.log('старая найдена: ' + routeList[i][0] + 'на индексе: '  + i);

            routeList[i][1] = false;
            var lastMainArrow = document.getElementById(routeList[i][0]);
            if (lastMainArrow) {
                lastMainArrow.src = '../photosOfRouteListTransition/Переход.png';
            } else { console.log('Прошлая main стрелка не была найдена'); }
            break;
        }
    }
    //теперь делаем текущую стрелку mainWay
    //console.log('теперь ищем новую главную стрелку ' + nameId);
    for (var i = 1; i < routeList.length; i+=2) {
        //console.log(i + '- ' + routeList[i][0]);
        if (routeList[i][0] === nameId) {
            //console.log('новая найдена: ' + routeList[i][0] + 'на индексе: ' + i);
            routeList[i][1] = true;
            var newMainArrow = document.getElementById(nameId);
            if (newMainArrow) {
                newMainArrow.src = '../photosOfRouteListTransition/Главный-переход.png';
            } else { console.log('Новая main стрелка ' + nameId + ' не найдена'); }
            break;
        }
    }
    //console.log(' ');

    //console.log('Внешнее начало поиска пути');
    drawShortestRoadOnMap();
    //console.log('Внешнее окончание поиска пути');
}

function addImageToTopPanel(imgSrc, name) { //функция для добавления картинка в top-panel
    var img = document.createElement('img');
    img.src = imgSrc;
    //задаем размеры изображения
    img.style.height = '100%';
    img.style.width = 'auto';
    img.style.objectFit = 'cover';
    var specialId =  name;
    img.id = specialId;
    img.onclick = function() {
        //dropImageFromTopPanel(specialId);
        console.log('Тык по изображению ' + name);
    }

    var closeButton = document.createElement('div');
    closeButton.classList.add('close-button');
    closeButton.textContent = '✕';
    closeButton.onclick = function() {
        console.log('Тык по крестику ' + name);
    }

    var container = document.createElement('div');
    container.classList.add('.container-image-plus-cross-on-top-panel');
    container.appendChild(img);
    container.appendChild(closeButton);
    topPanel.appendChild(container);
    //topPanel.appendChild(img);
}

function dropImageFromTopPanel(specialId) { //функция для удаления картинки из top-panel
    //ищем удаляемое изображение в маршрутном листе
    var index;
    for (var i = 0; i < routeList.length; i+= 2) {
        if (routeList[i][0].toLowerCase() === specialId.toLowerCase()) {
            index = i;
            break;
        }
    }

    //получаем важность стрелки после изображения (если она есть)
    var mainArrowAfter = false;
    var mainArrowBefore = false;
    if (index + 1 < routeList.length)
    {
        if (routeList[index+1][1]) {
            mainArrowAfter = true;
        }
    }
    if (index - 1 >= 0) {
        if (routeList[index-1][1]) {
            mainArrowBefore = true;
        }
    }

    var imageToDelete = document.getElementById(specialId);

    //рассматриваем случаи: удаляют последнее изображение (просто и перед ним mainWay) / удаляют единственное изображение / удаляют изображение перед mainWay (просто и изображение первое) /удаляют стандарт
    if (index === (routeList.length - 1)) { //первый случай
        if (routeList.length === 1) { //второй случай
            //console.log('Путь 4');
            if (imageToDelete) {
                topPanel.removeChild(imageToDelete);
                routeList.splice(index, 1);
            } else {
                console.log('Изображение' + specialId + 'не найдено')
            }
        } else { //продолжение первого случая
            if (mainArrowBefore) { //вторая часть первого случая
                //если всего в маршрутном листе две точки
                if (routeList.length === 3) {
                    //console.log('Путь 2');
                    var arrowName = routeList[index-1][0];
                    var arrowToDelete = document.getElementById(arrowName);
                    //удаляем картинки
                    if (imageToDelete && arrowToDelete) {
                        topPanel.removeChild(imageToDelete);
                        topPanel.removeChild(arrowToDelete);
                        //удаляем изображение и стрелку из списка
                        routeList.splice(index-1, 2);
                    } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
                } else {
                    //console.log('Путь 3');
                    //передвигаем стрелку mainWay на один раньше
                    makeArrowToMain(routeList[index-3][0]);
                    //далее удаляем по стандарту
                    var arrowName = routeList[index-1][0];
                    var arrowToDelete = document.getElementById(arrowName);
                    //удаляем картинки
                    if (imageToDelete && arrowToDelete) {
                        topPanel.removeChild(imageToDelete);
                        topPanel.removeChild(arrowToDelete);
                        //удаляем изображение и стрелку из списка
                        routeList.splice(index-1, 2);
                    } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
                }
            } else { //первая часть первого случая
                //console.log('Путь 1');
                //получаем id стрелки после для ее удаления
                var arrowName = routeList[index-1][0];
                var arrowToDelete = document.getElementById(arrowName);
                //удаляем картинки
                if (imageToDelete && arrowToDelete) {
                    topPanel.removeChild(imageToDelete);
                    topPanel.removeChild(arrowToDelete);
                    //удаляем изображение и стрелку из списка
                    routeList.splice(index-1, 2);
                } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
            }
        }
    } else if (mainArrowAfter) {
        if (routeList.length === 3) {
            //console.log('Путь 5');
            //получаем id стрелки после для ее удаления
            var arrowName = routeList[index+1][0];
            var arrowToDelete = document.getElementById(arrowName);
            //удаляем картинки
            if (imageToDelete && arrowToDelete) {
                topPanel.removeChild(imageToDelete);
                topPanel.removeChild(arrowToDelete);
                //удаляем изображение и стрелку из списка
                routeList.splice(index, 2);
            } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
        } else {
            //console.log('Путь 6');
            //переводим mainWay стрелку на один вперед
            makeArrowToMain(routeList[index+3][0])
            //Далее удаляем по стандарту
            //получаем id стрелки после для ее удаления
            var arrowName = routeList[index+1][0];
            var arrowToDelete = document.getElementById(arrowName);
            //удаляем картинки
            if (imageToDelete && arrowToDelete) {
                topPanel.removeChild(imageToDelete);
                topPanel.removeChild(arrowToDelete);
                //удаляем изображение и стрелку из списка
                routeList.splice(index, 2);
            } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
        }
    } else {
        //console.log('Путь 7');
        //просто стандартно удаляем
        //получаем id стрелки после для ее удаления
        var arrowName = routeList[index+1][0];
        var arrowToDelete = document.getElementById(arrowName);
        //удаляем картинки
        if (imageToDelete && arrowToDelete) {
            topPanel.removeChild(imageToDelete);
            topPanel.removeChild(arrowToDelete);
            //удаляем изображение и стрелку из списка
            routeList.splice(index, 2);
        } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
    }
    //console.log('Внешнее начало поиска пути');
    drawShortestRoadOnMap();
    //console.log('Внешнее окончание поиска пути');
}

//Функция для рисования кратчайшего пути на карте
function drawShortestRoadOnMap() {
    // Очищаем весь canvas, чтобы заполнить его по новой
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Проходим по всем точкам
    for (var i = 0; i < routeList.length; i+=2) {
        if (i + 2 < routeList.length) {
            var fromX = parseInt(routeList[i][1]);
            var fromY = parseInt(routeList[i][2]);
            var toX = parseInt(routeList[i+2][1]);
            var toY = parseInt(routeList[i+2][2]);
            //console.log('Начинаем поиск пути');
            var matrixOfShortestRoad = findShortestRoad(fromX, fromY, toX, toY);
            //console.log('Путь найден');

            //Проверяем является ли этот путь главным или нет:
            if (!routeList[i+1][1]) { //если путь не главный
                //строим светлый маршрут
                ctx.fillStyle = 'lightgreen';
                for (var i1 = 0; i1 < 1500; ++i1) {
                    for (var j1 = 0; j1 < 2500; ++j1) {
                        if (matrixOfShortestRoad[i1][j1] === 1) {
                            //строим круг вокруг этой точки диаметром 7 пикселей светлого тона
                            var nowX = parseInt(j1);
                            var nowY = parseInt(i1);
                            ctx.beginPath();
                            ctx.arc(nowX, nowY, 2.5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            } else { //если путь главный
                //после всего строим главный путь
                //строим сначала полностью чернуй путь
                //строим темный маршрут с черной обводкой
                for (var i1 = 0; i1 < 1500; ++i1) {
                    for (var j1 = 0; j1 < 2500; ++j1) {
                        if (matrixOfShortestRoad[i1][j1] === 1) {
                            var nowX = parseInt(j1);
                            var nowY = parseInt(i1);
                            ctx.fillStyle = 'black';
                            ctx.beginPath();
                            ctx.arc(nowX, nowY, 3.5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
                //теперь добавляем темно-зеленую сердцевину пути
                for (var i1 = 0; i1 < 1500; ++i1) {
                    for (var j1 = 0; j1 < 2500; ++j1) {
                        if (matrixOfShortestRoad[i1][j1] === 1) {
                            ctx.fillStyle = 'darkgreen';
                            var nowX = parseInt(j1);
                            var nowY = parseInt(i1);
                            ctx.beginPath();
                            ctx.arc(nowX, nowY, 2.5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }

        }
    }
}

function findShortestRoad(fromX, fromY, toX, toY) {
    //Создаем матрицу размера матрицы дорог для отметки на ней всех путей для начала, все отмечено как -1
    var matrixOfAllRoads = Array.from({ length: 1500 }, function() {
        return Array.from({ length: 2500 }, function() { return -1; });
    });
    matrixOfAllRoads[fromY][fromX] = 0;
    //создаем очередь проверяемых точек для прохода вширь
    var query = new Array();
    //заполняем первые координаты в очередь
    query.push([fromX, fromY]);
    //начинаем проход вширь
    while (query.length > 0) {
        var nowPointX = parseInt(query[0][0]);
        var nowPointY = parseInt(query[0][1]);
        var roadToThatPointLength = matrixOfAllRoads[nowPointY][nowPointX];
        query.shift();

        //проверяем:
        //вверх (если там есть дорога и не край карты)
        if (nowPointY - 1 >= 0 && mapRoadMatrix[nowPointY-1][nowPointX] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY-1][nowPointX] === -1 || matrixOfAllRoads[nowPointY-1][nowPointX] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY-1][nowPointX] = roadToThatPointLength + 1;
                query.push([nowPointX, nowPointY-1]);
            }
        }
        //вниз (если там есть дорога и не край карты)
        if (nowPointY + 1 < 1500 && mapRoadMatrix[nowPointY+1][nowPointX] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY+1][nowPointX] === -1 || matrixOfAllRoads[nowPointY+1][nowPointX] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY+1][nowPointX] = roadToThatPointLength + 1;
                query.push([nowPointX, nowPointY+1]);
            }
        }
        //влево (если там есть дорога и не край карты)
        if (nowPointX - 1 >= 0 && mapRoadMatrix[nowPointY][nowPointX-1] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY][nowPointX-1] === -1 || matrixOfAllRoads[nowPointY][nowPointX-1] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY][nowPointX-1] = roadToThatPointLength + 1;
                query.push([nowPointX-1, nowPointY]);
            }
        }
        //вправо (если там есть дорога и не край карты)
        if (nowPointX + 1 < 2500 && mapRoadMatrix[nowPointY][nowPointX+1] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY][nowPointX+1] === -1 || matrixOfAllRoads[nowPointY][nowPointX+1] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY][nowPointX+1] = roadToThatPointLength + 1;
                query.push([nowPointX+1, nowPointY]);
            }
        }
        //верх-лево
        if (nowPointX - 1 >= 0 && nowPointY - 1 >= 0 && mapRoadMatrix[nowPointY-1][nowPointX-1] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY-1][nowPointX-1] === -1 || matrixOfAllRoads[nowPointY-1][nowPointX-1] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY-1][nowPointX-1] = roadToThatPointLength + 1;
                query.push([nowPointX-1, nowPointY-1]);
            }
        }
        //верх-право
        if (nowPointX + 1 < 2500 && nowPointY - 1 >= 0 && mapRoadMatrix[nowPointY-1][nowPointX+1] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY-1][nowPointX+1] === -1 || matrixOfAllRoads[nowPointY-1][nowPointX+1] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY-1][nowPointX+1] = roadToThatPointLength + 1;
                query.push([nowPointX+1, nowPointY-1]);
            }
        }
        //низ-лево
        if (nowPointX - 1 >= 0 && nowPointY + 1 < 1500 && mapRoadMatrix[nowPointY+1][nowPointX-1] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY+1][nowPointX-1] === -1 || matrixOfAllRoads[nowPointY+1][nowPointX-1] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY+1][nowPointX-1] = roadToThatPointLength + 1;
                query.push([nowPointX-1, nowPointY+1]);
            }
        }
        //низ-право
        if (nowPointX + 1 < 2500 && nowPointY + 1 < 1500 && mapRoadMatrix[nowPointY+1][nowPointX+1] === 1) {
            //если ранее там не проходили или путь до сюда занимал больше времени
            if (matrixOfAllRoads[nowPointY+1][nowPointX+1] === -1 || matrixOfAllRoads[nowPointY+1][nowPointX+1] > roadToThatPointLength + 1) {
                //идем туда и добавляем новую точку в очередь
                matrixOfAllRoads[nowPointY+1][nowPointX+1] = roadToThatPointLength + 1;
                query.push([nowPointX+1, nowPointY+1]);
            }
        }

    }
    //console.log("Длина кратчайшего пути по матрице всех дорог: " + matrixOfAllRoads[toY][toX]);
    //console.log('Начинаем поиск единственной дороги');
    //Создаем матрицу размера матрицы дорог для отметки на ней кратчайшего пути, все отмечено как -1
    var matrixOfShortestRoad = Array.from({ length: 1500 }, function() {
        return Array.from({ length: 2500 }, function() { return -1; });
    });
    //ищем кратчайший путь при помощи обратного прохода по матрице всех путей
    var nowPointX = parseInt(toX);
    var nowPointY = parseInt(toY);
    var nowShortestRoadLength = parseInt(matrixOfAllRoads[nowPointY][nowPointX]);
    matrixOfShortestRoad[nowPointY][nowPointX] = 1;
    while (nowPointX !== fromX || nowPointY !== fromY) {
        //console.log();
        //console.log('Длина пути при проверке: ' + nowShortestRoadLength);
        //console.log('Текущая координата: [' + nowPointX + ';' + nowPointY + ']');
        //console.log('Куда направляемся: [' + fromX + ';' + fromY + ';');
        var nextPointX, nextPointY;
        //Проверяем:
        //вверх
        if (nowPointY-1 >= 0) {
            if (matrixOfAllRoads[nowPointY-1][nowPointX] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(nowPointX);
                nextPointY = parseInt(parseInt(nowPointY)-1);
            }
        }
        //вниз
        if (nowPointY+1 < 1500) {
            if (matrixOfAllRoads[nowPointY+1][nowPointX] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(nowPointX);
                nextPointY = parseInt(parseInt(nowPointY)+1);
            }
        }
        //влево
        if (nowPointX-1 >= 0) {
            if (matrixOfAllRoads[nowPointY][nowPointX-1] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(parseInt(nowPointX)-1);
                nextPointY = parseInt(nowPointY);
            }
        }
        //вправо
        if (nowPointX+1 <2500) {
            if (matrixOfAllRoads[nowPointY][nowPointX+1] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(parseInt(nowPointX)+1);
                nextPointY = parseInt(nowPointY);
            }
        }
        //лево-верх
        if (nowPointX-1 >= 0 && nowPointY-1 >= 0) {
            if (matrixOfAllRoads[nowPointY-1][nowPointX-1] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(parseInt(nowPointX)-1);
                nextPointY = parseInt(parseInt(nowPointY)-1);
            }
        }
        //право-верх
        if (nowPointX+1 <2500 && nowPointY-1 >= 0) {
            if (matrixOfAllRoads[nowPointY-1][nowPointX+1] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(parseInt(nowPointX)+1);
                nextPointY = parseInt(parseInt(nowPointY)-1);
            }
        }
        //лево-низ
        if (nowPointX-1 >= 0 && nowPointY+1 < 1500) {
            if (matrixOfAllRoads[nowPointY+1][nowPointX-1] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(parseInt(nowPointX)-1);
                nextPointY = parseInt(parseInt(nowPointY)+1);
            }
        }
        //право-низ
        if (nowPointX+1 < 2500 && nowPointY+1 < 1500) {
            if (matrixOfAllRoads[nowPointY+1][nowPointX+1] === nowShortestRoadLength - 1) {
                nextPointX = parseInt(parseInt(nowPointX)+1);
                nextPointY = parseInt(parseInt(nowPointY)+1);
            }
        }
        //отмечаем прошлую точку пути на матрице кратчайшего пути
        matrixOfShortestRoad[nextPointY][nextPointX] = 1;
        //переводим переменные к следующему циклу
        nowPointX = parseInt(nextPointX);
        nowPointY = parseInt(nextPointY);
        nowShortestRoadLength = parseInt(nowShortestRoadLength) - 1;
    }
    //console.log('В результате текущая координата: [' + nowPointX + ';' + nowPointY + ']');
    //возвращаем полученную матрицу с кратчайшим путем
    return matrixOfShortestRoad;
    //console.log('Единственная дорога найдена');
}