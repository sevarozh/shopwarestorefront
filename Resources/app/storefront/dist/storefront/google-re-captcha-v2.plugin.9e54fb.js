"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["google-re-captcha-v2.plugin"],{8959:(t,e,i)=>{i.d(e,{Z:()=>a});var r=i(9568);class a extends r.Z{init(){if(this._getForm(),this._form){if(this.grecaptchaInput=this.el.querySelector(this.options.grecaptchaInputSelector),!this.grecaptchaInput)throw Error("Input field for Google reCAPTCHA is missing!");this.grecaptcha=window.grecaptcha,this._formSubmitting=!1,this.formPluginInstances=window.PluginManager.getPluginInstancesFromElement(this._form),this._registerEvents()}}getGreCaptchaInfo(){}onFormSubmit(){}_getForm(){return this.el&&"FORM"===this.el.nodeName?(this._form=this.el,!0):(this._form=this.el.closest("form"),this._form)}_registerEvents(){this.formPluginInstances?this.formPluginInstances.forEach(t=>{t.$emitter.subscribe("beforeSubmit",this._onFormSubmitCallback.bind(this))}):this._form.addEventListener("submit",this._onFormSubmitCallback.bind(this))}_submitInvisibleForm(){if(!this._form.checkValidity())return;this.$emitter.publish("beforeGreCaptchaFormSubmit",{info:this.getGreCaptchaInfo(),token:this.grecaptchaInput.value});let t=!1;this.formPluginInstances.forEach(e=>{"function"==typeof e.sendAjaxFormSubmit&&!1!==e.options.useAjax&&(t=!0,e.sendAjaxFormSubmit())}),t||this._form.submit()}_onFormSubmitCallback(){this._formSubmitting||(this._formSubmitting=!0,this.onFormSubmit())}}},6048:(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var r=i(4049),a=i(8959);class s extends a.Z{init(){super.init(),this.grecaptchaContainer=this.el.querySelector(this.options.checkboxContainer),this.grecaptchaContainerIframe=null,this.grecaptchaWidgetId=null,this._renderV2Captcha()}getGreCaptchaInfo(){return{version:"GoogleReCaptchaV2",invisible:this.options.invisible}}onFormSubmit(){this.options.invisible?null!==this.grecaptchaWidgetId&&this.grecaptcha.execute(this.grecaptchaWidgetId).then(()=>{this._formSubmitting=!1}):(this.grecaptchaInput.value||(this.grecaptchaContainerIframe=r.Z.querySelector(this.el,"iframe"),this.grecaptchaContainerIframe.classList.add(this.options.grecaptchaIframeHasErrorClassSelector)),this._formSubmitting=!1,this.$emitter.publish("beforeGreCaptchaFormSubmit",{info:this.getGreCaptchaInfo(),token:this.grecaptchaInput.value}))}_renderV2Captcha(){this.grecaptcha.ready(this._onGreCaptchaReady.bind(this))}_onCaptchaTokenResponse(t){if(this.$emitter.publish("onGreCaptchaTokenResponse",{info:this.getGreCaptchaInfo(),token:t}),this._formSubmitting=!1,this.grecaptchaInput.value=t,!this.options.invisible){this.grecaptchaContainerIframe.classList.remove(this.options.grecaptchaIframeHasErrorClassSelector);return}this._submitInvisibleForm()}_onGreCaptchaReady(){this.grecaptchaWidgetId=this.grecaptcha.render(this.grecaptchaContainer,{sitekey:this.options.siteKey,size:this.options.invisible?"invisible":"normal",callback:this._onCaptchaTokenResponse.bind(this),"expired-callback":this._onGreCaptchaExpire.bind(this),"error-callback":this._onGreCaptchaError.bind(this)}),this.grecaptchaContainerIframe=r.Z.querySelector(this.el,"iframe")}_onGreCaptchaExpire(){this.$emitter.publish("onGreCaptchaExpire",{info:this.getGreCaptchaInfo()}),this.grecaptcha.reset(this.grecaptchaWidgetId),this.grecaptchaInput.value=""}_onGreCaptchaError(){this.$emitter.publish("onGreCaptchaError",{info:this.getGreCaptchaInfo()})}}s.options={grecaptchaInputSelector:".grecaptcha-v2-input",checkboxContainer:".grecaptcha-v2-container",grecaptchaIframeHasErrorClassSelector:"has-error",siteKey:null,invisible:!1}}}]);