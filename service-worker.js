const cache_local_name='cache-v1'
const cache_external_Name='Inmutable-v1'
const cache_local=[
    './',
    './manifest.json',
    '/index.html',
    '/js/index.js',
    '/styles/styles.css',
    '/imgs/gato.png',
    './imgs/gato2.png',
    './imgs/gato3.png',
    './imgs/gato4.png',

    '/imgs/portada.png',
    '/imgs/angryIcon.png',
    '/imgs/happyIcon.png',
    './js/changeCat.js'
    
]

//Agregamos a Cache los recursos proporcionados la primera ves que accedemos


self.addEventListener('install',async(event) => {
 try{
    const cacheSave = await caches.open(cache_local_name)
     cacheSave.addAll(cache_local)

 }catch{
    console.error('Error','No se Pudo guardar en cache los recursos proporcionados')
 }
})
//Aplicamos la estrategia de Cache y luego Red

self.addEventListener('fetch',(event) => {
//Para evitar que alguna peticion de alguna extencion
//del navegador rompa el sitio hacemos lo siguiente
    if(!(event.request.url.indexOf('http')===0)){
        return
    }
    const dynamic_cache_name='Cache-Dynamic-v1'


    if( navigator.onLine){
        const cache_Luego_red =caches.open(dynamic_cache_name)
        .then(cache =>{
          return fetch(event.request)
                      .then(response=>{
                          cache.put(event.request,response.clone())
                          return response
                      })
        })
        event.respondWith(cache_Luego_red)
    }else{
        const soloCache = caches.match(event.request).then(response=>{
            if(response){
                return response
            }else{
                return new Response('No hay conexión a internet', {
                    status: 404,
                    statusText: 'No hay conexión a internet',
                  });
            }
        })
        event.respondWith(soloCache)
    }
   


})


self.addEventListener('activate',async() => {
    //retorna una con todos los caches creados
  caches.keys()
    //creamos un filtro para eliminar versiones antiguas de un cache
   caches.keys().then(allCaches=> allCaches.filter(cach => ![cache_local_name  ,cache_external_Name].includes(cach)) .filter(cachesname=> caches.delete(cachesname)))
    
  
  })

  self.addEventListener('notificationclick',(event) => {
    const notification = event.notification;
    const action = notification.action
    if(event.action=="confirm"){
    notification.close()
    event.waitUntil(clients.openWindow('https://stackoverflow.com/questions/62261805/how-to-play-sound-in-service-worker-or-even-vibrate-in-chrome'))
        
    }else{
        notification.close()
    }
    
  })