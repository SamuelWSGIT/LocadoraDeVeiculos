import styles from './index.module.css'

export function BrandBanner() {
  return (
    <section className={styles.banner} aria-labelledby="banner-title">
      <h1 id="banner-title"><span>Encontre o carro<br />ideal</span> para todas<br />as ocasiões</h1>
      <img
        alt="Motorista ao volante de um Volvo XC60 branco"
        fetchPriority="high"
        height={724}
        src="/images/brand/banner-volvo-xc60.png"
        width={2172}
      />
    </section>
  )
}
