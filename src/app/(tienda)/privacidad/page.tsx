import PageLayout from '@/components/PageLayout';

export const metadata = {
  title: 'Aviso de Privacidad | Desechables la Estrella',
  description: 'Aviso de privacidad de Desechables la Estrella, de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
};

export default function PrivacidadPage() {
  return (
    <PageLayout>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="titulo" style={{ fontSize: '32px', marginBottom: '1rem' }}>Aviso de Privacidad</h1>
      </div>

      <div style={{ maxWidth: '900px', margin: '2rem auto', fontSize: '16px', color: '#334155', lineHeight: '1.8', background: '#fff', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        
        <p style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>Última actualización: {new Date().toLocaleDateString('es-MX')}</p>

        <p style={{ marginBottom: '1.5rem' }}>
          En <strong>Desechables La Estrella</strong> (en adelante "El Responsable"), con domicilio en Calle Abeja 1142 Mercado de Abastos Guadalajara, Jalisco C.P. 44530, estamos comprometidos con la protección de sus datos personales, siendo responsables de su uso, manejo y confidencialidad, y al respecto le informamos lo siguiente:
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#173c66', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          1. ¿Para qué fines utilizaremos sus datos personales?
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
          <li>Proveer los productos y servicios que ha solicitado (cotizaciones, pedidos).</li>
          <li>Contacto para atención a clientes y seguimiento de sus solicitudes.</li>
          <li>Fines de facturación y cobranza.</li>
          <li>Evaluar la calidad del servicio que le brindamos.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', color: '#173c66', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          2. ¿Qué datos personales recabamos y utilizamos sobre usted?
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
          <li>Nombre completo o Razón Social.</li>
          <li>Correo electrónico.</li>
          <li>Número de teléfono (fijo o celular).</li>
          <li>Cualquier otra información que usted decida compartir en nuestros formularios de contacto.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', color: '#173c66', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          3. ¿Cómo puede Acceder, Rectificar o Cancelar sus datos personales, u Oponerse a su uso (Derechos ARCO)?
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del siguiente correo electrónico: <a href="mailto:desechables_laestrella@hotmail.com" style={{ color: '#eb2c29', textDecoration: 'underline' }}>desechables_laestrella@hotmail.com</a>.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#173c66', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          4. ¿Cómo puede conocer los cambios en este aviso de privacidad?
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas. Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad mediante la publicación en esta misma página.
        </p>

        <p style={{ marginTop: '3rem', fontStyle: 'italic', color: '#64748b' }}>
          Si usted considera que su derecho a la protección de sus datos personales ha sido lesionado por alguna conducta u omisión de nuestra parte, o presume alguna violación a las disposiciones previstas en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, podrá interponer su inconformidad o denuncia ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
        </p>
      </div>
    </PageLayout>
  );
}
