var thisItem;
window.onload=function() {
    XHR("/src/data.json", function (data) {
        var idItem = window.location.hash.slice(3);//slice "#id"
        var db = JSON.parse(data);
        for (var i = 0; i < db.goods.length; i++) {
            if (db.goods[i].id === idItem) {
                thisItem=db.goods[i];
                var allPic = document.getElementsByClassName("slider-pic");
                addItemDesctription(db.goods[i]);

                document.getElementById("main-left").onclick = function () {
                    var picIndex=getPictureIndex(thisItem);
                    if(picIndex!==0) {
                        changeMainSlide(thisItem,picIndex-1);
                    }
                };
                document.getElementById("main-right").onclick = function () {
                    var picIndex=getPictureIndex(thisItem);
                    if(picIndex!==thisItem.pic.length-1) {
                        changeMainSlide(thisItem,picIndex+1);
                    }
                };
                document.getElementById("prewiew-left").onclick = function () {
                    var position=getPosition();
                    if(position>0){
                        changeMinislide(position,-1);
                    }
                };
                document.getElementById("prewiew-right").onclick = function () {
                    var position=getPosition();
                    var wiewSize=document.getElementById("slider-wrapper").offsetWidth;
                    var picSize=(allPic.length-1)*(document.getElementsByClassName("slider-pic")[0].offsetWidth+10);
                    if(picSize-wiewSize>=position) {
                        changeMinislide(position,1);
                    }
                };
                for (var j = 0; j < allPic.length; j++) {//add event listener to all pic in minislider
                    allPic[j].addEventListener('click', changeSlide, false);
                }
            }
        }
    });
};

function changeMinislide(position,n){
    document.getElementById("all-pic").style.right=
        position+n*document.getElementsByClassName("slider-pic")[0].offsetWidth+n*10+"px";
}

function getPosition() {
    return parseInt(window.getComputedStyle(document.getElementById("all-pic"))
        .getPropertyValue('right'));
}

function changeMainSlide(item,n) {
    document.getElementById("main-pic-img").setAttribute('src', item.pic[n])
}

function getPictureIndex(item){
    return item.pic.indexOf(document.getElementById("main-pic-img").getAttribute('src'))
}

function changeSlide() {
    var id = this.getAttribute("id").slice(6);
    document.getElementById("main-pic-img").setAttribute('src', thisItem.pic[id])
};

function addItemDesctription(item){
    var isUsed=item.used?"Used":"New";
    var timeToEnd=differenceDate(Date.parse(item.endTime),new Date);
    var time=timeToEnd.day+"d"+timeToEnd.hours+"m"+timeToEnd.minutes+"m";
    var sliderPic="";
    for (var i=0;i<item.pic.length;i++){
        sliderPic+="<div class=\"slider-pic\" id=\"pic-id"+ i+"\" ><img src=\""+item.pic[i]+"\" alt=\"\"></div>\n"
    }
    var res="<div class=\"main-content\">"+
        "<div class=\"pic\">" +
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
        "</div>" +
        "<div class=\"line\"></div>" +
        "<div class=\"full_description\">" +
        "<h3>"+item.name+"</h3>" +
        "<div class=\"slider\">" +
        "<div class=\"main-slide\">" +
        "<button type=\"button\" id=\"main-left\">" +
        "<img src=\"/src/pic/fontawersome/arrow-left.svg\" alt=\"left\">" +
        "</button>" +
        "<div id=\"main-pic\"><img id=\"main-pic-img\" src=\""+item.pic[0]+"\" alt=\"\"></div>"+
        "<button type=\"button\" id=\"main-right\">" +
        "<img src=\"/src/pic/fontawersome/arrow-right.svg\" alt=\"right\">" +
        "</button>" +
        "</div>" +
        "<div class=\"minislider\">" +
        "<button type=\"button\" id=\"prewiew-left\" class=\"arrow\">" +
        "<img src=\"/src/pic/fontawersome/caret-left.svg\" alt=\"\">" +
        "</button>" +
        "<div id=\"slider-wrapper\">" +
        "<div id=\"all-pic\">" +
        sliderPic+
        "</div>" +
        "</div>" +
        "<button type=\"button\" id=\"prewiew-right\" class=\"arrow\">" +
        "<img src=\"/src/pic/fontawersome/caret-right.svg\" alt=\"\">" +
        "</button>" +
        "</div>" +
        "</div>"+
        "<h4>Description:</h4>" +
        "<p>"+item.description+"</p>" +
        "</div>";
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
