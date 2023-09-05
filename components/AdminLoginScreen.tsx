import {
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StyledView } from "./StyledComponents";
import { useController, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../constants";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseAuthService from "../firebase/firebaseAuthService";
import useUpdateGlobal from "../hooks/useUpdateGlobal";
import Icon from "react-native-vector-icons/MaterialIcons";
// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
const Input = (fields) => {
  const { name, control, label, ...others } = fields;
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  return (
    <StyledView className="mt-2">
      <Text className="capitalize mb-1 text-xs">{label ?? name}</Text>
      <TextInput
        {...others}
        value={field.value}
        onChangeText={field.onChange}
        className="border-[#D2D3D4] border-2 rounded-md text-black "
        style={{ height: 50, ...others?.style, paddingHorizontal: 16 }}
      />
    </StyledView>
  );
};

const AdminLoginScreen = ({ navigation }) => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const updateValue = useUpdateGlobal();
  const onSubmit = async (data) => {
    const values = { ...data };
    console.log({ values });

    FirebaseAuthService.adminLogin(values?.email, values?.password)
      .then((data) => {
        console.log({ data });
        setSuccess("Login Successfully");
        console.log("user", data?.user);

        updateValue("isLogin", true);
        navigation.replace("Main");
      })
      .catch((error) => {
        if (error) {
          setError("User not found");
        }
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        ></ActivityIndicator>
      </View>
    );
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className=" align-center p-4"
      contentContainerStyle={{ flex: 1 }}
    >
      {[
        {
          name: "email",
          label: "Email ID",
        },
        {
          name: "password",
          label: "Password",
          keyboardType: "numeric",
        },
      ].map((fields: any, index) => {
        return <Input {...fields} key={index} control={control}></Input>;
      })}
      {(error || success) && (
        // <View>
        //   <Icon
        //     name={error ? "closecircle" : "checkcircle"}
        //     size={22}
        //     color={error ? "red" : "green"}
        //   />
        <Text
          style={{
            color: error ? "red" : "green",
            textAlign: "center",
            top: 100,
          }}
        >
          {error ?? success}
        </Text>
        // </View>
      )}
      <Pressable
        className="bg-red-600 p-2 rounded-sm justify-center items-center"
        style={{ marginTop: "auto" }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white">Login</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AdminLoginScreen;
