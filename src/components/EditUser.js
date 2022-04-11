/* eslint-disable no-unused-vars */
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form, Schema, DatePicker } from "rsuite";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import * as moment from "moment";

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType()
    .minLength(5, "This field must be greater than 5.")
    .isRequired("This field is required."),
  phone: NumberType().isRequired("This field is required."),
});

const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
    </Form.Group>
  );
});

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams();
  const { initData, editUser } = useContext(GlobalContext);

  const [selectedUser, setSelectedUser] = useState({
    _id: "",
    name: "",
    phone: "",
    birth_day: null,
  });
  const [error, setError] = useState({});
  const formRef = useRef();

  const currentUserId = id;
  useEffect(() => {
    const userId = currentUserId.id;
    const selectedUser = initData.find((currentUserTraversal) => {
      return currentUserTraversal._id === userId;
    });

    setSelectedUser(selectedUser);
  }, [currentUserId, initData]);

  const handleSave = (e) => {
    console.log(selectedUser);
    e.preventDefault();
    if (formRef.current.check()) {
      editUser(selectedUser);
      navigate(-1);
    } else {
      console.log("Error", error);
    }
  };
  const handleOnChange = (userKey, newValue) => {
    setSelectedUser({ ...selectedUser, [userKey]: newValue });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "solid 1px #ccc",
          width: 500,
          padding: "50px 0",
          marginTop: 150,
          borderRadius: 13,
          backgroundColor: "GhostWhite",
        }}
      >
        <Form
          model={model}
          ref={formRef}
          onCheck={setError}
          formValue={selectedUser}
          defaultValue={selectedUser}
          onChange={(newData, e) => {
            if (e.target.name === "name") {
              return handleOnChange("name", newData["name"]);
            } else {
              return handleOnChange("phone", newData["phone"]);
            }
          }}
        >
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            User Details
          </h4>
          <TextField name="name" label="Name" errorMessage={error.name} />
          <TextField name="phone" label="Phone" errorMessage={error.phone} />
          <div
            className="field"
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "5px 0",
            }}
          >
            <p>Birthday</p>
            <DatePicker
              oneTap
              format="yyyy-MM-dd"
              style={{ margin: "5px 0" }}
              placeholder="Choose Date Of Birth"
              value={new Date(selectedUser.birth_day)}
              onChange={(newDate) =>
                handleOnChange("birth_day", moment(new Date(newDate)).format())
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 30,
            }}
          >
            <Button
              appearance="primary"
              onClick={handleSave}
              style={{
                borderRadius: 14,
                background:
                  "linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)",
                color: "white",
                padding: "8px 18px",
                width: 80,
              }}
            >
              Save
            </Button>
            <Button
              appearance="primary"
              onClick={() => navigate(-1)}
              style={{
                borderRadius: 14,
                background:
                  "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                color: "black",
                padding: "8px 18px",
                width: 80,
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
