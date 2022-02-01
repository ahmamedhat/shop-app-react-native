import React, { useCallback, useEffect, useReducer } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as productActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state , action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputData,
        [action.input]: action.value
      }
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      }
      let updatedFormValidty = true
      for (const key in state.inputValidities) {
        updatedFormValidty = updatedFormValidty && updatedValidities[key]
      }

      return {
        inputData: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormValidty
      }
  }
  return state
}

const EditProductScreen = (props) => {
  let id;
  if (props.route.params) {
    id = props.route.params.id;
  }

  const product = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === id)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormActions] = useReducer(formReducer , {
    inputData: {
      title: product ? product.title : "",
      description: product ? product.description : "",
      price: product ? product.price : "",
      imageUrl: product ? product.imageUrl : ""
    },
    inputValidities: {
      title: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
      imageUrl: product ? true : false,
    },
    formIsValid: product ? true : false

  });

  const textChangeHandler = (text , input) => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
    }
    dispatchFormActions({type: FORM_INPUT_UPDATE , value: text , isValid, input})
  }


  const submitEditHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Form is not valid')
      return
    }
    if (product) {

      dispatch(productActions.editProduct(id, formState.inputData.title, formState.inputData.description, formState.inputData.imageUrl));
    } else {
      dispatch(productActions.addProduct(formState.inputData.title, +formState.inputData.price, formState.inputData.description, formState.inputData.imageUrl));
    }
    props.navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="ios-checkmark"
            iconSize={23}
            title="Save"
            color={Colors.primary}
            onPress={() => {
              submitEditHandler();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [submitEditHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formInput}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputData.title}
            onChangeText={(value) => {
              textChangeHandler(value , 'title')
            }}
            keyboardType="default"
            returnKeyType="next"
          />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputData.description}
            onChangeText={(value) => textChangeHandler(value , 'description')}
            keyboardType="default"
            returnKeyType="next"
          />
        </View>
        {product ? null : (
          <View style={styles.formInput}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputData.price}
              onChangeText={(value) => textChangeHandler(value , 'price')}
              keyboardType="numeric"
            />
          </View>
        )}
        <View style={styles.formInput}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputData.imageUrl}
            onChangeText={(value) => textChangeHandler(value , 'imageUrl')}
            keyboardType="default"
            returnKeyType="done"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

  formInput: {
    width: "100%",
  },

  label: {
    marginVertical: 2,
  },

  input: {
    padding: 4,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EditProductScreen;
