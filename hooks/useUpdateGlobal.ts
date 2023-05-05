import {useState, useEffect} from 'react';
import {useAppDispatch} from '../app/hooks';
import {update} from '../features/global/globalSlice';

const useUpdateGlobal = () => {
  const dispatch = useAppDispatch();
  const updateValue = (valueType, value) => {
    dispatch(update({valueType, value} as any));
  };

  return updateValue;
};

export default useUpdateGlobal;
