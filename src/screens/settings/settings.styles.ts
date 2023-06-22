import { colors } from '@utils';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40
    },
    field: {
        marginTop: 30
    },
    label: {
        color: colors.lightGreen,
        fontSize: 18,
    },
    choicesListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginHorizontal: -5
    },
    choice: {
        backgroundColor: colors.lightGreen,
        padding: 10,
        margin: 5
    },
    choiceText: {
        color: colors.darkTeal
    },
    switchField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default styles;