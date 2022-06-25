import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  VStack,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";

const TextField = ({ name, type, YupValidation, title }) => {
  return (
    <Field name={name} validate={YupValidation[name]}>
      {({ Field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Input
            {...Field}
            name={name}
            type={type}
            onChange={form.handleChange}
            value={form.values[name]}
            fontSize={"2xl"}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default TextField;
