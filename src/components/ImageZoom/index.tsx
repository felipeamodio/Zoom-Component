import React, {useState, useRef, createRef} from 'react';
import {Animated, ImageProps} from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import * as S from './styles';

const ImageZoom = ({style, ...props}: ImageProps) => {
  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale},
      },
    ],
    {useNativeDriver: true},
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePinchStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }
    const valueScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (valueScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        setPanEnabled(false);
      }
    }
  };

  return (
    <S.Container>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside>
        <S.AnimatedView>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}>
            <S.AnimatedImage
              {...props}
              style={[
                style,
                {transform: [{scale}, {translateX}, {translateY}]},
              ]}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </S.AnimatedView>
      </PanGestureHandler>
    </S.Container>
  );
};

export default ImageZoom;
