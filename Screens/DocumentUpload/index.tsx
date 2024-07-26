import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Form } from '../../Components/Form'

const formatChildren = (elements: any) => {
    const obj: any = {}
    Object.keys(elements).forEach((key) => {
        obj[key] = elements[key].map(({ value, label }: { value: string, label: string }) => ({
            type: value.toLowerCase(), label, name: label.toLowerCase().split(' ').map((word, index) => {
                if (index === 0) return word; // Keep the first word in lowercase
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
                .join('')
        }))
    })
    return obj
}

export const DocumentUpload: React.FC = ({ navigation, route }: any) => {
    const { statusList, currentStatus } = route.params
    const options: any[] = []
    const children: any = {}
    statusList.forEach(({ label, ID, dataInput }: { label: string, ID: any, dataInput: [] }) => {
        options.push({ label, value: ID })
        if (dataInput.length) {
            children[ID] = dataInput
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Document Upload</Text>
            <Form
                inputFields={[
                    {
                        name: 'status',
                        type: 'dropdown',
                        placeholder: 'Select Status',
                        required: true,
                        options,
                        label: 'Status',
                        childrenElements: formatChildren(children)
                    },
                ]}
                navigation={navigation}
                data={{ status: options.find(({ label }: { label: string }) => label === currentStatus)?.value }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        padding: 10
    }
})