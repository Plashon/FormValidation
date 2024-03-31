import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const initialValues = {
    nameTitleThai: "",
    firstnameThai: "",
    lastnameThai: "",
    nameTitleEng: "",
    firstnameEng: "",
    lastnameEng: "",
    birthDate: "",
    birthMonth: "",
    birthYear: "",
    idCard: "",
    password: "",
    mobile: "",
    email: "",
    accept: false,
  };

  const validationSchema = Yup.object().shape({
    nameTitleTha: Yup.string()
      .required("Required"),
    firstnameTha: Yup.string()
      .required("Required")
      .matches(/^[\u0E00-\u0E7F\s]+$/, "Must be in Thai only"),
    lastnameTha: Yup.string()
      .required("Required")
      .matches(/^[\u0E00-\u0E7F\s]+$/, "Must be in Thai only"),
    nameTitleEng: Yup.string()
      .required("Required"),
    firstnameEng: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Must be in English only")
      .matches(/^[A-Z]/, "Start with an uppercase letter"),
    lastnameEng: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Must be in English only")
      .matches(/^[A-Z]/, "Start with an uppercase letter"),
    birthDate: Yup.string()
      .required("Required"),
    birthMonth: Yup.string()
      .required("Required"),
    birthYear: Yup.string()
      .required("Required"),
    idCard: Yup.string()
      .matches(/^[0-9]+$/, 'number only')
      .min(13, "Must be exactly 13 characters")
      .max(13, "Must be exactly 13 characters")
      .required("Required"),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/(?=.*[0-9])/, 'Password must contain at least one number letter')
      .required('Required'),
    mobile: Yup.string()
      .required("Required")
      .min(10, "Must be exactly 10 characters")
      .max(10, "Must be exactly 10 characters"),
      email: Yup.string()
      .email("Invalid email format")
      .required("Required")
      .test(
        "custom-email-test",
        "Email must contain specific domain name",
        (value) => {
          const lowercaseEmail = value.toLowerCase();
          return lowercaseEmail && lowercaseEmail.endsWith("@webmail.npru.ac.th");
        }
      ),
    
    accept: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulating a form submission delay
    setTimeout(() => {
      // Log the form values to the console
      console.log(values);
      // Reset submit state
      setSubmitting(false);
      // Show a success message
      alert("Successfully submitted!");
    }, 1000);
  };

  return (
    <section className="container mt-4">
      <div className="mb-4">
        <div className="card border-0 shadow p-4 d-block text-start">
          <h3 className="fw-bolder my-4 text-center">ลงทะเบียน</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, isValidating }) => (
              <Form className="card-body">
                {/* ข้อมูลทั่วไป */}
                <h5 className="fw-bolder mb-3">ข้อมูลทั่วไป</h5>
                <div className="rounded border p-4">
                  {/* คำนำหน้า */}
                  <div className="row">
                    <div className="col-lg-2 mb-3">
                      <label htmlFor="nameTitleTha" className="form-label">
                        คำนำหน้า   {" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        className={`form-select`}
                        name="nameTitleTha"
                        id="nameTitleTha"
                      >
                        <option value="">เลือก</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </Field>
                      <ErrorMessage
                        name="nameTitleTha"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* ชื่อภาษาไทย */}
                    <div className="col-lg-5 mb-3">
                      <label htmlFor="firstnameTha" className="form-label">
                        ชื่อ (ภาษาไทย) <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        className={`form-control ${errors.firstnameTha && touched.firstnameTha
                          ? "is-invalid"
                          : ""
                          }`}
                        name="firstnameTha"
                        id="firstnameTha"
                        maxLength="100"
                      />
                      <ErrorMessage
                        name="firstnameTha"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* นามสกุลภาษาไทย */}
                    <div className="col-lg-5 mb-3">
                      <label htmlFor="lastnameTha" className="form-label">
                        นามสกุล (ภาษาไทย) <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        className={`form-control ${errors.lastnameTha && touched.lastnameTha
                          ? "is-invalid"
                          : ""
                          }`}
                        name="lastnameTha"
                        id="lastnameTha"
                        maxLength="100"
                      />
                      <ErrorMessage
                        name="lastnameTha"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  {/* คำนำหน้า (ภาษาอังกฤษ) */}
                  <div className="row">
                    <div className="col-lg-2 mb-3">
                      <label htmlFor="nameTitleEng" className="form-label">
                        คำนำหน้า
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        className={`form-select`}
                        name="nameTitleEng"
                        id="nameTitleEng"
                      >
                        <option value="">Choose</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                      </Field>
                      <ErrorMessage
                        name="nameTitleEng"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* ชื่อ (ภาษาอังกฤษ) */}
                    <div className="col-lg-5 mb-3">
                      <label htmlFor="firstnameEng" className="form-label">
                        ชื่อ (ภาษาอังกฤษ) <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        className={`form-control ${errors.firstnameEng && touched.firstnameEng
                          ? "is-invalid"
                          : ""
                          }`}
                        name="firstnameEng"
                        id="firstnameEng"
                        maxLength="100"
                      />
                      <ErrorMessage
                        name="firstnameEng"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* นามสกุล (ภาษาอังกฤษ) */}
                    <div className="col-lg-5 mb-3">
                      <label htmlFor="lastnameEng" className="form-label">
                        นามสกุล (ภาษาอังกฤษ){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        className={`form-control ${errors.lastnameEng && touched.lastnameEng
                          ? "is-invalid"
                          : ""
                          }`}
                        name="lastnameEng"
                        id="lastnameEng"
                        maxLength="100"
                      />
                      <ErrorMessage
                        name="lastnameEng"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  {/* วันเกิด */}
                  <div className="row">
                    <div className="col-lg-3 mb-3">
                      <label htmlFor="birthDate" className="form-label">
                        วันเกิด <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        className={`form-select `}
                        name="birthDate"
                        id="birthDate"
                      >
                        <option value="">เลือก</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (date) => (
                            <option key={date} value={date}>
                              {date}
                            </option>
                          )
                        )}
                      </Field>
                      <ErrorMessage
                        name="birthDate"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* เดือน */}
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="birthMonth" className="form-label">
                        เดือน <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        className={`form-select `}
                        name="birthMonth"
                        id="birthMonth"
                      >
                        <option value="">เลือก</option>
                        <option value="1">มกราคม</option>
                        <option value="2">กุมภาพันธ์</option>
                        <option value="3">มีนาคม</option>
                        <option value="4">เมษายน</option>
                        <option value="5">พฤษภาคม</option>
                        <option value="6">มิถุนายน</option>
                        <option value="7">กรกฎาคม</option>
                        <option value="8">สิงหาคม</option>
                        <option value="9">กันยายน</option>
                        <option value="10">ตุลาคม</option>
                        <option value="11">พฤศจิกายน</option>
                        <option value="12">ธันวาคม</option>
                      </Field>
                      <ErrorMessage
                        name="birthMonth"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* ปี (พ.ศ.) */}
                    <div className="col-lg-3 mb-3">
                      <label htmlFor="birthYear" className="form-label">
                        ปี (พ.ศ.) <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        className={`form-select `}
                        name="birthYear"
                        id="birthYear"
                      >
                        <option value="">เลือก</option>
                        {Array.from({ length: 100 }, (_, i) => 2024 - i).map(
                          (year) => (
                            <option key={year} value={year}>
                              {year + 543}
                            </option>
                          )
                        )}
                      </Field>
                      <ErrorMessage
                        name="birthYear"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  {/* หมายเลขบัตรประชาชน */}
                  <div className="mb-3">
                    <label htmlFor="idCard" className="form-label">
                      หมายเลขบัตรประชาชน <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      className={`form-control ${errors.idCard && touched.idCard ? "is-invalid" : ""
                        }`}
                      name="idCard"
                      id="idCard"
                      minLength="13"
                      maxLength="13"
                      placeholder="ไม่ต้องใส่อักขระขีดและเว้นวรรค"
                    />
                    <ErrorMessage
                      name="idCard"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* สร้างรหัสผ่าน */}
                <h5 className="fw-bolder mt-5 mb-3">สร้างรหัสผ่าน</h5>
                <div className="rounded border p-4">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      รหัสผ่าน สำหรับเข้าใช้งาน{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="password"
                      className={`form-control ${errors.password && touched.password ? "is-invalid" : ""
                        }`}
                      name="password"
                      id="password"
                      minLength="8"
                      maxLength="30"
                      placeholder="a-z, A-Z, 0-9, 8 อักขระขึ้นไป"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* ข้อมูลติดต่อ */}
                <h5 className="fw-bolder mt-5 mb-3" id="contact">
                  ข้อมูลติดต่อ
                </h5>
                <div className="rounded border p-4">
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      เบอร์มือถือ <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      className={`form-control ${errors.mobile && touched.mobile ? "is-invalid" : ""
                        }`}
                      name="mobile"
                      id="mobile"
                      minLength="10"
                      maxLength="10"
                      placeholder="ไม่ต้องใส่อักขระขีด"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      อีเมล <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="email"
                      className={`form-control ${errors.email && touched.email ? "is-invalid" : ""
                        }`}
                      name="email"
                      id="email"
                      maxLength="100"
                      placeholder="example@webmail.npru.ac.th"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="my-3">
                  <div className="form-check ">
                    <Field
                      type="checkbox"
                      className={`form-check-input ${errors.accept && touched.accept ? "is-invalid" : ""
                        }`}
                      name="accept"
                      id="accept"
                    />
                    <label className="form-check-label " htmlFor="accept">
                      ข้าพเจ้ายอมรับว่าข้อมูลข้างต้นเป็นข้อมูลจริง
                    </label>
                    <ErrorMessage
                      name="accept"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    id="submitbtn"
                    name="submitbtn"
                    disabled={isSubmitting || isValidating}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;