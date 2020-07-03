import { Dimensions } from 'react-native';
import { colors } from './colors';
import { images } from './images';

export const COLORSYSTEM = [
  colors.WHITE,
  colors.DARK,
  colors.GREY1,
  colors.GREY2,
  colors.LIGHTGREY,
  colors.LIGHTDARK,
  colors.PURPLE,
  colors.SKY,
  colors.LIGHTBLUE,
  colors.LIGHTGREEN,
  colors.LIGHTYELLOW,
  colors.LIGHTORANGE,
  colors.RED,
  colors.PINK,
  colors.DARKGREEN,
  colors.LIGHTSKY,
];

export const { width, height } = Dimensions.get('window');
export const SYMBOLTEXTS = ['BlackOpsOne-Regular', 'Poppins-Bold', 'Rye-Regular', 'Poppins-Light'];

export const PICKER_OPTIONS = {
  title: 'Select Image',
  customButtons: [{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const MODALIST = [
  { name: 'Text', img: images.text, goto: 'EditScreen' },
  { name: 'Link', img: images.www, goto: 'EditScreen' },
  { name: 'Image', img: images.image, goto: 'EditScreen' },
  { name: 'Gif', img: images.gif, goto: 'EditScreen' },
];

export const BUGSEE_IOS_TOKEN = '4a567584-d330-4027-9ce3-0d7cd956a9b4';
export const BUGSEE_ANDROID_TOKEN = '06227189-b7fb-4522-8856-a9163b8abd22';
export const TENOR_API_URL = 'https://api.tenor.com/v1/';
export const TENOR_API_KEY = 'LIVDSRZULELA';
