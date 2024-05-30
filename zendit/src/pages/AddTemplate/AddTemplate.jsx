import React, { useEffect, useState } from 'react';
import styles from "./AddTemplate.module.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form, ErrorMessage } from 'formik';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ColorPicker from '../../components/common/ColorPicker/ColorPicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from 'react-modal';

import plusIcon from "../../assets/icons/plus.svg"
import deletIcon from "../../assets/icons/delete.svg"
import editIcon from "../../assets/icons/edit.svg"
import expandIcon from "../../assets/icons/expand.svg"
import AddMilestone from '../../components/AddMilestone/AddMilestone';
import MilestoneListItem from '../../components/MilestoneListItem/MilestoneListItem';
import { addTemplate, getMilestone, getTemplateDetails, getTemplateTypes } from '../../service/templateService';
import { useNavigate, useParams } from 'react-router-dom';
import PathConstants from '../../router/PathConstants';

const AddTemplate = () => {
  const navigate = useNavigate()
  const { id = false } = useParams();
  const [selectedTemplate, setselectedTemplate] = useState("");
  const [newTask, setNewTask] = useState('')
  const [hint, setHint] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const [templateTypes, setTemplateTypes] = useState([]);
  const [templateValue, setTemplateValue] = useState({});
  const [milestoneNames, setMilestoneNames] = useState([])

  const getTemplateTypeByCompanyId = async () => {
    try {
      const data = {
        company_id: 80,
        id: 0,
        type: 0
      }
      const response = await getTemplateTypes(data);
      setTemplateTypes(response?.data)
    } catch (error) {
      console.log(error);
    }
  }
  const getTemplateDetailsById = async () => {
    try {

      const response = await getTemplateDetails(id);
      console.log(response?.data[0]);
      setTemplateValue(response?.data[0])
    } catch (error) {
      console.log(error);
    }
  }

  const getMilestoneNamesByCompanyId = async () => {
    try {
      const data = {
        company_id: 80,
        type: 0
      }
      const response = await getMilestone(data);
      console.log(response?.data);
      setMilestoneNames(response?.data)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getTemplateTypeByCompanyId();
    if (id) {
      getTemplateDetailsById();
    }
    getMilestoneNamesByCompanyId();
  }, [id])

  const openModal = () => {
    setIsOpen(true);
  }


  const closeModal = () => {
    setIsOpen(false);
  }

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

  const [tasks, setTasks] = useState({
    "Milestone 1": [{ taskName: "Task1", id: "1" }, { taskName: "Task2", id: "2" }, { taskName: "Task3", id: "3" }, { taskName: "Task4", id: "4" }, { taskName: "Task5", id: "5" }],
    "Milestone 2": [{ taskName: "Task6", id: "6" }, { taskName: "Task7", id: "7" }, { taskName: "Task8", id: "8" }],
    "Milestone 3": [{ taskName: "Task9", id: "9" }, { taskName: "Task10", id: "10" }],
    "Milestone 4": [{ taskName: "Task11", id: "11" }],
    "Milestone 5": [{ taskName: "Task12", id: "12" }, { taskName: "Task13", id: "13" }, { taskName: "Task14", id: "14" }, { taskName: "Task15", id: "15" }]
  });

  const addTaskToMilestone = () => {
    try {
      if (newTask.trim().length > 0 && selectedTemplate) {
        const taskId = (Math.random() * 1000000).toString(); // Generating a unique ID
        setTasks(prevTasks => {
          if (prevTasks?.hasOwnProperty(selectedTemplate)) {
            return {
              ...prevTasks,
              [selectedTemplate]: [...prevTasks[selectedTemplate], { taskName: newTask, id: taskId }]
            };
          } else {
            return {
              ...prevTasks,
              [selectedTemplate]: [{ taskName: newTask, id: taskId }]
            };
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    setNewTask("");
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list[selectedTemplate]);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedTemplate]: reorderedItems,
    }));
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const addnewTemplates = async (data) => {
    const combinedData = { ...data, ...tasks }
    try {
      const response = await addTemplate(combinedData);
      alert("template added sucessfully");
      navigate(PathConstants.HOME)
    } catch (error) {
      console.log(error);
      alert("template error");
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h4 className={styles.title}>Add templates</h4>
      </div>
      <div className={styles.bottomSection}>
        <Formik
          initialValues={{
            template_type: templateValue?.template_type || '', template_name: templateValue?.template_name || '', progressColor: templateValue?.colour?.[0]?.color || '#FFA500',
            completedColor: templateValue?.colour?.[1]?.color || '#008000', delayedColor: templateValue?.colour?.[2]?.color || '#FF0000',
            milestones: [{ name: '', tasks: templateValue?.tasks || [''] }]
          }}

          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addnewTemplates(values)
            resetForm();
          }}

        >
          {({ values, handleChange, handleBlur, setFieldValue, submitForm }) => (
            <Form>
              <div className={styles.firstSection} >
                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.inputField}>
                  <span className={styles.title}>Template type <span className={styles.required}>*</span> </span>
                  <Select
                    name="template_type"
                    placeholder="select"

                    value={values.template_type}
                    onChange={handleChange('template_type')}
                    onBlur={handleBlur('template_type')}
                    className={styles.dropdownWidth}
                  >
                    <MenuItem value=" " disabled className={styles.selectItems}>
                      select
                    </MenuItem>
                    {templateTypes.map((data) => {
                      return (
                        <MenuItem value={data?.id} className={styles.selectItems}>{data?.template_name}</MenuItem>
                      )
                    })}
                  </Select>
                  <ErrorMessage name="templateType" component="div" className={styles.error} />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.inputField}>
                  <span className={styles.title}>Template name <span className={styles.required}>*</span> </span>
                  <TextField
                    className={styles.input}
                    onChange={handleChange('template_name')}
                    onBlur={handleBlur('template_name')}
                    value={values.template_name}
                    id="outlined-password-input"
                    placeholder="Please type "
                    type="text"
                  />
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
                    <span className={styles.title}>MileStone name  <span className={styles.required}>*</span></span>
                    <Autocomplete
                      disablePortal
                      sx={{ height: '38px' }}
                      value={selectedTemplate}
                      onChange={(event, newValue) => {
                        if (newValue?.label !== "Add New" && newValue?.label !== "error") {
                          setselectedTemplate(newValue ? newValue?.label : '');
                          setHint(newValue ? newValue?.label : '');
                        }

                      }}
                      inputValue={selectedTemplate}
                      options={dummyMilestoneData}
                      getOptionLabel={(option) => option.label ?? ""}
                      filterOptions={(options, state) => {
                        const filteredOptions = options?.filter((option) =>
                          option?.label?.toLowerCase()?.includes(state?.inputValue?.toLowerCase())
                        );
                        if (filteredOptions.length === 0) {
                          filteredOptions.push({ label: "error" });
                        }
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
                            <div className={styles.milestoneContent}>
                              <div {...props} className={styles.addNewMilstone} onClick={openModal}>
                                <div className={styles.plusIcon}>
                                  <img src={plusIcon} alt="+" />
                                </div>
                                New milestone
                              </div>
                            </div>

                          );
                        }
                        else if (option.label === "error") {
                          return (
                            <div className={styles.milestoneContent}>
                              <div {...props} className={styles.dropDownContentsError}>
                                We didn't find any milestone with that name."Main install"
                              </div>
                            </div>)
                        } else {
                          return (
                            <div className={styles.milestoneContent}>
                              <div {...props} className={styles.dropDownContents}>
                                {option.label}
                              </div>
                            </div>
                          );
                        }
                      }}
                    />
                  </div>
                  <div className={styles.MilestoneFileds}>
                    <span className={styles.title}>Task name <span className={styles.required}>*</span> </span>
                    <TextField
                      className={styles.input}
                      onChange={(event) => { setNewTask(event.target.value) }}
                      value={newTask}
                      id="outlined-password-input"
                      placeholder="Please type task name"
                      type="text"
                    />
                  </div>
                  <div className={styles.addTask} onClick={addTaskToMilestone}>
                    Add task
                  </div>
                </div>
                {/* task list */}
                <DragDropContext onDragEnd={onDragEnd} >
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div className={styles.taskLists}  {...provided.droppableProps}
                        ref={provided.innerRef}>

                        {tasks[selectedTemplate]?.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div {...provided.dragHandleProps} className={styles.taskConatiner}>
                                  <div className={styles.taskDetailsConatiner}>
                                    <div className={styles.taskIndex}>{index + 1}</div>
                                    <span className={styles.taskName}>{task.taskName}</span>
                                  </div>

                                  <div className={styles.taskActionConatiner} >
                                    <img src={deletIcon} alt="delete" />
                                    <img src={editIcon} alt="edit" />
                                    <img src={expandIcon} alt="expand" />
                                  </div>
                                </div>

                              </div>
                            )}

                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}

                  </Droppable>
                </DragDropContext>

              </div>

              <div className={styles.saveSection}>
                <div className={styles.saveBtn}>
                  Save/Add new milestone
                </div>
              </div>

              {/* milestone lists ui loop though the milestone list data  */}
              <MilestoneListItem />
              {/* submit and cancel button */}
              <div className={styles.submitSection}>
                <div className={styles.cancel}>
                  Cancel
                </div>
                <div className={styles.submit} onClick={submitForm} >
                  submit
                </div>
              </div>
            </Form>

          )}
        </Formik>
      </div>

      {/* add new milestone */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AddMilestone closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default AddTemplate
