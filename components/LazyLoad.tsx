import { useEffect, useState } from "react";

import FirestoreService from "../firebase/firestoreService";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { styled, useColorScheme } from "nativewind";
import { COLORS } from "../constants";
import { documentId } from "firebase/firestore";
import colors from "../constants/colors";
import React from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import useSelectGlobal from "../hooks/useSelectGlobal";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-7672557583201463/6942464325";

const LazyLoad = ({
  content,
  ListEmptyComponent,
  collectionName,
  transformItems,
  adStartPosition = 4,
  options,
  updateItems,
  customIds,
  isCustom,
}: any) => {
  const [items, setItems] = useState([]);
  const { colorScheme } = useColorScheme();
  const [result, setResults] = useState({
    hasNext: false,
    cursorId: null,
    docs: [],
    count: 0,
  });
  const isAdmin = useSelectGlobal("isAdmin");

  const [loading, setLoading] = useState(false);
  const [customCursorId, setCustomCursorId] = useState(0);
  const getQueryResults = (loadMore = false) => {
    console.log({ loadMore });
    if (isCustom && customCursorId < customIds.length) {
      setLoading(true);
      console.log('Bookmarked function')
      FirestoreService.getDocuments(collectionName, {
        query: [
          [
            documentId(),
            "in",
            customIds?.slice(customCursorId, customCursorId + 10),
          ],
        ],
      }).then((results) => {
        setLoading(false);
        setItems((pp) =>
          customCursorId === 0 ? results : [...pp, ...results]
        );
        setCustomCursorId((customCursorId) => customCursorId + 10);
      });
    } else if(!isCustom) {
      if (!loading && (!loadMore || result.hasNext)) {
        setLoading(true);
    console.log('Bookmarked function')
        FirestoreService.getDocuments(collectionName, {
          ...options,
          cursorId: loadMore ? result.cursorId : undefined,
          orderBy: "timestamp",
          orderByDir: "desc",
        })
          .then((results) => {
            setLoading(false);
            const { docs, cursorId } = results;

            console.log(options, docs);

            setItems((pp: any) => (loadMore ? [...pp, ...docs] : docs));

            setResults(results);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  //

  useEffect(() => {
    console.log(options);
    getQueryResults();
  }, [JSON.stringify(options)]);

  useEffect(() => {}, [items]);
  const getData = React.useCallback(() => {
    if (isAdmin) {
      return items;
    }
    let outData = [];
    outData.push(...items);

    // Inject ads into array
    for (let i = adStartPosition; i < outData.length; i += 5) {
      outData.splice(i, 0, { type: "ad", id: i });
    }
    return outData;
  }, [items]);

  return (
    <FlatList
      onEndReachedThreshold={10}
      data={transformItems ? transformItems(getData()) : getData()}
      keyExtractor={(item: any) => {
        //
        return item?.id || item?.date;
      }}
      // onViewableItemsChanged={({ viewableItems: vItems }) => {
      //   viewableItems.value = vItems;
      // }}
      // ItemSeparatorComponent={()=><StyledView className="border-solid divide-solid bg-red-600 flex flex-1  w-full"  ></StyledView>}
      onEndReached={getQueryResults.bind(this, true)}
      renderItem={({ item }) => {
        return item.type === "ad" ? (
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        ) : (
          content({ item })
        );
      }}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{
        padding: 8,
        paddingTop: 16,
        backgroundColor:
          colorScheme !== "dark" ? "transparent" : colors.darkColors.bgColor,
      }}
      ListFooterComponent={() => {
        return (
          <View style={{ flex: 1, height: Dimensions.get("screen").height }}>
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
