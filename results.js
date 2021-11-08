document.addEventListener('DOMContentLoaded', () => {
    let div1 = document.getElementById("div1");
    let div2 = document.getElementById("div2");
    let pfl = document.getElementById("followerslength");
    let pfl2 = document.getElementById("followinglength");
    let pnfl = document.getElementById("notfollowingbacklength");
    let pnfl2 = document.getElementById("notfollowinglength");

    chrome.storage.local.get(["followers","following"], ({ followers,following }) => {
    

    const notfollowingback = followers.filter(i => !following.includes(i))
    const notfollowing = following.filter(i => !followers.includes(i))

    pfl.innerText += " "+followers.length
    pfl2.innerText += following.length
    pnfl.innerText += notfollowingback.length
    pnfl2.innerText += notfollowing.length
    })
});