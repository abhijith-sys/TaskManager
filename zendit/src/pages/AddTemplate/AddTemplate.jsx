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

  const [selectedColor, setSelectedColor] = useState('#FFA500'); // Default color


  const handleColorChange = (color) => {
    setSelectedColor(color);
  };


  const dummyMilestoneData = [

    { label: 'Milestone 1' },
    { label: 'Milestone 2' },
    { label: 'Milestone 3' },
    { label: 'Milestone 4' },
    { label: 'Milestone 5' },
    { label: "Add New" }
  ];
  const [inputValue, setInputValue] = React.useState('');
  const [hint, setHint] = React.useState('');
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h4 className={styles.title}>Add templates</h4>
      </div>
      <div className={styles.bottomSection}>
        <Formik
          initialValues={{ templateType: ' ', milestoneName: '', taskName: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange, handleBlur, errors }) => (
            <Form>
              <div className={styles.firstSection} >
                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.inputField}>
                  <span className={styles.title}>Temlate type </span>
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

                    <MenuItem value="option1" className={styles.selectItems}>Option 1</MenuItem>
                    <MenuItem value="option2" className={styles.selectItems}>Option 2</MenuItem>
                  </Select>
                  <ErrorMessage name="templateType" component="div" className={styles.error} />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.inputField}>
                  <span className={styles.title}>Temlate name </span>
                  <Select
                    name="templateType"
                    value={values.templateType}
                    onChange={handleChange('templateType')}
                    onBlur={handleBlur('templateType')}
                    className={styles.dropdownWidth}
                  >
                    <MenuItem value=" " disabled className={styles.selectItems}>
                      Please select
                    </MenuItem>

                    <MenuItem value="option1" className={styles.selectItems}>Option 1</MenuItem>
                    <MenuItem value="option2" className={styles.selectItems}>Option 2</MenuItem>
                  </Select>
                  <ErrorMessage name="templateType" component="div" className={styles.error} />
                </FormControl>
              </div>
              <div className={styles.secondSection} >
                <span className={styles.title}>Colours </span>
                <div className={styles.secondSectionInputs}>
                  <ColorPicker defaultColor="#FFA500" defaultText="Progressing colour" onColorChange={handleColorChange} />
                  <ColorPicker defaultColor="#008000" defaultText="Completed colour" onColorChange={handleColorChange} />
                  <ColorPicker defaultColor="#FF0000" defaultText="Delayed colour" onColorChange={handleColorChange} />
                </div>



              </div>
              <div className={styles.thirdSection}>
                <div className={styles.taskAddSection} >
                  <div className={styles.MilestoneFileds}>
                    <span className={styles.title}>MileStone name </span>
                    <Autocomplete

                      sx={{ height: '38px' }}
                      value={inputValue}
                      onChange={(event, newValue) => {
                        setInputValue(newValue ? newValue.label : '');
                        setHint(newValue ? newValue.label : '');
                      }}
                      inputValue={inputValue}
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
                            setInputValue(event.target.value)
                          }}
                          onBlur={() => setHint('')}
                          onKeyDown={(event) => {
                            if (event.key === 'Tab') {
                              setInputValue(hint);
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
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className={styles.addTask}>
                    Add task
                  </div>
                </div>

                <div className={styles.taskLists}>
                  <div className={styles.taskConatiner} >
                    <div className={styles.taskDetailsConatiner}>
                      <div className={styles.taskIndex}>1</div>
                      <span className={styles.taskName}>Task 1</span>
                    </div>

                    <div className={styles.taskActionConatiner} >
                      <img src={deletIcon} alt="delete" />
                      <img src={editIcon} alt="edit" />
                      <img src={expandIcon} alt="expand" />
                    </div>
                  </div>
                  <div className={styles.taskConatiner} >
                    <div className={styles.taskDetailsConatiner}>
                      <div className={styles.taskIndex}>1</div>
                      <span className={styles.taskName}>Task 1</span>
                    </div>

                    <div className={styles.taskActionConatiner} >
                      <img src={deletIcon} alt="delete" />
                      <img src={editIcon} alt="edit" />
                      <img src={expandIcon} alt="expand" />
                    </div>
                  </div>
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
                        <span> Milestone1</span>
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
