function onLoad() {
    var fileSelect = document.getElementById('fileSelect');
    fileSelect.addEventListener('change', function() {
        document.location.href = '/?file=' + fileSelect.value;
    })
}