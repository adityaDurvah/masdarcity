// CustomText.js
import React from 'react';
import { Text as RnText, TextProps } from 'react-native';


interface CustomTextProps extends TextProps {
    children: React.ReactNode;
}

export const Text: React.FC<CustomTextProps> = (props) => {
    return (
        <RnText {...props} style={[props.style, { fontFamily: 'Primary' }]} />
    );
};

