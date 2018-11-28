window.onload=function() {
    XHR("/projekt/data.json", function (data) {
        var idItem = window.location.hash.slice(3);//slice "#id"
        var db = JSON.parse(data);
        for (var i = 0; i < db.goods.length; i++) {
            if (db.goods[i].id === idItem) {
                addItemDesctription(db.goods[i]);
            }
        }
    });
};

function addItemDesctription(item){
    var isUsed=item.used?"Used":"New";
    var timeToEnd=differenceDate(Date.parse(item.endTime),new Date);
    var time=timeToEnd.day+"d"+timeToEnd.hours+"m"+timeToEnd.minutes+"m";
    var res="<div class=\"pic\">" +
        "<img src=\""+item.pic[1]+"\" alt=\""+item.name+"\">" +
        "</div>" +
        "<div class=\"main_description\">" +
        "<h1 class=\"description\">"+item.name+"</h1>" +
        "<div class=\"conditoin\">" +
        "<div class=\"status\">" +
        "<p>Condition:</p>" +
        "</div>" +
        "<div class=\"value\">" +
        "<p>"+isUsed+"</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"time_left\">" +
        "<div class=\"status\">" +
        "<p>Time left:</p>" +
        "</div>" +
        "<div class=\"value\">" +
        "<p>"+time+"</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"bit\">" +
        "<div class=\"status\">" +
        "<p>Current bit:</p>" +
        "</div>" +
        "<div class=\"value\">" +
        "<p>"+item.history[item.history.length-1].price+"$"+"   ("+item.history.length+" bits)"+"</p>"+
        "<input type=\"number\">" +
        "<input type=\"button\" value=\"Bit\">" +
        "</div>" +
        "</div>" +
        "<div class=\"shipping\">" +
        "<div class=\"status\">" +
        "<p>Shipping:</p>" +
        "</div>" +
        "<div class=\"value\">" +
        "$12,34" +
        "</div>" +
        "</div>" +
        "<div class=\"seller_info\">" +
        "<div class=\"visit-store\">" +
        "<a href=\""+item.sellerStore+"\">Visit store</a>" +
        "</div>" +
        "<div class=\"seller\">" +
        "<div class=\"status\">" +
        "<p>Name:</p>" +
        "</div>" +
        "<div class=\"value\">" +
        "<p>"+item.seller+"</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"feedback\">" +
        "<div class=\"status\">" +
        "<p>Feedback:</p>" +
        "</div>" +
        "<div class=\"value\">" +
        "99%" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class=\"line\"></div>" +
        "<div class=\"full_description\">" +
        "<h3>"+item.name+"</h3>" +
        "<h4>Description:</h4>" +
        "<p>"+item.description+"</p>" +
        "<div class=\"slider\"><img src=\"/projekt/pic/goods/AMBA3.jpg\" alt=\"pic1\"></div>" +
        "</div>";
    console.log(item);
    document.getElementById("content").innerHTML=res;
}

function differenceDate(firstDate,secondDate){
    var difference=Math.abs(firstDate- secondDate);
    var day=Math.floor(difference/(86400000));
    var hours=Math.floor((difference-day*86400000)/(3600000));
    var minutes=Math.floor((difference-day*86400000-hours*3600000)/(60000));
    return {
        "day":day,
        "hours":hours,
        "minutes":minutes
    }
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