import { Animated, Dimensions, FlatList, StyleSheet, Easing, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Circle, G, Svg } from 'react-native-svg';


interface ISlide {
    id: number,
    title: string,
    description: string,
    image: any
}

const slides: ISlide[] = [
    {
        id: 1,
        title: 'Welcome',
        description: 'Welcome to GC Buying, The App meets all your gift card exchange needs',
        image: require('../../assets/welcome.png')
    },
    {
        id: 2,
        title: 'Gift Card Exchange',
        description: 'Get Amazing rates and instant payment for your gifts cards',
        image: require('../../assets/exchange.png')
    }
]


export const Slider = () => {
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
            console.log('appear verify button')
        }
    }

    return (
        <View className='flex-1 bg-white'>
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
            <View className='flex-[1] items-center justify-center'>
                <Pagination data={slides} scrollX={scrollX} index={index} />
                <NextButton scrollTo={handleNext} percentage={(index + 1) * (100 / slides.length)} />
            </View>
        </View>
    );
};





const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }: { item: any }) => {

    return (
        <View style={styles.container}>
            <Image className='translate-y-10' source={item.image} style={[styles.image, { width: item.id === 1 ? width - 30 : width, resizeMode: item.id === 1 ? 'contain' : 'cover', }]} />
            <View className="">
                <Text className="text-3xl font-['Inter-Bold'] text-center my-2 text-[#241C71]">{item.title}</Text>
                <Text className="text-xs text-gray-400 text-center font-['Inter-SemiBold'] px-10">{item.description}</Text>
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
    const size = 100;
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


    return <View className="flex-1 justify-center items-center">
        <Svg width={size} height={size} fill="red">
            <G rotation="-90" origin={center}>
                <Circle stroke={"#DFFFF7"} fill="none" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                <Circle ref={progressRef} stroke={"#5BE7C3"} fill="none" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={circumference - (circumference * 75) / 100} />
            </G>
        </Svg>
        <TouchableOpacity onPress={scrollTo} className="absolute bg=[#f4338f] rounded-full p-4">
            <Text className="text-[#5BE7C3] font-['Inter-Bold']">Next</Text>
        </TouchableOpacity>
    </View>

}
