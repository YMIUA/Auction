window.onload=function() {
    XHR("/projekt/data.json", function (data) {
        addCarts(JSON.parse(data));
    });
};

function addCarts(db){
        
}

function XHR(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open('GET', file, true);
    xhr.send();
}

