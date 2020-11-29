export const video = {
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
        var supportsProgress = (document.createElement('progress').max !== undefined);
        if (!supportsProgress) progress.setAttribute('data-state', 'fake')
        videoControls.setAttribute('data-state', 'visible')
        video.videoProgress.max = video.videoTag.duration
    },
    hidePlayButton : () => {
        video.videoButtonBlock.classList.add('hide')
    },
    onPlay : async () => {
        video.videoButtonBlock.classList.add('hide')
        await video.videoTag.play()
        video.videoPlayButton.setAttribute('data-state', 'play')
    },
    onPause : async () => {
        if(video.videoPlayButton.dataset.state == 'play'){
            await video.videoTag.pause()
            video.videoPlayButton.setAttribute('data-state', 'pause')
        }
    },
    onPausePlay : () => {
        switch (video.videoPlayButton.dataset.state) {
            case 'play':
                video.videoTag.pause()
                video.videoPlayButton.setAttribute('data-state', 'pause')
                break;
            case 'pause':
                video.videoTag.play()
                video.videoPlayButton.setAttribute('data-state', 'play')
                break;
            default:
                break;
        }
    },
    progressVideo : () => {
        video.videoProgress.value = video.videoTag.currentTime
        video.videoProgressButton.style.left = Math.floor((video.videoTag.currentTime / video.videoTag.duration) * 100) + '%'
    },
    moveProgressButton : (event) => {
        event.preventDefault()
        video.isMoveProgressButton = true
        let progressButtonPosition = event.clientX
        let currentPosition = video.videoProgressButton.offsetLeft
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
        video.videoTag.currentTime = Math.floor( (100 * (currentPosition + delta) / video.videoProgress.offsetWidth ) * video.videoTag.duration / 100) 
    },
    changeSoundVol : () => {
        if(video.videoTag.volume == 1){
            video.videoTag.volume = 0.1
        }
        else{
            video.videoTag.volume = (video.videoTag.volume + 0.1).toFixed(1)
        }
    }
}