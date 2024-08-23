import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../Components/Text';

const ServiceRequestCard = ({ srNumber, title, company, category, status, date, open }: any) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.srNumberContainer}>
                <Text style={styles.srNumberText}>{srNumber}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.companyText}>{company}</Text>
                    <Text style={styles.categoryText}>{category}</Text>
                </View>
                <View style={[styles.statusContainer, 
                    // ...(open ? [styles.statusOpen] : [styles.statusClosed])
                    ]}>
                    <Text style={styles.statusText} >{status}</Text>
                </View>
            </View>
            <Text style={styles.dateText}>{date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    srNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.5,
    },
    srNumberText: {
        color: '#00aaa7',
        fontWeight: 'bold',
    },
    infoContainer: {
        flex: 3
    },
    detailsContainer: {
        // marginVertical: 5,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    companyText: {
        color: '#2b78e4',
        width: '120%',
    },
    categoryText: {
        color: '#aaa',
    },
    statusContainer: {
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flex: 1,
        alignSelf: "flex-start",
    },
    statusText: {
        fontSize: 9,
        color:'white',
        fontWeight: 'bold',
    },
    statusOpen: {
        backgroundColor: '#00928f',
    },
    statusClosed: {
        backgroundColor: '#313131',
    },
    dateText: {
        // marginTop: 5,
        color: '#313131',
        alignSelf: "flex-end",
        fontSize: 10,
    },
});

export default ServiceRequestCard;
