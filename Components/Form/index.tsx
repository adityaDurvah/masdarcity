import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../Input';
import colors from '../../Styles/colors';


interface FormProps {
    inputFields: any[]
    navigation: any
    data?: any
}

export const Form: React.FC<FormProps> = ({ inputFields, navigation, data = {} }) => {
    const [fields, setFields] = useState<any>(inputFields)
    const obj: any = {}
    inputFields.forEach(({ name, required, validation }: { name: string, required: boolean, validation: any[] }) => {
        obj[name] = Yup.string()
        if (validation) {
            validation.forEach(({ type, message }: { type: string, message: string }) => {
                obj[name] = obj[name][type](message)
            })
        }
        if (required) obj[name] = obj[name].required(`${name} is required`)
    })
    const validationSchema = Yup.object().shape(obj)
    const nestedFields = inputFields.filter(({ childrenElements }) => childrenElements)
    const formik = useFormik({
        initialValues: data,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            navigation.goBack()
        }
    })
    const { handleSubmit, ...rest }: any = formik

    useEffect(() => {
        const arr: string[] = [];
        const newFields = new Set<string>([...inputFields]); // To keep track of existing fields

        nestedFields.forEach(({ name, childrenElements }) => {
            const value = formik.values[name];
            if (childrenElements[value]) {
                arr.push(...childrenElements[value]);
                childrenElements[value].forEach((field: any) => newFields.add(field));
            }
        });

        const updatedFields = [...newFields];

        // Remove data from formik.values for fields that are no longer present
        const removedFields = fields.filter((field: any) => !newFields.has(field));
        removedFields.forEach((field: any) => {
            formik.setFieldValue(field.name, null);
        });
        setFields(updatedFields);
    }, nestedFields.map(({ name }) => formik.values[name]))
    return (
        <>
            <View >
                {fields.map((props: any) => <Input key={props.name} inputProps={props} {...rest} />)}
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >

                    <Text >Submit</Text>
                </TouchableOpacity>
            </View>
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

