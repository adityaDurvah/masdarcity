import { StyleSheet } from "react-native";
import colorsStyle from './colors';


export const globalStyles = StyleSheet.create({
    headerStyle : {
        backgroundColor: colorsStyle.PRIMARY_COLOR
    }, 
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      card: {
        margin: 10,
        borderRadius: 10,
      },

});