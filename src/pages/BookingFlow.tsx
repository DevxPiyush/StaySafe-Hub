import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Users,
  Home,
  Utensils,
  Phone,
  CheckCircle,
  User,
} from "lucide-react";
import {
  Container,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  TextField,
  Divider,
} from "@mui/material";

const steps = ["Select Room", "Guest Details", "Payment"];

const BookingFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowLeft />}
        onClick={handleBack}
        disabled={activeStep === 0}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Choose a Room
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Paper
                  sx={{
                    p: 2,
                    border:
                      selectedRoom === "Deluxe"
                        ? "2px solid #6c5ce7"
                        : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedRoom("Deluxe")}
                >
                  <Home />
                  <Typography variant="subtitle1">Deluxe Room</Typography>
                  <Typography variant="body2">₹2000 / night</Typography>
                </Paper>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Paper
                  sx={{
                    p: 2,
                    border:
                      selectedRoom === "Suite"
                        ? "2px solid #6c5ce7"
                        : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedRoom("Suite")}
                >
                  <Utensils />
                  <Typography variant="subtitle1">Suite</Typography>
                  <Typography variant="body2">₹3500 / night</Typography>
                </Paper>
              </Box>
            </Box>
          </Paper>
        )}

        {activeStep === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Guest Information
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                InputProps={{
                  startAdornment: <User size={18} style={{ marginRight: 8 }} />,
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <Phone size={18} style={{ marginRight: 8 }} />
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Number of Guests"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <Users size={18} style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </Box>
          </Paper>
        )}

        {activeStep === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Selected Room: {selectedRoom}</Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {selectedRoom === "Suite" ? "₹3500" : "₹2000"} / night
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<CreditCard />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Pay Now
              </Button>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Next Button */}
      {activeStep < steps.length - 1 && (
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 0 && !selectedRoom}
          >
            Next
          </Button>
        </Box>
      )}

      {/* Confirmation */}
      {activeStep === steps.length - 1 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <CheckCircle size={48} color="green" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Booking Confirmed!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BookingFlow;
