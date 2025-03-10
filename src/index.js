/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Dot from './component/Dot';
import EmptyDot, { defaultEmptyDotSize } from './component/EmptyDot';
import usePrevious from 'react-use/lib/usePrevious';
const ONE_EMPTY_DOT_SIZE = defaultEmptyDotSize * defaultEmptyDotSize;
const DotContainer = (props) => {
  const refScrollView = useRef(null);
  const prevPage = usePrevious(props.curPage);
  const getSizeRatio = useCallback(() => {
    if (!props.sizeRatio) return 1.0;
    return Math.max(1.0, props.sizeRatio);
  }, [props.sizeRatio]);
  const scrollTo = useCallback(
    (index, animated = true) => {
      if (!refScrollView.current) return;
      const sizeRatio = getSizeRatio();
      const FIRST_EMPTY_DOT_SPACE = ONE_EMPTY_DOT_SIZE * 2;
      const MOVE_DISTANCE = ONE_EMPTY_DOT_SIZE * sizeRatio;
      const moveTo = Math.max(
        0,
        FIRST_EMPTY_DOT_SPACE + (index - 4) * MOVE_DISTANCE
      );
      if (props.vertical) {
        refScrollView.current.scrollTo({
          x: 0,
          y: moveTo,
          animated,
        });
        return;
      }
      refScrollView.current.scrollTo({
        x: moveTo,
        y: 0,
        animated,
      });
    },
    [getSizeRatio, props.vertical]
  );
  const getContainerStyle = useCallback(() => {
    const { vertical } = props;
    const sizeRatio = getSizeRatio();
    const containerSize = 84 * sizeRatio;
    return {
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
      maxHeight: vertical ? containerSize : undefined,
      maxWidth: vertical ? undefined : containerSize,
    };
  }, [getSizeRatio, props]);
  useEffect(() => {
    if (props.maxPage > 4 && prevPage !== props.curPage)
      scrollTo(props.curPage);
  }, [prevPage, props.curPage, props.maxPage, scrollTo]);
  const { curPage, maxPage, activeDotColor, inactiveDotColor } = props;
  const list = useMemo(() => [...Array(maxPage).keys()], [maxPage]);
  let normalizedPage = curPage;
  if (curPage < 0) {
    normalizedPage = 0;
  }
  if (curPage > maxPage - 1) {
    normalizedPage = maxPage - 1;
  }
  const sizeRatio = getSizeRatio();
  const container = getContainerStyle();
  if (maxPage < 5) {
    return React.createElement(
      View,
      { style: container },
      list.map((i) => {
        return React.createElement(Dot, {
          key: i,
          idx: i,
          sizeRatio: sizeRatio,
          curPage: normalizedPage,
          maxPage: maxPage,
          activeColor: activeDotColor,
          inactiveColor: inactiveDotColor,
        });
      })
    );
  }
  return React.createElement(
    View,
    {
      style: container,
      onLayout: () => {
        // scroll to right index on initial render
        scrollTo(props.curPage, false);
      },
    },
    React.createElement(
      ScrollView,
      {
        ref: refScrollView,
        contentContainerStyle: styles.scrollViewContainer,
        bounces: false,
        horizontal: !props.vertical,
        scrollEnabled: false,
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
      },
      React.createElement(EmptyDot, { sizeRatio: sizeRatio }),
      React.createElement(EmptyDot, { sizeRatio: sizeRatio }),
      list.map((i) => {
        return React.createElement(Dot, {
          sizeRatio: sizeRatio,
          key: i,
          idx: i,
          curPage: normalizedPage,
          maxPage: maxPage,
          activeColor: activeDotColor,
          inactiveColor: inactiveDotColor,
          onPress: props.onPress,
        });
      }),
      React.createElement(EmptyDot, { sizeRatio: sizeRatio }),
      React.createElement(EmptyDot, { sizeRatio: sizeRatio })
    )
  );
};
const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
  },
});
export default DotContainer;
