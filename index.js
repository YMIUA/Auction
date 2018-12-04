window.onload=function() {
    XHR("/src/data.json", function (data) {
        addCarts(JSON.parse(data));
    });
};

document.getElementById("left").onclick=function () {
    var position=parseInt(window.getComputedStyle(document.getElementById("slider")).getPropertyValue('right'));
    console.log(position);
    if(position>0){
        document.getElementById("slider").style.right=position-274+"px";
    }
    else {
        document.getElementById("slider").style.right=1644+"px";
    }
};

document.getElementById("right").onclick=function () {
    var position=parseInt(window.getComputedStyle(document.getElementById("slider")).getPropertyValue('right'));
    console.log(position);
    if(position<1644){
        document.getElementById("slider").style.right=position+274+"px";
    }
    else {
        document.getElementById("slider").style.right="0px"
    }
};

function addCarts(db){
    var cards="";
    for(var i=0;i<10;i++){
        cards+=createCart(db.goods[i]);
    }
    document.getElementById("slider").innerHTML=cards;
}
function createCart(item){
    var time=differenceDate(Date.parse(item.endTime),new Date);
    return "<div class=\"item\">" +
    "<div class=\"item_pic\">" +
    "<img src=\""+item.pic[0]+"\" alt=\""+item.name+"\">" +
    "</div>" +
    "<div class=\"item_name\">" +
    "<h4><a href=\""+item.url+"#id"+item.id+"\">"+item.name+"</a></h4>" +
    "</div>" +
    "<div class=\"end_time\"><p>"+time.day+"d:"+time.hours+"h:"+time.minutes+"m"+"</p></div>" +
    "<div class=\"price\"><p>"+item.history[item.history.length-1].price+"$"+"</p></div>" +
    "<div class=\"description_item\"><p>"+item.description+"</p></div>\n" +
    "</div>"
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

