(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-card-component"],{"220f":function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"user-card-main-div"},[e("a",{staticClass:"user-info",attrs:{href:"/profile"}},[e("div",{staticClass:"avatar small"},[e("img",{attrs:{src:"./api/users/"+this.currentUser._id+"/profile-images/"+this.currentUser.profile_image+"?size=small"}})]),e("div",{staticClass:"text-left ml-3",attrs:{id:"user-card-text"}},[e("h5",{staticClass:"mb-0 font-weight-bold"},[t._v(t._s(t.truncate(this.currentUser.displayName)))]),e("p",[e("i",[t._v(t._s(this.currentUser.username))])])])]),e("button",{staticStyle:{margin:"10px auto"},on:{click:t.logout}},[t._v("Logout")])])},i=[],s=(e("b65f"),e("2f62")),a={name:"UserCard",computed:Object(s["c"])(["currentUser"]),data:function(){return{currentWidth:0}},methods:{logout:function(){var t=this;this.$store.dispatch("logout").then((function(){t.$router.push("/login")}))},truncate:function(t){var r=Math.trunc(this.currentWidth/88);return this.currentWidth>3e3&&(r=50),t.length>r?t.substring(0,r)+"...":t}},created:function(){var t=this;this.currentWidth=window.innerWidth,window.addEventListener("resize",(function(){t.currentWidth=window.innerWidth}))}},u=a,c=(e("4471"),e("2877")),o=Object(c["a"])(u,n,i,!1,null,null,null);r["default"]=o.exports},4471:function(t,r,e){"use strict";e("682d")},"682d":function(t,r,e){},b65f:function(t,r,e){var n=e("23e7"),i=Math.ceil,s=Math.floor;n({target:"Math",stat:!0},{trunc:function(t){return(t>0?s:i)(t)}})}}]);
//# sourceMappingURL=user-card-component.cb76c828.js.map