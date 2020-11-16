var shareButton = document.getElementById('share-button')
var sharePalet = document.getElementById('share-palet')

shareButton.addEventListener('click', function(event){
    event.preventDefault()
    if(sharePalet.classList.contains('show-palet')){
        sharePalet.classList.remove('show-palet')
    }
    else{
        sharePalet.classList.add('show-palet')
    }
})

document.body.addEventListener('click', function(event){
    if(!sharePalet.contains(event.target) && !shareButton.contains(event.target)){
        sharePalet.classList.remove('show-palet')
    }
}, true); 