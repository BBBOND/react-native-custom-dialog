import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import {Size, SCREEN_HEIGHT, SCREEN_WIDTH, dimension, themeColor} from './Style';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
const DIALOG_WIDTH = Math.floor(294 / 375 * SCREEN_WIDTH);

/**
 * 使用方法
 * this.CustomDialog.show({
 *          headerImg: require('顶部区域图片uri'),
 *          title: "标题",
 *          content: "内容",
 *          actions: [
 *              {name: "确定", func: () => {global.toast("确定") }, style: {color: "#0b80bb"}},
 *              {name: "取消"},
 *          ], // 按钮
 *          horizontal: true/false, // 按钮是否水平排列
 *          cancelable: true/false, // 是否可取消
 *          contentImg: require('内容区域图片uri'),
 *          contentStretch: true/false, // 内容区域是否可延展
 *          contentStyle: {}, // 内容区域包裹样式
 *          titleStyle: {}, // 标题区域包裹样式
 *      })
 */
export default class CustomDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            title: undefined,
            content: undefined,
            actions: [],
            cancelable: true,
            horizontal: true,
            headerImg: undefined,
            contentImg: undefined,
            contentStyle: undefined,
            titleStyle: undefined,
            contentStretch: true,
            headerImgHeight: 0,
        }
    }

    render() {
        return (
            <Modal
                animationType={'none'}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.hide}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.state.cancelable && this.hide}
                    style={styles.window}>
                    <TouchableOpacity
                        activeOpacity={1}>
                        <View>
                            {this.renderImageHeader()}
                            <View
                                style={[styles.dialogWrapper, !this.state.headerImg && styles.borderTopRadius]}>
                                {this.renderHeader()}
                                {this.renderImageContent()}
                                {this.renderContent()}
                                {this.renderBottomButton()}
                            </View>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    /**
     * Dialog图像的头部
     * @returns {*}
     */
    renderImageHeader() {
        return this.state.headerImg ?
            <View style={[{
                width: DIALOG_WIDTH,
                height: this.state.headerImgHeight,
                overflow: 'hidden',
                paddingHorizontal: 0,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'column'
            }, styles.borderTopRadius]}>
                <Image
                    resizeMode={'cover'}
                    source={this.state.headerImg}
                    style={[styles.imageTitle, styles.borderTopRadius, {height: this.state.headerImgHeight,margin: 0, paddingHorizontal: 0}]}
                />
            </View> : null
    }

    /**
     * Dialog头部标题
     * @returns {*}
     */
    renderHeader() {
        return this.state.title ?
            <View style={styles.headerWrapper}>
                {typeof this.state.title === 'string' ?
                    <Text style={[styles.H1, this.state.titleStyle ? this.state.titleStyle : null]}>
                        {this.state.title}
                    </Text> :
                    this.state.title
                }
            </View> : null;
    }

    /**
     * Dialog图片内容
     * @returns {*}
     */
    renderImageContent() {
        return this.state.contentImg ?
            <View style={{
                paddingHorizontal: Size(18),
                paddingTop: Size(3),
                paddingBottom: Size(9),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image resizeMode={'stretch'} source={this.state.contentImg}
                       style={{width: DIALOG_WIDTH - Size(36)}}/>
            </View> : null;
    }

    /**
     * Dialog内容
     * @returns {*}
     */
    renderContent() {
        return this.state.content ?
            <View style={[styles.contentWrapper, this.state.contentStretch && {alignItems: 'stretch'}]}>
                {
                    typeof this.state.content === 'string' ?
                        <Text
                            style={[styles.p, {marginHorizontal: Size(13),}, this.state.contentStyle]}>{this.state.content}</Text> :
                        this.state.content
                }
            </View> : null
    }

    /**
     * Dialog底部按钮
     * @returns {XML}
     */
    renderBottomButton() {
        return (
            <View style={[styles.buttonWrapper, {
                flexDirection: this.state.horizontal ? 'row' : 'column',
                height: this._getBottomGroupHeight(),
                marginTop: Size(15),
            }]}>
                {this.state.actions && this.state.actions.length > 0 ? this.renderButton() : this.renderDefaultButton()}
            </View>
        )
    }

    /**
     * Dialog自定义按钮
     * @returns {Array}
     */
    renderButton() {
        return (
            this.state.actions.map((action, index) => {
                return (
                    <View key={index} style={[styles.defaultButtonWrapper, {
                        borderRightWidth: this.state.horizontal ? (this.state.actions.length > 1 && index !== this.state.actions.length - 1 ? dimension.borderHeight : 0) : 0,
                        borderRightColor: themeColor.borderColor,
                        borderBottomWidth: this.state.horizontal ? 0 : (this.state.actions.length > 1 && index !== this.state.actions.length - 1 ? dimension.borderHeight : 0),
                        borderBottomColor: themeColor.borderColor,
                    }]}>
                        <TouchableOpacity
                            style={styles.defaultButton}
                            onPress={this._getFunc(action.func)}>
                            <Text
                                style={[styles.defaultButtonText, action.style ? action.style : null]}>{action.name}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    }

    /**
     * Dialog默认按钮
     * @returns {XML}
     */
    renderDefaultButton() {
        return (
            <View style={styles.defaultButtonWrapper}>
                <TouchableOpacity
                    style={styles.defaultButton}
                    onPress={this.hide}>
                    <Text style={styles.defaultButtonText}>确定</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // 获取按钮Group高度
    _getBottomGroupHeight = () => {
        if (this.state.horizontal) {
            return Size(54);
        } else if (this.state.actions && this.state.actions.length > 0) {
            return Size(54) * this.state.actions.length;
        } else {
            return Size(54);
        }
    };

    _getFunc = (func) => () => {
        func && func();
        this.hide();
    };

    reset = () => {
        this.setState({
            modalVisible: false,
            title: undefined,
            content: undefined,
            actions: [],
            cancelable: true,
            horizontal: true,
            headerImg: undefined,
            contentImg: undefined,
            contentStyle: undefined,
            titleStyle: undefined,
            contentStretch: true,
        })
    };

    hide = () => {
        this.setState({modalVisible: false});
    };

    show = (option) => {
        if (option && option.headerImg) {
            let source = resolveAssetSource(option.headerImg);
            this.setState({modalVisible: true, ...option, headerImgHeight: Math.floor((source.height / source.width) * DIALOG_WIDTH) });
        } else {
            this.setState({modalVisible: true, ...option});
        }
    }
}

const styles = StyleSheet.create({
    window: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    imageTitle: {
        width: DIALOG_WIDTH,
        opacity: 1,
        overflow: 'hidden'
    },
    dialogWrapper: {
        width: DIALOG_WIDTH,
        backgroundColor: themeColor.white,
        borderBottomLeftRadius: Size(8),
        borderBottomRightRadius: Size(8),
        paddingTop: Size(25),
    },
    borderTopRadius: {
        borderTopLeftRadius: Size(8),
        borderTopRightRadius: Size(8),
    },
    headerWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Size(9),
    },
    contentWrapper: {
        paddingHorizontal: Size(15),
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 10,
        // paddingBottom: 10,
    },
    buttonWrapper: {
        height: Size(54),
        flexDirection: 'row',
        borderTopWidth: dimension.borderHeight,
        borderTopColor: themeColor.borderColor,
    },
    defaultButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    defaultButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: Size(8),
        borderBottomRightRadius: Size(8),
        backgroundColor: themeColor.white,
    },
    defaultButtonText: {
        backgroundColor: themeColor.transparent,
        fontSize: Size(16),
        color: themeColor.textColorH1,
    },
    H1: {
        backgroundColor: themeColor.transparent,
        fontSize: Size(18),
        color: themeColor.textColorH1
    },
    p: {
        backgroundColor: themeColor.transparent,
        fontSize: Size(14),
        color: themeColor.textColorDes,
    },
});