;(function(root, factory) {
    if (!root.oneWorldWidget) {
        root.oneWorldWidget = factory();
        document.addEventListener('DOMContentLoaded', oneWorldWidget.initialize.bind(oneWorldWidget));
    }
}(this, function() {
    var widgetListCode = [],
        tplListener = {},
        templates = {},
        styleCollection = {},
        tplUrl = './build/templates/widget-content.tpl',
        widgetParams = {
            width: 200, //can be use with 'flexible' param
            height: 300,
        };


    /*----------  init div/iframe  ----------*/
    function findAllWidgetContainers() {
        var selectOwoWidgetContainers = document.querySelectorAll('[data-owo-widget-type^=poll]');

        for (var i = 0; i < selectOwoWidgetContainers.length; i++) {
            selectOwoWidgetContainers[i].appendChild(addIframe());
        }
    }

    function addIframe() {
        var frame = document.createElement('iframe');

        frame.setAttribute('id', addIdToken());
        frame.setAttribute('scrolling', 'no');
        frame.setAttribute('frameborder', '0');
        frame.setAttribute('border', '0');
        frame.frameBorder = '0';
        frame.allowTransparency = 'true';
        frame.setAttribute('style',
                        'visibility: hidden; '+
                        'height: 0px!important; '
        );
        frame.setAttribute('src', 'javascript:0;');
        tplListener[frame.attributes.id.value] = 0;

        return frame;
    }

    function addIdToken(div) {
        var widgetContainer = div,
            token = Math.floor(Math.random() * 50000) + 10000;
        
        widgetListCode.push('owo-' + token);

        return 'owo-' + token;
    }

    /*----------  Ajax CORS wrapper  ----------*/
    function createCORSrequest(method, url) {
        var xhr = new XMLHttpRequest(),
            xdr;

        if ('withCredentials' in xhr) {
            //support for modern browser
            xhr.open(method, url, true);
        }
        else if (typeof XDomainRequest != undefined) {
            //IE support
            xdr = new XDomainRequest();
            xdr.open(method, url);
        }
        else {responseText
            //xhr not supported
            xhr = null;
        }

        return xhr != undefined ? xhr : xdr;
    }

    function makeCorsRequest(objParams) {
        var xhr = createCORSrequest(objParams.method, objParams.url);

        if (!xhr) {
            console.warn('CORS not supported!');
            return;
        }

        xhr.onload = function() {
            if (typeof objParams.callbackSuccess === 'function') {
                objParams.callbackSuccess(xhr.responseText);
            }
            else {
                console.log('Request without callback');
            }
        }

        xhr.onerror = function() {
            console.error('Request error');
        }

        xhr.send();
    }

    /*----------  prepare tpl for action  ----------*/
    function prepareTpl(tpl) {
        var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g;

        tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function(matchStr, id, template) {
            templates[id] = template;
        });

        return templates;
    }

    function prepareCss(tpl) {
        var re = /<css[\s\t]*>(((?!<\/tpl).)*)<\/css>/g;

        tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function(matchStr, style) {
            styleCollection['css'] = style;
        });

        return styleCollection;
    }

    function renderTpl() {
        var frame;

        for (var i = 0; i < widgetListCode.length; i++) {
            frame = document.getElementById(widgetListCode[i]);
            injectContent(frame);
            injectCss(frame);
        }
    }

    function injectContent(frame, tplIndex) {
        var iframeDocument = frame.contentDocument,
            templateSize = Object.keys(templates),
            tplCurrentIndex = tplIndex !== undefined ? tplIndex : 0;

        iframeDocument.open();
        iframeDocument.write(templates[templateSize[tplCurrentIndex]]);
        iframeDocument.close();

        if (frame.style.visibility !== '' || frame.style.height === '0px') {
            setIframeInlineStyle(frame);
        }
    }

    function injectCss(frame) {
        var iframeDocument = frame.contentDocument,
            iframeHead = iframeDocument.getElementsByTagName('head')[0],
            styleTag = document.createElement('style'),
            style = styleCollection;

        styleTag.type = 'text/css';
        
        if (styleTag.styleSheet){
          styleTag.styleSheet.cssText = style.css;
        } 
        else {
          styleTag.appendChild(iframeDocument.createTextNode(style.css));
        }

        iframeHead.appendChild(styleTag);
    }

    function setIframeInlineStyle(frame) {
        var width,
            height = widgetParams.height;

        widgetParams.width === 'flexible' ? width = '100%' : width = widgetParams.width;
        frame.setAttribute('style', 'width:'+ width + 'px; height: ' + height + 'px');
    }

    /*----------  init listeners  ----------*/

    function initListeners() {
        var iframe;

        for (var i = 0; i < widgetListCode.length; i++) {
            iframe = document.getElementById(widgetListCode[i]);
        
            if (iframe.contentDocument.getElementById('submit-poll') !== null) {
                iframe.contentDocument.getElementById('submit-poll').addEventListener('click', clickListener, false);
            }
        }

        function clickListener() {
            if (validatePollForm()) {
                showNextView();
            }
        }
    }

    /*----------  validate section  ----------*/
    function validatePollForm() {
        return true;
    }

    /*----------  tplCollection action  ----------*/
    function showNextView() {
        var frame = document.activeElement,
            frametId = frame.attributes.id.value,
            templateSize = Object.keys(templates);

        if (tplListener[frametId] + 1 < templateSize.length) {
            injectContent(frame, tplListener[frametId] + 1);
            initListeners();
            tplListener[frametId] += 1;
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
            var self = this;
            
            findAllWidgetContainers();
            self.render();
        },
        render: function() {
            var self = this;

            makeCorsRequest({
                url: tplUrl,
                method: 'GET',
                callbackSuccess: function(response) {
                    try {
                        prepareTpl(response);
                        prepareCss(response);
                        renderTpl();
                        initListeners();
                    }
                    catch (e) {
                        console.log('1W Error ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            });
        }
    }
}));

// 1. Object var App = {};
// 2. Function var App = function() {}; App.initialize();
// 3. Self-invoking function (function() {}());