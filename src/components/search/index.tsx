/* eslint-disable no-undef */
import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
const { width } = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import assets from '../../assets';
import { Heading } from '../heading';
import { Img } from '../img';
import { s } from '../../utils/s'

export interface IToken {
  title: string;
  icon: string;
}

export interface ISearchProps {
  items: IToken[];
  selected: IToken
  title: string
  onSelect: (item: IToken) => void;
}

export const Search = ({ items, title, selected, onSelect }: ISearchProps) => {

  return (
    <View className='z-50'>
      <SelectDropdown
        data={items}
        onSelect={(selectedItem, index) => {
          console.log('selectedItem', selectedItem, index)
          onSelect(selectedItem)
        }}
        defaultButtonText={items[0].title}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selected.title;
        }}
        rowTextForSelection={(item, index) => {
          return item.title;
        }}
        buttonStyle={styles.dropdown2BtnStyle}
        renderDropdownIcon={isOpened => {
          return <View className='mr-1'><Img src={assets.Arrow_Down} className="opacity-30" size={16} /></View>;
        }}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
        search
        searchInputTxtColor='black'
        searchInputStyle={styles.dropdown2searchInputStyle}
        searchPlaceHolder={''}
        searchPlaceHolderColor={'#282a2e'}
        renderSearchInputLeftIcon={() => {
          return <Image source={{ uri: assets.Filter }} className="h-4 w-4 translate-x-1 translate-y-0.5" style={{ tintColor: '#94a3b8' }} />
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View className="flex flex-row items-center bg-transparent">
              <Image source={{ uri: selected.icon }} className="h-8 w-8" />
              <Heading className='text-lg ml-2'>{selected.title}</Heading>
            </View>
          );
        }}
        renderCustomizedRowChild={(selectedItem, index) => {
          return (
            <View className="flex flex-row items-center mx-3 bg-secondary">
              <Image source={{ uri: selectedItem.icon }} className="h-6 w-6" />
              <Heading className='text-sm ml-2'>{selectedItem.title}</Heading>
            </View>
          );
        }}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    backgroundColor: 'transparent',
    width: 115
  },
  dropdown2BtnTxtStyle: {
    fontFamily: 'Space Grotesk',
    fontWeight: '400',
    color: '#000000',
    backgroundColor: '#fff',
    textAlign: 'left',
    fontSize: 20,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#1A222D',
    borderRadius: 15,
    position: 'absolute',
    top: 50,
    left: width * 0.04,
    width: width * 0.92,
  },
  dropdown2RowStyle: {
    backgroundColor: '#232F3D',
    borderBottomColor: '#232F3D',
    borderBottomWidth: 1
  },
  dropdown2RowTxtStyle: {
    color: '#282a2e',
    textAlign: 'left',
    fontSize: 14,
  },
  dropdown2searchInputStyle: {
    backgroundColor: '#2B3A4A',
    borderRadius: 0,
    width: width - 32,

  },
});
