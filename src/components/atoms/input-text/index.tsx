import { Text, fontFamilyMapper, fontSizeMapper } from '@/components/atoms/text';
import React, { useEffect, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import colors from 'tailwindcss/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { cn, getFontSizeByScale } from '@/utils';
import { InputTextInterface } from './index.type';
import { InputErrorMessage } from '../input-error-message';

export const InputText = (props: InputTextInterface) => {
  const {
    value,
    onBlur,
    isNumerical,
    isTextArea,
    placeholder,
    onChangeText,
    maxLength,
    numberOfLines = 10,
    isDisabled = false,
    error,
    isSecureTextEntry,
    prefixIcon,
    suffixIcon,
    onDelete,
    maxHeightTextArea,
    label,
    containerClassName,
    keyboardType,
    isFocus: isFocusProp,
    autoCapitalize,
    autoCorrect = false
  } = props

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (isFocusProp !== undefined) setIsFocus(isFocusProp)
  }, [isFocusProp])

  return (
    <View className={cn('relative', containerClassName)}>
      {label &&
        <Text label={label} textClassName='mb-1' />
      }
      <View className={cn('flex flex-row text-sm border rounded-lg',
        error ? 'border-red-500' : isFocus ? 'border-blue-500' : 'border-gray-400',
        isDisabled ? 'text-gray-400 bg-gray-200' : 'bg-white text-gray-700',
        'p-0'
      )}>
        {prefixIcon && (
          <TouchableOpacity className='pl-3 flex items-center justify-center'>
            {prefixIcon}
          </TouchableOpacity>
        )}
        <TextInput
          maxLength={maxLength}
          value={value}
          onChangeText={(newText) => {
            onChangeText && onChangeText(isNumerical ? newText.replace(/[^0-9]/g, '') : newText);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setIsFocus(false);
          }}
          keyboardType={keyboardType}
          multiline={isTextArea}
          numberOfLines={isTextArea ? numberOfLines : 1}
          textAlignVertical={isTextArea ? 'top' : 'center'}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[400]}
          autoCapitalize={autoCapitalize}
          allowFontScaling={false}
          autoCorrect={autoCorrect}
          underlineColorAndroid="transparent"
          editable={!isDisabled}
          secureTextEntry={isSecureTextEntry ? showPassword : false}
          onFocus={() => {
            setIsFocus(true);
          }}
          style={{
            maxHeight: isTextArea ? maxHeightTextArea ?? 200 : undefined,
            fontFamily: fontFamilyMapper['regular'],
            fontSize: getFontSizeByScale(fontSizeMapper['medium']),

          }}
          className={'py-2 px-3 flex-1 text-gray-700'}
        />
        {onDelete && value !== '' && (
          <TouchableOpacity
            className='pr-3 flex items-center justify-center'
            onPress={onDelete}
          >
            <AntDesign name="close" color={colors.gray[400]} size={16} />
          </TouchableOpacity>
        )}
        {suffixIcon && (
          <TouchableOpacity className='pr-3 flex items-center justify-center'>
            {suffixIcon}
          </TouchableOpacity>
        )}
        {isSecureTextEntry && (
          <TouchableOpacity className='pr-3 flex items-center justify-center'
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={16} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <InputErrorMessage error={error} />
      )}
    </View>
  );
};

