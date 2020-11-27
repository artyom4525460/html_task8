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
        video.onPause()
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
    isMoveProgressButton: false,
    videoInit : () => {
        // var supportsProgress = (document.createElement('progress').max !== undefined);
        // if (!supportsProgress) progress.setAttribute('data-state', 'fake')
        // videoControls.setAttribute('data-state', 'visible')
        this.videoProgress.max = this.videoTag.duration
    },
    hidePlayButton : () => {
        this.videoButtonBlock.classList.add('hide')
    },
    onPlay : async () => {
        this.videoButtonBlock.classList.add('hide')
        await this.videoTag.play()
        this.videoPlayButton.setAttribute('data-state', 'play')
    },
    onPause : async () => {
        if(this.videoPlayButton.dataset.state == 'play'){
            await this.videoTag.pause()
            this.videoPlayButton.setAttribute('data-state', 'pause')
        }
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
    },
    progressVideo : () => {
        this.videoProgress.value = this.videoTag.currentTime
        this.videoProgressButton.style.left = Math.floor((this.videoTag.currentTime / this.videoTag.duration) * 100) + '%'
    },
    moveProgressButton : (event) => {
        event.preventDefault()
        video.isMoveProgressButton = true
        let progressButtonPosition = event.clientX
        let currentPosition = this.videoProgressButton.offsetLeft
        document.addEventListener('mousemove', function(e){
            if(video.isMoveProgressButton){
                video.moveToPosition(progressButtonPosition, e.clientX, currentPosition)
            }
        })

        document.addEventListener('mouseup', function(e){
            video.isMoveProgressButton = false
        })
    },
    moveToPosition : (moveFrom, moveTo, currentPosition) => {
        let delta = moveTo - moveFrom
        if(currentPosition + delta < 0){
            video.videoProgressButton.style.left = 0
        }
        else if(currentPosition + delta > video.videoProgress.offsetWidth){
            video.videoProgressButton.style.left = video.videoProgress.offsetWidth + 'px'
        }
        else{
            video.videoProgressButton.style.left = Math.floor( 100 * (currentPosition + delta) / video.videoProgress.offsetWidth ) + '%'
        }
        video.videoTag.currentTime = Math.floor( (100 * (currentPosition + delta) / video.videoProgress.offsetWidth ) * this.videoTag.duration / 100) 
    },
    changeSoundVol : () => {
        if(this.videoTag.volume == 1){
            this.videoTag.volume = 0.1
        }
        else{
            this.videoTag.volume = (this.videoTag.volume + 0.1).toFixed(1)
        }
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
video.videoTag.addEventListener('timeupdate', video.progressVideo)
video.videoProgressButton.addEventListener('mousedown', video.moveProgressButton)
video.videoVol.addEventListener('click', video.changeSoundVol)
