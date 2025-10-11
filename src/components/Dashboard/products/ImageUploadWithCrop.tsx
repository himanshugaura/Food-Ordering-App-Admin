import React, { useState, useRef } from 'react';
import { Upload, X, Crop } from 'lucide-react';
import ReactCrop, { type Crop as CropType, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';

interface ImageUploadWithCropProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
}

const MAX_IMAGE_SIZE = 500 * 1024; // 500 KB

export const ImageUploadWithCrop: React.FC<ImageUploadWithCropProps> = ({
  image,
  onImageChange,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCropping, setIsCropping] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setErrorMsg('Image size must be less than 500 KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        if (blob.size > MAX_IMAGE_SIZE) {
          reject(new Error('Cropped image exceeds 500 KB. Try cropping a smaller area or compressing.'));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const handleCropComplete = async () => {
    if (imgRef.current && completedCrop) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop);
        onImageChange(croppedImageUrl);
        setIsCropping(false);
        setSelectedImage(null);
        setErrorMsg(null);
      } catch (error: any) {
        setErrorMsg(error.message || 'Error cropping image.');
      }
    }
  };

  const handleCancelCrop = () => {
    setSelectedImage(null);
    setIsCropping(false);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setErrorMsg(null);
  };

  const removeImage = () => {
    onImageChange(null);
  };

  if (isCropping && selectedImage) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1} // fixed aspect ratio
            className="max-h-96 mx-auto"
          >
            <img
              ref={imgRef}
              src={selectedImage}
              alt="Crop preview"
              className="max-w-full max-h-96 object-contain"
              style={{ aspectRatio: "1 / 1" }}
            />
          </ReactCrop>
        </div>
        {errorMsg && (
          <div className="text-red-500 text-sm mb-2">{errorMsg}</div>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleCropComplete}
            disabled={!completedCrop}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Crop className="w-4 h-4 mr-2" />
            Apply Crop
          </Button>
          <Button
            onClick={handleCancelCrop}
            variant="outline"
            className="flex-1 text-gray-900"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="relative group w-64 h-64">
        <img
          src={image}
          alt="Food preview"
          className="w-full h-full object-cover rounded-xl border-2 border-purple-500/50 aspect-square"
          style={{ aspectRatio: "1 / 1" }}
        />
        <button
          type="button"
          onClick={removeImage}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedImage(image);
            setIsCropping(true);
          }}
          className="absolute top-2 left-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Crop className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/5 group">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer block"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-300">
              Upload Food Image
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Click to browse or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, WEBP up to 500KB
            </p>
          </div>
        </div>
      </label>
      {errorMsg && (
        <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
      )}
    </div>
  );
};