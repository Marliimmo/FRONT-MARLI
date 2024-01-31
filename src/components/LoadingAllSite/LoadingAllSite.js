import React from 'react';
import styles from "./LoadingAllSite.module.scss";
import Logo from "../../assets/images/marli-logo.png";

function LoadingAllSite() {
  return (
    <div className={styles.allContainer}>
        <p className={styles.logo}><img src={Logo} alt="marli logo" /></p>
    </div>
  )
}

export default LoadingAllSite