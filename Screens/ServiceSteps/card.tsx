import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../Components/Text';

interface StepCardProps {
    stepNumber: string;
    title: string;
    created: string;
    modified: string;
    closed: string;
    owner: string;
    comments: string;
    status: string;
    open: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
    stepNumber,
    title,
    created,
    modified,
    closed,
    owner,
    comments,
    status,
    open
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{stepNumber}</Text>
                </View>
                <View  style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text  style={styles.owner}>OWNER: {owner}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>CREATED: {created}</Text>
                    <Text style={styles.date}>MODIFIED: {modified}</Text>
                    <Text style={styles.date}>CLOSED:    {closed}</Text>
                </View>
            </View>
            <View style={styles.comments}>
                <Text style={styles.commentsText}>COMMENTS: {comments}</Text>
            </View>
                <Text style={[styles.status, ([open ? styles.statusOpen : styles.statusClosed])]}>{status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        paddingBottom: 12,
        marginVertical: 8,
        borderWidth:1,
        borderColor: '#e0e0e0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepNumberContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#007AFF',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        marginRight: 8,
    },
    stepNumber: {
        fontSize: 26,
        color: 'white',
         fontWeight: 'bold',
    },
    titleContainer:{
        marginTop: 4,
        flex:2,
        alignSelf: 'flex-start',
        marginRight: 8,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    details: {
        marginTop: 8,
    },
    owner: {
        fontSize:10,
        color: '#2b78e4',
    },
    status: {
        // width: '50%',
        minWidth: '75%',
        fontSize: 12,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 8,
        padding: 8,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#f5f5f5',        
        color:'white'
    },
    dateContainer:{
        flex:1.2,
    },
    comments: {
        paddingVertical: 5,
        paddingHorizontal:2,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        width: '95%',
        alignSelf: 'center',
    },
    commentsText: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
    },
    date: {
        fontSize: 10,
        color: '#666',
    },
    statusOpen: {
        backgroundColor: '#00928f',
    },
    statusClosed: {
        backgroundColor: '#313131',
    }
});

export default StepCard;
