document.addEventListener('DOMContentLoaded', () => {
    let nonfollowers = document.getElementById("nonfollowers");
    let dnotfollowing = document.getElementById("notfollowing");
    let pfl = document.getElementById("followerslength");
    let pfl2 = document.getElementById("followinglength");
    let pnfl = document.getElementById("notfollowingbacklength");
    let pnfl2 = document.getElementById("notfollowinglength");

    chrome.storage.local.get(["followers","following"], ({ followers,following }) => {
    

    const notfollowingback = followers.filter(i => !following.includes(i))
    const notfollowing = following.filter(i => !followers.includes(i))

    pfl.innerText += " "+followers.length
    pfl2.innerText += " "+following.length
    pnfl.innerText += " "+notfollowingback.length
    pnfl2.innerText += " " + notfollowing.length
        
        notfollowingback.map(i => {
            let element = document.createElement("a")
            element.innerText = i
            element.href = "https://www.instagram.com/" + i + "/"
            element.target = "_blank"
            nonfollowers.append(element)
        })
        
        notfollowing.map(i => {
            let element = document.createElement("a")
            element.innerText = i
            element.href = "https://www.instagram.com/" + i + "/"
            element.target = "_blank"
            dnotfollowing.appendChild(element)
        })        


    })
});