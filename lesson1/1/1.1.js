function changeStyle(targetElement, attribute, value) {
    targetElement.style[attribute] = value;
}

window.onload = function () {
    var buttons = document.getElementsByTagName('input');
    var targetDiv = document.getElementById('targetDiv');
    var attributes = ['width', 'height', 'background', 'display', 'display'];
    var values = ['200px', '200px', 'red', 'none', 'block'];
    function onClickHelper(i) {
        return function(){
            i == buttons.length - 1 && (targetDiv.style.cssText = "");
            changeStyle(targetDiv, attributes[i], values[i]);
        };
    }
    for (var index in buttons) {
        buttons[index].onclick = onClickHelper(index);
    }
};

