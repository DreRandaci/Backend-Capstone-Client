import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',                  
    },
    topTouchablesContainer: {
        marginTop: 30,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'space-between'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: 'black',
        padding: 5,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 10        
    },
    button: {
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0,
    },
    scrollViewContainer: {
        marginTop: 25,
        marginBottom: 25
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
});

export default styles;