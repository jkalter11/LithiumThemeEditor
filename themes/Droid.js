(height, percentage, charging, low, color)
{
    var barHeightMinusTwo = 2 * Math.round(height * 2 / 5),
        barHeight = barHeightMinusTwo + 2,
        widthMinusTwo = 2 * Math.round(barHeightMinusTwo * 5 / 16),
        width = widthMinusTwo + 2,
        cutWidth = Math.floor(1 + width * 3 / 14),
        cutHeight = Math.floor(1 + barHeight / 11),
        canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        imageData;
    canvas.width = width;
    canvas.height = barHeight;
    context.fillStyle = "rgba(0,0,0,0.3)";
    context.fillRect(1, 1, widthMinusTwo, barHeightMinusTwo);
    context.fillStyle = "#000";
    context.fillRect(1, barHeightMinusTwo * ((100 - percentage) / 100), widthMinusTwo, barHeightMinusTwo);
    context.clearRect(0, 0, cutWidth, cutHeight);
    context.clearRect(width - cutWidth, 0, cutWidth, cutHeight);
    imageData = context.getImageData(0, 0, width, barHeight);
    for(var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 3] = 255 - imageData.data[i + 3];
    }
    context.putImageData(imageData, 0, 0);
    context.font = barHeightMinusTwo * ((percentage < 6) ? 0.625 : 0.375) + "pt HelveticaNeue-CondensedBold";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(charging ? '\u26a1' : (percentage < 6) ? '!' : percentage, width / 2, barHeight / 2, widthMinusTwo * 0.9);
    imageData = context.getImageData(0, 0, width, barHeight);
    for(var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 3] = 255 - imageData.data[i + 3];
        var currentTrans = imageData.data[i + 3] / 255;
        imageData.data[i] = color[0] * currentTrans;
        imageData.data[i + 1] = color[1] * currentTrans;
        imageData.data[i + 2] = color[2] * currentTrans;
    }
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
}