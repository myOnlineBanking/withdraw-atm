import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MoneyOffTwoTone from "@mui/icons-material/MoneyOffTwoTone";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import withdraw_service from "./services/withdraw_service";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function App() {
  const [open, setOpen] = React.useState(false);

  const rand = 100000 + Math.random() * (999999 - 100000);

  const [otp, setOtp] = React.useState(parseInt(rand));

  const [cin, setCin] = React.useState();
  const [reference, setRef] = React.useState();
  document.title = "Withdraw ATM";
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    setCin(data.get("cin"));
    setRef(data.get("reference"));

    withdraw_service.sendOtp(
      data.get("firstName"),
      data.get("lastName"),
      data.get("email"),
      data.get("phone"),
      otp
    );
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleCheckOtp = async (event) =>{
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (otp == data.get("otp")) {
      setOpen(false);
      withdraw_service.makeWithdraw(cin,reference);
      
    } else {
      alert("OTP invalid" + data.get("otp") + " : " + otp);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MoneyOffTwoTone />
          </Avatar>
          <Typography component="h1" variant="h">
            Withdraw
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cin"
                  label="Your CIN"
                  name="cin"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="reference"
                  label="Transfer Reference"
                  name="reference"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I confirm my responsibility for this operation"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Withdraw
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{"Have you received a code?"}</DialogTitle>
          <DialogContent>
            <form action="/" method="POST" onSubmit={handleCheckOtp}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="otp"
                  label="Your OTP"
                  name="otp"
                />
              </Grid>

              <Button type="submit" label="Submit" primary={true}>
                Check
              </Button>
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleToClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
