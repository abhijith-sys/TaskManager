import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useDetectClickOutside } from 'react-detect-click-outside';

import styles from "./ColorPicker.module.css";
import drop from "../../../assets/icons/aroowDown.svg"


const ColorPicker = ({ defaultColor, defaultText, onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState(defaultColor || '#000000');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);


    const handleClick = () => {
        setDisplayColorPicker(true);
    };
    const close = () => {
        setDisplayColorPicker(false);
    };
    const ref = useDetectClickOutside({ onTriggered: close });

    const handleChangeColor = (color) => {
        setSelectedColor(color.hex);
        onColorChange(color.hex);
    };

    const colorSquareStyle = {
        width: '28px',
        height: '28px',
        borderRadius: '5px',
        backgroundColor: selectedColor,
        cursor: 'pointer',
    };

    return (
        <div className={styles.colorBoxContainer} ref={ref}>
            <div className={styles.colorBoxStyle} >
                <span className={styles.placehold}>{defaultText}</span>
                <div className={styles.colorSection} onClick={handleClick}>
                    <img src={drop} alt="" />
                    <div style={colorSquareStyle} />
                </div>

            </div>
            {displayColorPicker && (
                <div className={styles.popover} >
                    <div className={styles.cover} onClick={() => setDisplayColorPicker(false)} />
                    <ChromePicker color={selectedColor} onChange={handleChangeColor} />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
