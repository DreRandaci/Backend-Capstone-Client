import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    scrollContainer: {
        flexDirection: 'column',        
    },
    header: {        
        paddingBottom: 10,
    },
    img: {
        width: Dimensions.get('window').width - 2,
        height: 300,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    },
    imageActions: {
        flex: 1, 
        justifyContent: 'space-around', 
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
        borderTopColor: 'gray',
        borderTopWidth: 0.3,
    },
});

export default styles;