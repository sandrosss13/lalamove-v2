'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    title: 'ავეჯის გადაზიდვა',
    description: 'დივანი და მაგიდა',
    pickupAddress: 'თბილისი, ჭავჭავაძის 1',
    dropoffAddress: 'ქუთაისი, რუსთაველის 5',
    distanceKm: 230,
    clientId: 1,
  });

  const [response, setResponse] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // დროებითი სიმულაცია SQLite-ის გარეშე, რომ Vercel-მა იმუშაოს
    setResponse({
      success: true,
      message: 'შეკვეთა წარმატებით შეიქმნა! (Front-end Demo)',
      order: {
        id: Math.floor(Math.random() * 1000),
        ...formData,
        totalPrice: `${formData.distanceKm * 1} ₾`,
        createdAt: new Date().toISOString(),
      },
    });
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🚚 Lalamove - შეკვეთის გაგზავნა</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="სათაური"
          style={{ padding: '8px' }}
        />
        <input 
          type="text" 
          value={formData.pickupAddress} 
          onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}
          placeholder="A პუნქტი"
          style={{ padding: '8px' }}
        />
        <input 
          type="text" 
          value={formData.dropoffAddress} 
          onChange={(e) => setFormData({...formData, dropoffAddress: e.target.value})}
          placeholder="B პუნქტი"
          style={{ padding: '8px' }}
        />
        <label>
          მანძილი (კმ):
          <input 
            type="number" 
            value={formData.distanceKm} 
            onChange={(e) => setFormData({...formData, distanceKm: Number(e.target.value)})}
            style={{ padding: '8px', marginLeft: '10px' }}
          />
        </label>

        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#0070f3' }}>
          💰 ჯამური ფასი: {formData.distanceKm * 1} ₾ (1 კმ = 1 ₾)
        </p>

        <button type="submit" style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          შეკვეთის გაგზავნა
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#e0ffe0', borderRadius: '5px' }}>
          <h3>✅ პასუხი API-დან:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}