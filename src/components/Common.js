import React, { forwardRef } from "react";
import { Form, Pagination } from "rsuite";
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

const MyPagination = ({ total, onChange, current, pageSize }) => {
  return (
    <Pagination
      onChangePage={onChange}
      activePage={current}
      total={total}
      limit={pageSize}
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    />
  );
};

export { TextField, MyPagination };
