import React, { Component } from 'react';
import { Animated } from 'react-native';
import FastImage from 'react-native-fast-image'

class PXImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageScaleValue: new Animated.Value(0),
    }
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
    const { style, uri, ...otherProps } = this.props;
    return (
      <Animated.View
        style={{
          opacity: this.state.imageScaleValue
        }}
      >
        <FastImage
          source={{
            uri,
            headers: {
              referer: 'http://www.pixiv.net',
            },
          }}
          onLoadEnd={this.onImageLoadEnd}
          style={style}
          {...otherProps}
        />
      </Animated.View>
      
    );
  }
}

export default PXImage;
