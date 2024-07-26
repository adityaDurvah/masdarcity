// CustomDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
interface CustomDropdownProps {
    options: any[];
    onChange?: (option: string) => void;
    value?: string;
}

export const Dropdown: React.FC<CustomDropdownProps> = ({
    value,
    options,
    onChange,
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };

    const handleSelect = (option: string) => {
        setIsVisible(false);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown} style={[styles.button]}>
                <Text style={[styles.buttonText]}>
                    {options.find((item) => item.value === value)?.label || 'Select an option'}
                </Text>
                <AntDesign name="down" size={20} color="black" />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.option]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={[styles.optionText]}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#ddd',
        borderRadius: 5,
        // alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    option: {
        padding: 15,
    },
    optionText: {
        fontSize: 16,
    },
});