/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
import React from 'react';
import { IDotContainerProps } from 'react-native-animated-pagination-dot';
declare const Dot: React.FC<{
    idx: number;
    curPage: number;
    maxPage: number;
    activeColor: string;
    inactiveColor?: string;
    sizeRatio: number;
} & Pick<IDotContainerProps, 'onPress'>>;
export default Dot;
