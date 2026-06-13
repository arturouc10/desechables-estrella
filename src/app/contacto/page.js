'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tel: '',
    comen: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      {status === 'success' && (
        <div className="alert-success">¡Su mensaje ha sido enviado!</div>
      )}
      {status === 'error' && (
        <div className="alert-error">Error al enviar el mensaje. Inténtelo de nuevo.</div>
      )}

      <div className="contact-layout">
        <div className="contact-info">
          <p className="titulo">CONTACTO</p>
          <p>¡Contáctanos y con gusto te atenderemos!</p>
          <p>
            Calle Abeja 1142<br />
            Mercado de Abastos<br />
            Guadalajara, Jalisco C.P. 44530
          </p>
          <p>Tel. (33) 3671 3542 / (33) 3671 5104</p>
          <p className="titulo">desechables_laestrella@hotmail.com</p>
        </div>

        <div className="contact-form-area">
          <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
            <label htmlFor="nombre">Nombre:*</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="detalles"
            />

            <label htmlFor="email">E-mail:*</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="detalles"
            />

            <label htmlFor="tel">Teléfono:*</label>
            <input
              type="tel"
              name="tel"
              id="tel"
              value={formData.tel}
              onChange={handleChange}
              className="detalles"
            />

            <label htmlFor="comen">Mensaje:*</label>
            <textarea
              name="comen"
              id="comen"
              rows="5"
              value={formData.comen}
              onChange={handleChange}
              className="detalles"
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="required-note">Campos Obligatorios: *</span>
              <button type="submit" className="btn-submit" id="btn-enviar">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', marginTop: '20px' }}>
          <iframe
            width="295"
            height="100"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com.mx/maps?f=q&source=s_q&hl=es&geocode=&q=Abeja+1142,+Comercial+Abastos,+Guadalajara,+Jalisco&aq=0&sll=23.625269,-102.540613&sspn=31.162682,39.506836&vpsrc=0&ie=UTF8&hq=&hnear=Abeja+1142,+Guadalajara,+Jalisco&t=m&z=14&ll=20.657239,-103.382687&output=embed"
            title="Mapa de ubicación"
          />
          <Image
            src="/images/contactame.JPG"
            alt="Contáctame"
            width={334}
            height={102}
          />
        </div>
      </div>
    </PageLayout>
  );
}
