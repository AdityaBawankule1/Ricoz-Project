import { useState } from 'react';

const BookingForm = ({ trainer, onCancel }) => {
  const currentUser = JSON.parse(localStorage.getItem('kindPawsUser') || '{}');
  const [formData, setFormData] = useState({
    dogName: '',
    date: '',
    time: '',
    notes: '',
    petOwnerName: currentUser.name || '',
    petOwnerEmail: currentUser.email || ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainerId: trainer.id,
          trainerName: trainer.name,
          petOwnerId: currentUser._id || null,
          petOwnerName: formData.petOwnerName,
          petOwnerEmail: formData.petOwnerEmail,
          dogName: formData.dogName,
          date: formData.date,
          time: formData.time,
          notes: formData.notes.trim(),
          service: trainer.speciality
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save booking');
      }

      setStatus('Consultation request saved successfully. We will contact you shortly.');
      setFormData((previous) => ({ ...previous, dogName: '', date: '', time: '', notes: '' }));
    } catch (error) {
      setStatus(error.message || 'Unable to save booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-3xl bg-gray-50 p-6">
      <h2 className="text-2xl font-bold">Book a Consultation</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-gray-700">
            Dog name
            <input
              required
              name="dogName"
              value={formData.dogName}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
              placeholder="Buddy"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Consultation date
            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Consultation time
            <input
              required
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Pet owner name
            <input
              required
              name="petOwnerName"
              value={formData.petOwnerName}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
        </div>
        <label className="block text-sm font-semibold text-gray-700">
          Email address
          <input
            required
            type="email"
            name="petOwnerEmail"
            value={formData.petOwnerEmail}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </label>
        <label className="block text-sm font-semibold text-gray-700">
          Notes about your dog
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 min-h-24 w-full rounded-xl border border-gray-300 px-4 py-3"
            placeholder="Tell the trainer about your dog's needs"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save Consultation'}
          </button>
          <button type="button" onClick={onCancel} className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700">
            Cancel
          </button>
        </div>
        {status && (
          <p className={`rounded-xl px-4 py-3 text-sm ${status.includes('successfully') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
