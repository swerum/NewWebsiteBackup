
//first color is darker, second is lighter
var colors = {
    yellowDropshadow :  ['#ffff00', '#ffff49'],
    smallYellow:  ['#c2c200', '#ffff22'],
    purpleDropshadow: ['#cc79ff', '#d38bff'],
    lightPurple :['#9551bf', '#cb77ff'],
    blueDropshadow: ['#4166ad', '#5993ff'],
    orangeDropshadow: ['#af5d00', '#ff873c'],
    pinkDropshadow: ['#6a152a', '#d52c56'],
    greenDropshadow: ['#58a158', '#40eb40'],
    whiteDropshadow: ['#979797', '#cfcfcf']
}

var figureImages = document.getElementsByTagName("img");
for (var i = 0; i < figureImages.length;i++) {
    var img = figureImages[i];
    var grandParent = img.parentElement.parentElement;
    if (grandParent && grandParent.tagName === "A") {
        initImage(img);
    }
}

function initImage(img) {
    var classesString = img.parentElement.className;
    var color = getDropshadowColor(classesString);
    addDropshadow(img, color[0]);
    img.addEventListener("mouseover", function(e) {
        var image = e.toElement;
        var color = getDropshadowColor(image.parentElement.className);
        addDropshadow(image, color[1], 20);
    });
    img.addEventListener("mouseleave", function(e) {
        var image = e.target;
        var color = getDropshadowColor(image.parentElement.className);
        addDropshadow(image, color[0]);
    });
}

function addDropshadow(element, color, size=10) {
    var filterArgument = "drop-shadow(0px 0px "+size+"px "+color+")";
    var styleString = "filter: "+filterArgument;
    if (element.width < 100) {
        styleString += " "+filterArgument;
    }
    element.setAttribute("style", styleString+";");
}

function getDropshadowColor(classesString) {
    var white = colors.whiteDropshadow;
    if (!classesString) return white;
    var classes = classesString.split(" ");
    for (var i = 0; i < classes.length; i ++) {
        var className = classes[i];
        var color = colors[className];
        if (color) {
            return color;
        }
    }
    return white;
}