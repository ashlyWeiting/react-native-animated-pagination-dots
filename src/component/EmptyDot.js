/**
 * Created by rouge on 11/09/2019.
 * Converted to Functional component. on 21/09/2021
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
export const defaultEmptyDotSize = 3;
const EmptyDot = (props) => {
    return (React.createElement(View, { style: [
            styles.base,
            {
                width: defaultEmptyDotSize * props.sizeRatio,
                height: defaultEmptyDotSize * props.sizeRatio,
                margin: defaultEmptyDotSize * props.sizeRatio,
            },
        ] }));
};
const styles = StyleSheet.create({
    base: {
        backgroundColor: 'white',
        opacity: 0.0,
    },
});
export default EmptyDot;
