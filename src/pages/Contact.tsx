import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Snackbar,
} from "@mui/joy";
import { Helmet, HelmetProvider } from "react-helmet-async";

type FormData = {
  fullName: string;
  subject: string;
  email: string;
  body: string;
};

const defaultValues: FormData = {
  fullName: "",
  subject: "",
  email: "",
  body: "",
};

export default function Contact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the form data to your backend
    setSnackbarOpen(true);
    reset(defaultValues); // Clear the form
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact - ReactCart</title>
      </Helmet>
      <Box sx={{ maxWidth: 500, margin: "auto", p: 2 }}>
        <Typography level="h1" component="h1" sx={{ mb: 2 }}>
          Contact Us.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={!!errors.fullName} sx={{ mb: 2 }}>
            <FormLabel>Full Name</FormLabel>
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.fullName && (
              <FormHelperText>{errors.fullName.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.subject} sx={{ mb: 2 }}>
            <FormLabel>Subject</FormLabel>
            <Controller
              name="subject"
              control={control}
              rules={{
                required: "Subject is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.subject && (
              <FormHelperText>{errors.subject.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.email} sx={{ mb: 2 }}>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => <Input type="email" {...field} />}
            />
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.body} sx={{ mb: 2 }}>
            <FormLabel>Message</FormLabel>
            <Controller
              name="body"
              control={control}
              rules={{
                required: "Message is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              }}
              render={({ field }) => <Textarea minRows={3} {...field} />}
            />
            {errors.body && (
              <FormHelperText>{errors.body.message}</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" variant="solid" color="primary" fullWidth>
            Send Message
          </Button>
        </form>

        <Snackbar
          variant="soft"
          color="success"
          autoHideDuration={3000}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          Form submitted! Check the console to see what was sent.
        </Snackbar>
      </Box>
    </HelmetProvider>
  );
}
