// var e = document.getElementsByTagName("img")[0];
// console.log(e);
// var rgb = getAverageRGB(e);
// var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
// console.log(hex);
// // document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
// e.style.setProperty("-webkit-filter", "drop-shadow(0px 0px 50px "+hex+")");

var images = document.getElementsByTagName("img");
console.log(typeof(images));
var arr = Array.from(images);
arr.forEach(e => {
    var rgb = getAverageRGB(e);
    var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    console.log(hex);
    var lighterShade = newShade(hex, 5);
    // document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    e.style.setProperty("-webkit-filter", "drop-shadow(0px 0px 15px "+lighterShade+")");

});


  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}

function newShade(hexColor, magnitude) {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
    defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data, width, height,
    i = -4,
    length,
    rgb = {r:0,g:0,b:0},
    count = 0;
        
    if (!context) {
        console.log("No Context");
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    // var transparentCount = 0;
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}