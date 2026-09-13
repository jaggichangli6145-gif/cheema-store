import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Gem } from 'lucide-react';

export default function ProductFormModal({ product, isOpen, onClose, onSave }) {
  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'rings',
    categoryLabel: 'Rings',
    collection: 'diamond-elegance',
    collectionLabel: 'Diamond Elegance',
    price: '',
    originalPrice: '',
    description: '',
    metal: '18K Yellow Gold',
    metalPurity: '18K (750 BIS)',
    weight: '4.50 grams',
    gemstone: 'Natural Diamond',
    diamondCarat: '1.00 Carat',
    clarity: 'VVS1',
    diamondColor: 'D',
    cut: 'Round Brilliant',
    occasion: 'Bridal',
    sku: '',
    stock: 10,
    status: 'active',
    featured: false,
    newArrival: true,
    sizes: 'US 6, US 7, US 8',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price ?? '',
        originalPrice: product.originalPrice ?? '',
        stock: product.stock ?? 10,
        sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || 'Standard'),
        images: Array.isArray(product.images) && product.images.length > 0
          ? product.images
          : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'],
        featured: Boolean(product.featured || product.isBestseller),
        newArrival: Boolean(product.newArrival || product.isNew)
      });
    } else {
      setFormData({
        name: '',
        category: 'rings',
        categoryLabel: 'Rings',
        collection: 'diamond-elegance',
        collectionLabel: 'Diamond Elegance',
        price: '',
        originalPrice: '',
        description: '',
        metal: '18K Yellow Gold',
        metalPurity: '18K (750 BIS)',
        weight: '4.50 grams',
        gemstone: 'Natural Diamond',
        diamondCarat: '1.00 Carat',
        clarity: 'VVS1',
        diamondColor: 'D',
        cut: 'Round Brilliant',
        occasion: 'Bridal',
        sku: `CJ-RNG-${Math.floor(100 + Math.random() * 900)}`,
        stock: 10,
        status: 'active',
        featured: false,
        newArrival: true,
        sizes: 'US 6, US 7, US 8',
        images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80']
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    if (formData.images.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sizesArray = typeof formData.sizes === 'string'
      ? formData.sizes.split(',').map(s => s.trim()).filter(Boolean)
      : formData.sizes;

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock: Number(formData.stock),
      sizes: sizesArray,
      images: formData.images.filter(Boolean),
      isBestseller: formData.featured,
      isNew: formData.newArrival
    };

    await onSave(payload, isEditing ? product.id : null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-champagne-200 overflow-hidden flex flex-col my-8">
          
          <div className="p-5 px-6 border-b border-champagne-200 bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold-500 text-white flex items-center justify-center font-bold">
                <Gem className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal-950">
                  {isEditing ? `Edit Jewel: ${product.name}` : 'Add New High-Jewellery Masterpiece'}
                </h3>
                <div className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold">
                  Catalogue Inventory Management
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 text-charcoal-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs overflow-y-auto max-h-[75vh]">
            
            <div className="space-y-4">
              <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
                1. Core Identification & Category
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Royal Solitaire Diamond Ring"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">SKU / Identifier *</label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. CJ-RNG-101"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        category: val,
                        categoryLabel: val.charAt(0).toUpperCase() + val.slice(1)
                      }));
                    }}
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 capitalize"
                  >
                    {['rings', 'necklaces', 'earrings', 'bracelets', 'bangles', 'pendants', 'bridal', 'mens'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Collection</label>
                  <select
                    name="collection"
                    value={formData.collection}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        collection: val,
                        collectionLabel: val.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                      }));
                    }}
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  >
                    <option value="royal-gold">Royal Gold Collection</option>
                    <option value="diamond-elegance">Diamond Elegance</option>
                    <option value="bridal-collection">Bridal Collection</option>
                    <option value="everyday-essentials">Everyday Essentials</option>
                    <option value="modern-minimal">Modern Minimal</option>
                    <option value="heritage-collection">Heritage Collection</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
                2. Price & Inventory Control (₹)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="185000"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    min="1"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="215000"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Stock Units *</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="15"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
                3. Metal & Gemstone Specifications
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Precious Metal</label>
                  <input
                    type="text"
                    name="metal"
                    value={formData.metal}
                    onChange={handleChange}
                    placeholder="18K White Gold"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Gross Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="3.85 grams"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Gemstone / Diamond</label>
                  <input
                    type="text"
                    name="gemstone"
                    value={formData.gemstone}
                    onChange={handleChange}
                    placeholder="Natural Diamond"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Available Sizes (Comma-separated)</label>
                  <input
                    type="text"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleChange}
                    placeholder="US 5, US 6, US 7, US 8"
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Everyday">Everyday</option>
                    <option value="Evening">Evening</option>
                    <option value="Gifting">Gifting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Artisanal Story & Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the craftsmanship, setting, and inspiration of this jewellery piece..."
                  className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-serif font-bold text-sm text-charcoal-950">
                  4. Product Images
                </span>
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-xs text-gold-700 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Angle URL</span>
                </button>
              </div>

              {formData.images.map((img, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="url"
                    required
                    value={img}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg border border-gray-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-champagne-50/60 rounded-2xl border border-champagne-200 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal-900">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold-600 rounded focus:ring-gold-400"
                />
                <span>Featured / Bestseller Showcase</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal-900">
                <input
                  type="checkbox"
                  name="newArrival"
                  checked={formData.newArrival}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold-600 rounded focus:ring-gold-400"
                />
                <span>New Arrival Badge</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal-900">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-1 bg-white border border-champagne-200 rounded-lg text-xs"
                >
                  <option value="active">Active (Visible)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </label>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-charcoal-700 hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black font-semibold uppercase tracking-wider transition-all shadow flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Add Product'}</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
