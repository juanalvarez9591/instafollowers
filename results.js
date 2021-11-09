document.addEventListener('DOMContentLoaded', () => {
    let divnfb = document.getElementById("notfollowingback");
    let divnf = document.getElementById("notfollowing");
    let pfl = document.getElementById("followerslength");
    let pfl2 = document.getElementById("followinglength");
    let pnfl = document.getElementById("notfollowingbacklength");
    let pnfl2 = document.getElementById("notfollowinglength");

    chrome.storage.local.get(["followers", "following"], ({ followers, following }) => {

        pfl.innerText += " "+followers.length
        pfl2.innerText += " "+following.length

        const notfollowingback = following.filter(i => !followers.includes(i))
        const notfollowing = followers.filter(i => !following.includes(i))

        pnfl.innerText += " "+notfollowingback.length
        pnfl2.innerText += " " + notfollowing.length
        
        notfollowingback.map(i => {
            let element = document.createElement("a")
            element.innerText = i
            element.href = "https://www.instagram.com/" + i + "/"
            element.target = "_blank"
            divnfb.append(element)
        })
        
        notfollowing.map(i => {
            let element = document.createElement("a")
            element.innerText = i
            element.href = "https://www.instagram.com/" + i + "/"
            element.target = "_blank"
            divnf.appendChild(element)
        })        
    })
});