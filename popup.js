let scanbtn = document.getElementById("scanbtn");
let test = document.getElementById("test");

scanbtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scanPage,
  });
});

test.addEventListener("click", async () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("results.html") });
});

const scanPage = () => {
    const isFollowers = document.querySelector('[aria-label="Seguidores"]') ? true : false
    const followerFocus = document.querySelector('[aria-label="Seguidores"]') ? document.querySelector('[aria-label="Seguidores"]') : document.querySelector('[aria-label="Seguidos"]')
    
    const max = document.getElementsByClassName("g47SY ")

    const limit = document.querySelector('[aria-label="Seguidores"]') ? Number(max[1].innerText) : Number(max[2].innerText) + Number(2)

    let scrapedata = []

    const saveData = (loop, data) => {
        clearInterval(loop);
        if (isFollowers == true) {
                    const followers = data;
                    chrome.storage.local.set({ followers });
                } else {
                    // This deletes the first two elements which are People and Hashtags
                    data.shift();
                    data.shift();
                    const following = data;
                    chrome.storage.local.set({ following });
                    console.log(following)
                }
    }

    const loop = setInterval(() => {
        try {
            const gordoguishe = document.getElementsByClassName("isgrP")[0];
            gordoguishe.scrollTop = gordoguishe.scrollHeight - gordoguishe.clientHeight;
            scrapedata = Array.from(followerFocus.getElementsByTagName("a")).map(i => i.innerText).filter(word => word.trim().length > 0)
            console.log(scrapedata);
            console.log(limit);
            if (scrapedata.length == limit) {
                saveData(loop, scrapedata);
            };
        } catch (err) {
            saveData(loop, scrapedata);
            console.log("Error")
        }
    }, 1000)
}
