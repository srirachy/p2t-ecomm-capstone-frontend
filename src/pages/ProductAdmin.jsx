import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { slugIt } from '../utils';
import '../styles/ProductAdmin.css';

const ProductAdmin = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [ imagePreviews, setImagePreviews ] = useState([]);
    const [ uploadProgress, setUploadProgress ] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue, 
    } = useForm();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
        setValue=('images', files);
    }

    const uploadImages = async (files) => {
        const uploadedUrls = [];
        setIsUploading(true);

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'your_upload_preset');

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setUploadProgress(percentCompleted);
                        }
                    }
                );
                const data = await res.json();
                uploadedUrls.push({ url: data.secure_url, altText: file.name});
            } catch ( error ) {
                console.error('Upload failed:', error);
                throw error;
            }
        }

        setIsUploading(false);
        return uploadedUrls;
    }

    const onSubmit = async (formData) => {
        try {
            const token = await getAccessTokenSilently();

            const imageFiles = formData.images;
            const uploadedImages = await uploadImages(imageFiles);
            
            const ep = 'products';
            const res = await fetch(import.meta.env.VITE_BACKEND_URI + ep,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...formData,
                        slug: slugIt(formData.name),
                        price: Number(formData.price),
                        images: uploadedImages,
                    })
                }
            );

            if (res.ok) {
                alert('Product created successfully!');
                reset();
                setImagePreviews([]);
            }
        } catch ( error ) {
            console.error('Error:', error);
            alert('Failed to create product');
        }
    };

    return (
        <section id='product-admin-container'>
            <h1>Create New Product</h1>

            <form onSubmit={handleSubmit(onSubmit)} id='product-admin-form'>
                <div className='product-admin-form-group'>
                    <label>Product Name</label>
                    <input 
                        {...register('name', { required: 'Required' })}
                        className={errors.name && 'product-admin-error'}
                    />
                    {errors.name && <span className='product-admin-error-message'>{errors.name.message}</span>}
                </div>

                <div className='product-admin-form-group'>
                    <label>Product Images*</label>
                    <input 
                        type='file'
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className='product-admin-file-input'
                    />

                    <div className='product-admin-image-previews'>
                        {imagePreviews.map((preview, index) => (
                            <img 
                                key={index}
                                src={preview}
                                alt={`Preview ${index}`}
                                className='product-admin-preview-image'
                            />
                        ))}
                    </div>

                    {isUploading && (
                        <progress value={uploadProgress} max="100" className='product-admin-progress-bar' />
                    )}
                </div>

                {/* Price */}

                <button
                    type='submit'
                    className='product-admin-submit-btn'
                    disabled={isUploading}
                >
                    {isUploading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </section>
    )
}

export default ProductAdmin