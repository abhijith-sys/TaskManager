import React, { useState } from 'react';
import styles from "./AddTemplate.module.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form, ErrorMessage } from 'formik';
import ColorPicker from '../../components/common/ColorPicker/ColorPicker';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Popper } from '@mui/material';
import plusIcon from "../../assets/icons/plus.svg"
import deletIcon from "../../assets/icons/delete.svg"
import editIcon from "../../assets/icons/edit.svg"
import expandIcon from "../../assets/icons/expand.svg"
import star from "../../assets/icons/star.svg"

const AddTemplate = () => {
  const [selectedTemplate, setselectedTemplate] = useState("")


  const dummyMilestoneData = [

    {
      label: 'Milestone 1',

    },
    {
      label: 'Milestone 2',

    },
    {
      label: 'Milestone 3',

    },
    {
      label: 'Milestone 4',

    },
    {
      label: 'Milestone 5',

    },
    { label: "Add New" }
  ];

  const tasks = {
    "Milestone 1": ["Task1", "Task2", "Task3", "Task4", "Task5"],
    "Milestone 2": ["Task6", "Task7", "Task8"],
    "Milestone 3": ["Task9", "Task10"],
    "Milestone 4": ["Task11"],
    "Milestone 5": ["Task12", "Task13", "Task14", "Task15"]
  };
  const [hint, setHint] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h4 className={styles.title}>Add templates</h4>
      </div>
      <div className={styles.bottomSection}>
        <Formik
          initialValues={{
            templateType: '', templateName: '', progressColor: '#FFA500',
            completedColor: '#008000', delayedColor: '#FF0000',
            milestones: [{ name: '', tasks: [''] }]
          }}

          onSubmit={(values, { resetForm }) => {
            console.log(values);
            // You can perform submission logic here
            resetForm();
          }}

        >
          {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
            <Form>
              <div className={styles.firstSection} >
                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.inputField}>
                  <span className={styles.title}>Template type </span>
                  <Select
                    name="templateType"
                    placeholder="select"

                    value={values.templateType}
                    onChange={handleChange('templateType')}
                    onBlur={handleBlur('templateType')}
                    className={styles.dropdownWidth}
                  >
                    <MenuItem value=" " disabled className={styles.selectItems}>
                      select
                    </MenuItem>

                    <MenuItem value="option1" className={styles.selectItems}>Crane</MenuItem>
                    <MenuItem value="option2" className={styles.selectItems}>Installa</MenuItem>
                  </Select>
                  <ErrorMessage name="templateType" component="div" className={styles.error} />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.inputField}>
                  <span className={styles.title}>Template name </span>
                  <Select
                    name="templateName"
                    value={values.templateName}
                    onChange={handleChange('templateName')}
                    onBlur={handleBlur('templateName')}
                    className={styles.dropdownWidth}
                  >
                    <MenuItem value=" " disabled className={styles.selectItems}>
                      Please select
                    </MenuItem>

                    <MenuItem value="option1" className={styles.selectItems}>name  1</MenuItem>
                    <MenuItem value="option2" className={styles.selectItems}>name 2</MenuItem>
                  </Select>
                  <ErrorMessage name="templateType" component="div" className={styles.error} />
                </FormControl>
              </div>
              <div className={styles.secondSection} >
                {/* color pickers */}
                <span className={styles.title}>Colours </span>
                <div className={styles.secondSectionInputs}>
                  <ColorPicker defaultColor={values.progressColor} defaultText="Progressing colour" onColorChange={(color) => setFieldValue('progressColor', color)} />
                  <ColorPicker defaultColor={values.completedColor} defaultText="Completed colour" onColorChange={(color) => setFieldValue('completedColor', color)} />
                  <ColorPicker defaultColor={values.progressColor} defaultText="Delayed colour" onColorChange={(color) => setFieldValue('delayedColor', color)}
                  />
                </div>
              </div>
              <div className={styles.thirdSection}>
                <div className={styles.taskAddSection} >
                  <div className={styles.MilestoneFileds}>
                    <span className={styles.title}>MileStone name </span>
                    <Autocomplete

                      sx={{ height: '38px' }}
                      value={selectedTemplate}
                      onChange={(event, newValue) => {
                        setselectedTemplate(newValue ? newValue.label : '');
                        setHint(newValue ? newValue.label : '');
                      }}
                      inputValue={selectedTemplate}
                      options={dummyMilestoneData}
                      getOptionLabel={(option) => option.label}
                      filterOptions={(options, state) => {
                        const filteredOptions = options.filter((option) =>
                          option.label.toLowerCase().includes(state.inputValue.toLowerCase())
                        );
                        if (!filteredOptions.some(option => option.label === "Add New")) {
                          filteredOptions.push({ label: "Add New" });
                        }
                        return filteredOptions;
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={{ height: '0px' }}
                          {...params}
                          label=""
                          placeholder="please type"
                          onChange={(event) => {
                            setselectedTemplate(event.target.value)
                          }}
                          onBlur={() => setHint('')}
                          onKeyDown={(event) => {
                            if (event.key === 'Tab') {
                              setselectedTemplate(hint);
                              event.preventDefault();
                            }
                          }}
                        />
                      )}
                      renderOption={(props, option) => {
                        if (option.label === "Add New") {
                          return (
                            <div {...props} className={styles.addNewMilstone}>
                              <div className={styles.plusIcon}>
                                <img src={plusIcon} alt="+" srcset="" />
                              </div>
                              New milestone
                            </div>
                          );
                        } else {
                          return (
                            <div {...props} className={styles.dropDownContents}>
                              {option.label}
                            </div>
                          );
                        }
                      }}
                    // PopperComponent={({ children, ...popperProps }) => (
                    //   <Popper {...popperProps} placement="bottom-start" disablePortal style={{ zIndex: 1 }}>
                    //     {children}
                    //   </Popper>
                    // )}
                    />
                  </div>
                  <div className={styles.MilestoneFileds}>
                    <span className={styles.title}>Task name </span>
                    <TextField
                      className={styles.input}

                      id="outlined-password-input"
                      placeholder="Please type task name"
                      type="text"
                      
                    />
                  </div>
                  <div className={styles.addTask}>
                    Add task
                  </div>
                </div>
                {/* task list */}
                <div className={styles.taskLists}>

                  {tasks[selectedTemplate]?.map((task, index) => (
                    <div className={styles.taskConatiner} >
                    <div className={styles.taskDetailsConatiner}>
                      <div className={styles.taskIndex}>{index}</div>
                      <span className={styles.taskName}>{task}</span>
                    </div>

                    <div className={styles.taskActionConatiner} >
                      <img src={deletIcon} alt="delete" />
                      <img src={editIcon} alt="edit" />
                      <img src={expandIcon} alt="expand" />
                    </div>
                  </div>
                  ))}
                  
                </div>

              </div>

              <div className={styles.saveSection}>
                <div className={styles.saveBtn}>
                  Save/Add new milestone
                </div>
              </div>
              {/* milestone lists */}
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
                      <img src={deletIcon} alt="delete" />
                      <img src={editIcon} alt="edit" />
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

              <div className={styles.submitSection}>
                <div className={styles.cancel}>
                  Cancel
                </div>
                <div className={styles.submit}>
                  submit
                </div>
              </div>
            </Form>

          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddTemplate
