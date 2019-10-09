import toPath from 'lodash.topath';
import get from 'lodash.get';
import set from 'lodash.set';
import { AllType } from '../interfaces';


export const delIn = (obj: AllType, path: string | string[]): AllType => {
  const pathArr = toPath(path);
  if (pathArr.length === 1) {
    if (Array.isArray(obj)) {
      const newEntity = [...obj];
      newEntity.splice(parseInt(pathArr[0], 2), 1);
      return newEntity;
    }
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [pathArr[0]]: toDelete, ...rest
    } = obj;
    return rest;
  }
  if (pathArr.length > 1) {
    const entityPath = pathArr.slice(0, pathArr.length - 1).join('.');
    const entity = get(obj, entityPath);
    const fieldToRemove = pathArr[pathArr.length - 1];
    if (Array.isArray(entity)) {
      const newEntity = [...entity];
      newEntity.splice(parseInt(fieldToRemove, 2), 1);

      return set(obj, entityPath, newEntity);
    }
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [fieldToRemove]: toDelete, ...newEntity
    } = entity;

    return set(obj, entityPath, newEntity);
  }

  return obj;
};
