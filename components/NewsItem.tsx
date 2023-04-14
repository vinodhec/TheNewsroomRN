import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const NewsItem = ({title, content, imageUrl, category}) => {
  console.log({imageUrl});
  return (
    <View style={styles.newsContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      {imageUrl && (
        <Image
          style={{width: '100%', height: 200}}
          source={{uri: imageUrl}}></Image>
      )}
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 6,
  },
  category: {
    fontWeight: '400',
    fontSize: 11,

    /* identical to box height, or 150% */

    color: 'rgba(200, 33, 40, 0.8)',
  },
  content: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,

    color: '#212329',
  },
  title: {
    color: '#212329',
    fontSize: 20,
    fontWeight: '700',
  },
});
