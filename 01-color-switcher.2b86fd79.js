!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body"),r=null;function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));n.style.backgroundColor=t}t.addEventListener("click",(function(){t.disabled=!0,r=setInterval((function(){return a()}),1e3)})),e.addEventListener("click",(function(){clearInterval(r),t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.2b86fd79.js.map