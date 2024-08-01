// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import BankingMgtIcon from "../../assets/BankingMgtIcon";
// import EscalaytImage from "../../assets/EscalaytImage";
// import ResetPasswordIcon from "../../assets/ResetPasswordIcon";
// import Eye from "../../assets/Eye";
// import SignupSuccess from "./SignupSuccess";
 
// export default function Signup() {

//   // import url from .env file
//   const apiUrl = import.meta.env.VITE_APP_API_URL;

//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSignupSucessful, setIsSignupSucessful] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
 
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
 
//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     if (newPassword !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
 
//     const requestBody = {
//       firstName,
//       lastName,
//       userName,
//       email,
//       password: newPassword,
//       confirmPassword,
//       phoneNumber,
//     };
 
//     try {
//       const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });
 
//       if (response.ok) {
//         setIsSignupSucessful(true);
//         alert("Registration successful!");
//         // navigate("/login");
//       } else {
//         const errorText = await response.text();
//         alert(`Registration failed: ${errorText}`);
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };
 
//   return (
//     <>
//       {isSignupSucessful && (
//         <div className="fixed inset-0 flex items-center justify-center bg-overlay z-50">
//           <SignupSuccess onClose={() => setIsSignupSucessful(false)} />
//         </div>
//       )}
 
//       <div
//         className={`flex flex-col items-center ${
//           isSignupSucessful ? "filter-blurred" : ""
//         }`}
//       >
//         <div className="flex items-center w-[119px] h-[32px] absolute top-[24px] left-[24px] gap-[8px] ">
//           <BankingMgtIcon className="w-[32px] h-[32px]" />
//           <span className="w-[79px] h-[24px] font-montserrat font-bold text-[18px] leading-[24px] text-left text-[#0070FF]">
//             Escalayt
//           </span>
//         </div>
 
//         <div className="absolute w-[448px] top-[124px] left-[50px]  rounded-[12px] shadow-lg shadow-[#1018281A] overflow-y-scroll">
//           <form onSubmit={handleSubmit}>
//             <div className="w-full h-[160px] bg-white">
//               <div className="w-full h-[140px] flex flex-col gap-[4px]">
//                 <div className="h-[84px] w-full bg-white flex justify-center items-center">
//                   <ResetPasswordIcon />
//                 </div>
//                 <div className="h-[52px] w-[400px] bg-white mx-auto flex flex-col items-center">
//                   <div className="h-[32px] flex items-center justify-center">
//                     <span className="font-semibold text-[18px] leading-[28px] text-center text-[#101828]">
//                       Sign up
//                     </span>
//                   </div>
//                   <div className="h-[40px] flex items-center justify-center">
//                     <span className="font-normal text-[14px] leading-[20px] text-center text-[#475467]">
//                       Welcome back! Please enter your details.
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full h-[20px]"></div>
//             </div>
 
