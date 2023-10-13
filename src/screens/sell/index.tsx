import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Header } from "../../components"
import { routes } from "../../constants"
import { Formik } from "formik"
import * as Yup from 'yup'
import assets from "../../assets"
import { Heading } from "../../components/heading"
import { Container } from "../../components/container"
import { Button } from "../../components/button"

const schema = Yup.object().shape({
    amount: Yup.string().required('Amount is required'),
    address: Yup.string().required('Address is required'),
})

export const Sell = ({ navigation }: { navigation: any }) => {
    return (
        <Container>
            <Header title={routes.SELL} navigation={navigation} />
            <View className="flex-1 mx-5">
                <Formik
                    initialValues={{ address: '', amount: '200' }}
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        actions.resetForm()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View className="flex-1 justify-between space-y-2 my-9">
                            <View className="space-y-2">
                                <View className="group flex flex-row items-center">
                                    <Text className="text-light bg-primary font-['Inter-SemiBold'] text-4xl">QPQ</Text>
                                    <TextInput
                                        className="bg-primary rounded-lg w-full text-light font-['Inter-SemiBold'] text-4xl"
                                        onChangeText={handleChange('amount')}
                                        onBlur={handleBlur('amount')}
                                        value={values.amount}
                                        multiline
                                        placeholder="Enter amount"
                                        autoFocus
                                        keyboardType='numeric'
                                        placeholderTextColor={'#42536F'} />
                                    {/* <Text className="font-['Inter-Medium'] text-red-500 text-xs px-2">{errors.amount}</Text> */}
                                </View>
                                <View className="flex flex-row justify-between">
                                    <View className="w-[47%] bg-secondary p-2 rounded-xl">
                                        <View className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
                                            <Image source={{ uri: assets.Dollar }} className="h-6 w-6" />
                                        </View>
                                        <Text className="text-light/70 font-['Inter-SemiBold'] text-xl my-2">{values.amount}</Text>
                                        <Heading className="bg-primary/50 uppercase px-3 py-1 text-xs rounded-md text-center">Dollar</Heading>

                                    </View>
                                    <View className="w-[47%] bg-secondary p-2 rounded-xl">
                                        <View className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
                                            <Image source={{ uri: assets.Qpq }} className="h-6 w-6" />
                                        </View>
                                        <Text className="text-light/70 font-['Inter-SemiBold'] text-xl my-2">{values.amount}</Text>
                                        <Heading className="bg-primary/50 uppercase px-3 py-1 text-xs rounded-md text-center">QPQ</Heading>
                                    </View>
                                </View>
                            </View>

                            <Button onPress={() => { }}>Next</Button>
                        </View>
                    )}
                </Formik>
            </View>
        </Container>
    )
}