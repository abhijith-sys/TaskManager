import React from 'react'
import styles from "./Header.module.css";
import defaultAvatarImage from "../../assets/avather.svg";
import dropIcon from '../../assets/drop.svg'
const Header = () => {
  return (
    <div className={styles.headerContainer}>
       <img src={defaultAvatarImage} alt="Avatar" className={styles.avatar} />
      <span className={styles.userName}>David Nowak</span>
      <img src={dropIcon} alt="button"  className={styles.dropBtn}/>
      
    </div>
  )
}

export default Header
