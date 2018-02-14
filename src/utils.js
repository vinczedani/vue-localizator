export function deepGet(obj, propsString, defaultValue) {
  const props = propsString.split('.');
  // If we have reached an undefined/null property
  // then stop executing and return the default value.
  // If no default was provided it will be undefined.
  if (obj === undefined || obj === null) {
    return defaultValue;
  }

  // If the path array has no more elements, we've reached
  // the intended property and return its value
  if (propsString.length === 0) {
    return obj;
  }

  // Prepare our found property and path array for recursion
  const foundSoFar = obj[props[0]];
  const remainingProps = props.slice(1);

  return deepGet(foundSoFar, remainingProps.join('.'), defaultValue);
}


/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    Object.keys(source).map((key) => { // eslint-disable-line array-callback-return
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return mergeDeep(target, ...sources);
}
