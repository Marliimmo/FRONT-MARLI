import React from 'react';
import './Honoraires.module.scss';

function Honoraires() {
  return (
    <div className="conteneur-d-honoraires">
      <div className="container">
        <h1>NOS HONORAIRES TTC</h1>
        <p className="subtitle">Calculés sur le prix de vente à la charge du vendeur</p>
        
        <table>
          <thead>
            <tr>
              <th>TRANCHE DE PRIX</th>
              <th>HONORAIRES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt; 50 000 €</td>
              <td>Forfait de 5 000 €</td>
            </tr>
            <tr>
              <td>De 50 001 € à 99 999 €</td>
              <td>9%</td>
            </tr>
            <tr>
              <td>De 100 000 € à 149 999 €</td>
              <td>8%</td>
            </tr>
            <tr>
              <td>De 150 000 € à 249 999 €</td>
              <td>7%</td>
            </tr>
            <tr>
              <td>De 250 000 € à 349 999 €</td>
              <td>6%</td>
            </tr>
            <tr>
              <td>&gt; 350 000 €</td>
              <td>5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Honoraires;
