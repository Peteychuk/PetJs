/**
 *
 * PetJS - This library is designed to develop (full) ajax application
 *
 * @author     Yaroslav Peteychuk <http://www.peteychuk.com/>, <peteychuk@gmail.com>
 * @url        http://petframework.peteychuk.com/
 * @copyright  2012-2013 by Peteychuk
 * @version    1.0.0
 * @update     14-12-2013
 * @includes   HistoryAPI 4.0.2 (c) 2011-2013 by Dmitrii Pakhtinov
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */


/**
 * HistoryAPI for HTML4 browsers
 */
(function(window,True,False,Null,undefined){"use strict";var document=window.document,windowHistory=window.history||{},windowLocation=window.location,api=!!windowHistory.pushState,initialState=api&&windowHistory.state===undefined,initialFire=windowLocation.href,JSON=window.JSON||{},defineProp=Object.defineProperty,defineGetter=Object.prototype.__defineGetter__,defineSetter=Object.prototype.__defineSetter__,historyPushState=windowHistory.pushState,historyReplaceState=windowHistory.replaceState,sessionStorage=window.sessionStorage,hasOwnProperty=Object.prototype.hasOwnProperty,toString=Object.prototype.toString,msie=+((eval("/*@cc_on 1;@*/")&&/msie (\d+)/i.exec(navigator.userAgent)||[])[1]||0),libID=(new Date).getTime(),VBInc=(defineProp||defineGetter)&&(!msie||msie>8)?0:1,iframe=msie<8?document.createElement("iframe"):False,_a,_r,_d,eventPrefix="",addEvent=(_a="addEventListener",window[_a])||(_a="attachEvent",eventPrefix="on",window[_a]),removeEvent=(_r="removeEventListener",window[_r])||(_r="detachEvent",window[_r]),fireEvent=(_d="dispatchEvent",window[_d])||(_d="fireEvent",window[_d]),eventsListPopState=[],eventsListHashChange=[],skipHashChange=0,eventsList={onpopstate:eventsListPopState,popstate:eventsListPopState,onhashchange:eventsListHashChange,hashchange:eventsListHashChange},sets=function(){var e,t,n,r={basepath:"/",redirect:0,type:"/"},i=document.getElementsByTagName("SCRIPT");for(e=0;i[e];e++){if(t=/(.*)\/(?:history|spike)(?:-\d\.\d(?:\.\d)?\w?)?(?:\.min)?.js\?(.*)$/i.exec(i[e].src)||e===i.length-1&&(t=i[e].src.split("?")).length===2&&(t[2]=t[1])&&t){for(e=0,n=t[2].split("&");n[e];){t=n[e++].split("=");r[t[0]]=t[1]=="true"?True:t[1]=="false"?False:t[1]||""}r["basepath"]=r["basepath"]||"/";break}}return r}(),normalizeUrl=function(e){var t,n,r,i,s,o,u,a=new RegExp("^"+sets["basepath"],"i");return function(f,l){if(!f){f=windowLocation.href;if(!api||l){f=windowLocation.protocol+"//"+windowLocation.host+sets["basepath"]+(f.replace(/^[^#]*/,"")||"#").replace(new RegExp("^#[/]?(?:"+sets["type"]+")?"),"")}}else if(!api){var c=normalizeUrl(),h=c._pathname,p=c._protocol;f=/^(?:[a-z]+\:)?\/\//.test(f)?f.indexOf("/")===0?p+f:f:p+"//"+c._host+(f.indexOf("/")===0?f:f.indexOf("?")===0?h+f:f.indexOf("#")===0?h+c._search+f:h.replace(/[^\/]+$/g,"")+f)}if(t!==f){e.href=t=f;o=e.port;s=e.host;u=e.pathname;if(e.protocol==="http:"&&o==80||e.protocol==="https:"&&o==443){s=e.hostname;o=""}u=u.indexOf("/")===0?u:"/"+u;n=u+e.search+e.hash;i=u.replace(a,sets["type"])+e.search;r=i+e.hash}return{_href:e.protocol+"//"+s+n,_protocol:e.protocol,_host:s,_hostname:e.hostname||windowLocation.hostname,_port:o||windowLocation.port,_pathname:u,_search:e.search,_hash:e.hash,_relative:n,_nohash:i,_special:r}}}(document.createElement("a")),History=!VBInc?windowHistory:{back:windowHistory.back,forward:windowHistory.forward,go:windowHistory.go,pushState:Null,replaceState:Null,emulate:!api,toString:function(){return"[object History]"}},HistoryAccessors={state:{get:function(){return iframe&&iframe["storage"]||historyStorage()[History.location.href]||Null}},length:{get:function(){return windowHistory.length}},location:{set:function(e){window.location=e},get:function(){return api?windowLocation:Location}}},Location={assign:function(e){windowLocation.assign(api||e.indexOf("#")!==0?e:"#"+normalizeUrl()._nohash+e)},reload:windowLocation.reload,replace:function(e){windowLocation.replace(api||e.indexOf("#")!==0?e:"#"+normalizeUrl()._nohash+e)},toString:function(){return this.href}},LocationAccessors={href:{set:function(e){windowLocation.href=e},get:function(){return normalizeUrl()._href}},protocol:{set:function(e){windowLocation.protocol=e},get:function(){return windowLocation.protocol}},host:{set:function(e){windowLocation.host=e},get:function(){return windowLocation.host}},hostname:{set:function(e){windowLocation.hostname=e},get:function(){return windowLocation.hostname}},port:{set:function(e){windowLocation.port=e},get:function(){return windowLocation.port}},pathname:{set:function(e){windowLocation.pathname=e},get:function(){return normalizeUrl()._pathname}},search:{set:function(e){windowLocation.search=e},get:function(){return normalizeUrl()._search}},hash:{set:function(e){var t=e.indexOf("#")===0?e:"#"+e,n=normalizeUrl();if(iframe){if(t!=n._hash){History.pushState(Null,Null,n._nohash+t);hashChanged({oldURL:n._href})}}else{windowLocation.hash="#"+n._nohash+t}},get:function(){return normalizeUrl()._hash}}},createStaticObject=function(e,t,n){var r=e,i,s=False;if(defineProp||defineGetter){for(i in t){if(hasOwnProperty.call(t,i)){if(defineGetter){t[i].get&&defineGetter.call(e,i,t[i].get);t[i].set&&defineSetter.call(e,i,t[i].set)}else if(defineProp){try{defineProp(e,i,t[i])}catch(o){if(n){return False}s=True;break}}}}}else s=True;if(s&&VBInc){var u="StaticClass"+libID+VBInc++,a=["Class "+u];if(!("execVB"in window)){execScript("Function execVB(c) ExecuteGlobal(c) End Function","VBScript")}if(!("VBCVal"in window)){execScript("Function VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function","VBScript")}for(i in e){a[a.length]="Public ["+i+"]"}if(hasOwnProperty.call(e,"toString")){if(!e.propertyIsEnumerable("toString")){a[a.length]="Public [toString]"}t["(toString)"]={get:function(){return this.toString.call(this)}}}for(i in t){if(hasOwnProperty.call(t,i)){if(t[i].get){e["get "+i]=t[i].get;a.push("Public [get "+i+"]","Public "+(i==="(toString)"?"Default ":"")+"Property Get ["+i+"]","Call VBCVal(me.[get "+i+"].call(me),["+i+"])","End Property")}if(t[i].set){e["set "+i]=t[i].set;a.push("Public [set "+i+"]","Public Property Let ["+i+"](v)","Call me.[set "+i+"].call(me,v)","End Property","Public Property Set ["+i+"](v)","Call me.[set "+i+"].call(me,v)","End Property")}}}a.push("End Class","Function "+u+"Factory()","Set "+u+"Factory=New "+u,"End Function");execVB(a.join("\n"));r=window[u+"Factory"]();for(i in e){r[i]=e[i]}if(hasOwnProperty.call(e,"toString")){r.toString=e.toString}}return r},JSONStringify=JSON.stringify||function(e){function t(e){var t=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};t.lastIndex=0;return t.test(e)?'"'+e.replace(t,function(e){var t=n[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}var n=function(r){var i,s,o,u=(typeof r).charCodeAt(2);return u===114?t(r):u===109?isFinite(r)?String(r):"null":u===111||u===108?String(r):u===106?function(){if(!r)return"null";i=toString.apply(r)==="[object Array]";s=i?"[":"{";if(i){for(o=0;o<r.length;o++){s+=(o==0?"":",")+n(r[o])}}else{for(o in r){if(hasOwnProperty.call(r,o)&&r[o]!==e){s+=(s.length==1?"":",")+t(o)+":"+n(r[o])}}}return s+(i?"]":"}")}():e};return n}(),JSONParse=function(){var e=JSON.parse;return function(t){return t?e?e(t):(new Function("return "+t))():Null}}(),historyStorage=function(e){return sessionStorage?e?sessionStorage.setItem("__hitoryapi__",JSONStringify(e)):JSONParse(sessionStorage.getItem("__hitoryapi__"))||{}:{}},fireStateChange=function(e,t,n){var r=e===2?window.onhashchange:window.onpopstate,i=e===2?"hashchange":"popstate",s,o=eventsList[i];if(document.createEvent){s=document.createEvent("Events");s.initEvent(i,False,False)}else{s=document.createEventObject();s.type=i}s.state=History.state;s.oldURL=t;s.newURL=n;if(r){r.call(window,s)}for(var u=0,a=o.length;u<a;u++){o[u].call(window,s)}},hashChanged=function(){var e=window.onpopstate||Null,t=window.onhashchange||Null,n=0,r=Null,i=normalizeUrl(),s=i._href,o=i._hash.replace(/^#/,""),u=function(){if(initialFire&&!(initialFire=0)&&i._relative!==sets["basepath"]){clearInterval(r);setTimeout(fireStateChange,10)}},a=function(e){var t=normalizeUrl();if(skipHashChange){s=t._href;return skipHashChange=0}var r=e.oldURL||s,i=s=e.newURL||t._href,o=r.replace(/^.*?(#|$)/,""),u=i.replace(/^.*?(#|$)/,"");if(r!=i&&!n){fireStateChange()}n=0;initialFire=0;if(o!=u){fireStateChange(2,r,i)}};addEvent(eventPrefix+"hashchange",a,False);addEvent(eventPrefix+"popstate",function(){if(initialFire===windowLocation.href){return initialFire=0}initialFire=0;fireStateChange(n=1)},False);History["fixURL"]=function(e){return normalizeUrl(e)._relative};History=createStaticObject(History,VBInc?HistoryAccessors:windowHistory.state===undefined?{state:HistoryAccessors.state,location:HistoryAccessors.location}:{location:HistoryAccessors.location});Location=createStaticObject(Location,LocationAccessors);window[_a]=function(e,t,n,r){if(eventsList[e]){eventsList[e].push(t);if(!api&&eventsListPopState===eventsList[e]){u()}}else{addEvent(e,t,n,r)}};window[_r]=function(e,t,n){var r=eventsList[e];if(r){for(var i=r.length;--i;){if(r[i]===t){r.splice(i,1);break}}}else{removeEvent(e,t,n)}};window[_d]=function(e,t){var n=e&&e.type||e,r=eventsList[e],i=r===eventsListPopState?window.onpopstate:window.onhashchange;if(r){t=t||(typeof e=="string"?window.event:e);try{t&&(t.target=window)}catch(s){try{t.srcElement=window}catch(s){}}if(i){i.call(window,t)}for(var o=0,u=r.length;o<u;o++){r[o].call(window,t)}return True}else{return fireEvent(e,t)}};if(VBInc){execScript("Public history, onhashchange","VBScript")}if((!defineProp&&!defineGetter||!createStaticObject(window,{onhashchange:{get:function(){return t},set:function(e){t=e||Null}},onpopstate:{get:function(){return e},set:function(t){if(e=t||Null){!api&&u()}}}},1))&&!api){r=setInterval(function(){if(window.onpopstate){u()}},100)}if(sets["redirect"]&&window.top==window.self){var f=normalizeUrl(Null,True)._relative,l=windowLocation.search,c=windowLocation.pathname,h=sets["basepath"];if(api){if(f!=h&&(new RegExp("^"+h+"$","i")).test(c)){windowLocation.href=f}if(!(new RegExp("^"+h,"i")).test(c)){windowLocation.href=c.replace(/^\//,h)+l}}else if(c!=h){windowLocation.href=h+"#"+c.replace(new RegExp("^"+h,"i"),sets["type"])+l+windowLocation.hash}}return a}();History.pushState=function(e,t,n,r){var i=historyStorage(),s=normalizeUrl()._href,o=n&&normalizeUrl(n);initialFire=0;n=o?o._href:s;if(r&&i[s]){delete i[s]}if((!api||initialState)&&sessionStorage&&e){i[n]=e;historyStorage(i);e=Null}if(historyPushState&&historyReplaceState){if(r){historyReplaceState.call(History,e,t,n)}else{historyPushState.call(History,e,t,n)}}else if(o&&o._relative!=normalizeUrl()._relative){skipHashChange=1;if(r){windowLocation.replace("#"+o._special)}else{windowLocation.hash=o._special}}};History.replaceState=function(e,t,n){History.pushState(e,t,n,1)};if(VBInc){window.history=History;(function(e,t){if(!iframe)return;var n,r,i=function(){var e=normalizeUrl()._href;if(t!=e){hashChanged({oldURL:t,newURL:t=e})}};r=setInterval(i,100);iframe.src="javascript:true;";iframe=document.documentElement.firstChild.appendChild(iframe).contentWindow;History.pushState=n=function(e,s,o,u,a){var f=iframe.document,l=["<script>","lfirst=1;",,"storage="+JSONStringify(e)+";","</script>"],c=o&&normalizeUrl(o);if(!c){iframe["storage"]=e;return}if(!a){clearInterval(r)}if(u){if(iframe["lfirst"]){history.back();n(e,s,c._href,0,1)}else{iframe["storage"]=e;windowLocation.replace("#"+c._special)}}else if(c._href!=t||a){if(!iframe["lfirst"]){iframe["lfirst"]=1;n(iframe["storage"],s,t,0,1)}l[2]='parent.location.hash="'+c._special.replace(/"/g,'\\"')+'";';f.open();f.write(l.join(""));f.close()}if(!a){t=normalizeUrl()._href;r=setInterval(i,100)}};addEvent(eventPrefix+"unload",function(){if(iframe["storage"]){var e={};e[normalizeUrl()._href]=iframe["storage"];document.cookie="_historyAPI="+escape(JSONStringify(e))}clearInterval(r)},False);if(e.length>1){e=unescape(e.pop().split(";").shift());try{iframe["storage"]=JSONParse(e)[normalizeUrl()._href]}catch(s){}}if(!JSON.parse&&!JSON.stringify){JSON.parse=JSONParse;JSON.stringify=JSONStringify;window.JSON=JSON}})(document.cookie.split("_historyAPI="),normalizeUrl()._href)}else{window.history["emulate"]=!api}})(window,true,false,null);


/**
 * PetJS
 */
(function(window, undefined)
{
    "use strict";
    
    /**
     *
     *
     * @type {Object} - pet core (constructor)
     * @return {object/function} - public methods
     */
    var pet = window.pet = (function()
    {
        var _public = {};
        var _private =  {};
        var _pet = _private;

        // Options
        _private.options = {
            debug: false,
            basePath: '/',
            collection404: false
        };

        // Local data
        _private.data = {
            lastQuery: {},
            breakRequest: {
                lastLocation: '',
                breakTo: false
            },
            withControlPanel: true
        };

        /**
         * Set settings
         * @param o {object} - data
         * @return {Boolean}
         */
        _public.setSettings = function(o)
        {
            pet.extend(_private.options, o);
            return true;
        };
        /**
         * Get settings
         * @param key {string)
         * @return {strign} - result
         */
        _public.getSettings = function(key)
        {
            return _pet.options[key];
        };

        /**
         * Collections
         * @type {Object}
         */
        _private.collection = {};

        /**
         * Ready function
         * @type {Object}
         */
        _private.ready = {
            options: {
                loaded: false,
                readyList: []
            },
            init: function()
            {
                var called = false

                var ready = function()
                {
                    if (called)
                        return;

                    called = true;

                    // Ready
                    _pet.ready.loaded();
                };

                if ( document.addEventListener )
                {
                    document.addEventListener( "DOMContentLoaded", function()
                    {
                        ready();
                    }, false );
                }
                else if ( document.attachEvent )
                {
                    if ( document.documentElement.doScroll && window == window.top )
                    {
                        var tryScroll = function()
                        {
                            if (called)
                                return;

                            if (!document.body)
                                return;

                            try
                            {
                                document.documentElement.doScroll("left");
                                ready();
                            }
                            catch(e)
                            {
                                setTimeout(tryScroll, 0);
                            }
                        };
                        tryScroll();
                    }

                    document.attachEvent("onreadystatechange", function()
                    {
                        if ( document.readyState === "complete" )
                        {
                            ready();
                        }
                    });
                }

                if (window.addEventListener)
                    window.addEventListener('load', ready, false);
                else if (window.attachEvent)
                    window.attachEvent('onload', ready);
                /*  else
                 window.onload=ready
                 */ // No conflict

            },
            loaded: function()
            {
                // HTML4 browser ? Set hash location : continue;
                if (history.emulate === true)
                {
                    if ( window.location.pathname != (pet.getSettings('basePath')) )
                    {
                        window.location.href = pet.getSettings('basePath')+'#'+window.location.pathname;
                        return;
                    }
                }

                // Set settings
                _pet.setSettings();

                // New fn;
                var fn;

                pet.ready(function()
                {
                    // Global initialization
                    _pet.nav.init();
                });
                _pet.ready.options.loaded = true;

                // Execute
                for (var i = 0; i < _pet.ready.options.readyList.length; i++)
                {
                    fn = _pet.ready.options.readyList[i];
                    fn();
                }
            }
        };
        _public.ready = function(fn)
        {
            if (typeof(fn) === 'function')
            {
                if (_pet.ready.options.loaded)
                {
                    return fn();
                }
                else
                {
                    _pet.ready.options.readyList.push(fn);
                    return true;
                }
            }
            return;
        };

        /**
         * Navigation object
         * @type {Object}
         */
        _private.nav = {
            init: function()
            {
                // Execute ready function for select collection
                _pet.router.ready();

                // Hang on popstate event triggered by pressing back/forward in browser
                window.onpopstate = function( e ) {

                    // Receiving location from the window.history object
                    var loc = history.location.pathname || document.location.pathname;

                    _pet.data.withControlPanel = true;

                    // Search collection
                    _pet.router.search(loc, false);
                    return false;
                }
            },
            setLoc: function(loc, title)
            {
                history.pushState(null, title, loc); // Push state
            }
        };
        _public.nav = {
            go: function(href, event)
            {
                // OnClick middle button
                if (typeof(event) !== 'undefined' && typeof(event.which) !== 'undefined' && event.which === 2)
                    return true;

                var loc;

                if ( typeof href === 'object' )
                    loc = href.href;
                else if ( typeof href === 'string' )
                    loc = href;
                else
                    return;

                var urlExp = new RegExp('^(https?\:\/\/'+(window.location.host).replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")+')','i');
                loc = loc.replace(urlExp, '');

                if (loc.search(/https?\:\/\//i) === 0)
                {
                    location.href = loc;
                    return false;
                }

                _pet.data.withControlPanel = false;

                _pet.router.search(loc, true);
                return false;
            },
            withControlPanel: function()
            {
                return _pet.data.withControlPanel ? true : false;
            }
        };

        /**
         * Router object
         * @type {Object}
         */
        _private.router = {
            options: {},
            search: function(loc, replace)
            {
                // Save last location
                _pet.data.breakRequest.lastLocation = pet.router.getLocation();

                // Abort previous collection query.
                if(_pet.data.lastQuery.finish === false)
                {
                    _pet.data.lastQuery.aborted = true;
                    _pet.data.lastQuery.finish = true;
                    _pet.data.lastQuery.abort();
                    if (typeof(_pet.data.lastQuery.abortOption) === 'function')
                        _pet.data.lastQuery.abortOption();

                    if (_pet.data.breakRequest.breakTo !== false)
                    {
                        // Clear control data
                        var control = _pet.getControl(_pet.data.breakRequest.breakTo);
                        _pet.router.options.loc = _pet.data.breakRequest.breakTo;
                        _pet.router.options.collection = control.collection;
                        _pet.router.options.param = control.param;

                        // Save last location
                        _pet.data.breakRequest.lastLocation = pet.router.getLocation();
                    }
                }

                // Set control data
                var control = _pet.getControl(loc);
                var collection = control.collection;
                var param = control.param;

                // Find collection
                if (_pet.collection.hasOwnProperty(collection))
                {
                    if (_pet.router.options.collection === collection)
                    {
                        if (loc === pet.router.getLocation())
                        {
                            //
                            // Refresh
                            _pet.collection[collection].refreshLocation();
                        }
                        else
                        {
                            // changeLocation
                            var _param = _pet.router.options.param;
                            var _loc = _pet.router.options.loc;

                            _pet.collection[collection].beforeTryChangeLocation();

                            _pet.router.options.param = param;
                            _pet.router.options.loc = loc;

                            // Transfer control to the collector
                            _pet.collection[collection].changeLocation(function(title)
                            {
                                // Before internal changeLocation
                                _pet.router.options.param = _param;
                                _pet.router.options.loc = _loc;
                                _pet.collection[collection].beforeChangeLocation();
                                _pet.router.options.param = param;
                                _pet.router.options.loc = loc;

                                // Body function success
                                _pet.router.success(loc, title, replace);
                            });
                        }
                    }
                    else
                    {
                        var _param = _pet.router.options.param;
                        var _loc = _pet.router.options.loc;
                        var _collection = _pet.router.options.collection;

                        _pet.collection[_collection].beforeTryAway();

                        _pet.router.options.param = param;
                        _pet.router.options.loc = loc;
                        _pet.router.options.collection = collection;

                        // Transfer control to the collector
                        _pet.collection[collection].changeLocation(function(title)
                        {
                            // Destructor
                            _pet.router.options.param = _param;
                            _pet.router.options.loc = _loc;
                            _pet.router.options.collection = _collection;
                            _pet.collection[_pet.router.options.collection].__destructor();

                            // Constructor
                            _pet.router.options.param = param;
                            _pet.router.options.loc = loc;
                            _pet.router.options.collection = collection;
                            _pet.collection[_pet.router.options.collection].__constructor();

                            // Body function success
                            _pet.router.success(loc, title, replace);
                        });
                    }
                }
                else
                {
                    // Show 404 page.
                    if (_pet.options.collection404 && _pet.collection.hasOwnProperty(_pet.options.collection404))
                    {
                        var _param = _pet.router.options.param;
                        var _loc = _pet.router.options.loc;
                        var _collection = _pet.router.options.collection;

                        _pet.collection[_collection].beforeTryAway();

                        _pet.router.options.param = param;
                        _pet.router.options.loc = loc;
                        _pet.router.options.collection = _pet.options.collection404;

                        _pet.collection[_pet.options.collection404].changeLocation(function(title)
                        {
                            // Destructor
                            _pet.router.options.param = _param;
                            _pet.router.options.loc = _loc;
                            _pet.router.options.collection = _collection;
                            _pet.collection[_pet.router.options.collection].__destructor();

                            // Constructor
                            _pet.router.options.param = param;
                            _pet.router.options.loc = loc;
                            _pet.router.options.collection = _pet.options.collection404;
                            _pet.collection[_pet.options.collection404].__constructor();

                            _pet.router.success(loc, title, replace);
                        });
                    }
                    else
                        location.href = loc;
                }
            },
            ready: function()
            {
                if (_pet.collection.hasOwnProperty(_pet.router.options.collection))
                    _pet.collection[_pet.router.options.collection].ready();
            },
            success: function(loc, title, replace)
            {
                // If not history, replaced
                if (replace)
                    _pet.nav.setLoc(loc, title);

                document.title = title;
            }
        };
        _public.router = {
            getSegment: function(segment, def)
            {
                return _pet.router.options.param[segment] || def || false;
            },
            getSegments: function()
            {
                return _pet.router.options.param;
            },
            getCollection: function()
            {
                return _pet.router.options.collection.toString();
            },
            getLocation: function()
            {
                return _pet.router.options.loc;
            }
        };

        /**
         * Set settings
         * @type {function}
         */
        _private.setSettings = function()
        {
            var loc = document.location.pathname;
            var control = _pet.getControl(loc);
            _pet.router.options.loc = loc;
            _pet.router.options.collection = control.collection;
            _pet.router.options.param = control.param;
        };

        /**
         * Add collection
         * @param name (string) - name of collection
         * @param obj (object) - (events)
         */
        _public.addCollection = function(name, obj)
        {
            var def = {
                __constructor: function(){},
                __destructor: function(){},
                ready: function(){},
                beforeTryChangeLocation: function(){},
                beforeChangeLocation: function(){},
                beforeTryAway: function() {},
                changeLocation: function(success){success('Pet Framework by Peteychuk aka http://www.peteychuk.com/')},
                refreshLocation: function(){}
            };
            _pet.collection[name] = pet.extend(def, obj);
        };

        /**
         * Get control data
         * @param loc {string} - location
         * @return {Object} - location data
         */
        _private.getControl = function(loc)
        {
            // Set query. Remove ^/ || /$
            var query = loc;

            // Cut base path
            query = query.replace(new RegExp('^('+_pet.options.basePath+')','gi'), '');

            // Cut ^/ /$ .html$
            query = query.replace(/^[\/]+/i, '').replace(/[\/]+$/i, '').replace(/\.html?$/i,'');

            var collection = 'index'; // Default collection
            var param = [];

            // Set collection and arguments
            if (query.length > 0)
            {
                var split = query.split('/');
                collection = split[0].replace(/^([a-z]+)*(.*)$/i, '$1').toLowerCase() || 'index';
                param = split.slice(1, split.length) || [];
            }

            // Return control data
            return {
                collection: collection,
                param: param
            };
        };

        /**
         * Debug
         * @param msg {string} - message
         */
        _public.debug = function(msg)
        {
            if (_pet.options.debug === true)
            {
                if (window.console && window.console.log)
                    console.log(msg);
                /*else
                 alert(msg);*/
            }
        };

        /**
         * Ajax
         * @param o (object) - options
         */
        _public.ajax = function(o)
        {
            return (function()
            {
                var request;
                var postData;
                var reConnectTime   = 3000;
                var type            = o.type ? (o.type.toUpperCase()) : 'GET';
                var url             = o.url || false;
                var headers         = o.headers || [];
                var nav             = o.nav ? true : false;
                var data            = o.data || false;
                var dataType        = o.dataType || 'txt';
                var onError         = o.error || function(){};
                var onSuccess       = o.success || function(){};
                var reConnect       = o.reConnect || function(){};

                // Break request
                if (!url)
                    return false;

                // Abort ajax query previous new ajax query
                if( o['abort'] && _pet.data.lastQuery.finish === false)
                {
                    _pet.data.lastQuery.aborted = true;
                    _pet.data.lastQuery.finish = true;
                    _pet.data.lastQuery.abort();
                    if (typeof(_pet.data.lastQuery.abortOption) === 'function')
                        _pet.data.lastQuery.abortOption();
                }

                // New XMLHTTP
                try
                {
                    request = new XMLHttpRequest();
                }
                catch (e)
                {
                    try
                    {
                        request = new ActiveXObject('Msxml2.XMLHTTP');
                    }
                    catch (e)
                    {
                        request = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                }

                try
                {
                    var reConnectFlag = false;

                    // On ready state change function
                    request.onreadystatechange = function ()
                    {
                        if (request.readyState != 4)
                            return;

                        // Error
                        if ( (request.status != 200) )
                        {
                            if ( _pet.data.lastQuery.aborted !== true )
                            {
                                if (request.status == 0)
                                {
                                    reConnectFlag = true;

                                    // ReConnect event (false)
                                    if (o['reConnect'])
                                        reConnect(false);

                                    // Set timer
                                    setTimeout(function()
                                    {
                                        o['reConnect'] = true;
                                        pet.ajax(o);
                                    }, reConnectTime);
                                }
                                else
                                {
                                    // ReConnect event (true)
                                    if (reConnectFlag && o['reConnect'])
                                        reConnect(true);

                                    // Show error
                                    pet.debug('Ajax error status: ' + request.status + '; URL: ' + url);
                                    onError(request, request.status, url);
                                }
                            }
                            return;
                        }

                        // ReConnect event (true)
                        if (reConnectFlag && o['reConnect'])
                            reConnect(true);

                        if (o['abort'])
                            _pet.data.lastQuery.finish = true;

                        if (dataType == 'json')
                            onSuccess(_pet.parseJSON(request.responseText));
                        else
                            onSuccess(request.responseText);
                    };

                    // Open request
                    request.open(type, url, true);

                    // Set post data
                    if (type == 'GET')
                    {
                        postData = null;
                    }
                    else
                    {
                        headers.push(["Content-type", "application/x-www-form-urlencoded; charset=utf-8"]);
                        postData = data ? _pet.ajaxUrlEncodeData(data) : null;
                    }

                    if ( (url.search(/^\//i)!= -1) || (url.search(new RegExp("^https?\:\/\/"+location.host+"\/",'i')) === 0 ) )
                        headers.push(["X-Requested-With", "XMLHttpRequest"]);

                    // Set headers
                    if (headers.length)
                        for (var i = 0, len = headers.length; i < len; i++)
                            request.setRequestHeader(headers[i][0], headers[i][1]);

                    // Send request
                    request.send(postData);

                    // Abort options
                    if (typeof(o['abort']) !== 'undefined')
                    {
                        // Set last xhr
                        _pet.data.lastQuery = request;
                        _pet.data.lastQuery.finish = false;
                        _pet.data.lastQuery.abortOption = o['abort'];
                        if (nav)
                            _pet.data.breakRequest.breakTo = _pet.data.breakRequest.lastLocation;
                        else
                            _pet.data.breakRequest.breakTo = false;
                    }
                }
                catch (e) {
                    if (_private.options.debug)
                        throw e;
                    else
                        pet.debug(e);
                };

                // Return request object
                return request;
            })();
        };
        /**
         * Encode data to POST
         * @param data
         * @return {String}
         */
        _private.ajaxUrlEncodeData = function(data)
        {
            var arr = [];
            var str = '';
            for(var p in data)
            {
                if ( (typeof data[p] === 'string') || (typeof data[p] === 'number') || (typeof data[p] === 'boolean') )
                {
                    arr.push((p) + '=' + encodeURIComponent(data[p]));
                }
                else if ( (data[p] !== null) && data[p].length )
                {
                    str += (str?'&':'')+(urlEncodeData2tree(p, data[p]));
                }
            }
            return (arr.length ? arr.join('&') : arr[0])+(str?'&'+str:'');
        };
        /**
         * Encode data to POST (step 2)
         * @param data
         * @return {string}
         */
        _private.ajaxUrlEncodeDataStep2 = function(key, data)
        {
            var tmp = [];
            for (var k in data)
            {
                if ( (typeof data[k] === 'string') || (typeof data[k] === 'number') || (typeof data[k] === 'boolean') )
                {
                    tmp.push(key+'['+k+']='+encodeURIComponent(data[k]));
                }
                else if (data[k].length)
                {
                    tmp.push(urlEncodeData2tree(key+'['+k+']', data[k]));
                }
            }
            if (tmp.length)
                return tmp.join('&');
            return '';
        };
        /**
         * Parse JSON
         * @param {string} - data - JSON
         */
        _private.parseJSON = function(data)
        {
            if ( typeof data !== "string" || !data || data=='' )
                return null;

            data = data.replace(/^\s+/, '');
            data = data.replace(/\s+$/, '');

            if (window.JSON && window.JSON.parse)
            {
                return window.JSON.parse(data);
            }

            var rvalidchars = /^[\],:{}\s]*$/;
            var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
            var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
            var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

            if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")))
            {
                return (new Function( "return " + data ))();
            }
        };

        /**
         * Extend function
         * @param Child {object} - child object
         * @param Parent {object} - parent object
         * Todo: !!!
         */
        _public.extend = function(Child, Parent)
        {
            var F = function() {};
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.superclass = Parent.prototype;

            for (var key in Parent)
                if(Parent.hasOwnProperty(key))
                    Child[key] = Parent[key];

            return Child;
        };


        /**
         *
         * @_init (private) - Core initialization
         */
        (function()
        {
            // HTML5 browser ? Remove hash location : continue;
            if (history.emulate !== true)
            {
                if (window.location.hash != "")
                {
                    window.location.href = window.location.hash.replace('#','');
                    return;
                }
            }

            // Ready initialization
            _pet.ready.init();
        })();

        // Return public methods
        return _public;

    })();

})(window);