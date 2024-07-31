import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// password - min - 3
export const basicSCHEMA = yup.object().shape({
    // email: yup.string().email().required(),
    username: yup.string().required("Required"),
    password: yup
    .string()
    // .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),

});