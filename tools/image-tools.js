document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('image-drop-zone');
    const uploadInput = document.getElementById('image-upload');
    const previewContainer = document.getElementById('image-preview-container');
    const downloadBtn = document.getElementById('download-btn');
    const qualitySlider = document.getElementById('quality-slider');
    const qualityValue = document.getElementById('quality-value');

    let originalFile = null;

    // --- Event Listeners ---
    dropZone.addEventListener('dragover', (e) => e.preventDefault());
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    uploadInput.addEventListener('change', () => handleFile(uploadInput.files[0]));
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = `${qualitySlider.value}%`;
        if (originalFile) {
            compressAndPreview(originalFile);
        }
    });

    // --- File Handling Logic ---
    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        originalFile = file;
        compressAndPreview(file);
    }

    function compressAndPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const quality = parseInt(qualitySlider.value, 10) / 100;
                canvas.toBlob((blob) => {
                    const previewUrl = URL.createObjectURL(blob);
                    previewContainer.innerHTML = `<img src="${previewUrl}" alt="Image Preview" style="max-width: 100%; border-radius: 8px;">`;
                    downloadBtn.disabled = false;
                    downloadBtn.onclick = () => {
                        const a = document.createElement('a');
                        a.href = previewUrl;
                        a.download = `compressed-${file.name}`;
                        a.click();
                    };
                }, 'image/jpeg', quality);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
