import React from 'react';
import styles from './MilestoneListItem.module.css';
import deletIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import star from "../../assets/icons/star.svg";

const MilestoneListItem = ({ data }) => {
    //bind data  accodingly
  return (
    <div className={styles.mileStoneList}>
    <div className={styles.mileStoneContainer}>
      <div className={styles.mileStoneTopSecion}>
        <div className={styles.mileStoneNameContianer}>
          <span>Milestone name :</span>
          <div className={styles.mileStoneName}>
            <img src={star} alt="*" />
            <span className={styles.mileStoneNamealign}> Milestone1</span>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <img src={deletIcon} alt="delete"   className={styles.btn}/>
          <img src={editIcon} alt="edit" className={styles.btn} />
        </div>
      </div>
      <div className={styles.mileStoneSubSecion}>
        <span>Tasks :</span>
        <div className={styles.taskChipsConatiner}>
          <div className={styles.taskChip}>
            <div className={styles.taskIndexRound}>1</div>
            <span className={styles.taskNameSmall}>Task 1</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MilestoneListItem;
