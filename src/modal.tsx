import { Stack } from 'native-x-stack'
import { COLOR, ContainerStyleProps } from 'native-x-theme'
import React from 'react'
import { Platform } from 'react-native'
import RNModal from 'react-native-modal'
import { styles as s } from 'tachyons-react-native'
import { ModalCloseButton } from './modal-close-button'
import { ModalOverlay } from './modal-overlay'

export interface ModalProps extends ContainerStyleProps {
  children?: any
  visible?: boolean
  showClose?: boolean
  onClose?: () => void
  width?: number
}

export function Modal({ children, visible, onClose, width, showClose, ...props }: ModalProps) {
  const styles = React.useMemo(
    () => ({
      container: [s.selfCenter, { width: width ?? 'fit-content' }] as any,
    }),
    [width],
  )

  return (
    <RNModal
      coverScreen
      isVisible={visible}
      onModalHide={onClose}
      onBackdropPress={onClose}
      backdropOpacity={Platform.OS !== 'web' ? 1 : undefined}
      useNativeDriver={Platform.OS !== 'web'}
      useNativeDriverForBackdrop={Platform.OS !== 'web'}
      avoidKeyboard
      customBackdrop={<ModalOverlay />}
    >
      <Stack
        alignCenter
        alignMiddle
        backgroundColor={COLOR.PRIMARY}
        borderRadius='large'
        width={width}
        style={styles.container}
        {...props}
      >
        {children}
        {showClose && <ModalCloseButton onTap={onClose} />}
      </Stack>
    </RNModal>
  )
}
