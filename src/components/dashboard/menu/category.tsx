import { useState, useCallback, ChangeEvent, FormEvent, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { canvasPreview } from "../crop/crop";
import { Upload, Tag, Image, X, Plus, Loader } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';
import { addCategory } from '@/lib/api/menu';
import { useAppDispatch } from '@/lib/store/store';
import Button from '@/components/common/Button';

interface CategoryFormData { name: string; }
interface ImageFile extends File { preview?: string; }

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function CategoryUploadPage() {
  const [formData, setFormData] = useState<CategoryFormData>({ name: '' });
  const [image, setImage] = useState<ImageFile | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Drag & Drop
  const onDrop = useCallback((files: File[]) => {
    if (!files.length) return;
    const file = files[0] as ImageFile;

    if (file.size > 200 * 1024) {
      alert("File size should be less than 200KB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result?.toString() || '');
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
    maxFiles: 1,
  });

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  const applyCrop = useCallback(async () => {
    if (imgRef.current && previewCanvasRef.current && completedCrop) {
      await canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      previewCanvasRef.current.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }) as ImageFile;
          file.preview = URL.createObjectURL(blob);
          setImage(file);
        }
      }, 'image/jpeg', 0.9);
    }
    setCropModalOpen(false);
  }, [completedCrop]);

  const removeImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append("name", formData.name.toUpperCase());
    fd.append("image", image);

    await dispatch(addCategory(fd));

    setFormData({ name: '' });
    removeImage();
    setIsUploading(false);
  };

  const isFormValid = formData.name && image;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Crop Modal */}
      {cropModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto p-8 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <Image className="w-4 h-4 text-teal-600" />
                </div>
                Crop Image
              </h3>
              <button 
                onClick={() => setCropModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {imgSrc && (
              <div className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={c => setCompletedCrop(c)}
                  aspect={1}
                  className="max-w-full"
                >
                  <img ref={imgRef} src={imgSrc} onLoad={onImageLoad} style={{ maxWidth: '100%', maxHeight: '60vh' }} />
                </ReactCrop>
              </div>
            )}
            <div className="flex gap-3 mt-6 justify-center">
              <button 
                onClick={() => setCropModalOpen(false)} 
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={applyCrop} 
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Apply Crop
              </button>
            </div>
            <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
          </div>
        </div>
      )}

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Category</h1>
          <p className="text-gray-500">Create a new product category with an image</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <div className="w-6 h-6 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <Tag className="w-3.5 h-3.5 text-teal-600" />
                </div>
                Category Name 
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white/70 backdrop-blur-sm placeholder-gray-400"
                placeholder="e.g., Fruits & Vegetables"
                required
              />
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <div className="w-6 h-6 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <Image className="w-3.5 h-3.5 text-teal-600" />
                </div>
                Category Image 
                <span className="text-red-500 ml-1">*</span>
              </label>
              
              <div 
                {...getRootProps()} 
                className={`relative border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                  isDragActive 
                    ? 'border-teal-400 bg-gradient-to-br from-teal-50 to-emerald-50 scale-[1.02]' 
                    : 'border-gray-300 hover:border-teal-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-teal-50'
                }`}
              >
                <input {...getInputProps()} />
                {image?.preview ? (
                  <div className="relative group">
                    <div className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-2">
                      <img 
                        src={image.preview} 
                        alt="Preview" 
                        className="mx-auto max-h-48 rounded-lg object-cover shadow-md" 
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={removeImage} 
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 p-2 rounded-full text-white shadow-lg transition-all group-hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                      <Upload className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Category Image</h3>
                    <p className="text-gray-500 mb-1">Drag & drop your image here, or click to browse</p>
                    <p className="text-xs text-gray-400">Maximum file size: 200KB</p>
                  </div>
                )}
              </div>
            </div>

           <Button type="submit" disable={!formData.name.trim() || !image || isUploading} cover={true} variant='secondary'>
             {isUploading && <Loader className='animate-spin'/>} {isUploading ? 'Uploading...' : 'Add Category'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}