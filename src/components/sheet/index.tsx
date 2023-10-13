import { Text, TouchableOpacity, View, } from "react-native"
import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { forwardRef } from "react";

interface SheetProps {
    title: string,
    children: any,
    setIsOpen?: (value: boolean) => void,
    enablePanDownToClose?: boolean
    rightButton?: JSX.Element
}

export const Sheet = forwardRef(({ children, rightButton, title, setIsOpen, enablePanDownToClose = true }: SheetProps, ref: any) => {
    const _handle = () => {
        if (setIsOpen) setIsOpen(false)
    }

    return (
        <GestureHandlerRootView className="absolute top-0 bottom-0 left-0 right-0 bg-black/30">
            <TouchableOpacity className="absolute top-0 bottom-0 left-0 right-0" onPress={_handle} />
            <BottomSheet
                ref={ref}
                snapPoints={['92%']}
                enableHandlePanningGesture={enablePanDownToClose}
                enablePanDownToClose={enablePanDownToClose}
                handleIndicatorStyle={{ display: "none" }}
                backgroundStyle={{ backgroundColor: '#232F3D', padding: 0, margin: 0 }}
                onClose={_handle}
                keyboardBehavior="extend"
                enableOverDrag={false}
            >
                <BottomSheetView className="h-screen flex justify-between">
                    {children}
                </BottomSheetView>
            </BottomSheet>
            <TouchableOpacity />
        </GestureHandlerRootView>
    )
})
