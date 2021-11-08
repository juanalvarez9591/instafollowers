let scanbtn = document.getElementById("scanbtn");
let test = document.getElementById("test");
let text = document.getElementById("text");


//chrome.storage.sync.get("color", ({ color }) => {
//  changeColor.style.backgroundColor = color;
//});

scanbtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scanPage,
  });
});

test.addEventListener("click", async () => {
    chrome.storage.local.get("following", ({ followers }) => {
        text.innerText = followers
    })
    
});


// The body of this function will be executed as a content script inside the
// current page
function scanPage() {
    const isFollowers = document.querySelector('[aria-label="Seguidores"]') ? true : false
    const followerFocus = document.querySelector('[aria-label="Seguidores"]') ? document.querySelector('[aria-label="Seguidores"]') : document.querySelector('[aria-label="Seguidos"]')
    
    const max = document.getElementsByClassName("g47SY ")

    const limit = document.querySelector('[aria-label="Seguidores"]') ? Number(max[1].innerText) : Number(max[2].innerText) + Number(2)

    let scrapedata = []

    var loop = setInterval(() => {
        try {
            const gordoguishe = document.getElementsByClassName("isgrP")[0];
            gordoguishe.scrollTop = gordoguishe.scrollHeight - gordoguishe.clientHeight;
            scrapedata = Array.from(followerFocus.getElementsByTagName("a")).map(i => i.innerText).filter(word => word.trim().length > 0)
            console.log(scrapedata);
            console.log(limit);
            if (scrapedata.length == limit) {
                clearInterval(loop);

                if (isFollowers == true) {
                    const followers = scrapedata;
                    chrome.storage.local.set({ followers });
                } else {
                    // This deletes the first two elements which are People and Hashtags
                    scrapedata.shift();
                    scrapedata.shift();
                    const following = scrapedata;
                    chrome.storage.local.set({ following });
                    console.log(following)
                }
            };
        } catch (err) {
            clearInterval(loop);
            console.log("Error")
        }
    }, 1000)
}