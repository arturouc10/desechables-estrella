'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import type { ContactFormData } from '@/types';

export default function ContactoPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    tel: '',
    comen: '',
  });
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nombre) {
      alert('FAVOR DE ESCRIBIR TU NOMBRE');
      return;
    }
    if (!formData.email) {
      alert('FAVOR DE ESCRIBIR TU CORREO ELECTRONICO');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('ESCRIBE UNA DIRECCIÓN DE CORREO VÁLIDA');
      return;
    }
    if (!formData.tel) {
      alert('FAVOR DE ESCRIBIR TU TELÉFONO');
      return;
    }
    if (!formData.comen) {
      alert('FAVOR DE ESCRIBIR TU COMENTARIO');
      return;
    }

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', tel: '', comen: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#173c66', fontWeight: 'bold', marginBottom: '1rem' }}>
            Contáctanos
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            ¡Estamos aquí para ayudarte! Déjanos tus datos y un mensaje, y nos pondremos en contacto contigo lo antes posible.
          </p>
        </div>

        {status === 'success' && (
          <div style={{ background: '#ecfdf5', color: '#059669', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '2rem', border: '1px solid #34d399' }}>
            <strong>¡Gracias!</strong> Su mensaje ha sido enviado correctamente.
          </div>
        )}
        {status === 'error' && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '2rem', border: '1px solid #f87171' }}>
            Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          {/* Columna de Información */}
          <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#173c66', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📍 Dirección
              </h3>
              <a href="https://maps.app.goo.gl/FvGz7ZaxvvQYnoJ18" target="_blank"><p style={{ color: '#4b5563', lineHeight: '1.5' }}>
                Calle Abeja 1142<br />
                Mercado de Abastos<br />
                Guadalajara, Jalisco C.P. 44530
              </p></a>
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#173c66', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📞 Teléfonos
              </h3>
              <p style={{ color: '#4b5563', lineHeight: '1.5' }}>
                (33) 3671 3542<br />
                (33) 3671 5104
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#173c66', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✉️ Correo Electrónico
              </h3>
              <p style={{ color: '#eb2c29', fontWeight: '500' }}>
                desechables_laestrella@hotmail.com
              </p>
            </div>

            <div style={{ marginTop: '1rem', borderRadius: '0.5rem', overflow: 'hidden', height: '150px' }}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com.mx/maps?f=q&source=s_q&hl=es&geocode=&q=Abeja+1142,+Comercial+Abastos,+Guadalajara,+Jalisco&aq=0&sll=23.625269,-102.540613&sspn=31.162682,39.506836&vpsrc=0&ie=UTF8&hq=&hnear=Abeja+1142,+Guadalajara,+Jalisco&t=m&z=14&ll=20.657239,-103.382687&output=embed"
                title="Mapa de ubicación"
              />
            </div>
          </div>

          {/* Columna de Formulario */}
          <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="nombre" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>Correo Electrónico *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label htmlFor="tel" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>Teléfono *</label>
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                  placeholder="10 dígitos"
                />
              </div>

              <div>
                <label htmlFor="comen" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>Mensaje *</label>
                <textarea
                  name="comen"
                  id="comen"
                  rows={4}
                  value={formData.comen}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
                  placeholder="¿En qué te podemos ayudar?"
                />
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '1rem', background: '#eb2c29', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.3s', marginTop: '0.5rem' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#c21e1b'}
                onMouseOut={(e) => e.currentTarget.style.background = '#eb2c29'}
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout >
  );
}
