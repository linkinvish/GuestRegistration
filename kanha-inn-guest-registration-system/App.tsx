import React, { useState } from 'react';
import { FormData, SecondaryGuest, ValidationErrors } from './types';
import { ROOM_TYPES, ID_TYPES } from './constants';
import Header from './components/Header';
import Section from './components/Section';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import FileUploadField from './components/FileUploadField';
import PlusIcon from './components/icons/PlusIcon';
import TrashIcon from './components/icons/TrashIcon';
import CheckCircleIcon from './components/icons/CheckCircleIcon';

const initialFormData: FormData = {
  checkInDate: new Date().toISOString().split('T')[0],
  roomType: ROOM_TYPES[0],
  tariff: '',
  primaryGuestName: '',
  primaryGuestPhone: '',
  primaryGuestEmail: '',
  primaryGuestAddress: '',
  primaryGuestIdType: ID_TYPES[0],
  primaryGuestIdNumber: '',
  primaryGuestIdFrontImage: null,
  primaryGuestIdBackImage: null,
  secondaryGuests: [],
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSecondaryGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedGuests = [...formData.secondaryGuests];
    updatedGuests[index] = { ...updatedGuests[index], [name]: value };
    setFormData(prev => ({ ...prev, secondaryGuests: updatedGuests }));
  };

  const handleSecondaryGuestFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const updatedGuests = [...formData.secondaryGuests];
      updatedGuests[index] = { ...updatedGuests[index], [name]: files[0] };
      setFormData(prev => ({ ...prev, secondaryGuests: updatedGuests }));
    }
  };

  const addSecondaryGuest = () => {
    setFormData(prev => ({
      ...prev,
      secondaryGuests: [
        ...prev.secondaryGuests,
        {
          id: `sg-${Date.now()}`,
          name: '',
          idType: ID_TYPES[0],
          idNumber: '',
          idFrontImage: null,
          idBackImage: null,
        },
      ],
    }));
  };

  const removeSecondaryGuest = (index: number) => {
    const updatedGuests = formData.secondaryGuests.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, secondaryGuests: updatedGuests }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required.';
    if (!formData.tariff) newErrors.tariff = 'Tariff is required.';
    if (!formData.primaryGuestName.trim()) newErrors.primaryGuestName = 'Primary guest name is required.';
    if (!/^\d{10}$/.test(formData.primaryGuestPhone)) newErrors.primaryGuestPhone = 'Enter a valid 10-digit phone number.';
    if (formData.primaryGuestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryGuestEmail)) {
        newErrors.primaryGuestEmail = 'Enter a valid email address.';
    }
    if (!formData.primaryGuestAddress.trim()) newErrors.primaryGuestAddress = 'Address is required.';
    if (!formData.primaryGuestIdNumber.trim()) newErrors.primaryGuestIdNumber = 'ID number is required.';
    if (!formData.primaryGuestIdFrontImage) newErrors.primaryGuestIdFrontImage = 'Front ID image is required.';
    if (!formData.primaryGuestIdBackImage) newErrors.primaryGuestIdBackImage = 'Back ID image is required.';
    
    const secondaryGuestErrors: { [index: number]: any } = {};
    formData.secondaryGuests.forEach((guest, index) => {
      // FIX: Corrected the type of `guestErrors` to allow string error messages for all properties. The original type retained the `File` type for image fields, causing a type error when assigning a string validation message.
      const guestErrors: { [K in keyof Omit<SecondaryGuest, 'id'>]?: string } = {};
      if (!guest.name.trim()) guestErrors.name = 'Name is required.';
      if (!guest.idNumber.trim()) guestErrors.idNumber = 'ID number is required.';
      if (!guest.idFrontImage) guestErrors.idFrontImage = 'Front ID image is required.';
      if (!guest.idBackImage) guestErrors.idBackImage = 'Back ID image is required.';
      if (Object.keys(guestErrors).length > 0) {
        secondaryGuestErrors[index] = guestErrors;
      }
    });

    if (Object.keys(secondaryGuestErrors).length > 0) {
      newErrors.secondaryGuests = secondaryGuestErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const bookingId = `KI-${Date.now().toString(36).toUpperCase()}`;
      
      console.log('Submitting Form Data:', { bookingId, ...formData });

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setSubmittedBookingId(bookingId);
      }, 2000);
    }
  };

  const handleAddNewRegistration = () => {
    setFormData(initialFormData);
    setSubmittedBookingId(null);
    setErrors({});
  };

  if (submittedBookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all duration-500 scale-100">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4"/>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Registration Successful!</h2>
            <p className="text-slate-600 mb-6">The guest registration has been submitted successfully.</p>
            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-500">Booking ID</p>
                <p className="text-xl font-mono font-bold text-teal-600 tracking-wider">{submittedBookingId}</p>
            </div>
            <button
                onClick={handleAddNewRegistration}
                className="mt-8 w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-colors duration-300"
            >
                Add New Registration
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <Section title="Booking & Room Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Check-in Date"
                name="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={handleInputChange}
                error={errors.checkInDate}
                required
              />
              <SelectField
                label="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                options={ROOM_TYPES}
                required
              />
              <InputField
                label="Tariff (per night)"
                name="tariff"
                type="number"
                value={formData.tariff}
                onChange={handleInputChange}
                error={errors.tariff}
                placeholder="e.g., 2500"
                required
              />
            </div>
          </Section>

          <Section title="Primary Guest Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="primaryGuestName" value={formData.primaryGuestName} onChange={handleInputChange} error={errors.primaryGuestName} placeholder="Enter full name" required/>
              <InputField label="Phone Number" name="primaryGuestPhone" type="tel" value={formData.primaryGuestPhone} onChange={handleInputChange} error={errors.primaryGuestPhone} placeholder="10-digit mobile number" required/>
              <InputField label="Email Address (Optional)" name="primaryGuestEmail" type="email" value={formData.primaryGuestEmail} onChange={handleInputChange} error={errors.primaryGuestEmail} placeholder="example@email.com"/>
              <div className="md:col-span-2">
                 <label htmlFor="primaryGuestAddress" className="block text-sm font-medium text-slate-700 mb-1">Full Address <span className="text-red-500">*</span></label>
                 <textarea id="primaryGuestAddress" name="primaryGuestAddress" value={formData.primaryGuestAddress} onChange={handleInputChange} rows={3} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition ${errors.primaryGuestAddress ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-teal-500'}`} placeholder="Enter full address"></textarea>
                 {errors.primaryGuestAddress && <p className="text-red-500 text-xs mt-1">{errors.primaryGuestAddress}</p>}
              </div>
              <SelectField label="ID Type" name="primaryGuestIdType" value={formData.primaryGuestIdType} onChange={handleInputChange} options={ID_TYPES} required/>
              <InputField label="ID Number" name="primaryGuestIdNumber" value={formData.primaryGuestIdNumber} onChange={handleInputChange} error={errors.primaryGuestIdNumber} placeholder="Enter ID number" required/>
              <FileUploadField label="ID - Front Image" name="primaryGuestIdFrontImage" file={formData.primaryGuestIdFrontImage} onChange={handleFileChange} error={errors.primaryGuestIdFrontImage} required/>
              <FileUploadField label="ID - Back Image" name="primaryGuestIdBackImage" file={formData.primaryGuestIdBackImage} onChange={handleFileChange} error={errors.primaryGuestIdBackImage} required/>
            </div>
          </Section>

          <Section title="Secondary Guest Information">
            <div className="space-y-8">
              {formData.secondaryGuests.map((guest, index) => (
                <div key={guest.id} className="p-4 border border-slate-200 rounded-lg relative bg-slate-50/50">
                   <h3 className="text-lg font-semibold text-slate-700 mb-4">Secondary Guest {index + 1}</h3>
                   <button type="button" onClick={() => removeSecondaryGuest(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors">
                     <TrashIcon/>
                   </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Full Name" name="name" value={guest.name} onChange={e => handleSecondaryGuestChange(index, e)} error={errors.secondaryGuests?.[index]?.name} placeholder="Enter full name" required/>
                        <div/>
                        <SelectField label="ID Type" name="idType" value={guest.idType} onChange={e => handleSecondaryGuestChange(index, e)} options={ID_TYPES} required/>
                        <InputField label="ID Number" name="idNumber" value={guest.idNumber} onChange={e => handleSecondaryGuestChange(index, e)} error={errors.secondaryGuests?.[index]?.idNumber} placeholder="Enter ID number" required/>
                        <FileUploadField label="ID - Front Image" name="idFrontImage" file={guest.idFrontImage} onChange={e => handleSecondaryGuestFileChange(index, e)} error={errors.secondaryGuests?.[index]?.idFrontImage} required/>
                        <FileUploadField label="ID - Back Image" name="idBackImage" file={guest.idBackImage} onChange={e => handleSecondaryGuestFileChange(index, e)} error={errors.secondaryGuests?.[index]?.idBackImage} required/>
                    </div>
                </div>
              ))}
            </div>
             <button type="button" onClick={addSecondaryGuest} className="mt-4 flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-800 transition-colors">
               <PlusIcon/> Add New Secondary Guest
             </button>
          </Section>

          <div className="flex justify-end pt-6 border-t">
            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 disabled:bg-teal-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
