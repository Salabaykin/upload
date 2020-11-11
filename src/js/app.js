document.addEventListener("DOMContentLoaded", function() {
    const dropZone = document.querySelector('.upload-form'),
          uploadLoading = document.querySelector('.upload-loading'); //получили нужный элемент
    
    //добавляем класс active при наведении
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('active');
    });
    
    // удаляем класс ховер
    dropZone.addEventListener('dragleave', (e) => {
        dropZone.classList.remove('active');
    });
    dropZone.addEventListener('drop', (e) => {
        //предотвращаем поведение по умолчанию
        e.preventDefault();
        dropZone.classList.remove('active');
        uploadLoading.classList.add('active');
        
        //получили файл:
        let file = e.dataTransfer.files[0];
        
        //делаем объект FormData
        formData = new FormData();
        formData.append('file', file);
        
        //Запрос
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = stateChange;
        xhr.open('POST', '/upload.php');
        xhr.setRequestHeader('any header could be here', file.name);
        xhr.send(formData);
    });
    
    function stateChange(event) {
        if (event.target.readyState == 4) {
            if (event.target.status == 200) {
                dropZone.text('Загрузка успешно завершена!');
            } else {
                dropZone.text('Произошла ошибка!');
                dropZone.addClass('error');
            }
        }
    }
});