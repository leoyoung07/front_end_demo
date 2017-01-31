window.onload = function () {
    var box = document.getElementById('box');
    var replayLink = document.getElementById('replayLink');
    var boxHeader = document.getElementById('boxHeader');
    window.staticValues = {};
    staticValues.isDragging = false;
    showStatus();

    function init() {
        window.staticValues.positionStack = [];
        window.staticValues.isDragging = true;
    }

    boxHeader.onmousedown = function (event) {
        init();

        event = event || window.event;
        staticValues.disX = event.clientX - box.offsetLeft;
        staticValues.disY = event.clientY - box.offsetTop;

        staticValues.positionStack.push({ x: box.offsetLeft, y: box.offsetTop });
    };


    boxHeader.onmouseup = function (event) {
        if (window.staticValues && staticValues.isDragging) {
            staticValues.isDragging = false;
            showStatus();
        }

    };

    document.onmousemove = function (event) {
        if (window.staticValues && staticValues.isDragging) {
            event = event || window.event;

            var positionLeft = event.clientX - staticValues.disX;
            var positionTop = event.clientY - staticValues.disY;

            var maxLeft = document.documentElement.clientWidth - box.offsetWidth;
            var maxTop = document.documentElement.clientHeight - box.offsetHeight;

            positionLeft = Math.min(positionLeft, maxLeft);
            positionLeft = Math.max(positionLeft, 0);
            positionTop = Math.min(positionTop, maxTop);
            positionTop = Math.max(positionTop, 0);

            box.style.marginTop = box.style.marginLeft = 0;
            box.style.left = positionLeft + 'px';
            box.style.top = positionTop + 'px';

            staticValues.positionStack.push({ x: box.offsetLeft, y: box.offsetTop });
            showStatus();
        }
    };

    replayLink.onmousedown = function (event) {
        event = event || window.event;
        event.cancelBubble = true;
    };

    function showStatus() {
        document.getElementById('dragStatusSpan').innerHTML = staticValues.isDragging.toString();
        document.getElementById('offsetTopStatusSpan').innerHTML = box.offsetTop;
        document.getElementById('offsetLeftStatusSpan').innerHTML = box.offsetLeft;
    }

    replayLink.onclick = function (event) {
        if (staticValues.positionStack.length == 0) {
            return;
        }
        var timer = setInterval(function () {
            var position = staticValues.positionStack.shift();
            if (position) {
                box.style.left = position.x + 'px';
                box.style.top = position.y + 'px';
                showStatus();
            } else {
                clearInterval(timer);
            }
        }, 30);
    };
};