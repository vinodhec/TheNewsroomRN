import {StyleSheet, Text, View, TextInput, Button, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyledView} from './StyledComponents';
import {useController, useForm} from 'react-hook-form';
import {Dropdown} from 'react-native-element-dropdown';
import {useAppSelector} from '../app/hooks';
import {selectGlobalValue} from '../features/global/globalSlice';
import { ScrollView } from 'react-native-gesture-handler';

const Input = (fields) => {
    const {name, control, label, ...others} = fields;
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });
  return (
    <StyledView className="mt-2">
      <Text className="capitalize mb-1 text-xs">{label ?? name}</Text>
      <TextInput
      {...others}
        value={field.value}
        
        onChangeText={field.onChange}
        className="border-[#D2D3D4] border-2 rounded-md text-black "
        style={{height: 50,...others?.style}}
      />
    </StyledView>
  );
};

const AddNews = () => {
  const {control, handleSubmit, setValue, watch} = useForm();
  const [isFocus, setIsFocus] = useState(false);

  const [showHighlight, setShowHighlight] = useState(false)
  const [showGroup, setShowGroup] = useState(false)
  const values = watch();
  const categories: any = useAppSelector(selectGlobalValue('categories')) ?? [];

  
  const onSubmit = data => {
    console.log(JSON.stringify(data));
  };
  return (
    <ScrollView className=" align-center p-4">
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories.slice(1).map(cate => ({label: cate, value: cate}))}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Category' : '...'}
        searchPlaceholder="Search..."
        value={values['category']}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue('category', item.value);
          setIsFocus(false);
        }}
      />
      {[
        {name: 'title'},
        {name: 'content',multiline:true,    style:{height:200},    numberOfLines:10   },
        {name: 'caption'},
        {name: 'source'},
        {customComponent:  <Switch

            onValueChange={()=>{setShowHighlight((prev)=>!prev)}}
            value={showHighlight}
          />},
        {name: 'highlight',multiline:true,    style:{height:120},    numberOfLines:5 , showOnCondition:true, onlyIf: showHighlight  },
        {customComponent:  <Switch

            onValueChange={()=>{setShowGroup((prev)=>!prev)}}
            value={showGroup}
          />},
          {name: 'group',   showOnCondition:true, onlyIf: showGroup  },

      ].map((fields: any) => {
        if(fields.customComponent){
            return fields.customComponent
        }
        
        return (!fields?.showOnCondition || (fields.showOnCondition && fields.onlyIf) ) &&<Input {...fields} control={control}></Input>;
      })}

      <Button title="Add News" onPress={handleSubmit(onSubmit)}></Button>
    </ScrollView>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
