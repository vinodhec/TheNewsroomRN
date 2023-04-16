import {useEffect, useState} from 'react';

import FirestoreService from '../firebase/firestoreService';
import {FlatList} from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';

const LazyLoad = ({
  content,
  collectionName,

  options,
  updateItems,
}: any) => {
  const [items, setItems] = useState([]);

  const [result, setResults] = useState({
    hasNext: false,
    cursorId: null,
    docs: [],
    count: 0,
  });

  const getTitles=(data:any)=>data.map((data:any)=>data.id);
  const [loading, setLoading] = useState(false)
  const getQueryResults = (loadMore = false) => {
    
    if( !loading && (!loadMore || result.hasNext)){
        setLoading(true)
    
    FirestoreService.getDocuments(collectionName, {
      ...options,
      cursorId: loadMore ? result.cursorId : undefined,
      orderBy: 'timestamp',
      orderByDir: 'desc',
    }).then(results => {
      const {docs, cursorId} = results;
console.log('cursoer',cursorId.data().title)
console.log('exisitn',getTitles(items))
console.log('new',getTitles(docs))
      setItems((pp: any) => (cursorId && loadMore ? [...pp, ...docs] : docs));

      setResults(results);
      setLoading(false);
    });
}
  };
  //

  useEffect(() => {
    getQueryResults();
  }, [JSON.stringify(options)]);

  useEffect(() => {
    console.log('total',getTitles(items))
    // updateItems(items);
  }, [items]);

  return (
    <FlatList
      data={items}
      keyExtractor={(item: any) => item?.id + Math.random()*200}
      // onViewableItemsChanged={({ viewableItems: vItems }) => {
      //   viewableItems.value = vItems;
      // }}
      onEndReached={getQueryResults.bind(this, true)}
      
      renderItem={content}
      contentContainerStyle={{padding: 16}}
      ListFooterComponent={()=>{
      return  <View style={{flex:1}}>
{loading && <ActivityIndicator></ActivityIndicator>}
            
        </View>
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
