import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { ref } from 'firebase/database';
import ViewShot from 'react-native-view-shot';
import { ROUTES } from '../constants';
import PressableOpacity from './PressableOpacity';
import ShareIcon from './ShareIcon';
import { StyledView } from './StyledComponents';
import { useNavigation } from '@react-navigation/native';

const HighlightItem = ({item}) => {
    
    const ref = useRef();
const navigation  = useNavigation()
  return (
    <ViewShot 
    ref={ref}

            >
            
             
              <StyledView className="bg-white mb-5 p-2">
              <Text
                className="self-center"
                style={{
                  paddingVertical:4,
                  paddingHorizontal:12,
                  backgroundColor: 'rgba(200, 33, 40, 0.1)',
                  borderRadius: 29,
                }}>
                {item?.date}
              </Text>
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
              <ShareIcon viewref={ref} isBookmarked={undefined} addToBookMark={undefined} news={undefined}  ></ShareIcon>
              </View>
              
              </StyledView>
             
            
            </ViewShot> 

  )
}

export default HighlightItem

const styles = StyleSheet.create({})
