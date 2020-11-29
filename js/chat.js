export const chat = {
    attacheInputLink : document.getElementById('attacheInputLink'),
    attacheInput : document.getElementById('attacheInput'),
    chatScreen : document.getElementById('chatScreen'),
    sendButton : document.getElementById('sendButton'),
    messageInput : document.getElementById('messageInput'),
    handleFiles : () => {
        let files = chat.attacheInput.files;
        if (!FileReader){
            alert("Your browser doesn't suppport FileReader") 
        }
        if (FileReader && files && files.length) {
            let type = files[0].type.split('/')[0]
            chat.addSource(type, files[0])
        }
        else {

        }
    },
    videoFileHtml : (src, id) => {
        return `
            <div class="item chat-item video-item" data-value="" id="item-${id}">
            <div class="close-button" id="close-${id}"><img src='./images/close.svg'/></div>
                <div class="item-block video-block-container">
                    <div class="video-block center-flex">
                        <div class="video">
                            <video preload="metadata" id="${id}">
                                <source src="${src}" type="video/mp4">
                            </video>
                            <div class="button-block" id="button-block-${id}">
                                <div class="button" id="button-${id}">
                                    <img src="./images/play-blue.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="time">${chat.getTime()}</div>
                </div>
            </div>
        `
    },

    audioFileHtml : (src, id) => {
        return `
            <div class="item" id="item-${id}">
            <div class="close-button" id="close-${id}"><img src='./images/close.svg'/></div>
                <div class="item-block scale-block-container">
                    <div class="audio-block">
                        <audio controls id="${id}">
                            <source src="${src}">
                        </audio>
                    </div>
                    <div class="time">${chat.getTime()}</div>
                </div>
            </div>
        `
    },

    imageFileHtml : (src, id) => {
        return `
        <div class="item" id="item-${id}">
            <div class="item-block images-block-container">
                <div class="image-block">
                    <img id="${id}" src="${src}" alt="">
                </div>
                <div class="time">${chat.getTime()}</div>
            </div>
        </div>
        `
    },

    textHtml : (text, id) => {
        return `
            <div class="item" id="item-${id}">
                <div class="item-block text-block-container">
                    <div class="text-block">
                        ${text}
                    </div>
                    <div class="time">2:25 PM</div>
                </div>
            </div>
        `
    },

    addSource : (type, data) => {
        switch (type) {
            case 'video':
                chat.addVideo(data)
                break;

            case 'audio':
                chat.addAudio(data)
                break;
            
            case 'image':
                chat.addImage(data)
                break;

            default:
                alert('Please attache video, audio or image')
                break;
        }
        
    },

    getTime : () => {
        let date = new Date()
        let hours = date.getHours()
        let ampm = 'AM'
        let minutes = date.getMinutes()
        if(hours > 12){
            hours -= 12
            ampm = 'PM'
        }
        if(minutes < 10){
            minutes = '0' + minutes
        }
        return `${hours}:${minutes} ${ampm}`
    },

    addImage : (data) => {
        let fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = function () {
            let imageId = 'image-' + Math.floor(Math.random() * 1000)
            new Promise( (resolve, reject) => {
                chat.chatScreen.innerHTML += chat.imageFileHtml(fr.result, imageId)
                resolve('ok')
            }).then(()=> {
                let item = document.getElementById('item-' + imageId)
            }) 
        }
    },

    addAudio : (data) => {
        let fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = function () {
            let audioId = 'audio-' + Math.floor(Math.random() * 1000)
            let item = document.getElementById('item-' + audioId)
            new Promise( (resolve, reject) => {
                //uploadingModal.onShow()
                chat.chatScreen.innerHTML += chat.audioFileHtml(fr.result, audioId)
                resolve('ok')
            }).then(()=> {
                let closeButton = document.getElementById('close-' + audioId)
                let item = document.getElementById('item-' + audioId)
                closeButton.addEventListener('click', function(){
                    item.remove()
                })
            }) 
        }
    },

    addVideo : (data) => {
        let fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = function () {
            let videoId = 'video-' + Math.floor(Math.random() * 1000)
            new Promise( (resolve, reject) => {
                    //uploadingModal.onShow()
                    chat.chatScreen.innerHTML += chat.videoFileHtml(fr.result, videoId)
                    resolve('ok')
                }
            ).then(() => {
                let buttonId = 'button-' + videoId
                let button = document.getElementById(buttonId)
                let chatVideo = document.getElementById(videoId)
                let videoButton = document.getElementById('button-block-' + videoId)
                let item = document.getElementById('item-' + videoId)
                let closeButton = document.getElementById('close-' + videoId)
                button.addEventListener('click', function(){
                    videoButton.style.display = 'none'
                    chatVideo.play()
                    chatVideo.setAttribute('data-state', 'play')
                })
                chatVideo.addEventListener('click', function(){
                    videoButton.style.display = 'none'
                    switch (chatVideo.dataset.state) {
                        case 'play':
                            chatVideo.pause()
                            chatVideo.setAttribute('data-state', 'pause')
                            break;
                        case 'pause':
                            chatVideo.play()
                            chatVideo.setAttribute('data-state', 'play')
                            break;
                        default:
                            break;
                    }
                })
                closeButton.addEventListener('click', function(){
                    item.remove()
                })
            })
        }
    },
    
    addText : (text) => {
        let messageId = 'message-' + Math.floor(Math.random() * 1000)
        chat.chatScreen.innerHTML += chat.textHtml(text, messageId)
    }
}