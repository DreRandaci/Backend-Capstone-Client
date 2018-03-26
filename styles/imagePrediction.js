import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    prediction: {
        position: 'relative',        
        flex: 1,
    },
    linkContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 25,
        paddingBottom: 5,
    },
    wikiLink: {
        color: 'black', 
        paddingLeft: 15,               
    },
    googleLink: {
        color: '#d62d20',
        paddingLeft: 22,       
    }
});

export default styles;