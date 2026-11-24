import { Logo } from "../../../components/ui/Logo";
import styles from "./index.module.css";

/** Rodapé da página inicial com a mesma composição visual do frame do Figma. */
export function Footer() {
  return (
    <footer className={styles.siteFooter} id="contato">
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Logo inverse />
          <p>O carro ideal para sua ocasião</p>
        </div>
        <p>Desenvolvido por Samuel. Projeto fictício com fins educacionais.</p>
        <div className={styles.socialBlock}>
          <h2>Siga nossas redes:</h2>
          <nav aria-label="Redes sociais" className={styles.socialLinks}>
            <a
              aria-label="WhatsApp"
              href="https://www.whatsapp.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img alt="" src="/images/social/footer-whatsapp.png" />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img alt="" src="/images/social/footer-instagram.png" />
            </a>
            <a
              aria-label="TikTok"
              href="https://www.tiktok.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img alt="" src="/images/social/footer-tiktok.png" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
