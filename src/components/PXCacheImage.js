import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { globalStyleVariables } from '../styles';

class PXCacheImage extends Component {
  constructor(props) {
    super(props);
    let { width } = props;
    if (!width) width = globalStyleVariables.WINDOW_WIDTH;
    const height = 0;
    this.state = {
      width,
      height,
      imageScaleValue: new Animated.Value(0),
    };
  }

  onImageLoad = event => {
    const { uri, onFoundImageSize } = this.props;
    const { width, height } = event.nativeEvent;
    this.setState({
      width,
      height,
    });
    onFoundImageSize(width, height, uri);
  }

  onImageLoadEnd = () => {
    Animated.timing(this.state.imageScaleValue, {
      toValue: 1,
      duration: 200,
      delay: 5,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { uri, style, ...otherProps } = this.props;
    const { width, height } = this.state;
    return (
      <Animated.View
        style={{
          width: globalStyleVariables.WINDOW_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: this.state.imageScaleValue
          // backgroundColor: '#fff',
        }}
      >
        <FastImage
          source={{
            uri,
            headers: {
              referer: 'http://www.pixiv.net',
            },
          }}
          style={[
            {
              width:
                width > globalStyleVariables.WINDOW_WIDTH
                  ? globalStyleVariables.WINDOW_WIDTH
                  : width,
              height: (globalStyleVariables.WINDOW_WIDTH * height) / width,
            },
            style,
          ]}
          onLoad={this.onImageLoad}
          onLoadEnd={this.onImageLoadEnd}
          {...otherProps}
        />
      </Animated.View>
    );
  }
}

export default PXCacheImage;
