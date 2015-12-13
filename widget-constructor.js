;(function(root, factory){
    if (!root.oneWorldWidget) root.oneWorldWidget = factory();

    document.addEventListener('DOMContentLoaded', oneWorldWidget.initialize.bind(oneWorldWidget));

}(window, function() {
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

    return {
        version: '0.0.1',
        widgetElement: null,
        initialize: function() {
            console.error('widget was initialized');

            this.render();
        },
        render: function() {
            var self = this;

            self.widgetElement = getElement(widgetContainer);

            ajax({
                url: './templates/widget-content.tpl',
                callbackSuccess: function(response) {
                    self.widgetElement.innerHTML = response;
                }
            });
        },
        hide: function () {
            if (this.widgetElement) this.widgetElement.style.display = 'none';
        },
        show: function() {
            if (this.widgetElement.style.display === 'none') this.widgetElement.style.display = 'block';
        }
    }
}));