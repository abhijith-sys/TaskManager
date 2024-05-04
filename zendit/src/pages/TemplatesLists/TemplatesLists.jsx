import React, { useState } from 'react';
import styles from "./TemlatesLists.module.css"
import SearchInput from '../../components/common/SearchInput/SearchInput';
import TemplateTable from '../../components/TemplateTable/TemplateTable';
import {useNavigate } from 'react-router-dom';
import PathConstants from '../../router/PathConstants';






const TemlatesLists = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');



  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  const dummyData = [
    { id: 1, templateName: 'Template 1', templateType: 'Type A', createdBy: 'John', status: 'Active' },
    { id: 2, templateName: 'Template 2', templateType: 'Type B', createdBy: 'Jane', status: 'Inactive' },
    { id: 3, templateName: 'Template 3', templateType: 'Type C', createdBy: 'Doe', status: 'Active' },
    { id: 4, templateName: 'Template 4', templateType: 'Type D', createdBy: 'Smith', status: 'Inactive' },
    { id: 5, templateName: 'Template 5', templateType: 'Type E', createdBy: 'Alex', status: 'Active' },
  ];
  const handleEyeClick = (id) => {
    console.log('Clicked on eye icon for row with ID:', id);

    navigate(PathConstants.TEMPLATEADD);
  };

  const toTemplateAdd =()=>{
    navigate(PathConstants.TEMPLATEADD);
  }
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h4 className={styles.title}>Templates</h4>
        <div className={styles.addBtn} onClick={toTemplateAdd}>
          + Add new
        </div>
      </div>

      <div className={styles.bottomSection}>
      <SearchInput onInputChange={handleSearchInputChange} />
      <TemplateTable nodes={dummyData} onEyeClick={handleEyeClick}/>
      </div>
    </div>
  )
}

export default TemlatesLists