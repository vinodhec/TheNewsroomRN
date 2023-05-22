
import {useAppSelector} from '../app/hooks';
import {selectGlobalValue} from '../features/global/globalSlice';

const useSelectGlobal = (key) => {
  

  return useAppSelector(selectGlobalValue(key))
  

  
};

export default useSelectGlobal;


