import { Pressable, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import React, { memo, useState } from 'react'
import { Dropdown } from '../Dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import { Text } from '../Text';

interface InputComponentProps {
    handleChange: (name: string) => (value: string) => void
    handleBlur: (name: string) => () => void
    values: any
    errors: any
    touched: any
    inputProps: any
}

const CustomPhoneInput = memo((props: any) => (
    <TextInput
        keyboardType='phone-pad'
        {...props}
    />
));

const CustomDatePicker = ((props: any) => {
    const [open, setOpen] = useState(false)
    return (
        <SafeAreaView>
            <Pressable style={styles.dateContainer} onPress={() => { setOpen(true) }} >
                <Fontisto name="date" size={24} color="black" />
                <Text style={styles.dateText} >{props.value || 'Select Date'}</Text>
            </Pressable>
            {open && <DateTimePicker
                testID="dateTimePicker"
                value={props.value || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(_, date) => {
                    setOpen(false);
                    props.onChange(date?.toLocaleDateString())
                }}
            />}
        </SafeAreaView>
    )
})

const TextArea = (props: any) => <TextInput {...props} multiline={true} />
export const Input = (props: InputComponentProps) => {
    const { handleChange, handleBlur, values, errors, touched, inputProps } = props
    const { name, label, required } = inputProps
    let Component: React.ComponentType<any>
    switch (props.inputProps.type) {
        case 'email':
            Component = (props) => <TextInput {...props} keyboardType='email-address' />
        case 'text':
            Component = TextInput
            break
        case 'textarea':
        case 'address':
            Component = TextArea
            break;
        case 'password':
            Component = TextInput
            break
        case 'phone':
        case 'mobile':
        case 'number':
            Component = CustomPhoneInput
            break
        case 'dropdown':
            Component = (props) => <Dropdown onChange={handleChange(name)} {...props} />
            break;
        case 'date':
            Component = (props) => <CustomDatePicker onChange={handleChange(name)} {...props} />
            break;
        default:
            Component = TextInput
    }

    return (
        <View>
            <Text style={styles.label}>{required ? <Text style={{ color: 'red' }}>*</Text> : null} {label}</Text>
            <Component
                {...inputProps}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={values[name]}
                style={styles.input}
            />
            {errors[name] ? <Text style={styles.errorText}>{errors[name]}</Text> : null}
        </View>
    )
}


const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
        justifyContent: 'flex-start',
        padding: 8,
    },
    dateText: {
        marginLeft: 10,
        width: '65%',
    },
    label: {
        fontSize: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
        padding: 8,
    },
    errorText: {
        color: 'red',
        marginLeft: 10,
    },
})