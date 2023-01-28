import {withLocale} from '../withLocale';
import { PARAM_KEY } from '../constants';

export const decorators = [withLocale];
export const globals = {
  [PARAM_KEY] : false
};
