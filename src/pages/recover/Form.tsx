///Fomik form for account recovery
import { Formik, Form } from "formik";

//Radix UI
import { Button, Text, Flex } from "@radix-ui/themes";

// Form validation schema
import { formValidationSchema } from "./schema";

// Form fields
import { FormTextField } from "../Signup/components";

// Shorthand styles and radix properties
import { stylesDict } from "../../components/radixStyles";

export default function RecoveryForm() {
  return (
    <div className="p-5 rounded-lg shadow-[gray] shadow-sm max-w-[350px]">
      {/* Sing in with HRTM */}
      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
        <Text as="p" mb="5" size="5" weight={"bold"}>
          Account recovery
        </Text>
      </Flex>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          {/*Gap controls form fields*/}
          <Flex {...stylesDict.radix["flex_col-cent-gap-1"]} gap={"1"}>
            {/* Begin fields */}
            <FormTextField
              label="Email"
              name="email"
              type="text"
              placeholder="Enter email address"
            />
            <Flex gap={"1"} className="w-full">
              <Button
                variant="solid"
                type="submit"
                className="!w-full !mt-2 !mb-2"
              >
                Send recovery email
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Formik>

      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]} gap={"4"}>
        {/* Google Recaptcha */}
        {/* <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div> */}
      </Flex>
    </div>
  );
}
