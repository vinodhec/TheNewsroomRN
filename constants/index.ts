import ROUTES from './routes';
// const isAdmin: any = false;
import COLORS from './colors';
import useSelectGlobal from '../hooks/useSelectGlobal';

// const isAdmin=useSelectGlobal('isAdmin')
const STORAGE_PATH = {
    GROUPS: 'groups'
}
const BreakingNewsLabel = 'Breaking'
const disableEmulator = true;

export { ROUTES, BreakingNewsLabel, COLORS, disableEmulator, STORAGE_PATH, };