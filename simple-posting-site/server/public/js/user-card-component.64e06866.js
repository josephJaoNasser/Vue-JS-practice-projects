(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-card-component"],{"220f":function(t,n,r){"use strict";r.r(n);var e=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"user-card-main-div"},[r("div",{staticClass:"user-info"},[r("div",{staticClass:"avatar"}),r("div",{staticClass:"text-left ml-3",attrs:{id:"user-card-text"}},[r("h5",{staticClass:"mb-0 font-weight-bold"},[t._v(t._s(t.truncate(this.currentUser.displayName)))]),r("p",[r("i",[t._v(t._s(this.currentUser.username))])])])]),r("button",{on:{click:t.logout}},[t._v("Logout")])])},i=[],s=(r("b65f"),r("2f62")),u={name:"UserCard",computed:Object(s["c"])(["currentUser"]),data:function(){return{currentWidth:0}},methods:{logout:function(){var t=this;this.$store.dispatch("logout").then((function(){t.$router.push("/login")}))},truncate:function(t){var n=Math.trunc(this.currentWidth/88);return this.currentWidth>3e3&&(n=50),t.length>n?t.substring(0,n)+"...":t}},created:function(){var t=this;this.currentWidth=window.innerWidth,window.addEventListener("resize",(function(){t.currentWidth=window.innerWidth}))}},c=u,a=(r("4471"),r("2877")),o=Object(a["a"])(c,e,i,!1,null,null,null);n["default"]=o.exports},4471:function(t,n,r){"use strict";r("682d")},"682d":function(t,n,r){},b65f:function(t,n,r){var e=r("23e7"),i=Math.ceil,s=Math.floor;e({target:"Math",stat:!0},{trunc:function(t){return(t>0?s:i)(t)}})}}]);
//# sourceMappingURL=user-card-component.64e06866.js.map