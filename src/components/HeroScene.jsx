import { useEffect, useState } from 'react'

export default function HeroScene({ profile }) {
  const [flipped, setFlipped] = useState(false)
  const photos = [profile.frontPhoto, profile.backPhoto]
  const [missing, setMissing] = useState([false, false])

  useEffect(() => setMissing([false, false]), [profile.frontPhoto, profile.backPhoto])

  return <div className="photo-card">
    <button className={`photo-flipper ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(value => !value)} aria-label="Flip profile photo" aria-pressed={flipped}>
      {[0, 1].map(index => <span key={index} className={`photo-face ${index ? 'photo-back' : ''}`}>
        {!missing[index] && photos[index] ? <img src={photos[index]} alt={`${profile.name} — ${index ? 'back' : 'front'} portrait`} onError={() => setMissing(old => old.map((value, i) => i === index ? true : value))} /> : <span className="photo-placeholder"><strong>{index ? 'Back portrait' : 'Front portrait'}</strong><small>Add this photo in your CMS dashboard</small></span>}
        <span className="photo-caption">{profile.name.toUpperCase()} <span>TAP TO FLIP ↻</span></span>
      </span>)}
    </button>
  </div>
}
