import {View, Text} from 'react-native';
import React from 'react';
import {COLLECTIONS} from '../constants/collections';
import {StyledView} from './StyledComponents';
import LazyLoad from './LazyLoad';
import {groupBy, map} from 'lodash';
import moment from 'moment';
import ShareIcon from './ShareIcon';
import PressableOpacity from './PressableOpacity';
import { ROUTES } from '../constants';

const HighlightScreen = ({navigation}) => {
  return (
    <StyledView>
      <LazyLoad
        collectionName={COLLECTIONS.NEWS}
        transformItems={items => {
          return map(
            groupBy(items, item =>
              moment(item?.timestamp?.toDate())?.format('MM/DD/YYYY'),
            ),
            (value, date) => {
              console.log({value});
              return {value, date};
            },
          );
        }}
        options={{limit: 5, query: [['showHighlight', '==', true]]}}
        updateItems={() => {}}
        content={({item}) => {
          console.log({item});
          return (
            <StyledView className="">
              <Text
                className="self-center mb-4"
                style={{
                  paddingVertical:4,
                  paddingHorizontal:12,
                  backgroundColor: 'rgba(200, 33, 40, 0.1)',
                  borderRadius: 29,
                }}>
                {item?.date}
              </Text>
              <StyledView className="bg-white mb-5 p-2">
                {item?.value?.map(({highlight, id}) => {
                  return (
                    <PressableOpacity onPress={()=>{
                      navigation.navigate(ROUTES.NEWSFEED_ID,{id})
                    }}>
                    <Text
                    className='text-black'
                      style={{
                        lineHeight: 18,
                        marginTop: 16,
                       
                      }}
                      key={id}>
                      {highlight}
                    </Text>
                    </PressableOpacity>
                  );
                })}
                 <View  className='self-end' style={{width:60}}>
              <ShareIcon isBookmarked={undefined} addToBookMark={undefined} news={undefined}  ></ShareIcon>
              </View>
              
              </StyledView>
             
            </StyledView>
          );
        }}></LazyLoad>
    </StyledView>
  );
};

export default HighlightScreen;
