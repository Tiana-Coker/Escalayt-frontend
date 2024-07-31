import { useEffect, useRef, useState } from "react";
import React from "react";
import DropdownDepartment from "./DropdownDepartment";
import { useFetchDepartment } from "./useFetchDepartment";
import CreateUserIcon from "../../../assets/CreateUserIcon";
import Confirm from "../createTicket/Confirm";

//Create user modal and implementation - Samuel
//full name
// username
// email
// password
// departments drop down

//testing token

// Testing url
const URLS = {
  DEPARTMENT: "http://localhost:8080/api/v1/admin/get-all-department",
  CREATE_USER: "http://localhost:8080/api/v1/admin/register-user/",
};

const token = localStorage.getItem("jwtToken");

//second parameter for setting header
const option = {
  // method
  method: "GET",
  // header
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// // this is to handle post request
//     // post request header

const CreateUser = ({ onClose }) => {
  // fetch info
  const { data, isLoading, isError } = useFetchDepartment(
    URLS.DEPARTMENT,
    option
  );

  //full name ref
  const fullNameRef = useRef();

  //username ref
  const usernameRef = useRef();

  // use ref email
  const emailRef = useRef();

  // use ref passwrod
  const passwordRef = useRef();

  const [departments, setDepartments] = useState({ id: "", department: "" });

  const [departmentId, setDepartmentId] = useState();

  // boolean check submission status
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  // console.log
  // use Effect here
  useEffect(() => {
    const departmentList =
      data &&
      data.map((department) => ({
        id: department.id,
        department: department.department,
      }));

    departmentList && setDepartments(departmentList);
  }, [data]);

  // handle submition
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setIsAfterFirstSubmit(true);

    const newUser = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: passwordRef.current.value,
      jobTitle: usernameRef.current.value, //username
    };

    const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorge Or

    // check that the person is logged in
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      // using fetch to connect with the response
      const response = await fetch(`${URLS.CREATE_USER}${departmentId}`, {
        // method
        method: "POST",

        // header
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      // if response is ok
      if (response.ok) {
        // set confirm to true

        console.log("Category created successfully");
      } else {
        // throw alert error
        alert("Error creating category");
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      // catch error either way
      alert("Error creating category something else");
      console.log(error);
    }

    console.log("password", newUser.phoneNumber);
    console.log("email", newUser.email);
    console.log("username", newUser.jobTitle);
    console.log("full name", newUser.fullName);
    console.log("department id", departmentId);

    //clear the space aftewards
    emailRef.current.value = "";
    passwordRef.current.value = "";
    fullNameRef.current.value = "";
    usernameRef.current.value = "";
  };

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={onClose}
        ></div>
        <div className="bg-white w-[448px]  rounded-lg shadow-custom p-6 relative overflow-y-auto z-20">
          <div className="w-[400px]  mb-[20px] flex flex-col items-center justify-center">
            <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
              <div className="rounded-lg custom-shadow p-4 bg-white">
                <CreateUserIcon
                  className="w-12 h-12 rounded-lg border p-3"
                  style={{ borderColor: "#EAECF0" }}
                />
              </div>

              <button onClick={onClose} className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex w-[352px] h-[28px]">
              <p className="text-lg font-semibold leading-7 text-left">
                Create New User
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="form">
            {/* enter full name */}

            {/* input the new department name */}
            <div className="h-[80px] flex flex-col mb-3">
              <div className=" h-[35px] flex items-center">
                <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                  Full Name
                  <span className="text-[#DA1414]">*</span>
                </span>
              </div>
              <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                <input
                  type="text"
                  ref={fullNameRef}
                  placeholder="Enter Full Name"
                  className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                />
              </div>
            </div>

            {/* enter user name */}
            <div className="h-[80px] flex flex-col mb-3">
              <div className=" h-[35px] flex items-center">
                <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                  Username
                  <span className="text-[#DA1414]">*</span>
                </span>
              </div>
              <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                <input
                  type="text"
                  ref={usernameRef}
                  placeholder="Enter Username"
                  className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                />
              </div>
            </div>

            {/* enter email */}

            <div className="h-[80px] flex flex-col mb-3">
              <div className=" h-[35px] flex items-center">
                <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                  Email
                  <span className="text-[#DA1414]">*</span>
                </span>
              </div>
              <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                <input
                  type="text"
                  ref={emailRef}
                  placeholder="Enter Email"
                  className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                />
              </div>
            </div>

            {/* enter password on change */}

            <div className="h-[80px] flex flex-col mb-3">
              <div className=" h-[35px] flex items-center">
                <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                  Password
                  <span className="text-[#DA1414]">*</span>
                </span>
              </div>
              <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                <input
                  type="text"
                  ref={passwordRef}
                  placeholder="Enter Phone number"
                  className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                />
              </div>
            </div>

            {/* drop down list */}

            <div className="h-[80px] flex flex-col mb-3">
              <div className=" h-[35px] flex items-center">
                <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                  Department
                  <span className="text-[#DA1414]">*</span>
                </span>
              </div>

              <DropdownDepartment
                options={departments}
                selectedValue={departmentId}
                onSelect={setDepartmentId}
              />
            </div>

            {/* submit button */}

            <Confirm />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
