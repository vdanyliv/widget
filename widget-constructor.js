;(function(root, factory){
    var widgetConstructor = factory();

    if (!root.oneWorldWidget) root.oneWorldWidget = new widgetConstructor();

    document.addEventListener('DOMContentLoaded', oneWorldWidget.initialize.bind(oneWorldWidget));

}(this, function() {
    var widgetContainer = 'widget';

    function getElement(id) {
        return document.getElementById(id);
    }

    function getElements(className) {
        return document.getElementsByClassName(className);
    }

    function ajax(dataObj) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', dataObj.url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            }
            else {
                if (typeof dataObj.callbackSuccess === 'function') {
                    dataObj.callbackSuccess(xhr.responseText);
                }
            }
        };
    }

    function initListeners() {
        var elements = getElements('vote'),
            index = elements.length;

        while(index--) {
            elements[index].addEventListener('change', function() {
                console.log('Voted: ', this.getAttribute('data-id'));
            });
        }
    }

    return function(elem) {
        this.version = '0.0.1';
        this.widgetElement = null;
        this.initialize = function() {
            console.error('widget was initialized');

            this.render();
        };
        this.render = function() {
            var self = this,
                element = elem ? elem : widgetContainer;

            self.widgetElement = getElement(element);

            ajax({
                url: './templates/widget-content.tpl',
                callbackSuccess: function(response) {
                    try {
                        self.widgetElement.innerHTML = response;

                        initListeners();
                    }
                    catch (e) {
                        console.log('1W Error ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            });
        };
        this.hide = function () {
            if (this.widgetElement) this.widgetElement.style.display = 'none';
        };
        this.show = function() {
            if (this.widgetElement.style.display === 'none') this.widgetElement.style.display = 'block';
        }
    }
}));