
const customImagePath = browser.extension.getURL('logo-twitter.png');
const targetClass = 'svg.r-16y2uox';

function replaceSvgWithCustomImage(svgElement) {
  const imgElement = document.createElement('img');
  imgElement.src = customImagePath;

  imgElement.style.width = "42px";

  svgElement.parentNode.replaceChild(imgElement, svgElement);
}

function processSvgElements() {
  const svgElements = document.querySelectorAll(targetClass);
  console.log(`Found ${svgElements.length} SVG elements`);
  svgElements.forEach((svgElement) => {
    replaceSvgWithCustomImage(svgElement);
  });
}

function remplaceFavicon() {
    // remove the old shortcut icon
    const oldLink = document.querySelector("shortcut icon")
    if (oldLink) {
        oldLink.parentNode.removeChild(oldLink);
    }
    const link = document.createElement("link");
    link.rel = "shortcut icon";
    link.href = "https://abs.twimg.com/favicons/twitter.2.ico"; // Replace this with the path to your icon.png file
    document.head.appendChild(link);
    
}

// Function to be called when a mutation is observed
function mutationCallback(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      processSvgElements();
    }
  }
}

// Observe the document for changes to handle dynamically loaded content
const observer = new MutationObserver(mutationCallback);
observer.observe(document.documentElement, { childList: true, subtree: true });

// Call the functions on initial page load
processSvgElements();
remplaceFavicon();

//TWITTER, TWEET, RETWEET and the Twitter Bird logo are trademarks of Twitter Inc. or its affiliates