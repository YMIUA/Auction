window.onload=function() {
    XHR("/src/data.json", function (data) {
        var idItem = window.location.hash.slice(3);//slice "#id"
        var db = JSON.parse(data);
        for (var i = 0; i < db.goods.length; i++) {
            if (db.goods[i].id === idItem) {
                addItemDesctription(db.goods[i]);
            }
        }
    });
};

document.getElementById("prewiew-right").onclick=function () {
    console.log("lol");
    var position=parseInt(window.getComputedStyle(document.getElementById("prewiew-right")).getPropertyValue('right'));
}



function addItemDesctription(item){
    var isUsed=item.used?"Used":"New";
    var timeToEnd=differenceDate(Date.parse(item.endTime),new Date);
    var time=timeToEnd.day+"d"+timeToEnd.hours+"m"+timeToEnd.minutes+"m";
    var res="<div class=\"pic\">" +
        "<img src=\""+item.pic[2]+"\" alt=\""+item.name+"\">" +
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
        "</div>"/*+
        "<div class=\"slider\">" +
        "        <div class=\"main-slide\">" +
        "            <button type=\"button\" id=\"main-left\">" +
        "                <img src=\"/src/pic/fontawersome/arrow-left.svg\" alt=\"left\">" +
        "            </button>" +
        "            <button type=\"button\" id=\"main-right\">" +
        "                <img src=\"/src/pic/fontawersome/arrow-right.svg\" alt=\"right\">" +
        "            </button>" +
        "        </div>" +
        "        <div class=\"minislider\">" +
        "            <div id=\"prewiew-left\" class=\"arrow\">" +
        "                <img src=\"/src/pic/fontawersome/caret-left.svg\" alt=\"\">" +
        "            </div>" +
        "            <div id=\"slider-wrapper\">\n" +
        "                <div id=\"all-pic\">\n" +
        "                    <div class=\"slider-pic\" id=\"id1\" ><img src=\"https://pbs.twimg.com/profile_images/764080533395611648/vBXXzYUT_400x400.jpg\" alt=\"\"></div>\n" +
        "                    <div class=\"slider-pic\" id=\"id2\" ><img src=\"https://pbs.twimg.com/profile_images/764080533395611648/vBXXzYUT_400x400.jpg\" alt=\"\"></div>\n" +
        "                    <div class=\"slider-pic\" id=\"id3\" ><img src=\"https://pbs.twimg.com/profile_images/764080533395611648/vBXXzYUT_400x400.jpg\" alt=\"\"></div>\n" +
        "                    <div class=\"slider-pic\" id=\"id4\" ><img src=\"https://pbs.twimg.com/profile_images/764080533395611648/vBXXzYUT_400x400.jpg\" alt=\"\"></div>\n" +
        "                    <div class=\"slider-pic\" id=\"id5\" ><img src=\"https://pbs.twimg.com/profile_images/764080533395611648/vBXXzYUT_400x400.jpg\" alt=\"\"></div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div id=\"prewiew-right\" class=\"arrow\">\n" +
        "                <img src=\"/src/pic/fontawersome/caret-right.svg\" alt=\"\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>"*/
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
