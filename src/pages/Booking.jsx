import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
const SERVICE_DURATIONS = {
  // SLOVENSKO
  "Moško striženje": 30,
  "Žensko striženje in fen frizura": 60,
  "Fen frizura": 45,
  "Barvanje, striženje in fen frizura": 150,
  "Prameni, striženje in fen frizura": 240,
  "Toniranje las in fen frizura": 60,
  
  // ITALIANO
  "Taglio uomo": 30,
  "Taglio donna e piega": 60,
  "Lavaggio e piega": 45,
  "Colore, taglio e piega": 150,
  "Colpi di sole, taglio e piega": 240,
  "Tonalizzante e piega": 60
};

// v minutah od polnoči: 08:00 do 20:00
const OPENING_TIME = 8 * 60;  
const CLOSING_TIME = 20 * 60; 

const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

const minutesToTime = (mins) => {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const Booking = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  
  const [bookingData, setBookingData] = useState({
    service: '',
    expert: '',
    date: '',
    time: '',
    name: '',
    phone: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const handleSelect = (field, value) => {
    if (field === 'date' || field === 'expert' || field === 'service') {
        setBookingData(prev => ({ ...prev, [field]: value, time: '' }));
    } else {
        setBookingData(prev => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    // Ko pridemo na korak 3 in imamo vse potrebne podatke, izračunamo proste ure
    if (step === 3 && bookingData.date && bookingData.expert && bookingData.service) {
        fetchAvailableSlots();
    }
  }, [bookingData.date, bookingData.expert, bookingData.service, step]); 

  const fetchAvailableSlots = async () => {
      setLoadingSlots(true);
      try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/zasedenost?date=${bookingData.date}&expert=${bookingData.expert}`);
          const bookedData = await res.json();

          const bookedIntervals = bookedData.map(b => {
              const startMin = timeToMinutes(b.time);
              const duration = SERVICE_DURATIONS[b.service] || 60; 
              return { start: startMin, end: startMin + duration };
          });

          const myDuration = SERVICE_DURATIONS[bookingData.service] || 60;

          const slots = [];
          for (let time = OPENING_TIME; time <= CLOSING_TIME - myDuration; time += 30) {
              const myStart = time;
              const myEnd = time + myDuration;

              const isOverlapping = bookedIntervals.some(b => {
                  return (myStart < b.end && myEnd > b.start);
              });

              if (!isOverlapping) {
                  slots.push(minutesToTime(time));
              }
          }

          setAvailableSlots(slots);
      } catch (err) {
          console.error("Napaka pri nalaganju prostih terminov:", err);
      }
      setLoadingSlots(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rezervacija`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setStep(4);
      } else {
        alert(t.bookingPage.errorServer);
      }
    } catch (error) {
      console.error("Napaka:", error);
      alert(t.bookingPage.errorConnection);
    }
  };

  return (
    <div className="page-wrapper bg-white">
      <section className="booking-section">
        <div className="booking-container">
          
          <div className="booking-header">
            <h1 className="section-title">{t?.bookingPage?.title || "Rezervacija"}</h1>
            <p className="offers-intro">{t?.bookingPage?.subtitle || "Izberite storitev in termin"}</p>
          </div>

          <div className="booking-box">
            
            {step === 1 && (
              <div className="booking-step animate-fade-in">
                <h3 className="booking-step-title">{t?.bookingPage?.step1Title}</h3>
                <div className="booking-options">
                  {t?.bookingPage?.serviceList.map((item) => (
                    <button 
                      key={item}
                      className={`booking-option-btn ${bookingData.service === item ? 'active' : ''}`}
                      onClick={() => handleSelect('service', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button 
                  className="career-btn mt-40" 
                  disabled={!bookingData.service}
                  onClick={() => setStep(2)}
                >
                  {t?.bookingPage?.nextBtn}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step animate-fade-in">
                <h3 className="booking-step-title">{t?.bookingPage?.step2Title}</h3>
                <div className="booking-options">
                  {t?.bookingPage?.expertList?.map((item) => (
                    <button 
                      key={item}
                      className={`booking-option-btn ${bookingData.expert === item ? 'active' : ''}`}
                      onClick={() => handleSelect('expert', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="booking-nav-buttons mt-40">
                  <button className="back-btn" onClick={() => setStep(1)}>{t?.bookingPage?.backBtn}</button>
                  <button 
                    className="career-btn" 
                    disabled={!bookingData.expert}
                    onClick={() => setStep(3)}
                  >
                    {t?.bookingPage?.nextBtn}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="booking-step animate-fade-in">
                <h3 className="booking-step-title">{t?.bookingPage?.step3Title}</h3>
                
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t?.bookingPage?.labelDate}</label>
                      <input 
                        type="date" 
                        required 
                        value={bookingData.date}
                        onChange={(e) => handleSelect('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]} 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>{t?.bookingPage?.labelTime}</label>
                      <select 
                        required
                        value={bookingData.time}
                        onChange={(e) => handleSelect('time', e.target.value)}
                        disabled={!bookingData.date || loadingSlots}
                        style={{ backgroundColor: (!bookingData.date || loadingSlots) ? '#f5f5f5' : '#fff' }}
                      >
                        <option value="">
                          {!bookingData.date 
                            ? "..." 
                            : loadingSlots 
                              ? "Nalagam proste termine..." 
                              : (availableSlots.length === 0 ? "Ni prostih terminov" : t?.bookingPage?.placeholderTime)}
                        </option>
                        
                        {availableSlots.map(timeSlot => (
                            <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t?.bookingPage?.labelName}</label>
                      <input 
                        type="text" 
                        required 
                        placeholder={t?.bookingPage?.placeholderName}
                        value={bookingData.name}
                        onChange={(e) => handleSelect('name', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t?.bookingPage?.labelPhone}</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder={t?.bookingPage?.placeholderPhone}
                        value={bookingData.phone}
                        onChange={(e) => handleSelect('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="booking-nav-buttons mt-40">
                    <button type="button" className="back-btn" onClick={() => setStep(2)}>{t?.bookingPage?.backBtn}</button>
                    <button type="submit" className="career-btn" disabled={!bookingData.time}>{t?.bookingPage?.submitBtn}</button>
                  </div>
                </form>
              </div>
            )}

            {step === 4 && (
              <div className="booking-step success-step animate-fade-in">
                <h3 className="booking-step-title" style={{ color: '#d5c5b3' }}>
                    {t?.bookingPage?.successTitle} {bookingData.name}!
                </h3>
                <p>
                    {t?.bookingPage?.successMsgPart1} <strong>{bookingData.service}</strong> {t?.bookingPage?.successMsgPart2}
                </p>
                <p className="mt-20">{t?.bookingPage?.successNote}</p>
                <button className="career-btn mt-40" onClick={() => window.location.href='/'}>
                    {t?.bookingPage?.backHomeBtn}
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;