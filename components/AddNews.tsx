import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useState} from 'react';
import {StyledView} from './StyledComponents';
import {useController, useForm} from 'react-hook-form';
import {Dropdown} from 'react-native-element-dropdown';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectGlobalValue, update} from '../features/global/globalSlice';
import {ScrollView} from 'react-native-gesture-handler';
import PressableOpacity from './PressableOpacity';
import FirestoreService from '../firebase/firestoreService';
import {COLLECTIONS} from '../constants/collections';
import {ROUTES, STORAGE_PATH} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import FirebaseStorageService from '../firebase/firebaseStorageService';
import { getBase64FromURL } from '../utils/utilsService';

const Input = fields => {
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
        style={{height: 50, ...others?.style}}
      />
    </StyledView>
  );
};

const AddGroup = ({modalVisible, setModalVisible, groups, dispatch}) => {
  const {control, handleSubmit, setValue, watch} = useForm();
  const values = watch();
  console.log({values});

  const onSubmit = async values => {
    console.log({values});
    const {path} = await FirestoreService.createDocument(COLLECTIONS.GROUPS, {
      description: values?.description,
      title: values?.groupTitle,
      label: values?.label,
    });
    dispatch(
      update({
        valueType: 'groups',
        value: [
          ...groups,
          {
            description: values?.description,
            title: values?.groupTitle,
            label: values?.label,
            id: path,
          },
        ],
      } as any),
    );
  };
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <ScrollView className=" align-center p-4">
        {[
          {name: 'label', label: 'Tag Name'},

          {
            name: 'groupTitle',
            label: 'Title',
          },
          {
            name: 'description',
            multiline: true,
            style: {height: 120},
            numberOfLines: 5,
          },
        ].map((fields: any, index) => {
          if (
            !(
              !fields?.showOnCondition ||
              (fields.showOnCondition && fields.onlyIf)
            )
          ) {
            return;
          }

          if (fields.customComponent) {
            return fields.customComponent;
          }

          return <Input {...fields} key={index} control={control}></Input>;
        })}
        <PressableOpacity
          className="bg-red-600 p-2 rounded-sm  self-end mt-4"
          onPress={handleSubmit(onSubmit)}>
          <Text className="text-white text-l">Save</Text>
        </PressableOpacity>
      </ScrollView>
    </Modal>
  );
};

const AddNews = ({navigation}) => {
  const {control, handleSubmit, setValue, watch} = useForm();
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const values = watch();
  const categories: any = useAppSelector(selectGlobalValue('categories')) ?? [];
  const groups: any = useAppSelector(selectGlobalValue('groups')) ?? [];
  const [image, setImage] = useState<any>();
  const onSubmit = async data => {
    const {path} = await FirestoreService.createDocument(
      COLLECTIONS.NEWS,
      data,
    );

    Alert.alert('Success', 'News has been posted', [
      {
        text: 'Ok',
        onPress: () => {
          navigation.push(ROUTES.NEWSFEED);
        },
      },
    ]);
  };

  useEffect(() => {
    if (!image) {
      return;
    }
    const uri = image?.assets?.[0]?.uri;
    fetch(uri).then(async(image64)=>{
      const imgBlob = await image64.blob();

    FirebaseStorageService.uploadFile(
      imgBlob,
      `${STORAGE_PATH.GROUPS}/${image?.assets?.[0]?.fileName}`,
    ).then(data => {
      console.log(data);
    });

   });
    
  }, [image]);

  return (
    <ScrollView
      className=" align-center p-4"
      contentContainerStyle={{paddingBottom: 100}}>
      {[
        {name: 'title'},
        {
          customComponent: (
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories
                .slice(1)
                .map(cate => ({label: cate, value: cate}))}
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
          ),
        },
        {
          name: 'content',
          multiline: true,
          style: {height: 200},
          numberOfLines: 10,
        },
        {name: 'caption'},
        {name: 'source'},
        {
          customComponent: (
            <StyledView className="justify-end flex-row mt-2">
              <Switch
                onValueChange={() => {
                  setValue('showHighlight', !values['showHighlight']);
                }}
                value={values['showHighlight']}
              />
              <Text>Highlight News</Text>
            </StyledView>
          ),
        },
        {
          name: 'highlight',
          multiline: true,
          style: {height: 120},
          numberOfLines: 5,
          showOnCondition: true,
          onlyIf: values['showHighlight'],
        },
        {
          customComponent: (
            <StyledView className="items-end">
              <StyledView className="justify-end flex-row mt-2">
                <Switch
                  onValueChange={() => {
                    setValue('showGroup', !values['showGroup']);
                  }}
                  value={values['showGroup']}
                />
                <Text>Group News</Text>
              </StyledView>
              {values['showGroup'] && (
                <PressableOpacity
                  className="bg-red-600 p-2 rounded-sm "
                  onPress={() => setModalVisible(true)}>
                  <Text className="text-white	">Add Tag</Text>
                </PressableOpacity>
              )}
            </StyledView>
          ),
        },
        {
          showOnCondition: true,
          onlyIf: values['showGroup'],
          customComponent: (
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={groups}
              search
              maxHeight={300}
              labelField="label"
              valueField="id"
              placeholder={!isFocus ? 'Select Group Tag' : '...'}
              searchPlaceholder="Search..."
              value={values['groups']}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue('groups', item.id);
                setIsFocus(false);
              }}
            />
          ),
        },
      ].map((fields: any, index) => {
        if (
          !(
            !fields?.showOnCondition ||
            (fields.showOnCondition && fields.onlyIf)
          )
        ) {
          return;
        }

        if (fields.customComponent) {
          return fields.customComponent;
        }

        return <Input {...fields} key={index} control={control}></Input>;
      })}
      <Pressable
        className="bg-red-600 p-2 rounded-sm justify-center items-center"
        onPress={async () => {
          launchImageLibrary({mediaType: 'mixed'}, setImage);

          // const UUID = uuidv4();

          // FirebaseStorageService.uploadFile(result?.[0].uri,`${STORAGE_PATH.GROUPS}/${result?.[0].fileName}`).then((data)=>{
          //   console.log(data);
          // })
        }}>
        <Text className="text-white">Upload Image / Video</Text>
      </Pressable>
      {image?.assets &&
        image?.assets.map(({uri}: {uri: string}) => (
          <View key={uri} style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{uri: uri}}
            />
          </View>
        ))}

      <Pressable
        className="bg-red-600 p-2 rounded-sm justify-center items-center"
        onPress={handleSubmit(onSubmit)}>
        <Text className="text-white">Add News</Text>
      </Pressable>
      <AddGroup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        groups={groups}
        dispatch={dispatch}></AddGroup>
    </ScrollView>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    marginTop: 16,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


