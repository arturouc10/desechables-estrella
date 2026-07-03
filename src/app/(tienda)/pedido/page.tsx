'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';

export default function PedidoPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const handleSendWhatsApp = () => {
    let message = `Hola, soy ${customerName || 'un cliente'}. Me gustaría hacer el siguiente pedido:\n\n`;
    
    cart.forEach(item => {
      message += `- ${item.quantity} x ${item.name} ($${item.price} c/u)\n`;
    });
    
    message += `\nTotal aproximado: $${getCartTotal().toFixed(2)} MXN\n\n`;
    message += `(Generado desde el catálogo web)`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    setOrderSent(true);
  };

  if (orderSent) {
    return (
      <PageLayout>
        <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
          <h1 style={{ fontSize: '2.5rem', color: '#1B365D', marginBottom: '20px' }}>¡Pedido enviado!</h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '30px', lineHeight: '1.6' }}>
            Tu mensaje se ha generado en WhatsApp exitosamente.<br/>
            <strong>Espero y el proceso siga por buen camino.</strong>
          </p>
          <Link href="/productos" className="btn-clear-filters" style={{ display: 'inline-block', padding: '12px 24px', fontSize: '1.1rem' }}>
            Volver al catálogo
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (cart.length === 0) {
    return (
      <PageLayout>
        <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', color: '#1B365D', marginBottom: '20px' }}>Tu Pedido</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>Aún no has agregado productos a tu pedido.</p>
          <Link href="/productos" className="btn-clear-filters" style={{ display: 'inline-block' }}>
            Ir al catálogo
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1B365D', marginBottom: '20px', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>
          Revisar Pedido
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ width: '80px', height: '80px', position: 'relative', flexShrink: 0, borderRadius: '4px', overflow: 'hidden' }}>
                <Image 
                  src={item.image || '/images/placeholder.jpg'} 
                  alt={item.name} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333' }}>{item.name}</h3>
                <p style={{ margin: 0, color: '#666', fontWeight: 'bold' }}>${item.price} MXN</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer', fontSize: '16px' }}
                >-</button>
                <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer', fontSize: '16px' }}
                >+</button>
              </div>

              <div style={{ marginLeft: '10px' }}>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.5rem' }}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '1.2rem' }}>
            <span>Total aproximado:</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#10b981' }}>${getCartTotal().toFixed(2)} MXN</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>Tu Nombre (Opcional)</label>
            <input 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej. Juan Pérez"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>

          <button 
            onClick={handleSendWhatsApp}
            style={{ width: '100%', padding: '15px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
          >
            <span>📱</span> Enviar pedido por WhatsApp
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', marginTop: '10px' }}>
            Se abrirá WhatsApp para que confirmes y envíes el mensaje.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
