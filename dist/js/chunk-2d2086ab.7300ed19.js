(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086ab"],{a567:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"auto"}},[a("v-card",{attrs:{width:"356"}},[a("v-card-text",{staticClass:"text-center px-8 py-8"},[a("div",{staticClass:"text-h5 font-weight-black mb-10"},[a("router-link",{staticClass:"text-h3 font-weight-bold",attrs:{to:"/",tag:"button"}},[a("v-icon",{attrs:{large:""}},[t._v(" mdi-tent ")]),t._v(" KAMP9 ")],1)],1),a("v-text-field",{attrs:{label:"이메일",type:"email","prepend-icon":"mdi-email"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$store.dispatch("auth/login",{email:t.email,password:t.password})}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("v-alert",{staticClass:"pa-0 text-left",attrs:{text:"",value:t.isLoginError.email,type:"error"}},[t._v(t._s(t.loginErrorMsg.email))]),a("v-text-field",{attrs:{label:"비밀번호",type:"password","prepend-icon":"mdi-lock-outline"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$store.dispatch("auth/login",{email:t.email,password:t.password})}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("v-alert",{staticClass:"pa-0 text-left",attrs:{text:"",value:t.isLoginError.password,type:"error"}},[t._v(t._s(t.loginErrorMsg.password))]),a("v-btn",{staticClass:"mt-6",attrs:{block:"","x-large":"",depressed:"",color:"primary"},on:{click:function(e){return t.$store.dispatch("auth/login",{email:t.email,password:t.password})}}},[t._v(" 로그인 ")]),a("v-btn",{staticClass:"mt-6",attrs:{block:"","x-large":"",depressed:"",color:"grey lighten-1",router:"",to:"join"}},[t._v(" 회원가입 ")])],1)],1)],1)],1)],1)},s=[],l=a("5530"),o=a("2f62"),n={name:"Login",data:function(){return{email:null,password:null}},computed:Object(l["a"])({},Object(o["c"])("auth",["loginErrorMsg","isLoginError"]))},i=n,c=a("2877"),d=a("6544"),p=a.n(d),u=a("0798"),m=a("8336"),v=a("b0af"),w=a("99d9"),f=a("62ad"),g=a("a523"),k=a("132d"),x=a("0fd9"),b=a("8654"),h=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=h.exports;p()(h,{VAlert:u["a"],VBtn:m["a"],VCard:v["a"],VCardText:w["c"],VCol:f["a"],VContainer:g["a"],VIcon:k["a"],VRow:x["a"],VTextField:b["a"]})}}]);
//# sourceMappingURL=chunk-2d2086ab.7300ed19.js.map