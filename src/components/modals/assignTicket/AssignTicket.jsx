import React, { useState, useEffect } from "react";
import { useFetchEmployList } from "./useFetchEmployList";
import { useFetchAssign } from "./useFetchAssign";

const token = localStorage.getItem("token");

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

// option for making a post request

const URLS = {
  EMPLOYEES: "http://localhost:8080/api/v1/admin/get-employeeList-details",
  ASSIGN_TICKET: "http://localhost:8080/api/v1/ticket/assign-ticket",
};

// const initiall ticket object
const INTIAL_USER_OBJ = {
  userId: 0,
  fullName: "",
  pictureUrl: "",
  jobTitle: "",
};

// we will pass assignId as props
// and also we will pass
// ticket id ass props
const AssignTicket = () => {
  const { data, isLoading, isError } = useFetchEmployList(
    URLS.EMPLOYEES,
    option
  );

  const [option1, setOption1] = useState({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: null, // Initial body is null or can be an empty object
  });

  const [url, seturl] = useState("");

  const { data1, isLoading1, isError1 } = useFetchAssign(
    url,
    option1.body == null ? null : option1
  );

  const [employeList, setEmployeeList] = useState([INTIAL_USER_OBJ]);

  const [assigneeId, setAssigneeId] = useState(0);

  useEffect(() => {
    // const something = data ? data : "something wrong";

    const theList =
      data &&
      data.map((employee) => ({
        userId: employee.id,
        fullName: employee.fullName,
        pictureUrl: employee.pictureUrl,
        jobTitle: employee.jobTitle,
      }));

    data && setEmployeeList(theList);
    //console.log(something);
    // console.log(assigneeId)
  }, [data]);

  /*
  setOption1((prevOption) => ({
      ...prevOption,
      body: JSON.stringify(newBody),
    }));

    {
  "assigneeId": 6
}

  */

  const handleOnChange = (assignee) => {
    console.log(assignee);
    

    let newAssignee = {
      assigneeId: assignee,
    };

    setOption1((prevOption) => ({
      ...prevOption,
      body: JSON.stringify(newAssignee),
    }));

    seturl(`${URLS.ASSIGN_TICKET}/1`);

    const somthing = data1 ? data1 : " samotheing";

    console.log(somthing);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ul>
            {employeList.map((employee) => (
              <li key={employee.userId}>
                <img src={`${employee.pictureUrl}`} alt="employeeImage" />
                <div>
                  <input
                    type="radio"
                    checked={assigneeId === employee.userId}
                    onChange={() => {
                      handleOnChange(employee.userId);
                      setAssigneeId(employee.userId);
                    }}
                  />
                  <div>{employee.fullName}</div>
                  <div>{employee.jobTitle}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssignTicket;

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
