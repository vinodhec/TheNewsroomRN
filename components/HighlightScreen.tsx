import {View, Text} from 'react-native';
import React, { useEffect, useRef } from 'react';
import {COLLECTIONS} from '../constants/collections';
import {StyledView} from './StyledComponents';
import LazyLoad from './LazyLoad';
import {groupBy, map} from 'lodash';
import moment from 'moment';
import ShareIcon from './ShareIcon';
import PressableOpacity from './PressableOpacity';
import { ROUTES } from '../constants';
import ViewShot from 'react-native-view-shot';
import HighlightItem from './HighlightItem';

const HighlightScreen = ({navigation}) => {
  
  return (
    <StyledView>
      <LazyLoad
        collectionName={COLLECTIONS.NEWS}
        
        transformItems={items => {
          const updatedItems = map(
            groupBy(items, item =>
              moment(item?.timestamp?.toDate())?.format('MM/DD/YYYY'),
            ),
            (value, date) => {
              
              return {value, date};
            },
          );

          return updatedItems
        }}
        options={{limit: 5, query: [['showHighlight', '==', true]]}}
        updateItems={() => {}}
        content={({item,index}) => {
          return (
            <HighlightItem item={item}></HighlightItem>
          );
        }}></LazyLoad>
    </StyledView>
  );
};

export default HighlightScreen;
