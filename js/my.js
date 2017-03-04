/**
 * Created by user on 04.02.17.
 */
function chouseVideo(e) {
    if (e.target.dataset.src && e.target.matches(".video-list li")) {
        var src = e.target.dataset.src;
        video.setAttribute("src",src);
        document.getElementById("curent-play-list").innerHTML = "";
        curent = 0;
        trackList.length = 0;
        return;
    }
    if (e.target.tagName == "SPAN") {
        trackList.push(e.target.parentNode.dataset.src);
        var newLi = document.createElement("li");
        newLi.innerHTML = e.target.previousSibling.nodeValue.trim();
        newLi.dataset.src = e.target.parentNode.dataset.src;
        document.getElementById("curent-play-list").appendChild(newLi);

    }
    if (e.target.tagName == "LI"){
        video.setAttribute("src",e.target.dataset.src);
        var list = document.querySelectorAll("#curent-play-list li");
        clearClassList(list);
        e.target.classList.add("curent");
       for (var i = 0; i < list.length; i++){
           if(e.target === list[i]) curent = i+1;
       }
    }
};
function nextVideo(){
    if ( video.dataset.loop) {
        video.play();
        return;
    };
    if (video.dataset.loop && trackList.length == curent){
        curent = 0;
    }
    if (trackList.length == 0 || trackList.length == curent) return;

    var list = document.querySelectorAll("#curent-play-list li");

    clearClassList(list);
    list[curent].classList.add("curent");
    video.setAttribute("src", trackList[curent++] );

};
function clearClassList(list) {
    for (var i=0; i< trackList.length; i++){
        list[i].classList.remove("curent");
    }
}
/**
 * video player controls, autoplay and loop
 * @param {Object} e  event
 */
function changeInput(e) {
   if(e.target.name == "autoplay"){
       if (!video.autoplay) {
           video.autoplay = true;
           video.play();
       } else {
           video.autoplay = false;
       }
   }
    if(e.target.name == "loop"){
        if (!video.dataset.loop) {
            video.dataset.loop = true;
        } else {
            video.dataset.loop = false;
        }
    }
};

var video = document.getElementById("video"),
    trackList =[],
    curent = 0;

video.addEventListener("ended", nextVideo);
video.addEventListener("click", function(){
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
});
document.body.addEventListener("change", changeInput)
document.getElementById("right").addEventListener("click", chouseVideo);