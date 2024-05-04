import React, { useState } from 'react';
import styles from "./AddMilestone.module.css"
import { TextField } from '@mui/material';
import closeIcon from "../../assets/icons/close.svg"

const AddMilestone = ({closeModal}) => {
    const [milestone, setMilestone] = useState("")
  return (
    <div className={styles.modalContent}>
    <div className={styles.modalheading} >
      <span className={styles.modalHeadingtext}>Add new milestone</span>

      <img className={styles.closeModal} src={closeIcon} alt="" onClick={closeModal} />


    </div>
    <div  className={styles.modalForm}>
      <div className={styles.modalField}>
        <span className={styles.title}>Milestone name <span className={styles.required}>*</span></span>
        <TextField
          className={styles.input}
          onChange={(event) => { setMilestone(event.target.value) }}
          value={milestone}
          id="outlined-password-input"
          placeholder="Please type "
          type="text"

        />
      </div>
      <div className={styles.submitSection}>
        <div className={styles.cancel } onClick={closeModal}>
          Cancel
        </div>
        <div className={styles.submit}>
          submit
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddMilestone
