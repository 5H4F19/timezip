import { Animated, Dimensions, FlatList, StyleSheet, Easing, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Circle, G, Svg } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import assets from '../../assets';
import { s } from '../../utils/s';
import { routes } from '../../constants';


interface ISlide {
    id: number,
    title: string,
    description: string,
    image: any
}

const slides: ISlide[] = [
    {
        id: 2,
        title: 'Explore the world of Cryptocurrency',
        description: 'Discover a wide range of cryptocurrencies and tokens. Start managing your digital asset with ease.',
        image: assets.Explore
    },
    {
        id: 1,
        title: 'Keep your keys safe',
        description: 'Your private keys are your assess to your digital assets. We’ll help you keep them secure.',
        image: assets.Secure
    }
]


export const Onboarding = ({ navigation }: { navigation: any }) => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<any>(null);
    const handleOnScroll = (event: any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const handleNext = () => {
        if (index < slides.length - 1 && slidesRef.current) {
            slidesRef.current.scrollToIndex({ index: index + 1 });
        } else {
            navigation.navigate(routes.BOTTOM_TAB)
        }
    }

    return (
        <LinearGradient
            className='flex-1'
            colors={['#2D3654', '#181B33']}>
            <View className='flex-1'>
                <View className='flex-[3.6]'>
                    <FlatList
                        data={slides}
                        ref={slidesRef}
                        renderItem={({ item }) => <SlideItem item={item} />}
                        horizontal
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onScroll={handleOnScroll}
                        onViewableItemsChanged={handleOnViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                    />
                </View>
                <View className='items-center justify-center'>
                    {/* <Pagination data={slides} scrollX={scrollX} index={index} /> */}
                    <NextButton scrollTo={handleNext} percentage={(index + 1) * (100 / slides.length)} />
                </View>
            </View>
        </LinearGradient>
    );
};





const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }: { item: any }) => {

    return (
        <View className='flex-1 justify-around items-center m-0 p-0' style={{ width }}>
            <View className='h-96 w-full'>
                <Image className='translate-y-10 scale-90' source={{ uri: item.image }} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
            </View>
            <View className="w-[90%] space-y-4">
                <Text style={[s.semibold]} className="text-3xl text-light text-center px-4 rounded-lg w-full">{item.title}</Text>
                <Text style={[s.medium]} className="text-[#7E8CBA] text-center px-4 rounded-lg w-full">{item.description}</Text>
            </View>
        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: 'center',
        margin: 0,
        padding: 0
    },
    image: {
        flex: 0.9,
        width: '100%',
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        marginVertical: 12,
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    container2: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: '#000',
    },
});


const Pagination = ({ data, scrollX, index }: { data: any, scrollX: any, index: number }) => {
    return (
        <View className='flex flex-row justify-center'>
            {data.map((_: any, idx: number) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#ccc', '#000', '#ccc'],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor },
                            // idx === index && styles.dotActive,
                        ]}
                    />
                );
            })}
        </View>
    );
};


const NextButton = ({ percentage, scrollTo }: { percentage: number, scrollTo: any }) => {
    const size = 80;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth * 2;
    const circumference = radius * 2 * Math.PI;

    const progress = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);

    const animation = (toValue: number) => {
        return Animated.timing(progress, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animation(percentage)
    }, [percentage])

    useEffect(() => {
        progress.addListener((v) => {
            if (progressRef?.current) {
                const maxPerc = 100 - percentage;
                const strokeDashoffset = circumference - (circumference * v.value) / 100;
                if (progressRef?.current !== null) {
                    progressRef.current.setNativeProps({
                        strokeDashoffset
                    })
                }
            }
        })
        return () => {
            progress.removeAllListeners()
        }
    })


    return <View className="mb-7 justify-center items-center">
        <Svg width={size} height={size} fill="red">
            <G rotation="-90" origin={center}>
                <Circle stroke={"#7E8CBA"} fill="none" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                <Circle ref={progressRef} stroke={"#D5EDFF"} fill="none" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={circumference - (circumference * 75) / 100} />
            </G>
        </Svg>
        <TouchableOpacity onPress={scrollTo} className="absolute bg=[#f4338f] rounded-full p-4">
            <Text style={[s.light]} className="text-light font-['Inter-Bold']">Next</Text>
        </TouchableOpacity>
    </View>

}
