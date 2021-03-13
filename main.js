function resizeIframe(iframe) {
  iframe.width  = iframe.contentWindow.document.body.scrollWidth;
  iframe.height = iframe.contentWindow.document.body.scrollHeight;

  targetIframe.width  = iframe.width;
  targetIframe.height = iframe.height;
  console.log(textarea.style)
  textarea.style.width = iframe.width + 'px'
  textarea.style.height = iframe.height + 'px'
}

const textarea = document.getElementById('textarea')
const diff = document.getElementById('diff')
const percentage = document.getElementById('percentage')
const sourceIframe = document.getElementById('source-iframe')
const codeContainer = document.getElementById('code-container')

const urlParams = new URLSearchParams(window.location.search);
const sourceIframeUrl = urlParams.get('iframe')
sourceIframe.src = sourceIframeUrl

const targetIframe = document.getElementById('target-iframe')

sourceIframe.addEventListener('load', function(e) {
  resizeIframe(sourceIframe)
});

document.getElementById('button').addEventListener('click', async () => {
  const textareaContent = textarea.value
  targetIframe.srcdoc = textareaContent
  targetIframe.style.display = 'block'
  codeContainer.style.display = 'none'

  const sourceCanvas = await html2canvas(sourceIframe.contentDocument.body, {
  })
  const sourceImg = sourceCanvas.toDataURL()
  const imgTest = document.createElement('img')
  imgTest.src = sourceImg

  const targetCanvas = await html2canvas(targetIframe.contentDocument.body)
  const targetImg = targetCanvas.toDataURL()

  resemble(sourceImg).compareTo(targetImg).onComplete(function (data) {
    diff.src = data.getImageDataUrl();

    // diff.appendChild(diffImage);
    // console.log(data)
    if (data.rawMisMatchPercentage === 0) {
      percentage.innerText = `Seu resultado igual ao original, Parabéns!`
    } else {
      percentage.innerText = `Seu resultado esta diferente do original, olhe abaixo o que tem de diferente`
    }
  });

})