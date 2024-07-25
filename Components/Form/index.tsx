import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../Input';
import colors from '../../Styles/colors';


interface FormProps {
    inputProps: [any]
    navigation: any
    data?: any
}

export const Form: React.FC<FormProps> = ({ inputProps, navigation, data = {} }) => {
    const obj: any = {}
    inputProps.forEach(({ name, required }) => {
        obj[name] = Yup.string()
        if (required) obj[name] = obj[name].required(`${name} is required`)
    })
    const validationSchema = Yup.object().shape(obj)
    return (
        <>
            <Formik
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    navigation.goBack()
                }}
            >
                {({ handleSubmit, ...rest }: any) => (
                    <View >
                        {inputProps.map((props) => <Input key={props.name} inputProps={props} {...rest} />)}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit} >

                            <Text >Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: colors.PRIMARY_COLOR,
        width: '30%',
        margin: 'auto',
    }
});

