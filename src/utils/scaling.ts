import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

let real_height = height;
let real_width = width;

Dimensions.addEventListener('change', e => {
  console.log('changed dimensions: ', e.window);
  const {width: new_width, height: new_height} = e.window;
  if (new_height !== 0) {
    real_height = new_height;
  }

  if (new_width !== 0) {
    real_width = new_width;
  }
});
const hScale = (size: number) =>
  real_width ? (real_width / guidelineBaseWidth) * size : size;
const vScale = (size: number) =>
  real_height ? (real_height / guidelineBaseHeight) * size : size;

export {vScale, hScale};
