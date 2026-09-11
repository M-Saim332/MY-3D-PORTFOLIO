import { useState } from 'react'

export default function HeroScene() {
  const [flipped, setFlipped] = useState(false)
  const [photos, setPhotos] = useState(['/photos/front.jpg', '/photos/back.jpg'])
  const [missing, setMissing] = useState([false, false])
  function selectPhoto(event, index) {
    const file = event.target.files?.[0]
    if (!file) return
    if (photos[index].startsWith('blob:')) URL.revokeObjectURL(photos[index])
    setPhotos(old => old.map((url, i) => i === index ? URL.createObjectURL(file) : url))
    setMissing(old => old.map((value, i) => i === index ? false : value))
  }
  return <div className="photo-card">
    <button className={`photo-flipper ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(value => !value)} aria-label="Flip profile photo" aria-pressed={flipped}>
      {[0, 1].map(index => <span key={index} className={`photo-face ${index ? 'photo-back' : ''}`}>
        {!missing[index] ? <img src={photos[index]} alt={`Muhammad Saim — ${index ? 'back' : 'front'} portrait`} onError={() => setMissing(old => old.map((value, i) => i === index ? true : value))} /> : <span className="photo-placeholder"><strong>{index ? 'Back portrait' : 'Front portrait'}</strong><small>Your photo goes here</small></span>}
        <span className="photo-caption">MUHAMMAD SAIM <span>TAP TO FLIP ↻</span></span>
      </span>)}
    </button>
    <div className="photo-selectors">{[0,1].map(index => <label key={index}>{index ? 'Back' : 'Front'} photo<input type="file" accept="image/*" onChange={event => selectPhoto(event,index)} /></label>)}</div>
  </div>
}
