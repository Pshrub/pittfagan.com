(function(window) {

    var document = window.document,
        slice = Array.prototype.slice,
        console = window.console;

    // Cache access to common elements
    var els = {
        main: document.getElementsByTagName('main')[0]
    };

    function throttle(fn, duration) {
        var timerId;

        return function() {
            var args = slice.call(arguments),
                context = this;

            if (!timerId) {
                timerId = window.setTimeout(function() {
                    fn.apply(context, args);
                    timerId = null;
                }, duration);
            }
        };
    }

    function resizeMain() {
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        els.main.style.height = height + 'px';
    }
    
    function addEvent(el, evt, fn) {
        if (el.addEventListener) {
            el.addEventListener(evt, fn);
        } else if (el.attachEvent) {
            el.attachEvent('on' + evt, fn);
        }
    }

    addEvent(window, 'resize', throttle(resizeMain, 100));
    resizeMain();

    if (window.console && window.console.log && window.atob) {
        var image = window.atob(getImage());
        window.console.log(image);
    }

    function getImage() { return 'DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKycrIyMjIyMjQCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICAgICAgICAgYCsjIyMjI0BAQEBAIyNAQCNAYCAgICAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgICAnJysjIyMjI0AjQEBAIyMjI0BAQEBAYCAgICAgICAgICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgICAgICArOzsjIyMjIyMjIyMjQEBAQEBAQEBAQEBALCAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICAgOzorIyMjIyMjI0BAIyNAIyNAQEBAQEBAQCMjQEArICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgOyMrIyMjIyMjQCNAQEAjIyNAQEBAQEAjQEBAQEBAIyMgICAgICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgICMjIyMjI0AjQEAjQEAjQCMjIyMjQEBAQEBAIyNAQEBAIyAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICMjQCNAQEBAQEBAQEBAQEBAQCNAQEAjIyNAQEBAQEBAQCMjICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICMjIyMjQEBAQEBAQEAjI0BAQCNAQEBAQEBAQEBAQEBAQEBAQEArICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICMjIyMjI0BAI0AjQCMjIyNAIyNAI0BAQCMjQEBAQEBAQCMjI0BAI2AgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgIGAjI0AjQEBAIyMjIyMjIyMjIyMjIyMjI0BAQEBAQCNAQEBAQEBAQEBAICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAjIyNAQEAjIyMjKysrKysrKyMjIyMjIyNAQCMjI0BAQEBAQEBAQEAjQGAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICBgIyNAQEAjI0AjKycnJzsnJysrKysrIyMjIyMjI0BAQEBAQCNAQEBAQEBAICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgLCMjI0BAI0AjJzs7Ozs7OzsnJycrKysrIyMjIyMjIyNAQEBAIyNAQEBAQCMuICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICsjQEBAQEAjJzs7Ozs6Ozs7OzsnJycnJysrKysrKyMjIyMjIyMjIyNAQEBAOyAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICBAIyNAQEAjJzs7Ozs6Ozo7Ozs7OzsnJycnJycrKysrKysjIyMjIyMjQEBAQEAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgQCMjQEBAKzs7Ozo6Ojo7Ozs7Ozs7OycnJycnJycnKysrKysrKysjI0BAQEBAYCAgICAgICAgICAgICANCiAgICAgICAgICAgICAgO0AjI0AjIzs7Ozs6Ojo6Ojo7Ozs7Ozs7OycnJycnJycnJysrKysrKytAI0BAQDsgICAgICAgICAgICAgDQogICAgICAgICAgICAgICMjIyMjIys7Ozs7Ojo6Ojo6Ojs7Ozs7Ozs7JycnJycnJycnJycnJycrI0BAI0A7ICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAjQCMjQCMrOzs6Ojo6Ojo6Ojo7Ozs7Ozs7OycnJycnJycnJycnJycnKyNAQEBAIyAgICAgICAgICAgICANCiAgICAgICAgICAgICAgIyMjIyMjJzs6Ojo6Ojo6Ojo6Ojs7Ozs7OzsnJycnJycnJycnJycnJysjQEBAQEAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICMjIyMjIyc6Ojo6Ojo6Ojo6Ozo6Ozs7Ozs7OycnJycnJycnJycnJycrIyNAQEAjICAgICAgICAgICAgIA0KICAgICAgICAgICAgICA6IyMjIyMnOjo6Ojo6Ojo6Ojo7Ozs7Ozs7Ozs7JycnJycnJycnJycnJysjIyNAIyAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICMjIyMrJzs6Ojo6Ojo6Ojo6Ozs7Ozs7Ozs7OzsnJycnJycnJycnJycrI0BAIzsgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAjIyMjKyc6Ojo6Ojo6Ojo6Ojs7Ozs7Ozs7Ozs7JycnJycnJycnJycnKyMjQCsgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgIyMjIyMnOjo6Ojo6Ojo6Ojo7Ozs7Ozs7Ozs7OzsnJycnJycnJycnJysjIyMrICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICMjIyMjOzo6Ojo6Ojo6Ojo6Ojs7Ozs7Ozs7Ozs7JycnJycnJycnJycnIyMjOiAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAnIyMjKzo6Ojo6Ojo6Ozs6Ojo7Ozs7Ozs7Ozs7OycnJycnJycnJycnJyMjIyAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICMjIys6Ojo6Ojs7Ozs7Ozs7Ozs7Ozs7Ozs7OycnJysrKysrKysnJycrIyMgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgIGAjIyMnOjo6OycrKysrKysnJzs7Ozs7Ozs7OycrKyMjIyMjIyMjKycnKyMjOiAgICAgICAgICAgICAgDQogICAgICAgICAgICAgIDsnIysjOzo6JycrKysrKyMjIysrJzs7Ozs7OycrIyMjIysrKysrKysrJycjIysgICAgICAgICAgICAgIA0KICAgICAgICAgICAgIDo6OicjKzo6Ojs7Ozs7Ozs7OzsnJycnOzs7JycrKycnJycnJycnJycnJycnIyMjOiAgICAgICAgICAgICANCiAgICAgICAgICAgICA7Jzs7Iys6Ojo7Ojo6Ojs7JysnJzs7Ozs7OycnKysrKysrIyMrKysnJycnJyMjIywgICAgICAgICAgICAgDQogICAgICAgICAgICAgOyc6OyMrOjo6Ojo6JycrIyMrKysnOzo6OjsnKysrKysjKyMjKyMjKycnJycjIyMgICAgICAgICAgICAgIA0KICAgICAgICAgICAgIDsnOzorKzo6Ojo6OysnOicrKysrKyc7Ojo7JysrKyMrJysjIysjIysnJycnIysrICAgICAgICAgICAgICANCiAgICAgICAgICAgICA6Kzs6Kys6Ojo6Ojs7OycnKysrKysnOzs7OycrKysrKysrIysrJysnJycnJyMnKyAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICc7OicrOjo6Ojo6Ojs7OycnKysnOzs6OzsnKysrKysrJycnJycnJycnJycrJywgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICA6Jzs7Kzo6Ojo6Ojo6Ojs7JycnJzs7OzsnJysrKysrKysrJycnJycnJycnKycgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgLic7Oys6Ojo6Ojo6Ojo6Ozs7Jzs7Ojs7JysrKysnKysnJycnJycnJycnJysrICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICA6JzsnOjo6Ojo6Ojo6Ozs7Ozs7Ojs7OycrKysrJycnJycnJycnJycnJycnLCAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgLjs7Ojo6Ojo6Ojo6Ozs7Ozs7Ojo7OzsnJysrKycnJycnJycnJycnJycnJyAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICA6Ozo6Ojo6Ojo6Ojo7Ozs7Ozo7Ojs7JycrKysnJycnJycnJycnJycnJycgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgLjs7Ojo6Ojo6Ojo6Ojo7Ozs6Ojs7OzsnKysrJycnJycnJycnJycnJycsICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICA6Ojo6Ojo6Ojo6Ojo6Ozs7Ojo6Ojs7JycnKycnJycnJycnJycnJycnICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgLjo6OiwsOiwsLDo6Ojs7Ozo6Ojo6JycnJycrJycnJycnJycnJycnICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgIDosLCwsLDo6Ojo7Ozs7Oyc6OzsrKzsrJycnJycnJycnJycnJyAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICA6OiwsLDosOjo6Ozs7Ozs7OzsnKyMrKycnJycnJycnJycnJycgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgLDosLCw6LDo6Ojs6Ozs7OzsnOysrKycnJycnJycnJycnJycsICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgIC4sOjosOjo6Ojo6Ojs7Ozs7JzsnKysrJycnJycnJycnJycnICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICAsLDo6Oiw6Ojo6Ojo6Ozs7Oyc7JycrJycnJycnJycnJycnJyAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICw6Oiw6Ojo6Ojo6Ojo6OjsnOycnJycnJycnJycnJycnJycgICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgICAsOjo6LDo6Ojs7Ojo6Ojo7OzsnJycnJycnJycnJycnJycrICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICAgOjo6Ojo6Ojo7OzsnJysrJycnKysjIyMjKzsnJycnJycnYCAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgIGA6Ojo6Ojo6Ojo6Ozs7OycnJycnKysrKycnJycnJycnJyAgICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgICAgOjo6Ojo6Ojo6Ojo6Ozo7JzsnJysrJycnJycnJycnJzsgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICAgICA6Ojo6Ojo6Ojo6Ojo6Ozs7OycnJycnJycnJycnJycgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgLDo6Ojo6Ojo6Ojo6Ojo7Ozs7JycnJycnJycnJycgICAgICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgICAgICc6Ojo6Ojo6Ojo6Ojo6Ozs7OzsnJycnJycnJycrICAgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgICAgICAgICM6Ojo6Ojo6Ojo6Ojo6Ojs7Ozs7JycnJycnJycnICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICMjOjo6Ojo6Ojo6Ojo6Ojo7OzsnJycnJycnJycnQEAgICAgICAgICAgICAgICAgICAgICAgDQogICAgICAgICAgICAgICAgICAgJysjIzo6Ojo6Ojo6Ojo6Ojo6Ozs7JycnJycnJycnKyNAIywgICAgICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgICAgLicjIyMjIys6Ojo6Ojo6Ojo6Ojo6Ojs7OzsnJycnJycnKysrQEAjIyMjIyMjOyAgICAgICAgICAgICANCiAgICAgICAgICAgIDojIyMjIyMrIyMnOjo6Ojo6Ojo6Ojo6Ojo7Ozs7OycnJycnJycrK0BAQCMjIyMjI0BAIyMsICAgICAgICAgDQogICAgICAgICA6KyMjIyMjIyMjIyMrJzo6Ojo6OjosOjo6Ojo6Ojs7OzsnJycnJycnKysjQEBAIyNAIyNAIyNAQCM7ICAgICAgIA0KICAgICAsKyMjIyMjIyMjIyMjIyMjJyc6OiwsOjo6Oiw6Ojo6Ojo7Ojs7OycnJycnJysrKyNAQCMjQEBAI0BAQEBAQCMjLCAgICANCiAgKysjIyMjIyMjIyMjIyMjIyMjIzsnOjo6LCw6OjosLCw6Ojo6Ozs7Ozs7JycnJycrKysrI0BAQEBAQEAjQEBAQCMjIyMjIyAgDQojIyMjIyMjIyMjIyMjIyMjIyMjIys6Ljo6OiwsLDo6OiwsOjo6Ojs7OzsnJycnJycrKycrJytAQEAjQEBAQCNAQEBAQCNAIyMjIw0KIyMjIyMjIyMjIyMjIyMjIyMjIyMrOi47OjosLCwsOjosLDosOjo6OzsnJycnJycnKycnKzsnI0BAIyNAQEBAI0BAQEAjQCMjIyMNCiMjIyMjIyMjIyMjIyMjIyMjIyMjJywuLjosLCwsLCw6Ojo6LDo6Ojs7OycnJycnJysnJys7OysjQEBAQEBAI0BAQEAjIyNAIyMjDQojIyMjIyMjIyMjIyMjIyMjIyMjIzosLi4uLCwsLCwsLDo6Ojo6Ojo7Ozs7JycnJycnJys7OzsnK0BAQEBAIyNAIyNAI0AjI0BAIw0KIyMjIyMjIyMjIyMjIyMjIyMjIyM6Oi4uLjssLCwsLCw6Ojo6Ojo6Ozs7OzsnJycnJysrOzs7OycjQCMjIyNAQCMjI0BAIyNAQCMNCiMjIyMjIyMjIyMjIyMjIyMjIyMnOiwuLi4uOiwsLCwsOjo6Ojo6Ojo7Ozs7JycnJysrJzs7OzonKyMjQCNAI0AjIyMjQEAjIyMjDQojIyMjIyMjIyMjIyMjIyMjIyMjJzsuLC4uLi4sLCwsLDo6Ojo6Ojo7Ozs7OycnJycrKzs7Ojo7JycjIyMjIyMjIyMjI0BAIyMjIw0KIyMjIyMjIyMjIyMjIyMjIyMjKyc6LC4sLmAuLjosLCw6Ojo6Ojo6Ojs7OzsnJycnKzo7Ojo6Ozs7IyMjIyMjIyMjIyMjQCMjIyMNCiMjIyMjIyMjIyMjIyMjIyMjIys7LCwuLCwuLi4sOiwsOjo6Ojo6Ojo7OzsnJycnJys6Ojo6Ojo7OicjIyMjIyMjIyMjQCMjIyNADQojIyMjIyMjIyMjIyMjIyMjIyMnOywsLi4sLi4uLjo6Ojo6Ojo6Ojo6Ozs7JycnJyc6Ojo6Ojo6OjonIyMjIyMjIyMjI0AjIyMjIw0KIyMjIyMjIyMjIyMjIyMjIyMjOzosLC5gLiwuLi4uOzo6Ojs7Ozo6Ojo7Oyc7OzssOjo6Ojo6Ojs7OyMjIyMjIyMjI0BAQCMjIyMNCiMjIyMjIyMjIyMjIyMjIyMjKzo6LCwsLmAuLC4uLi46Ozo7Ozs7Ozo6Ojs7Ozs6Ojo6Ojo6Ozs7OzsnIyMjIyMjIyMjI0AjQEAjDQoNCiAgXyAgICBfICAgICAgXyBfICAgICAgDQogfCB8ICB8IHwgICAgfCB8IHwgICAgIA0KIHwgfF9ffCB8IF9fX3wgfCB8IF9fXyANCiB8ICBfXyAgfC8gXyBcIHwgfC8gXyBcDQogfCB8ICB8IHwgIF9fLyB8IHwgKF8pIHwNCiB8X3wgIHxffFxfX198X3xffFxfX18vDQoNClRoYW5rcyBmb3IgdmlzaXRpbmcuDQoNCklmIHlvdSdkIGxpa2UgdG8gcmVhY2ggbWUsIG15IGVtYWlsIGFkZHJlc3MgaXMgbXkgZmlyc3QgbmFtZSBAZGF2aWRwYWRidXJ5LmNvbS4NCg0KQ2hlZXJzLg0K'; }

})(window);