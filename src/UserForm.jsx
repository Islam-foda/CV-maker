import { useState, useEffect } from "react";

const EMPTY_VALUES = {};

//UserForm



export default function UserForm({ initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues || EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // If initialValues changes (e.g. user clicks Edit), reset the form
  // useEffect(() => {
  //   setValues(initialValues || EMPTY_VALUES);
  //   setErrors({});
  //   setTouched({});
  // }, [initialValues]);

  const isEditMode = Boolean(initialValues);

  // ---- Validation (unchanged) ----
  const validateField = (name, value) => {
    const trimmed = value.trim();
    switch (name) {
      case "firstName":
        if (!trimmed) return "First name is required.";
        if (trimmed.length < 2) return "First name looks too short.";
        return "";
      case "lastName":
        if (!trimmed) return "Last name is required.";
        if (trimmed.length < 2) return "Last name looks too short.";
        return "";
      case "email":
        if (!trimmed) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
          return "Enter a valid email (e.g. name@example.com).";
        return "";
      case "mobile":
        if (!trimmed) return "Mobile number is required.";
        if (!/^\+?[\d\s\-()]{7,15}$/.test(trimmed))
          return "Enter a valid mobile number.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = () =>
    Object.keys(values).reduce((acc, key) => {
      const err = validateField(key, values[key]);
      if (err) acc[key] = err;
      return acc;
    }, {});

  // ---- Handlers ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name] && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateAll();
    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, mobile: true });

    if (Object.keys(newErrors).length > 0) {
      document.getElementById(Object.keys(newErrors)[0])?.focus();
      return;
    }

    onSubmit({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      mobile: values.mobile.replace(/[\s\-()]/g, ""),
    });
  };

  const handleCancel = () => {
    setValues(initialValues || EMPTY_VALUES); // reset to last saved
    setErrors({});
    setTouched({});
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} noValidate >
      <div className="field">
        <label htmlFor="firstName" >First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="first name"
          autoComplete="given-name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? "firstName-error" : undefined}
        />
        {errors.firstName && (
          <p id="firstName-error" className="error" role="alert">
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="lastName" >Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="last name"
          autoComplete="family-name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
        />
        {errors.lastName && (
          <p id="lastName-error" className="error" role="alert">
            {errors.lastName}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="mobile">Mobile number</label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+1 555 123 4567"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.mobile}
          aria-describedby={errors.mobile ? "mobile-error" : undefined}
        />
        {errors.mobile && (
          <p id="mobile-error" className="error" role="alert">
            {errors.mobile}
          </p>
        )}
      </div>

      <div className="actions">
        <button type="submit">
          {isEditMode ? "Save changes" : "Create CV"}
        </button>

        {isEditMode && onCancel && (
          <button type="button" onClick={handleCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
