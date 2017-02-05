/**
 * Created by user on 04.02.17.
 */
var video = document.getElementById("video"),
    trackList =[],
    curent = 0;
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
video.addEventListener("ended", nextVideo);
video.addEventListener("click", function(){
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
});
document.getElementById("right").addEventListener("click", chouseVideo);