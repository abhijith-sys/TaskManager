import React from 'react';
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table'; // Import components individually
import creatorImage from '../../assets/defaultavathar.jpg'; // Import the creator image
import styles from "./TemplateTable.module.css";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import sortIcons from "../../assets/sortIcons.svg"

import eyeIcon from "../../assets/eye.svg"

const TemplateTable = ({ nodes, onEyeClick }) => {
  const data = { nodes };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #FFFFFF;
        
      `,
      Row: `
        &:nth-of-type(odd) {
          color:#000000;
          background-color: #F9F9F9 ;
        
        }

        &:nth-of-type(even) {
          color:#000000;
          background-color:#FFFFFF;
        
        }
      `,
    },
  ]);
  return (
    <div className={styles.tableContainer}>
      <Table data={data} theme={theme} >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className={styles.cell}>Template name</HeaderCell>
                <HeaderCell className={styles.cell}>Template type  <><img src={sortIcons} alt="" /></></HeaderCell>
                <HeaderCell className={styles.cell}>Created by  <><img src={sortIcons} alt="" /></></HeaderCell>
                <HeaderCell className={styles.cell}>Status  <><img src={sortIcons} alt="" /></></HeaderCell>
                <HeaderCell className={styles.cell}>Actions  <><img src={sortIcons} alt="" /></></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((row, index) => (
                <Row key={index} item={row} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <Cell className={styles.cell}><span className={styles.blue}> {row.template_name}</span></Cell>
                  <Cell className={styles.cell}>{row.type}</Cell>
                  <Cell className={styles.cell}>
                    <div className={styles.createdBy}>
                      <img src={row.image_path ||creatorImage} alt="Creator" />
                      <span>{row.created_user}</span>
                    </div>
                  </Cell>
                  <Cell className={`${styles.cell} `}>
                    <div className={`${styles.chip}  ${row.status === 1 ? styles.green : styles.red}`}>
                      {row.status === 1 ?"Active":"innactive"}
                    </div>
                  </Cell>
                  <Cell className={styles.cell}>
                    <button className={styles.btn} onClick={() => onEyeClick(row.id)}>
                      <img src={eyeIcon} alt="details" />
                    </button>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default TemplateTable;
