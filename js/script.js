import {video} from './video'
import {chat} from './chat'

let broadcast = {
    broadcastButton : document.getElementById('broadcastButton'),
    clickBroadcastButton : (event) => {
        modal.onShow(event)
        videoModal.onShow(event)
    }
}

let modal = {
    modalBlock : document.getElementById('modalBlock'),
    onShow : (event) => {
        modal.modalBlock.classList.remove('hide')
    },
    onHide : () => {
        modal.modalBlock.classList.add('hide')
    }
}

let videoModal = {
    videoModalBlock : document.getElementById('videoModalBlock'),
    videoModalNextButton : document.getElementById('videoModalNextButton'),
    onShow : (event) => {
        videoModal.videoModalBlock.classList.remove('hide')
        video.videoInit()
    },
    onNext : () => {
        videoModal.videoModalBlock.classList.add('hide')
        chatModal.onShow()
        video.onPause()
    }
}

let chatModal = {
    chatModalBlock : document.getElementById('chatModalBlock'),
    chatBroadcastButton : document.getElementById('chatBroadcastButton'),
    onShow : (event) => {
        chatModal.chatModalBlock.classList.remove('hide')
    },
    onBroadcastClick : () => {
        chatModal.chatModalBlock.classList.add('hide')
        uploadingModal.onShow()
    }
}

let uploadingModal = {
    uploadingModalBlock : document.getElementById('uploadingModalBlock'),
    progressScale : document.getElementById('progressScale'),
    progressPercent : document.getElementById('progressPercent'),
    //modalBlockUploadingSection : document.getElementById('modalBlockUploadingSection'),
    onShow : () => {
        //uploadingModal.modalBlockUploadingSection.classList.remove('hide')
        uploadingModal.uploadingModalBlock.classList.remove('hide')
        uploadingModal.onLoad()
    },
    onHide : () => {
        //uploadingModal.modalBlockUploadingSection.classList.add('hide')
        uploadingModal.uploadingModalBlock.classList.add('hide')
        successModal.onShow()
    },
    onLoad : () => {

        let width = 0;

        let timer = setInterval(function() {
            if (width > 100) {
                clearInterval(timer);
                uploadingModal.onHide()
                return;
            }
            progressScale.style.width = width + '%';
            progressPercent.innerHTML = width + '%';
            width++
        }, 20);
    }
}

let successModal = {
    successModalBlock: document.getElementById('successModalBlock'),
    successOk: document.getElementById('successOk'),
    onShow : (event) => {
        successModal.successModalBlock.classList.remove('hide')
    },
    onHide : (event) => {
        successModal.successModalBlock.classList.add('hide')
        modal.onHide()
    }
}

broadcast.broadcastButton.addEventListener('click', broadcast.clickBroadcastButton)
videoModal.videoModalNextButton.addEventListener('click', videoModal.onNext)
chatModal.chatBroadcastButton.addEventListener('click', chatModal.onBroadcastClick)
successModal.successOk.addEventListener('click', successModal.onHide)

/**
 * 
 * Video Events
 * 
 */

video.videoPlayButton.addEventListener('click', video.onPlay)
video.videoTag.addEventListener('click', video.onPausePlay)
video.videoTag.addEventListener('timeupdate', video.progressVideo)
video.videoProgressButton.addEventListener('mousedown', video.moveProgressButton)
video.videoVol.addEventListener('click', video.changeSoundVol)

/**
 * 
 * Chat Events
 * 
 */

chat.attacheInputLink.addEventListener('click', function(e){
    e.preventDefault()
    chat.attacheInput.click()
})

chat.attacheInput.addEventListener("change", chat.handleFiles, false)

chat.sendButton.addEventListener("click", function(){
    if(chat.messageInput.value){
        chat.addText(chat.messageInput.value)
        chat.messageInput.value = null
    }
})
