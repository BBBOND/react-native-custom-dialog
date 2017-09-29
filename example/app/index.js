/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';
import CustomDialog from 'react-native-custom-dialog';

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class index extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <CustomDialog ref={customDialog => {
                        this.customDialog = customDialog
                    }}/>
                    <Button title="图片头部 + 标题" onPress={this.onButtonPress(1)}/>
                    <Button title="图片头部 + 内容" onPress={this.onButtonPress(2)}/>
                    <Button title="标题 + 内容" onPress={this.onButtonPress(3)}/>
                    <Button title="只有标题" onPress={this.onButtonPress(4)}/>
                    <Button title="只有内容" onPress={this.onButtonPress(5)}/>
                    <Button title="标题 + 内容图片 + 内容" onPress={this.onButtonPress(6)}/>
                    <Button title="标题 + 内容 + 竖直排列按钮" onPress={this.onButtonPress(7)}/>
                    <Button title="自定义内容" onPress={this.onButtonPress(8)}/>
                </View>
            </ScrollView>
        );
    }

    onButtonPress = (type) => () => {
        this.customDialog.reset();
        switch (type) {
            case 1:
                this.customDialog.show({
                    headerImg: require('../assets/img2.png'),
                    title: "图片头部 + 标题",
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                });
                break;
            case 2:
                this.customDialog.show({
                    headerImg: require('../assets/img2.png'),
                    title: '',
                    content: "图片头部 + 内容",
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
            case 3:
                this.customDialog.show({
                    title: '标题',
                    content: "内容",
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
            case 4:
                this.customDialog.show({
                    title: '只有标题',
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
            case 5:
                this.customDialog.show({
                    content: "只有内容",
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
            case 6:
                this.customDialog.show({
                    title: '标题',
                    contentImg: require('../assets/img1.png'),
                    content: "内容",
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
            case 7:
                this.customDialog.show({
                    title: '标题',
                    content: "内容 + 竖直排列按钮",
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: false,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
            case 8:
                this.customDialog.show({
                    title: '标题',
                    content: this.getCustomView(),
                    actions: [
                        {name: "确定", style: {color: "#0b80bb"}},
                        {name: "取消"},
                    ],
                    horizontal: true,
                    cancelable: true,
                    contentStyle: {textAlign: 'center'},
                });
                break;
        }
    };

    getCustomView() {
        return (
            <ScrollView style={{maxHeight: SCREEN_HEIGHT / 2}}>
                <View style={styles.customWrapper}>
                    {
                        [
                            'item1',
                            'item2',
                            'item3',
                            'item4',
                            'item5',
                            'item6',
                            'item7',
                            'item8',
                            'item9',
                            'item10'
                        ].map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{
                                    flex: 1,
                                    backgroundColor: '#00aaaa',
                                    paddingVertical: 10,
                                    marginTop: index === 0 ? 0 : 1
                                }}>
                                    <Text style={{textAlign: 'center'}}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        height: SCREEN_HEIGHT,
    },
    customWrapper: {
        flex: 1,
        flexDirection: 'column',
    }
});
