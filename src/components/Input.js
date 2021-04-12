import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

function CustomInput(props) {

    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props

    const hasError = errors[name] && touched[name]

    return (
        <>
            <Text style={styles.legend}>{inputProps.label}</Text>

            <TextInput
                style={[
                    styles.textInput,
                    hasError && styles.errorInput
                ]}

                value={value}

                onChangeText={(text) => {
                    onChange(name)(text)

                }}
                onBlur={() => {
                    setFieldTouched(name)
                    onBlur(name)
                }}
                {...inputProps}
            />
            {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        // height: 40,
        // width: '100%',
        margin: 10,
        // backgroundColor: 'white',
        borderColor: 'gray',
        // borderWidth: StyleSheet.hairlineWidth,
        // borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 50,
        borderWidth: 7,
        borderColor: '#DCDCDC',
    },
    errorText: {
        marginLeft: 10,
        fontSize: 15,
        color: 'red',
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 2,
        textAlign: 'center',
    },
    legend: {
        marginLeft: 10,
        margin: 20,
        marginBottom: -5,
        color: '#0b2031',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default CustomInput