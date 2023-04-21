import {useEffect, useState} from 'react';

import FirestoreService from '../firebase/firestoreService';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, Text, View} from 'react-native';
import {styled, useColorScheme} from 'nativewind';
import {COLORS} from '../constants';
import { documentId } from 'firebase/firestore';
const StyledView = styled(View);

const LazyLoad = ({
  content,
  collectionName,
  transformItems,
  options,
  updateItems,
  customIds,
  isCustom,
}: any) => {
  const [items, setItems] = useState([]);
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [result, setResults] = useState({
    hasNext: false,
    cursorId: null,
    docs: [],
    count: 0,
  });

  const getTitles = (data: any) => data.map((data: any) => data.id);
  const [loading, setLoading] = useState(false);
  const [customCursorId, setCustomCursorId] = useState(0);
  const getQueryResults = (loadMore = false) => {
    
    if (isCustom && customCursorId < customIds.length) {
      setLoading(true);
      FirestoreService.getDocuments(collectionName, {
        query: [[documentId(), "in", customIds?.slice(customCursorId, customCursorId + 10)]], 
        
      }).then(results => {
        setLoading(false);
        setItems(pp =>customCursorId ===0 ?  results : [...pp,...results]);
        setCustomCursorId(customCursorId => customCursorId + 10);
        
      });
   
    } else {
      if (!loading && (!loadMore || result.hasNext)) {
        setLoading(true);
        console.log(loading, loadMore, options);
        

        FirestoreService.getDocuments(collectionName, {
          ...options,
          cursorId: loadMore ? result.cursorId : undefined,
          orderBy: 'timestamp',
          orderByDir: 'desc',
        }).then(results => {
          setLoading(false);
          const {docs, cursorId} = results;

          setItems((pp: any) =>
            cursorId && loadMore ? [...pp, ...docs] : docs,
          );

          setResults(results);
        });
      }
    }
  };
  //

  useEffect(() => {
    getQueryResults();
  }, [JSON.stringify(options)]);

  useEffect(() => {
    // console.log('total', getTitles(items));
    // updateItems(items);
  }, [items]);

  return (
    <FlatList
      data={transformItems ? transformItems(items) : items}
      keyExtractor={(item: any) => item?.id}
      // onViewableItemsChanged={({ viewableItems: vItems }) => {
      //   viewableItems.value = vItems;
      // }}
      // ItemSeparatorComponent={()=><StyledView className="border-solid divide-solid bg-red-600 flex flex-1  w-full"  ></StyledView>}
      onEndReached={getQueryResults.bind(this, true)}
      renderItem={content}
      contentContainerStyle={{
        padding: 8,
        marginTop: 16,
        backgroundColor: colorScheme !== 'dark' ? 'transparent' : COLORS.white,
      }}
      ListFooterComponent={() => {
        return (
          <View style={{flex: 1}}>
            {loading && <ActivityIndicator></ActivityIndicator>}
          </View>
        );
      }}

      //   style={{ height: height ?? 300, overflow: "auto" }}
      //   dataLength={items?.length} //This is important field to render the next data
      //   next={() => {
      //     //
      //     getQueryResults(true);
      //   }}

      //   height={height ?? 300}

      //   hasMore={result.hasNext}
    >
      {/* {children} */}
    </FlatList>
  );
};

LazyLoad.defaultProps = {
  dontChangeOnOptions: false,
};
export default LazyLoad;