//             <div className="w-full h-[652px] bg-white flex flex-col items-center justify-center gap-[8px]">
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Firstname<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Firstname Input"
//                   />
//                 </div>
//               </div>
 
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Lastname<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Lastname Input"
//                   />
//                 </div>
//               </div>
 
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Username<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type="text"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Username Input"
//                   />
//                 </div>
//               </div>
 
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Email<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Email"
//                   />
//                 </div>
//               </div>
 
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Password<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Password Input"
//                   />
//                   <div
//                     className="w-[24px] h-[24px] cursor-pointer"
//                     onClick={togglePasswordVisibility}
//                   >
//                     <Eye />
//                   </div>
//                 </div>
//               </div>
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[180px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Confirm Password<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Password Input"
//                   />
//                   <div
//                     className="w-[24px] h-[24px] cursor-pointer"
//                     onClick={toggleConfirmPasswordVisibility}
//                   >
//                     <Eye />
//                   </div>
//                 </div>
//               </div>
 
//               <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
//                 <div className="h-[32px] flex items-center">
//                   <span className="w-[136px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
//                     Phone number<span className="text-[#DA1414]">*</span>
//                   </span>
//                 </div>
//                 <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
//                   <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
//                     placeholder="Phone number"
//                   />
//                 </div>
//               </div>
//             </div>
 
//             <div className="w-full h-[100px]">
//               <div className="h-[68px] w-[448px] mt-[32px]">
//                 <button
//                   type="submit"
//                   className="h-[44px] w-[400px] mx-auto mt-[0px] mb-[24px] bg-[#0070FF] border border-[#0070FF] flex items-center justify-center"
//                 >
//                   <div className="w-[124px] h-[24px] text-[16px] font-sm leading-[24px] text-left text-[#FFFFFF]">
//                     Confirm
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
 
//         <div className="absolute w-[740px] h-[740px] top-[110px] left-[650px]">
//           <EscalaytImage />
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import BankingMgtIcon from "../../assets/BankingMgtIcon";
import EscalaytImage from "../../assets/EscalaytImage";
import ResetPasswordIcon from "../../assets/ResetPasswordIcon";
import { Eye, EyeOff } from "react-feather";
import SignupSuccess from "./SignupSuccess";

// import url from .env file
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    newPassword: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const onSubmit = async (values, actions) => {
    const requestBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      password: values.newPassword,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setIsSignupSuccessful(true);
        actions.resetForm();
        // navigate("/login");
      } else {
        const errorText = await response.text();
        alert(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      {isSignupSuccessful && (
        <div className="fixed inset-0 flex items-center justify-center bg-overlay z-50">
          <SignupSuccess onClose={() => setIsSignupSuccessful(false)} />
        </div>
      )}

      <div
        className={`flex flex-col items-center ${
          isSignupSuccessful ? "filter-blurred" : ""
        }`}
      >
        <div className="flex items-center w-[119px] h-[32px] absolute top-[24px] left-[24px] gap-[8px]">
          <BankingMgtIcon className="w-[32px] h-[32px]" />
          <span className="w-[79px] h-[24px] font-montserrat font-bold text-[18px] leading-[24px] text-left text-[#0070FF]">
            Escalayt
          </span>
        </div>

        <div className="absolute w-[448px] top-[124px] left-[50px] rounded-[12px] shadow-lg shadow-[#1018281A] overflow-y-scroll">
          <form onSubmit={handleSubmit}>
            <div className="w-full h-[160px] bg-white">
              <div className="w-full h-[140px] flex flex-col gap-[4px]">
                <div className="h-[84px] w-full bg-white flex justify-center items-center">
                  <ResetPasswordIcon />
                </div>
                <div className="h-[52px] w-[400px] bg-white mx-auto flex flex-col items-center">
                  <div className="h-[32px] flex items-center justify-center">
                    <span className="font-semibold text-[18px] leading-[28px] text-center text-[#101828]">
                      Sign up
                    </span>
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    <span className="font-normal text-[14px] leading-[20px] text-center text-[#475467]">
                      Welcome! Please enter your details.
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[20px]"></div>
            </div>

            <div className="w-full h-[652px] bg-white flex flex-col items-center justify-center gap-[8px]">
              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Firstname<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.firstName && touched.firstName ? "input-error" : ""
                    } w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Firstname Input"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                </div>
              </div>

              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Lastname<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.lastName && touched.lastName ? "input-error" : ""
                    } w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Lastname Input"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Username<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="userName"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.userName && touched.userName ? "input-error" : ""
                    } w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Username Input"
                  />
                  {errors.userName && touched.userName && (
                    <p className="error">{errors.userName}</p>
                  )}
                </div>
              </div>

              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Email<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.email && touched.email ? "input-error" : ""
                    } w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Email Input"
                  />
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Password<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.newPassword && touched.newPassword
                        ? "input-error"
                        : ""
                    } w-[310px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                  {errors.newPassword && touched.newPassword && (
                    <p className="error">{errors.newPassword}</p>
                  )}
                </div>
              </div>

              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[144px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Confirm Password<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.confirmPassword && touched.confirmPassword
                        ? "input-error"
                        : ""
                    } w-[310px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Phone Number<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.phoneNumber && touched.phoneNumber
                        ? "input-error"
                        : ""
                    } w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none`}
                    placeholder="Phone Number Input"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <p className="error">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`mt-[8px] w-[400px] h-[48px] bg-[#0070FF] hover:bg-[#004AAD] focus:outline-none text-white font-bold py-2 px-4 rounded ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="absolute w-[500px] top-[100px] left-[680px] rounded-[20px]">
          <EscalaytImage />
        </div>
      </div>
    </>
  );
}
