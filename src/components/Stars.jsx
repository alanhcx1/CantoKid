export default function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} of 3 stars`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= count ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  )
}
