var _objectWithoutProperties=require("@babel/runtime/helpers/objectWithoutProperties"),_toConsumableArray=require("@babel/runtime/helpers/toConsumableArray"),_typeof=require("@babel/runtime/helpers/typeof"),_defineProperty=require("@babel/runtime/helpers/defineProperty"),_classCallCheck=require("@babel/runtime/helpers/classCallCheck"),_createClass=require("@babel/runtime/helpers/createClass"),_regeneratorRuntime=require("@babel/runtime/regenerator"),_asyncToGenerator=require("@babel/runtime/helpers/asyncToGenerator"),axios=require("axios");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var _objectWithoutProperties__default=_interopDefaultLegacy(_objectWithoutProperties),_toConsumableArray__default=_interopDefaultLegacy(_toConsumableArray),_typeof__default=_interopDefaultLegacy(_typeof),_defineProperty__default=_interopDefaultLegacy(_defineProperty),_classCallCheck__default=_interopDefaultLegacy(_classCallCheck),_createClass__default=_interopDefaultLegacy(_createClass),_regeneratorRuntime__default=_interopDefaultLegacy(_regeneratorRuntime),_asyncToGenerator__default=_interopDefaultLegacy(_asyncToGenerator),axios__default=_interopDefaultLegacy(axios),Storage=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t}return _createClass__default.default(e,[{key:"set",value:function(e,t,r){var n,o="";if(n=this.commerce.options.config&&void 0!==this.commerce.options.config.cookie_path?this.commerce.options.config.cookie_path:"/",r){var c=new Date;c.setTime(c.getTime()+24*r*60*60*1e3),o="; expires="+c.toGMTString()}return document.cookie=e+"="+t+o+"; path="+n}},{key:"get",value:function(e){e+="=";for(var t=0,r=Array.from(document.cookie.split(";"));t<r.length;t++){for(var n=r[t];" "===n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(e))return n.substring(e.length,n.length)}return null}},{key:"remove",value:function(e){return this.set(e,"",-1)}}]),e}(),Cart=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t,this.cartId=null}var t;return _createClass__default.default(e,[{key:"refresh",value:function(){var e=this;return this.commerce.request("carts").then((function(t){var r=t.id;return e.commerce.storage.set("commercejs_cart_id",r,30),e.cartId=r,t}))}},{key:"id",value:function(){if(null!==this.cartId)return this.cartId;var e=this.commerce.storage.get("commercejs_cart_id");return"string"==typeof e&&e.length?e:null}},{key:"request",value:(t=_asyncToGenerator__default.default(_regeneratorRuntime__default.default.mark((function e(){var t,r,n,o,c,a=this,s=arguments;return _regeneratorRuntime__default.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=s.length>0&&void 0!==s[0]?s[0]:"",r=s.length>1&&void 0!==s[1]?s[1]:"get",n=s.length>2&&void 0!==s[2]?s[2]:null,o=s.length>3&&void 0!==s[3]&&s[3],c="string"==typeof t&&t.length?"/".concat(t):"",this.id()){e.next=8;break}return e.next=8,this.refresh();case 8:return e.abrupt("return",this.commerce.request("carts/".concat(this.id()).concat(c),r,n,o).catch((function(e){if(e.statusCode&&404===e.statusCode)return a.refresh().then((function(){return a.commerce.request("carts/".concat(a.id()).concat(c),r,n,o)}));throw e})));case 9:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"add",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n={id:"object"===_typeof__default.default(e)?e.id:e,quantity:t,variant:r};return this.request("","post",n)}},{key:"retrieve",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return t&&(this.cartId=t),this.request().then((function(t){return e.cartId=t&&t.id||null,t}))}},{key:"checkQuantity",value:function(e,t){return this.commerce.request("products/".concat(id)).then((function(e){return t<=e.quantity}))}},{key:"remove",value:function(e){return this.request("items/".concat(e),"delete")}},{key:"delete",value:function(){return this.request("","delete")}},{key:"update",value:function(e,t){return this.request("items/".concat(e),"put",t)}},{key:"contents",value:function(){return this.request("items")}},{key:"empty",value:function(){return this.request("items","delete")}}]),e}(),Categories=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t}return _createClass__default.default(e,[{key:"list",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return"function"==typeof e?this.commerce.request("categories"):this.commerce.request("categories","get",e)}},{key:"retrieve",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.commerce.request("categories/".concat(e),"get",t)}}]),e}(),Checkout=function(){function Checkout(e){_classCallCheck__default.default(this,Checkout),this.commerce=e}return _createClass__default.default(Checkout,[{key:"protect",value:function protect(token){return this.commerce.request("checkouts/".concat(token,"/protect")).then((function(data){return eval(data.sift_js)}))}},{key:"generateToken",value:function(e,t){return this.commerce.request("checkouts/".concat(e),"get",t)}},{key:"generateTokenFrom",value:function(e,t){if(!["product_id","cart","permalink"].includes(e))throw new Error('Cannot generate a token with unknown "'.concat(e,'" type'));return this.generateToken(t,{type:e})}},{key:"capture",value:function(e,t){var r=this;return this.commerce.request("checkouts/".concat(e),"post",t).then((function(e){return r.commerce.cart.refresh(),e}))}},{key:"receipt",value:function(e){return this.commerce.request("checkouts/".concat(e,"/receipt"))}},{key:"checkPayWhatYouWant",value:function(e,t){return this.commerce.request("checkouts/".concat(e,"/check/pay_what_you_want"),"get",t)}},{key:"fields",value:function(e){return this.commerce.request("checkouts/".concat(e,"/fields"))}},{key:"setTaxZone",value:function(e,t){return this.commerce.request("checkouts/".concat(e,"/helper/set_tax_zone"),"get",t)}},{key:"getLocationFromIP",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=t.length?"?ip_address=".concat(t):"";return this.commerce.request("checkouts/".concat(e,"/helper/location_from_ip").concat(r))}},{key:"isFree",value:function(e){return this.commerce.request("checkouts/".concat(e,"/check/is_free"))}},{key:"checkVariant",value:function(e,t,r){return this.commerce.request("checkouts/".concat(e,"/check/").concat(t,"/variant"),"get",r)}},{key:"checkDiscount",value:function(e,t){return this.commerce.request("checkouts/".concat(e,"/check/discount"),"get",t)}},{key:"checkShippingOption",value:function(e,t){return this.commerce.request("checkouts/".concat(e,"/check/shipping"),"get",t)}},{key:"getShippingOptions",value:function(e,t){return this.commerce.request("checkouts/".concat(e,"/helper/shipping_options"),"get",t)}},{key:"checkQuantity",value:function(e,t,r){return this.commerce.request("checkouts/".concat(e,"/check/").concat(t,"/quantity"),"get",r)}},{key:"helperValidation",value:function(e){return this.commerce.request("checkouts/".concat(e,"/helper/validation"))}},{key:"getLive",value:function(e){return this.commerce.request("checkouts/".concat(e,"/live"))}},{key:"getToken",value:function(e){return this.commerce.request("checkouts/tokens/".concat(e))}},{key:"checkGiftcard",value:function(e,t){return this.commerce.request("checkouts/".concat(e,"/check/giftcard"),"get",t)}}]),Checkout}();function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach((function(t){_defineProperty__default.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Customer=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t,this.data={}}return _createClass__default.default(e,[{key:"login",value:function(e,t){return this.commerce.request("customers/email-token","post",{email:e,base_url:t})}},{key:"getToken",value:function(e){var t=this,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return this.commerce.request("customers/exchange-token","post",{token:e}).then((function(e){return r&&(e.customer_id||e.jwt)&&(t.data={id:e.customer_id||null,token:e.jwt||null},window.localStorage.setItem("commercejs_customer_id",t.data.id),window.localStorage.setItem("commercejs_customer_token",t.data.token)),e}))}},{key:"getOrders",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._assertArgsProvided(e,t),this._request("customers/".concat(e||this.id(),"/orders"),"get",{},{},t)}},{key:"getOrder",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return this._assertArgsProvided(t,r),this._request("customers/".concat(t||this.id(),"/orders/").concat(e),"get",{},{},r)}},{key:"about",value:function(){return this._request("customers/".concat(this.id()))}},{key:"id",value:function(){return this._fromStorage("id")}},{key:"token",value:function(){return this._fromStorage("token")}},{key:"isLoggedIn",value:function(){return null!==this.id()&&null!==this.token()}},{key:"logout",value:function(){this.data={},window.localStorage.removeItem("commercejs_customer_id"),window.localStorage.removeItem("commercejs_customer_token")}},{key:"_fromStorage",value:function(e){if(this.data[e]&&this.data[e].length)return this.data[e];var t=window.localStorage.getItem("commercejs_customer_".concat(e));return"string"==typeof t&&t.length?t:null}},{key:"_request",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"get",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,c=o||this.token();return this.commerce.request(e,t,r,_objectSpread({"X-Authorization":void 0,Authorization:"Bearer ".concat(c)},n),c)}},{key:"_assertArgsProvided",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e&&!this.id())throw new Error("A customer ID must be provided when customer is not logged in");if(null===t&&!this.token())throw new Error("A customer access token must be provided when customer is not logged in")}}]),e}(),Merchants=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t}return _createClass__default.default(e,[{key:"about",value:function(){return this.commerce.request("merchants")}}]),e}(),Products=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t}return _createClass__default.default(e,[{key:"list",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.commerce.request("products","get",e)}},{key:"retrieve",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.commerce.request("products/".concat(e),"get",t)}}]),e}(),Services=function(){function e(t){_classCallCheck__default.default(this,e),this.commerce=t}return _createClass__default.default(e,[{key:"localeListCountries",value:function(){return this.commerce.request("services/locale/countries")}},{key:"localeListShippingCountries",value:function(e){return this.commerce.request("services/locale/".concat(e,"/countries"))}},{key:"localeListShippingSubdivisions",value:function(e,t){return this.commerce.request("services/locale/".concat(e,"/countries/").concat(t,"/subdivisions"))}},{key:"localeListSubdivisions",value:function(e){return this.commerce.request("services/locale/".concat(e,"/subdivisions"))}}]),e}(),Features={Cart:Cart,Categories:Categories,Checkout:Checkout,Customer:Customer,Merchants:Merchants,Products:Products,Services:Services},consoleHelper=function(){var e,t,r,n,o,c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"black",a=arguments.length>1?arguments[1]:void 0,s=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,u=!1;switch(c){case"success":c="#488f5a",e="✅   ";break;case"info":c="DodgerBlue",e="";break;case"error":c="rgba(244, 67, 54, 1)","validation"===i.error.type?(e="🚫 Validation/missing fields",a=""):e="❌ HTTP ERROR ",u=!0;break;case"warning":c="rgba(208, 154, 35, 1)",e="⚠️  "}if(!0===u){if(console.log("%c"+e+a,"color:"+c+";display:block; width: 100%;padding:2px 2px 2px 0px;font-family: Open Sans, Helvetica, Sans-serif;font-weight:bold;background-color:rgba(244, 67, 54, 0.15);"),"object"===_typeof__default.default(i.error.message)){for(t=0,r=(n=i.error.message).length,o=[];t<r;)console.log("%c"+n[t].field+" %c"+n[t].error,"color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:800;","color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;"),o.push(t++);return o}return console.log("%c"+i.error.message,"color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;")}if("object"===_typeof__default.default(c))return console.log("%c"+a,"color: PowderBlue;font-weight:bold;font-family: Open Sans, Helvetica, Sans-serif; background-color: RoyalBlue;"),void console.log(c);console.log("%c"+e+a,"color:"+c+";display:block;font-family: Open Sans, Helvetica, Sans-serif;line-height:28px; width: 100%;padding:2px 2px 2px 0px;font-weight:bold;"),s&&console.log("%c"+s,"color:#515D6D;line-height:22px;font-weight:400; font-family: Open Sans, Helvetica, Sans-serif;")},debuggerOnNotice=function(){console.log("%c\r\n \r\n                           Che         EcC\r\n                         c....c2    2c....:C\r\n                       c........c2   2c.....:C\r\n                     c............c2   2c.....:C\r\n                   c................c2   2c.....:C\r\n                 c....................c2   2c.....:C\r\n               c........................c2   2c.....:C\r\n             c............................c2   2c.....:C\r\n           c.......:E2  2c..................c2   2c.....:C\r\n         c........h  $$   2c..................c2   2c.....:C\r\n       c.........:C  $cc$  E....................c2   2c.....:C\r\n     c............h    $$  c......................c2   2c.....:C\r\n   c...............:E    E:.........................c2   2c.....:C\r\n   E............................:C c..................h2   2c...:C\r\n     E........................:C     c..................h2   2hC\r\n       E....................:C         c..................h2\r\n         E................:C             c................:C\r\n           E............:C                 c............:C\r\n             E........:C                     c........:C\r\n               E....:C                         c....:C\r\n                 EcC                             EcC\r\n \r\n \r\n \r\n","font-family: Courier New, Courier, monospace; color: #788ba4; font-weight:bold; font-size: 11px;"),console.log("%cCommerce.js console debugger is on!  🎉","text-align:center; display:block; font-family: Open Sans, Helvetica, Sans-serif; color: #488f5a; line-height:28px; font-size: 14px"),console.log("%c💬   Need some help? Join our Slack channel - http://slack.commercejs.com \r\n","text-align:center; display:block; font-family: Open Sans, Helvetica, Sans-serif; color: #515D6D; line-height:20px; font-size: 12px")};function ownKeys$1(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread$1(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys$1(r,!0).forEach((function(t){_defineProperty__default.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys$1(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var defaultEventCallback=function(e){var t=new CustomEvent("Commercejs.".concat(e),{bubbles:!1,cancelable:!1});return window.dispatchEvent(t)},Commerce=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(_classCallCheck__default.default(this,e),this.options=_objectSpread$1(_objectSpread$1({version:"v1",url:"https://api.chec.io/",eventCallback:defaultEventCallback},n),{},{publicKey:t,debug:r}),"string"==typeof t&&0!==t.length||console.warn("⚠️ Invalid public key given to Commerce.js client"),"sk_"===t.toLowerCase("").substring(0,3))throw new Error("Secret key provided. You must use a public key with Commerce.js!");this.storage=new Storage(this),this.cart=new Features.Cart(this),this.checkout=new Features.Checkout(this),this.customer=new Features.Customer(this),this.products=new Features.Products(this),this.services=new Features.Services(this),this.categories=new Features.Categories(this),this.merchants=new Features.Merchants(this),r&&(this.consoleHelper=consoleHelper,debuggerOnNotice())}return _createClass__default.default(e,[{key:"error",value:function(e){if(this.consoleHelper&&this.options.debug){var t=e.response,r="[".concat(t.status,"] Type: ").concat(t.statusText),n="string"==typeof t.data?t.data:t.statusText;return this.consoleHelper("error",r,n,t.data)}}},{key:"request",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"get",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a={"X-Authorization":this.options.publicKey,"X-Chec-Agent":"commerce.js/v2"},s="get"===r?n:null,i="get"===r?null:n,u=this.options.timeoutMs||6e4,l=this.options.axiosConfig||{},h=this.options.url;"/"!==h.substring(h.length-1)&&(h+="/");var f=axios__default.default(_objectSpread$1(_objectSpread$1({url:e,method:r,baseURL:"".concat(h).concat(this.options.version,"/"),params:s,data:i,timeout:u},l),{},{headers:_objectSpread$1(_objectSpread$1(_objectSpread$1({},a),l.headers),o)}));if(c)return f;var d=this.options.eventCallback;return f.then((function(e){if(t.consoleHelper&&t.options.debug&&"object"===_typeof__default.default(e.data._console)&&t.consoleHelper.apply(t,_toConsumableArray__default.default(e.data._console)),"object"!==_typeof__default.default(e.data)||Array.isArray(e.data))return e.data;var r=e.data,n=r._event,o=_objectWithoutProperties__default.default(r,["_event"]);return"string"==typeof n&&"function"==typeof d&&d(n),o})).catch((function(e){throw t.error(e),{message:"Unsuccessful response (".concat(e.response.status,": ").concat(e.response.statusText,") received"),statusCode:e.response.status,statusText:e.response.statusText,data:e.response.data,originalError:e}}))}}]),e}();module.exports=Commerce;