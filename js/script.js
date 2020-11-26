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
        this.modalBlock.classList.remove('hide')
    }
}

let videoModal = {
    videoModalBlock : document.getElementById('videoModalBlock'),
    videoModalNextButton : document.getElementById('videoModalNextButton'),
    onShow : (event) => {
        this.videoModalBlock.classList.remove('hide')
        video.videoInit()
    },
    onNext : () => {
        this.videoModalBlock.classList.add('hide')
        chatModal.onShow()
    }
}

let chatModal = {
    chatModalBlock : document.getElementById('chatModalBlock'),
    chatBroadcastButton : document.getElementById('chatBroadcastButton'),
    onShow : (event) => {
        this.chatModalBlock.classList.remove('hide')
    },
    onBroadcastClick : () => {
        this.chatModalBlock.classList.add('hide')
        uploadingModal.onShow()
    }
}

let uploadingModal = {
    uploadingModalBlock : document.getElementById('uploadingModalBlock'),
    progressScale : document.getElementById('progressScale'),
    progressPercent : document.getElementById('progressPercent'),
    onShow : () => {
        this.uploadingModalBlock.classList.remove('hide')
    },
    onLoad : () => {

    }
}

let successModal = {
    successModalBlock: document.getElementById('successModalBlock'),
    onShow : (event) => {
        this.successModalBlock.classList.remove('hide')
    },
}

let video = {
    videoPoster : document.getElementById('videoPoster'),
    videoButtonBlock : document.getElementById('videoButtonBlock'),
    videoPlayButton : document.getElementById('videoPlayButton'),
    videoProgress : document.getElementById('videoProgress'),
    videoProgressBar : document.getElementById('videoProgressBar'),
    videoProgressButton : document.getElementById('videoProgressButton'),
    videoVol : document.getElementById('videoVol'),
    videoControls: document.getElementById('videoControls'),
    videoTag: document.getElementById('videoTag'),
    videoInit : () => {
        var supportsProgress = (document.createElement('progress').max !== undefined);
        if (!supportsProgress) progress.setAttribute('data-state', 'fake')
        videoControls.setAttribute('data-state', 'visible')
    },
    hidePlayButton : () => {
        this.videoButtonBlock.classList.add('hide')
    },
    onPlay : async () => {
        this.videoButtonBlock.classList.add('hide')
        console.log(videoTag)
        await this.videoTag.play()
        this.videoPlayButton.setAttribute('data-state', 'play')
    },
    onPausePlay : () => {
        switch (this.videoPlayButton.dataset.state) {
            case 'play':
                this.videoTag.pause()
                this.videoPlayButton.setAttribute('data-state', 'pause')
                break;
            case 'pause':
                this.videoTag.play()
                this.videoPlayButton.setAttribute('data-state', 'play')
                break;
            default:
                break;
        }
    },
    changeButtonState : (type) => {
        // Play/Pause button
        if (type == 'playpause') {
            if (this.videoTag.paused || this.videoTag.ended) {
                this.videoPlayButton.setAttribute('data-state', 'play')
            }
            else {
                this.videoPlayButton.setAttribute('data-state', 'pause')
            }
        }
        if (type == 'play') {
            this.hidePlayButton
            this.videoPlayButton.setAttribute('data-state', 'play')
        }
        // Mute button
        // else if (type == 'mute') {
        //    mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
        // }
     }
}

broadcast.broadcastButton.addEventListener('click', broadcast.clickBroadcastButton)
videoModal.videoModalNextButton.addEventListener('click', videoModal.onNext)
chatModal.chatBroadcastButton.addEventListener('click', chatModal.onBroadcastClick)

/**
 * 
 * Video Events
 * 
 */

video.videoPlayButton.addEventListener('click', video.onPlay)
video.videoTag.addEventListener('click', video.onPausePlay)