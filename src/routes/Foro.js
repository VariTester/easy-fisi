import React from 'react';
import Side from '../components/home/sideContent/side/Side';
import Foro from '../components/home/mainContent/foro/Foro.jsx';

function Fororoute({ usuario }) {
  return (
    <main>
      <div className='container'>
        <section className='mainContent'>
          <Foro usuario={usuario} /> {/* ✅ PASAR usuario aquí */}
        </section>
        <section className='sideContent'>
          <Side />
        </section>
      </div>
    </main>
  );
}

export default Fororoute;
