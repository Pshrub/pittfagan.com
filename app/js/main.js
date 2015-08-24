(function() {
    function once(fn) {
        var called = false;

        return function() {
            if (!called) {
                called = true;
                var args = Array.prototype.slice.call(arguments);
                fn.apply(this, args);
            }
        };
    }

    var onTransitionEnd = (function() {
        var el = document.createElement('div');
        var eventName;

        if (typeof el.style.transition !== undefined) {
            eventName = 'transitionend';
        } else if (typeof el.style.webkitTransition !== undefined) {
            eventName = 'webkitTransitionEnd';
        }

        return function(el, fn) {
            if (eventName) {
                el.addEventListener(eventName, fn);
                return function() {
                    el.removeEventListener(eventName, fn);
                };
            } else {
                fn.apply(el);
                return function() {};
            }
        };
    })();

    var cover = document.getElementById('cover');
    var coverStyle = cover.style;
    var backgroundImage = coverStyle.backgroundImage;

    coverStyle.backgroundImage = '';
    coverStyle.opacity = 0;

    var imagePath = /\(([^\)]+)\)/.exec(backgroundImage)[1];

    var progressBar = document.createElement('div');
    progressBar.id = 'progress';
    document.body.appendChild(progressBar);

    var xhr = new XMLHttpRequest();

    xhr.onprogress = (function() { 
        var lastProgress = -1;
        var markedActive = false;
        return function(e) {
            if (!e.lengthComputable) return;
            if (!markedActive) {
                progressBar.className = 'active';
                markedActive = false;
            }

            var loaded = e.loaded;
            var total = e.total;
            var progress = loaded/total;

            if (progress > lastProgress) {
                progressBar.style.width = (progress * 100) + '%';
                lastProgress = progress;
            }
        };
    })();

    xhr.onload = function(e) {
        progressBar.className = 'done';

        onTransitionEnd(progressBar, once(function() {
            progressBar.remove();
        }));
        
        coverStyle.backgroundImage = backgroundImage;
        coverStyle.opacity = 1;
        xhr = null;
    };

    xhr.open('GET', imagePath, true);
    xhr.send();
})();
