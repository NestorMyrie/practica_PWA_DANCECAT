const catsImgs=['../imgs/gato.png','../imgs/gato2.png','../imgs/gato3.png','../imgs/gato4.png']
const img = document.getElementById('imgCat')
const changeImgCat = document.getElementById('changeImgCat')
let imgPosition=0
let imgPositionLimit= catsImgs.length -1

changeImgCat?.addEventListener('click',() => {
    if(imgPosition > imgPositionLimit){
        imgPosition=0
        img.src=catsImgs[0]
        return
    }
    img.src=catsImgs[imgPosition]
    imgPosition++
})
