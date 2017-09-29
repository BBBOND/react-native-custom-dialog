import {
    Dimensions,
    StyleSheet,
} from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const Size = (size) => {
    return Math.round((size * SCREEN_WIDTH / 375));
};

export const dimension = {
    borderHeight: StyleSheet.hairlineWidth * 2,
};

export const themeColor = {
    white: '#FFFFFF',
    transparent: 'transparent',
    textColorH1: '#282828',
    textColorH2: '#666666',
    textColorDes: '#999999',
    borderColor: '#EFEFF4',

};