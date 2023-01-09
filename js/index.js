
import './changeCat.js'
addEventListener("load", async () => {
  const installButton = document.getElementById("installButton");
  const notificationButton= document.getElementById('notificationButton')
  let deferredPrompt;


//Verificamos si el navegador Soporta Service worker
  if ("serviceWorker" in navigator) {
    //en caso que si , registramos el nuestro
    const response = await navigator.serviceWorker.register(
      "/service-worker.js",
      { scope: "" }
    );
    if (response) {
      console.log("service worker registrado");
    }
//
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredPrompt = event;
    });

    installButton.addEventListener("click", async (event) => {
      if (deferredPrompt) {
        deferredPrompt.prompt();

        const response = await deferredPrompt.userChoice;
        if (response.outcome == "dismissed") {
          console.log("El usuario cancelo la  instalacion");
        }
      }
    });

    notificationButton.addEventListener('click',async(event) => {
        const isActiveNotification = await Notification.requestPermission();
        if (isActiveNotification == "granted") {
            setTimeout(() => {
                navigator.serviceWorker.getRegistration()
                .then(instancia=>{
                  instancia.showNotification('Ya pasaron 5m, Sigue viendo a El gatito Bailar!',{
                    body:"El gato esta feliz por eso baila sin parar",
                    icon:'/imgs/GatiIcon.png',
                    image:'/imgs/portada.png',
                    badge:"/imgs/GatiIcon.png",
                    dir:"ltr",
                    tag:"notification",
                    requireInteraction:true,
                    vibrate:[100,50,200],
                    actions:[
                      {action:'confirm',title:"aceptar", icon:"/imgs/happyIcon.png"},
                      {action:'cancel',title:"canceler", icon:"/imgs/angryIcon.png"}
              
                    ]
                  })
                })
            },3000)
        }else{
          console.log("El usuario No acepto las Notificaciones");
            
        }
      
      
    })
  }
});
