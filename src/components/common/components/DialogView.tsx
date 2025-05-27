import {FC, ReactNode} from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {Animation, CustomAnimation} from 'react-native-animatable';
import Modal from 'react-native-modal';
import {Direction} from 'react-native-modal/dist/types';

type DialogViewProps = {
  coverScreen?: boolean;
  isVisible: boolean;
  swipeDirection?: Direction | Array<Direction> | undefined;
  propagateSwipe?: boolean | undefined;
  animationIn?: Animation | CustomAnimation | undefined;
  animationInTiming?: number | undefined;
  animationOut?: Animation | CustomAnimation | undefined;
  animationOutTiming?: number | undefined;
  avoidKeyboard?: boolean;
  scrollHorizontal?: boolean;
  modalStyle: StyleProp<ViewStyle>;
  onBackButtonPress: () => void;
  onBackdropPress: () => void; //press outside handler
  onSwipeComplete: () => void; //swipe handler
  onModalHide: () => void;
  onModalShow?: () => void;
  children: ReactNode;
};

export const DialogView: FC<DialogViewProps> = ({
  coverScreen,
  isVisible,
  onModalHide,
  onModalShow,
  onBackdropPress,
  onSwipeComplete,
  onBackButtonPress,
  children,
  swipeDirection = ['up', 'down'], //the direction where the modal can be swiped
  propagateSwipe = false, //Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
  scrollHorizontal = false, //if horizontal scrollView needed
  animationIn = 'slideInUp', //full naming on https://github.com/oblador/react-native-animatable
  animationInTiming = 400,
  animationOut = 'slideOutDown', //full naming on https://github.com/oblador/react-native-animatable
  animationOutTiming = 400,
  avoidKeyboard = false,
  modalStyle = {},
}) => {
  const {width} = useWindowDimensions();
  return (
    <Modal
      coverScreen={coverScreen}
      backdropTransitionOutTiming={0}
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={Dimensions.get('screen').height}
      swipeDirection={swipeDirection}
      style={[styles.modalStyle, modalStyle]}
      propagateSwipe={propagateSwipe}
      onModalHide={onModalHide}
      onModalShow={() => {
        if (onModalShow) {
          onModalShow();
        }
      }}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onSwipeComplete}
      onBackButtonPress={onBackButtonPress}
      scrollHorizontal={scrollHorizontal}
      statusBarTranslucent
      animationIn={animationIn}
      animationInTiming={animationInTiming}
      animationOut={animationOut}
      animationOutTiming={animationOutTiming}
      avoidKeyboard={avoidKeyboard}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
});

export default DialogView;
