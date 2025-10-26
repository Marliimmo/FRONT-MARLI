import React from 'react';
import './Honoraires.module.scss';

function Honoraires() {
  return (
    <div className="conteneur-d-honoraires">
      <div className="container">
        <div className="header">
          <h1>NOS HONORAIRES TTC</h1>
          <p className="subtitle">calculés sur le prix de vente à la charge du vendeur</p>
        </div>
        
        <div className="row">
          &lt; 50 000 € : forfait de 5 000 €
        </div>
        
        <div className="row">
          De 50 001 € à 99 999 € : 9%
        </div>
        
        <div className="row">
          De 100 000 € à 149 999 € : 8%
        </div>
        
        <div className="row">
          De 150 000 € à 249 999 € : 7%
        </div>
        
        <div className="row">
          De 250 000 € à 349 999 € : 6%
        </div>
        
        <div className="row">
          &gt; 350 000 € : 5%
        </div>
      </div>
    </div>
  );
}

export default Honoraires;
