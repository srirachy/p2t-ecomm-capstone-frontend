import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { nanoid } from 'nanoid';
import { slugIt } from '../utils';
import '../styles/ProductAdmin.css';
import categorySlice from '../store';

const ProductAdmin = () => {
    const { categories } = categorySlice();
    const { getAccessTokenSilently } = useAuth0();
    const [ imagePreviews, setImagePreviews ] = useState([]);
    const [ isUploading, setIsUploading ] = useState(false);
    const [ selectedCategories, setSelectedCategories ] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch, 
    } = useForm();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
        setValue('images', files);
    };

    const handleCategoryToggle = (category) => {
        const newCategories = selectedCategories.includes(category) ? selectedCategories.filter(c => c !== category) : [...selectedCategories, category];
        setSelectedCategories(newCategories);
        setValue('categories', category);
    }

    watch('categories');

    const onSubmit = async (formData) => {
        try {
            setIsUploading(true);
            const token = await getAccessTokenSilently();

            const uploadForm = new FormData();
            formData.images.forEach(file => uploadForm.append('images', file));
            uploadForm.append('name', formData.name);
            uploadForm.append('price', formData.price);
            uploadForm.append('longDescription', formData.description);
            uploadForm.append('slug', slugIt(formData.name));
            selectedCategories.forEach(category => {
                uploadForm.append('categories', category);
            });
            console.log(uploadForm);
            
            const ep = 'products';
            const res = await fetch(import.meta.env.VITE_BACKEND_URI + ep,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: uploadForm,
                }
            );

            if (res.ok) {
                alert('Product created successfully!');
                reset();
                setImagePreviews([]);
                setSelectedCategories([]);
            }
        } catch ( error ) {
            console.error('Error:', error);
            alert('Failed to create product');
        } finally {
            setIsUploading(false);
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
                    <label>Product Images</label>
                    <input 
                        type='file'
                        accept='image/*'
                        multiple
                        onChange={handleImageChange}
                        className='product-admin-file-input'
                    />

                    <div className='product-admin-image-previews'>
                        {imagePreviews.map((preview, index) => (
                            <img 
                                key={nanoid()}
                                src={preview}
                                alt={`Preview ${index}`}
                                className='product-admin-preview-image'
                            />
                        ))}
                    </div>
                </div>

                <div className='product-admin-form-group'>
                    <label>Categories</label>
                    <div id='product-admin-category-grid'>
                        {categories.map(category => (
                            <div key={nanoid()} className='product-admin-category-option'>
                                <input
                                    type='checkbox'
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryToggle(category)}
                                    className='product-admin-checkbox'
                                />
                                <label
                                    htmlFor={`category-${category}`}
                                    className={`product-admin-category-label ${selectedCategories.includes(category) ? `product-admin-checked` : ''}`}
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                    {errors.categories && (<p className='product-admin-error-message'>Select at least one category</p>)}
                </div>

                <div className='product-admin-form-group'>
                    <label>Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register('price', { 
                            required: 'Price is required',
                            min: { value: 0, message: 'Must be positive' }
                        })}
                    />
                    {errors.price && (
                        <p className='product-admin-error-message'>{errors.price.message}</p>
                    )}
                </div>

                <div className='product-admin-form-group'>
                    <label>Description</label>
                    <textarea
                        rows={4}
                        {...register('description')}
                    />
                </div>

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