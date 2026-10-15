/**
 * Client-Side Image Compression & Downscaling
 * Sourced from Stack Overflow #23945460:
 * "How to resize image before uploading using canvas and JavaScript"
 * https://stackoverflow.com/questions/23945460/how-to-resize-image-before-uploading-using-canvas-and-javascript
 */

export interface CompressedImageResult {
  base64: string;
  mimeType: string;
  width: number;
  height: number;
  sizeBytes: number;
}

export function compressImageFile(
  file: File,
  maxDimension: number = 1280,
  quality: number = 0.85
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    // Basic file validation
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image.'));
    }

    if (file.size > 15 * 1024 * 1024) {
      return reject(new Error('Image file is too large. Please select an image under 15MB.'));
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file from device.'));

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for compression.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional bounding dimensions
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('HTML5 Canvas 2D context unavailable in current browser.'));
        }

        // Clean white background for transparent PNGs
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw image downscaled with high-quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = 'image/jpeg';
        const base64 = canvas.toDataURL(mimeType, quality);
        const sizeBytes = Math.round((base64.length * 3) / 4);

        resolve({
          base64,
          mimeType,
          width,
          height,
          sizeBytes,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
