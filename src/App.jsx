import { useState } from "react";
import "./App.css";
import BasicInfo from "./BasicInfo";
import UserForm from "./UserForm";

function App() {
  const [editing, setEditing] = useState(true);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setEditing(false);
  };
  const handleEdit = () => {
    setEditing((preValue) => !preValue);
  };

  const handleCancel = () => {
    setEditing(false); 
  };

  return (
    <>
      {editing && (
        <UserForm
          initialValues={formData} 
          onSubmit={handleSubmit}
          onCancel={formData ? handleCancel : undefined}
          editing
        />
      )}

      {!editing && formData && (
        <BasicInfo data={formData} onEdit={handleEdit} />
      )}

    </>
  );
}

export default App;
