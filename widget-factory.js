;(function(root, factory){
    if (!root.oneWorldWidget) root.oneWorldWidget = factory();

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

        while (index--) {
            elements[index].addEventListener('change', function() {
                var sideId = this.getAttribute('data-side-id');

                sdk.pollVote(sideId);
            });
        }
    }

    var sdk = {
        pollVote: function(sideId) {
            console.log('Voted: ', sideId);
        }
    };

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
                    try {
                        self.widgetElement.innerHTML = response;

                        initListeners.call(self);
                    }
                    catch (e) {
                        console.log('1W Error ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
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

// 1. Object var App = {};
// 2. Function var App = function() {}; App.initialize();
// 3. Self-invoking function (function() {}());