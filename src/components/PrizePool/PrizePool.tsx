import styles from './PrizePool.module.scss'

export default function PrizePool() {
  const prizes = [
    {
      rank: 'Top 3',
      amount: '₹50,000',
      icon: '🏆',  // updated icon
      perks: 'Cash Prize + Swags + Certificates',
      className: 'first'
    },
    {
      rank: 'Top 10',
      icon: '✨', // cleaner top 10 emblem
      perks: 'Swags + Certificates',
      className: 'second'
    },
    {
      rank: 'All Participants',
      icon: '🎉', // universal positive icon
      perks: 'Certificates',
      className: 'third'
    }
  ]

  return (
    <section id="prizes" className="section">
      <div className="container">
        
        <div className="dual-heading">
          <h2 className="heading-front">Win Amazing Prizes</h2>
        </div>

        <div className={styles['prize-pool__container']}>

          <div className={styles['prize-pool__prizes']}>
            {prizes.map((prize, index) => (
              <div 
                key={index}
                className={`${styles['prize-pool__prize']} ${styles[prize.className]}`}
              >
                <div className={styles['prize-pool__prize-icon']}>
                  {prize.icon}
                </div>

                <div className={styles['prize-pool__prize-rank']}>
                  {prize.rank}
                </div>

                {prize.amount && (
                  <div className={styles['prize-pool__prize-amount']}>
                    {prize.amount}
                  </div>
                )}

                <div className={styles['prize-pool__prize-perks']}>
                  {prize.perks}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
