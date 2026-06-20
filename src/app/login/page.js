'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (password === 'estrella123') {
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      router.push('/admin/productos');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={handleLogin}>
        <div className={styles.logoArea}>
          <img src="/images/logo.png" alt="Desechables Estrella" />
          <h1 className={styles.title}>
            DESECHABLES <span className={styles.titleAccent}>ESTRELLA</span>
          </h1>
          <p className={styles.subtitle}>Panel de Administración</p>
        </div>
        
        <div className={styles.divider}></div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label className={styles.label}>Contraseña</label>
          <input 
            type="password" 
            className={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Introduce tu contraseña"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Entrar</button>
      </form>
    </div>
  );
}
