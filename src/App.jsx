import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import CurrencyRates from './CurrencyRates';

function App() {
  const [count, setCount] = useState(0)
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const API_KEY = '2643ea30635b4360b72b632e3e6079d2'; 

    useEffect(() => {
      // Mengambil data dari API
      const fetchRates = async () => {
          try {
              const response = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=2643ea30635b4360b72b632e3e6079d2');
              const data = await response.json(); 
              console.log(data)
              setRates(data.rates);
              setLoading(false);
          } catch (error) {
              console.error("Error fetching currency rates", error);
              setLoading(false);
          }
      };
      fetchRates();
  }, []);

  const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

    // Fungsi untuk menghitung "We Buy" dan "We Sell" dengan mengonversi nilai string ke number
    const calculateRates = (exchangeRateStr) => {
        const exchangeRate = parseFloat(exchangeRateStr);
        const weBuy = (exchangeRate * 1.05).toFixed(4); // 5% lebih besar dari Exchange Rate
        const weSell = (exchangeRate * 0.95).toFixed(4); // 5% lebih kecil dari Exchange Rate
        return { weBuy, weSell };
    };

  return (
    <>
      <div style={{ backgroundColor: 'orange', padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Currency Exchange Rates (Based on 1 USD)</h2>
      {loading ? (
        <p style={{ textAlign: 'center', color: 'white' }}>Loading rates...</p>
      ) : (
        <table
          border="1"
          style={{ margin: '0 auto', borderCollapse: 'collapse', color: 'white', backgroundColor: 'black' }}
        >
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid white' }}>Currency</th>
              <th style={{ padding: '10px', border: '1px solid white' }}>We Buy</th>
              <th style={{ padding: '10px', border: '1px solid white' }}>Exchange Rate</th>
              <th style={{ padding: '10px', border: '1px solid white' }}>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              const exchangeRateStr = rates[currency];
              const { weBuy, weSell } = calculateRates(exchangeRateStr);

              return (
                <tr key={currency}>
                  <td style={{ padding: '10px', border: '1px solid white' }}>{currency}</td>
                  <td style={{ padding: '10px', border: '1px solid white' }}>{weBuy}</td>
                  <td style={{ padding: '10px', border: '1px solid white' }}>
                    {parseFloat(exchangeRateStr).toFixed(4)}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid white' }}>{weSell}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <p style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
        Rates are based from 1 USD.
        <br />
        This application uses API from <a href="https://currencyfreaks.com" style={{ color: 'white' }}>Currency Freaks</a>.
      </p>
    </div>
    </>
  )
}

export default App
