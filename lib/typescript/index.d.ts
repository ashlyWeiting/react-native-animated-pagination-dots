/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
import React from 'react';
export interface IDotContainerProps {
    curPage: number;
    maxPage: number;
    sizeRatio?: number;
    activeDotColor: string;
    inactiveDotColor?: string;
    vertical?: boolean;
    onPress?: (idx: number) => void;
}
declare const DotContainer: React.FC<IDotContainerProps>;
export default DotContainer;
