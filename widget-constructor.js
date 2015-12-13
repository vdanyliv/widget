;(function(root, factory){
    if (!root.oneWorldWidget) root.oneWorldWidget = factory();

    document.addEventListener('DOMContentLoaded', oneWorldWidget.initialize());

}(window, function() {
    var widgetContainer = 'widget';

    function getElement(id) {
        return document.getElementById(id);
    }

    function getElements(className) {
        return document.getElementsByClassName(className);
    }

    return {
        version: '0.0.1',
        widgetElement: null,
        initialize: function() {
            console.error('widget was initialized');

            this.render();
        },
        render: function() {
            this.widgetElement = getElement(widgetContainer);

            this.widgetElement.innerHTML = 'Hello Widget!';
            this.widgetElement.style.background = 'gold';
        },
        hide: function () {
            if (this.widgetElement) this.widgetElement.style.display = 'none';
        },
        show: function() {
            if (this.widgetElement.style.display === 'none') this.widgetElement.style.display = 'block';
        }
    }
}));