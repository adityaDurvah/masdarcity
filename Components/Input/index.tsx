import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Dropdown } from '../Dropdown'

interface InputComponentProps {
    handleChange: (name: string) => (value: string) => void
    handleBlur: (name: string) => () => void
    values: any
    errors: any
    touched: any
    inputProps: any
}

export const Input = (props: InputComponentProps) => {
    const { handleChange, handleBlur, values, errors, touched, inputProps } = props
    let Component: React.ComponentType<any>
    switch (props.inputProps.type) {
        case 'text':
            Component = TextInput
            break
        case 'password':
            Component = TextInput
            break
        case 'dropdown':
            Component = (props) => <Dropdown {...props} onChange={handleChange(name)} />
            break;
        default:
            Component = TextInput
    }
    const { name, label, required } = inputProps
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