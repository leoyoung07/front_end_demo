window.onload = function () {
    var linkElement = document.getElementById('skinStyleSheet');
    var skinElements = document.getElementById('skin').getElementsByTagName('li');
    for (var index in skinElements) {
        if (skinElements.hasOwnProperty(index)) {
            var element = skinElements[index];
            element.onclick = function () {
                for (var i in skinElements) {
                    if (skinElements.hasOwnProperty(i)) {
                        var elem = skinElements[i];
                        elem.className = "";
                    }
                }
                this.className = 'current';
                linkElement['href'] = this.id + ".css";
            }
        }
    }
}