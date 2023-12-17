const { createWorker } = Tesseract;


async function recognizeText(file, lang) {
    (async () => {
        const worker = await createWorker(lang);
        await worker.recognize(file).then(function(data) {
            let text = data.data.text
            if (text !== null) {
                AmagiLoader.hide();
                document.getElementById('translated_text').innerText = text
            } else {
                AmagiLoader.hide();
                document.getElementById('translated_text').innerText = 'No data found'
            }
        }).catch(function(error) {
            AmagiLoader.hide();
        })
    })();
}

function getImgData(file) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", function () {
        imgPreview.style.display = "block";
        imgPreview.innerHTML = '<img class="w-full h-full" src="' + this.result + '" />';
      });    
    }
}



let fileUploadInput = document.getElementById('image_file_uploader_input')
const imgPreview = document.getElementById("img-preview");
const dropZone = document.getElementById("drop_zone")
const copyButton = document.getElementById("copy_button")
const selectedLaunguage = document.getElementById("language_select_option")

copyButton.addEventListener("click", function() {
    if (document.getElementById('translated_text').innerText) {
        navigator.clipboard.writeText(document.getElementById('translated_text').innerText).then(()=>{
            alert("Copied to clipboard!")
        })
    } else {
        alert("Please upload an image first.")
    }
})

dropZone.addEventListener("click", function() {
    fileUploadInput.click()
})
    
fileUploadInput.addEventListener('change', function(event) {
    AmagiLoader.show();
    let selectedLang = selectedLaunguage.options[selectedLaunguage.selectedIndex].value
    console.log(selectedLang)
    let file = event.target.files[0]
    getImgData(file);
    recognizeText(file, selectedLang)
})