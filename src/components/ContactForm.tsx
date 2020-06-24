import * as React from "react";
import styled, { useTheme } from "styled-components";
import { Input } from "./Input";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { Formik, Field } from "formik";
import { submitFormToNetlify } from "../services/submitForm";
import { ContactFormType } from "../../types/types";

interface ContactFormProps {}

const FormName = "contact";
const FormComponents = [
  {
    name: "Name",
    type: "Input",
    props: {
      type: "text",
    },
  },
  {
    name: "Email",
    type: "Input",
    props: {
      type: "email",
    },
  },
  {
    name: "Message",
    type: "Textarea",
    props: {},
  },
];

export const ContactForm: React.SFC<ContactFormProps> = () => {
  const theme = useTheme();

  const initialValues = FormComponents.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.name.toLowerCase()]: "",
    };
  }, {});

  const buildComponets = (withFields: boolean) => {
    return FormComponents.map((component, index) => {
      if (component.type === "Input") {
        return (
          <div key={index}>
            <span>{component.name}: </span>
            {withFields ? (
              <Field
                name={component.name.toLowerCase()}
                {...component.props}
                as={Input}
              />
            ) : (
              <Input name={component.name.toLowerCase()} {...component.props} />
            )}
          </div>
        );
      }
      if (component.type === "Textarea") {
        return (
          <div>
            <span>{component.name}: </span>
            {withFields ? (
              <Field name={component.name.toLowerCase()} as={Textarea} />
            ) : (
              <Textarea name={component.name.toLowerCase()} />
            )}
          </div>
        );
      }
    });
  };
  const buildForm = (isNetlify: boolean) => {
    if (isNetlify) {
      return (
        <form name="contact" hidden data-netlify="true">
          {buildComponets(false)}
        </form>
      );
    } else {
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            submitFormToNetlify({
              ...values,
              formName: FormName,
            } as ContactFormType)
              .then((data) => {
                alert(
                  "Thanks for submitting the form! I will get back to you shorly!"
                );
              })
              .catch((err) => {
                alert("Looks like there was an error submitting the form");
              });
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <>
                {buildComponets(true)}
                <div>
                  <Button
                    fullWidth
                    backgroundColor={theme.colors.lovelyBlue}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      );
    }
  };
  return (
    <>
      {buildForm(true)}
      {buildForm(false)}
    </>
  );
};

const StyledContactForm = styled.form`
  & > div {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  & > div {
    margin-bottom: 20px;
  }
`;
