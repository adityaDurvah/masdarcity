import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Form } from '../../Components/Form'


export const DocumentUpload: React.FC = ({ navigation, route }: any) => {
    const { statusList } = route.params
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
                        options: statusList.map(({ label, ID }: { label: string, ID: any }) => ({ label, value: ID })),
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