import { View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView, Pressable, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Sheet } from '../../../components'
import { Search } from '../../../components/search'
import { Formik } from 'formik'
import * as yup from 'yup'
import { launchImageLibrary } from 'react-native-image-picker';



export function SellGiftCard() {
    const cards = ['Amazon card', 'D card']
    const schema = yup.object({
        amount: yup.number().required('Amount is required'),
        uwillget: yup.number().required('Amount is required'),
        ecode: yup.string(),
    })

    const [photos, setPhotos] = React.useState<any>(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, (response) => {
            if (response.assets) {
                setPhotos(response.assets)
            }
        })
    };

    const _filter = (index: number) => {
        // @ts-ignore
        const newPhotos = photos.filter(i => i !== photos[index])
        setPhotos(newPhotos)
    }

    const [selected, setSelected] = useState('')
    return (
        <View>
            <Text className="font-['Inter-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Sell gift card</Text>

            <Formik
                initialValues={{ amount: '', uwillget: '', ecode: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View className="space-y-0">
                        <Search title='Select your card' items={cards} onSelect={setSelected} selected={selected} />
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount</Text>
                            <TextInput
                                className="rounded-lg px-4 h-14 w-full text-light font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amount')}
                                onBlur={handleBlur('amount')}
                                value={values.amount}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amount}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">You will get</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('uwillget')}
                                onBlur={handleBlur('uwillget')}
                                value={values.uwillget}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.uwillget}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Ecode</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('ecode')}
                                onBlur={handleBlur('ecode')}
                                value={values.ecode}
                                placeholder="324"
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.ecode}</Text>
                        </View>
                        <TouchableOpacity className='flex justify-center items-center space-y-2 border-2 border-dashed border-[#4A3FBC] p-4' style={{ borderRadius: 10, borderStyle: 'dotted' }} onPress={handleChoosePhoto}>
                            <Image source={require('../../../assets/export.png')} className="h-7 w-7" />
                            <Text className="font-['Inter-Medium'] text-black text-xs bg-white z-10 px-2">Upload images</Text>
                        </TouchableOpacity>
                        {/* Show preview */}
                        <FlatList
                            data={photos}
                            horizontal
                            className='py-2.5'
                            renderItem={({ item, index }) =>
                                <View className='mt-3'>
                                    <Image
                                        key={item?.uri}
                                        source={{ uri: item?.uri }}
                                        className="h-24 w-[109px] rounded-lg object-cover m-1"
                                    />
                                    <TouchableOpacity className='flex items-center justify-center absolute top-3 right-3 bg-slate-500 p-1.5 rounded-lg' onPress={() => _filter(index)}>
                                        <Image source={require('../../../assets/Vector.png')} className="h-3 w-3" />
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <View className="flex flex-row items-center justify-center">
                            <Text className="font-['Inter-Medium'] text-slate-400 text-sm text-center my-6">By continuing, you agree to accept our <Text className='text-main'>Privacy Policy</Text> & <Text className='text-main'>Terms of Conditions</Text> </Text>
                        </View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text className="text-white uppercase font-['Inter-Bold'] bg-[#241C71] text-center p-4 rounded-lg w-full my-4">sell gift card</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export function SellBitcoin({ navigation }: { navigation?: any }) {
    const schema = yup.object({
        amountInUSD: yup.number().required('Amount is required'),
        amountInBTC: yup.number().required('Amount is required'),
        destinationAddress: yup.string().required('Destination address is required'),
        uwillget: yup.number().required('Amount is required'),
        extraInfo: yup.string(),

    })
    const [photos, setPhotos] = React.useState<any>(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, (response) => {
            if (response.assets) {
                setPhotos(response.assets)
            }
        })
    };
    const _filter = (index: number) => {
        // @ts-ignore
        const newPhotos = photos.filter(i => i !== photos[index])
        setPhotos(newPhotos)
    }
    const [selected, setSelected] = useState('')
    return (
        <View>
            <Text className="font-['Inter-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Sell bitcoin from external wallet</Text>

            {/* Form starts */}
            <Formik
                initialValues={{ amountInUSD: '', amountInBTC: '', destinationAddress: '', uwillget: '', extraInfo: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View className="space-y-0">
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount in USD ($)</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amountInUSD')}
                                onBlur={handleBlur('amountInUSD')}
                                value={values.amountInUSD}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amountInUSD}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount in BTC</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amountInBTC')}
                                onBlur={handleBlur('amountInBTC')}
                                value={values.amountInBTC}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amountInBTC}</Text>
                        </View>

                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">You will get</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('uwillget')}
                                onBlur={handleBlur('uwillget')}
                                value={values.uwillget}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.uwillget}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Destination Address</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('destinationAddress')}
                                onBlur={handleBlur('destinationAddress')}
                                value={values.destinationAddress}
                                placeholder="0x3g343g343"
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.destinationAddress}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Extra Information</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('extraInfo')}
                                onBlur={handleBlur('extraInfo')}
                                value={values.extraInfo}
                                placeholder=""
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.extraInfo}</Text>
                        </View>
                        {/* Upload Image */}
                        <TouchableOpacity className='flex justify-center items-center space-y-2 border-2 border-dashed border-[#4A3FBC] p-4' style={{ borderRadius: 10, borderStyle: 'dotted' }} onPress={handleChoosePhoto}>
                            <Image source={require('../../../assets/export.png')} className="h-7 w-7" />
                            <Text className="font-['Inter-Medium'] text-black text-xs bg-white z-10 px-2">Upload images</Text>
                        </TouchableOpacity>
                        {/* Show preview */}
                        <FlatList
                            data={photos}
                            horizontal
                            className='py-2.5'
                            renderItem={({ item, index }) =>
                                <View className='mt-3'>
                                    <Image
                                        key={item?.uri}
                                        source={{ uri: item?.uri }}
                                        className="h-24 w-[109px] rounded-lg object-cover m-1"
                                    />
                                    <TouchableOpacity className='flex items-center justify-center absolute top-3 right-3 bg-slate-500 p-1.5 rounded-lg' onPress={() => _filter(index)}>
                                        <Image source={require('../../../assets/Vector.png')} className="h-3 w-3" />
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <View className="flex flex-row items-center justify-center">
                            <Text className="font-['Inter-Medium'] text-slate-400 text-sm text-center my-6">By continuing, you agree to accept our <Text className='text-main'>Privacy Policy</Text> & <Text className='text-main'>Terms of Conditions</Text> </Text>
                        </View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text className="text-white uppercase font-['Inter-Bold'] bg-[#241C71] text-center p-4 rounded-lg w-full my-4">sell gift card</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export function PayInfo({ navigation }: { navigation?: any }) {
    const [selected, setSelected] = useState('')
    const [secure, setSecure] = useState<boolean>(true)
    const schema = yup.object({
        bankName: yup.string().required('Bank name is required'),
        accountName: yup.string().required('Account name is required'),
        accountNumber: yup.string().required('Account number is required'),
        password: yup
            .string()
            .required('Please Enter your password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
    })
    return (
        <View>
            <Text className="font-['Inter-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Change payment details</Text>

            <Formik
                initialValues={{ bankName: '', accountName: '', accountNumber: '', password: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View className="space-y-0">
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Bank name</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('bankName')}
                                onBlur={handleBlur('bankName')}
                                value={values.bankName}
                                placeholder=""
                                keyboardType='default'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.bankName}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Account name</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('accountName')}
                                onBlur={handleBlur('accountName')}
                                value={values.accountName}
                                placeholder=""
                                keyboardType='default'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.bankName}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Account number</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('accountNumber')}
                                onBlur={handleBlur('accountNumber')}
                                value={values.accountNumber}
                                placeholder=""
                                keyboardType='decimal-pad'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.accountNumber}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Password</Text>
                            <View className="w-full">
                                <TextInput
                                    className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                    secureTextEntry={secure}
                                    autoCorrect={false}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="***********"
                                    placeholderTextColor={'#E4E3E8'}
                                />
                                <TouchableOpacity className="absolute right-2 top-0 bottom-0 w-10 h-full flex items-center justify-center" onPress={() => setSecure(!secure)}>
                                    <Image source={!secure ? require('../../../assets/eye.png') : require('../../../assets/eye-off.png')} className="h-6 w-6" />
                                </TouchableOpacity>
                            </View>
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.password}</Text>
                        </View>

                        <TouchableOpacity onPress={handleSubmit}>
                            <Text className="text-white uppercase font-['Inter-Bold'] bg-[#241C71] text-center p-4 rounded-lg w-full my-4">Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}
