'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Plus, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface ListingFormData {
  title: string
  description: string
  price_amount: number
  price_unit: 'day' | 'hour'
  capacity: number
  address: string
  city: string
  country: string
  timezone: string
  amenities: string[]
  instant_book: boolean
  images: File[]
}

const AMENITIES = [
  'WiFi',
  'Parking',
  'Coffee',
  'Projector',
  'Whiteboard',
  'Sound System',
  'Air Conditioning',
  'Kitchen',
  'Restrooms',
  'Security',
  'Photography Equipment',
  'Changing Room',
  'Reception',
  'Garden',
  'Lighting'
]

const COUNTRIES = [
  'Denmark',
  'Sweden',
  'Norway',
  'Germany',
  'Netherlands',
  'United Kingdom'
]

const TIMEZONES = [
  'Europe/Copenhagen',
  'Europe/Stockholm',
  'Europe/Oslo',
  'Europe/Berlin',
  'Europe/Amsterdam',
  'Europe/London'
]

export default function CreateListing() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    price_amount: 0,
    price_unit: 'day',
    capacity: 1,
    address: '',
    city: '',
    country: 'Denmark',
    timezone: 'Europe/Copenhagen',
    amenities: [],
    instant_book: false,
    images: []
  })

  const handleInputChange = (field: keyof ListingFormData, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // In a real app, this would upload images and create the listing
      console.log('Creating listing:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to host dashboard
      router.push('/host/dashboard')
    } catch (error) {
      console.error('Error creating listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-headline text-headline tracking-headline mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Modern Conference Room in Downtown"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your space in detail..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="flex">
                <Input
                  type="number"
                  value={formData.price_amount}
                  onChange={(e) => handleInputChange('price_amount', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="rounded-r-none"
                />
                <select
                  value={formData.price_unit}
                  onChange={(e) => handleInputChange('price_unit', e.target.value)}
                  className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="day">per day</option>
                  <option value="hour">per hour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity *
              </label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 1)}
                placeholder="1"
                min="1"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-headline text-headline tracking-headline mb-4">Location</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Street address"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Copenhagen"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone *
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {TIMEZONES.map(timezone => (
                <option key={timezone} value={timezone}>{timezone}</option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">
                Map pin will be added automatically based on your address
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-headline text-headline tracking-headline mb-4">Amenities & Features</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What amenities does your space offer?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    formData.amenities.includes(amenity)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Booking Settings
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.instant_book}
                  onChange={(e) => handleInputChange('instant_book', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Enable instant booking (guests can book without approval)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-headline text-headline tracking-headline mb-4">Photos</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload photos of your space (up to 10 images)
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Choose Files
              </label>
            </div>
          </div>

          {formData.images.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.price_amount > 0 && formData.capacity > 0
      case 2:
        return formData.address && formData.city && formData.country
      case 3:
        return true // Amenities are optional
      case 4:
        return formData.images.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-[#F8DEFF]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-headline text-headline tracking-headline">Create New Listing</h1>
          <p className="text-gray-600 mt-2">Share your space with the world</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-red-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Location</span>
            <span>Amenities</span>
            <span>Photos</span>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid() || loading}
                >
                  {loading ? 'Creating...' : 'Create Listing'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
