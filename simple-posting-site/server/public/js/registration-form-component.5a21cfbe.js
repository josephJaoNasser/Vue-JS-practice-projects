(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["registration-form-component"],{"6b24":function(s,e,r){"use strict";r.r(e);var a=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"registration-container ",class:{transparent:this.userLoadingStates.registeringUser}},[r("h5",[s._v("Username")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.username,expression:"username"}],class:{"input-error":"username"==this.userErrors.field},attrs:{type:"text",maxlength:"15"},domProps:{value:s.username},on:{input:function(e){e.target.composing||(s.username=e.target.value)}}}),"username"==this.userErrors.field?r("div",[r("p",{staticClass:"error"},[s._v(s._s(this.userErrors.msg))])]):s._e(),r("h5",[s._v("Display Name")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.displayName,expression:"displayName"}],class:{"input-error":"displayName"==this.userErrors.field},attrs:{type:"text",maxlength:"50"},domProps:{value:s.displayName},on:{input:function(e){e.target.composing||(s.displayName=e.target.value)}}}),"displayName"==this.userErrors.field?r("div",[r("p",{staticClass:"error"},[s._v(s._s(this.userErrors.msg))])]):s._e(),r("h5",[s._v("Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],class:{"input-error":"password"==this.userErrors.field},attrs:{type:"password"},domProps:{value:s.password},on:{input:function(e){e.target.composing||(s.password=e.target.value)}}}),r("h5",[s._v("Confirm Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.confirm_password,expression:"confirm_password"}],class:{"input-error":"password"==this.userErrors.field},attrs:{type:"password"},domProps:{value:s.confirm_password},on:{input:function(e){e.target.composing||(s.confirm_password=e.target.value)}}}),"password"==this.userErrors.field?r("div",[r("p",{staticClass:"error"},[s._v(s._s(this.userErrors.msg))])]):s._e(),r("h5",[s._v("E-mail")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.email,expression:"email"}],class:{"input-error":"email"==this.userErrors.field},attrs:{type:"email"},domProps:{value:s.email},on:{input:function(e){e.target.composing||(s.email=e.target.value)}}}),"email"==this.userErrors.field?r("div",[r("p",{staticClass:"error"},[s._v(s._s(this.userErrors.msg))])]):s._e(),r("h5",[s._v("Bio")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:s.bio,expression:"bio"}],domProps:{value:s.bio},on:{input:function(e){e.target.composing||(s.bio=e.target.value)}}}),r("br"),r("button",{staticClass:"green",on:{click:function(e){return s.registerUser()}}},[s._v("Submit")])])},t=[],i=r("2f62"),o=(r("f9e3"),r("2dd8"),{data:function(){return{username:"",displayName:"",password:"",confirm_password:"",email:"",bio:"",errors:""}},computed:Object(i["c"])(["userLoadingStates","userErrors"]),methods:{registerUser:function(){var s=this,e={username:this.username,displayName:this.displayName,password:this.password,confirm_password:this.confirm_password,email:this.email,bio:this.bio};try{this.$store.dispatch("registerUser",e).then((function(e){e.data.success&&s.$router.push("/registration-success")}))}catch(r){console.log(r)}}}}),n=o,m=r("2877"),u=Object(m["a"])(n,a,t,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=registration-form-component.5a21cfbe.js.map