export function Recharge({ navigation }: { navigation?: any }) {
    const schema = yup.object({
        phoneNumber: yup.number().required('Phone number is required'),
        amountInUSD: yup.number().required('Amount is required'),
        amountInTotal: yup.number().required('Amount is required'),
        amountInUSDwithVAT: yup.number().required('Amount is required'),
        amountInBTC: yup.number().required('Amount is required'),
        destinationAddress: yup.string().required('Destination address is required'),
        uwillget: yup.number().required('Amount is required'),
        extraInfo: yup.string(),

    })
    const [selected, setSelected] = useState('')
    return (
        <View>
            <Text className="font-['Inter-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Mobile Recharge</Text>
            <Search title='Select operator' items={['A', 'B', 'C']} onSelect={setSelected} selected={selected} />

            <Formik
                initialValues={{ phoneNumber: '', amountInTotal: '', amountInUSD: '', amountInUSDwithVAT: '', amountInBTC: '', destinationAddress: '', uwillget: '', extraInfo: '' }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View className="space-y-0">
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Phone number</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                                placeholder="324"
                                keyboardType='phone-pad'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.phoneNumber}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount in USD ($)</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amountInUSD')}
                                onBlur={handleBlur('amountInUSD')}
                                value={values.amountInUSD}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amountInUSD}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount in USD (with VAT)</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amountInUSDwithVAT')}
                                onBlur={handleBlur('amountInUSDwithVAT')}
                                value={values.amountInUSDwithVAT}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amountInUSDwithVAT}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount in BTC</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amountInBTC')}
                                onBlur={handleBlur('amountInBTC')}
                                value={values.amountInBTC}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amountInBTC}</Text>
                        </View>

                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Amount in total</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('amountInTotal')}
                                onBlur={handleBlur('amountInTotal')}
                                value={values.amountInTotal}
                                placeholder="324"
                                keyboardType='numeric'
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.amountInTotal}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Destination Address</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('destinationAddress')}
                                onBlur={handleBlur('destinationAddress')}
                                value={values.destinationAddress}
                                placeholder="0x3g343g343"
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.destinationAddress}</Text>
                        </View>
                        <View className="group flex items-start">
                            <Text className="group-focus:-translate-y-5 font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">Extra Information</Text>
                            <TextInput
                                className="rounded-lg border-2 border-[#4A3FBC] h-14 px-4 w-full text-black font-['Inter-SemiBold'] text-sm"
                                onChangeText={handleChange('extraInfo')}
                                onBlur={handleBlur('extraInfo')}
                                value={values.extraInfo}
                                placeholder=""
                                placeholderTextColor={'#E4E3E8'}
                            />
                            <Text className="font-['Inter-Medium'] text-red-500 text-xs bg-white px-2">{errors.extraInfo}</Text>
                        </View>

                        <View className="flex flex-row items-center justify-center">
                            <Text className="font-['Inter-Medium'] text-slate-400 text-sm text-center my-6">By continuing, you agree to accept our <Text className='text-main'>Privacy Policy</Text> & <Text className='text-main'>Terms of Conditions</Text> </Text>
                        </View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text className="text-white uppercase font-['Inter-Bold'] bg-[#241C71] text-center p-4 rounded-lg w-full my-4">Recharge</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}