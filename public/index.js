function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function onLoad() {
    const file = getQueryVariable("file");
    const scheduler = getQueryVariable("scheduler");
    var fileSelect = document.getElementById('fileSelect');
    fileSelect.addEventListener('change', function() {
        document.location.href = '/?file=' + fileSelect.value + '&scheduler=' + scheduler
    });
    var schedulerSelect = document.getElementById('schedulerSelect');
    schedulerSelect.addEventListener('change', function() {
        document.location.href = '/?file=' + file + '&scheduler=' + schedulerSelect.value;
    });
}