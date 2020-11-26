let share = {
    shareButton : document.getElementById('share-button'),
    sharePalet : document.getElementById('share-palet'),
    onShareButton : (event) => {
        event.preventDefault()
        if(this.sharePalet.classList.contains('show-palet')){
            this.sharePalet.classList.remove('show-palet')
        }
        else{
            this.sharePalet.classList.add('show-palet')
        }
    },
    closeShareByClickWindow : (event) =>  {
        if(!this.sharePalet.contains(event.target) && !this.shareButton.contains(event.target)){
            this.sharePalet.classList.remove('show-palet')
        }
    }
}

share.shareButton.addEventListener('click', share.onShareButton)

document.body.addEventListener('click', share.closeShareByClickWindow(event), true)