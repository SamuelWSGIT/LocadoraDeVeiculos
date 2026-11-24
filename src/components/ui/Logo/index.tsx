import { Link } from 'react-router-dom'
import styles from './index.module.css'

type LogoProps = { inverse?: boolean }

/** Logo oficial exportado do Figma, reutilizado no cabeçalho e no rodapé. */
export function Logo({ inverse = false }: LogoProps) {
  const logoSource = inverse ? '/images/brand/logo-footer.png' : '/images/brand/logo.png'

  return <Link className={`${styles.logo} ${inverse ? styles.logoInverse : ''}`} to="/" aria-label="Hermex, início"><img alt="" src={logoSource} /></Link>
}
