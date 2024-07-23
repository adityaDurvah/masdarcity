import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Form } from '../../Components/Form'


export const DocumentUpload: React.FC = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Document Upload</Text>
            <Form
                inputProps={[
                    {
                        name: 'status',
                        type: 'dropdown',
                        placeholder: 'Select Status',
                        required: true,
                        options: ['Pending', 'Approved', 'Rejected'],
                        label: 'Status'
                    }
                ]}
                navigation={navigation}
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