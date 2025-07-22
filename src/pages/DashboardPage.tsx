import React, { useEffect, useState } from 'react';
import { addHelicopter, getHelicopters, deleteHelicopter } from '../lib/helicopterService';
import { Helicopter } from '../types';

const initialForm = {
  name: '',
  model: '',
  manufacturer: '',
  capacity: 1,
  pricePerHour: 0,
  image: '',
  description: '',
};

const DashboardPage: React.FC = () => {
  const [helicopters, setHelicopters] = useState<Helicopter[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const fetchHelicopters = async () => {
    setLoading(true);
    const data = await getHelicopters();
    setHelicopters(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHelicopters();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'capacity' ? Number(value) : name === 'pricePerHour' ? Number(value) : value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newHelicopter: Omit<Helicopter, 'id'> = {
      name: form.name,
      model: form.model,
      manufacturer: form.manufacturer,
      capacity: form.capacity,
      pricePerHour: form.pricePerHour,
      images: [form.image],
      features: [],
      specifications: { maxSpeed: '', range: '', ceiling: '', engines: '' },
      availability: true,
      location: '',
      description: form.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await addHelicopter(newHelicopter);
    setForm(initialForm);
    fetchHelicopters();
  };

  const handleDelete = async (id: string) => {
    await deleteHelicopter(id);
    fetchHelicopters();
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Helicopter Dashboard</h1>
      <form onSubmit={handleAdd} className="mb-8 space-y-4 bg-white p-6 rounded shadow">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" className="w-full p-2 border rounded" required />
        <input name="manufacturer" value={form.manufacturer} onChange={handleChange} placeholder="Manufacturer" className="w-full p-2 border rounded" required />
        <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} placeholder="Capacity" className="w-full p-2 border rounded" required />
        <input name="pricePerHour" type="number" min="0" value={form.pricePerHour} onChange={handleChange} placeholder="Price Per Hour" className="w-full p-2 border rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Helicopter</button>
      </form>
      <h2 className="text-xl font-semibold mb-4">All Helicopters</h2>
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-4">
          {helicopters.map(h => (
            <li key={h.id} className="flex items-center justify-between bg-gray-50 p-4 rounded shadow">
              <div>
                <div className="font-bold">{h.name} ({h.model})</div>
                <div className="text-sm text-gray-600">{h.manufacturer} | Capacity: {h.capacity}</div>
                <div className="text-sm text-gray-800">${h.pricePerHour} / hour</div>
                <div className="text-sm text-gray-600">{h.description}</div>
                {h.images && h.images[0] && <img src={h.images[0]} alt={h.name} className="w-32 mt-2 rounded" />}
              </div>
              <button onClick={() => handleDelete(h.id!)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;
