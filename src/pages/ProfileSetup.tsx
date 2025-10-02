import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Alert,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
  Avatar,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  User,
  Upload,
  Shield,
  CheckCircle,
  Plus,
  X,
  Camera,
  FileText,
  CreditCard,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = ['Basic Info', 'Emergency Contacts', 'Verification'];

const ProfileSetup: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({
    name: '',
    gender: '',
    college: '',
    company: '',
    durationOfStay: '',
    profilePicture: null as File | null,
    emergencyContacts: [{ name: '', phone: '', relationship: '' }],
    collegeId: null as File | null,
    internshipLetter: null as File | null,
    aadhaar: null as File | null,
  });

  const handleInputChange = (field: string) => (event: any) => {
    setProfileData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleFileChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, [field]: file }));
    }
  };

  const addEmergencyContact = () => {
    setProfileData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', phone: '', relationship: '' }]
    }));
  };

  const removeEmergencyContact = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleComplete = () => {
    // Submit profile data
    navigate('/dashboard');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Tell us about yourself
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This helps us provide personalized recommendations
              </Typography>
            </Box>

            {/* Profile Picture */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '2rem',
                  }}
                >
                  {profileData.profilePicture ? (
                    <img
                      src={URL.createObjectURL(profileData.profilePicture)}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <User size={40} />
                  )}
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-picture-upload"
                  type="file"
                  onChange={handleFileChange('profilePicture')}
                />
                <label htmlFor="profile-picture-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      right: -8,
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    <Camera size={16} />
                  </IconButton>
                </label>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter your full name"
              value={profileData.name}
              onChange={handleInputChange('name')}
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                value={profileData.gender}
                onChange={handleInputChange('gender')}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="College/University"
              placeholder="Enter your college name"
              value={profileData.college}
              onChange={handleInputChange('college')}
            />

            <TextField
              fullWidth
              label="Company (if intern)"
              placeholder="Enter your company name"
              value={profileData.company}
              onChange={handleInputChange('company')}
            />

            <FormControl fullWidth required>
              <InputLabel>Duration of Stay</InputLabel>
              <Select
                value={profileData.durationOfStay}
                onChange={handleInputChange('durationOfStay')}
                label="Duration of Stay"
              >
                <MenuItem value="1-3 months">1-3 months</MenuItem>
                <MenuItem value="3-6 months">3-6 months</MenuItem>
                <MenuItem value="6-12 months">6-12 months</MenuItem>
                <MenuItem value="1+ years">1+ years</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Emergency Contacts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profileData.gender === 'female' 
                  ? 'Required for women users - Add trusted contacts for safety'
                  : 'Add emergency contacts for safety (optional)'
                }
              </Typography>
            </Box>

            {profileData.gender === 'female' && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <strong>Safety First:</strong> Emergency contacts are mandatory for women users. 
                These contacts will be notified in case of emergency situations.
              </Alert>
            )}

            {profileData.emergencyContacts.map((contact, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Contact {index + 1}</Typography>
                    {index > 0 && (
                      <IconButton
                        size="small"
                        onClick={() => removeEmergencyContact(index)}
                        color="error"
                      >
                        <X size={16} />
                      </IconButton>
                    )}
                  </Box>
                  
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Name"
                      placeholder="Contact name"
                      value={contact.name}
                      onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                      required={profileData.gender === 'female' || index === 0}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      placeholder="Contact phone number"
                      value={contact.phone}
                      onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                      required={profileData.gender === 'female' || index === 0}
                    />
                    <FormControl fullWidth required={profileData.gender === 'female' || index === 0}>
                      <InputLabel>Relationship</InputLabel>
                      <Select
                        value={contact.relationship}
                        onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                        label="Relationship"
                      >
                        <MenuItem value="parent">Parent</MenuItem>
                        <MenuItem value="sibling">Sibling</MenuItem>
                        <MenuItem value="friend">Friend</MenuItem>
                        <MenuItem value="relative">Relative</MenuItem>
                        <MenuItem value="guardian">Guardian</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outlined"
              startIcon={<Plus size={16} />}
              onClick={addEmergencyContact}
              sx={{ alignSelf: 'flex-start' }}
            >
              Add Another Contact
            </Button>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Verification Documents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload documents to verify your identity and get access to verified properties
              </Typography>
            </Box>

            <Alert severity="info">
              Upload clear photos of your documents. All information will be kept secure and confidential.
            </Alert>

            {/* College ID / Internship Letter */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  College ID or Internship Letter
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload your college ID card or internship offer letter
                </Typography>
                
                <input
                  accept="image/*,.pdf"
                  style={{ display: 'none' }}
                  id="college-id-upload"
                  type="file"
                  onChange={handleFileChange('collegeId')}
                />
                <label htmlFor="college-id-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<FileText size={16} />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    {profileData.collegeId ? 'Change File' : 'Upload Document'}
                  </Button>
                </label>
                
                {profileData.collegeId && (
                  <Chip
                    icon={<CheckCircle size={16} />}
                    label={profileData.collegeId.name}
                    color="success"
                    variant="outlined"
                  />
                )}
              </CardContent>
            </Card>

            {/* Aadhaar */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Aadhaar Card
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload your Aadhaar card for identity verification
                </Typography>
                
                <input
                  accept="image/*,.pdf"
                  style={{ display: 'none' }}
                  id="aadhaar-upload"
                  type="file"
                  onChange={handleFileChange('aadhaar')}
                />
                <label htmlFor="aadhaar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CreditCard size={16} />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    {profileData.aadhaar ? 'Change File' : 'Upload Aadhaar'}
                  </Button>
                </label>
                
                {profileData.aadhaar && (
                  <Chip
                    icon={<CheckCircle size={16} />}
                    label={profileData.aadhaar.name}
                    color="success"
                    variant="outlined"
                  />
                )}
              </CardContent>
            </Card>

            <Alert severity="success" icon={<Shield />}>
              <strong>Verification Status:</strong> Your documents will be reviewed within 24 hours. 
              You'll receive a verification badge once approved.
            </Alert>
          </Stack>
        );

      default:
        return null;
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return profileData.name && profileData.gender && profileData.durationOfStay;
      case 1:
        if (profileData.gender === 'female') {
          return profileData.emergencyContacts[0].name && 
                 profileData.emergencyContacts[0].phone && 
                 profileData.emergencyContacts[0].relationship;
        }
        return true;
      case 2:
        return profileData.collegeId && profileData.aadhaar;
      default:
        return false;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: isMobile ? 3 : 4, borderRadius: 3 }}>
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              Complete Your Profile
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(activeStep / (steps.length - 1)) * 100}
              sx={{ mt: 2, borderRadius: 2, height: 8 }}
            />
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep || Boolean(isStepComplete(index))}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
            >
              Back
            </Button>
            
            <Button
              onClick={activeStep === steps.length - 1 ? handleComplete : handleNext}
              variant="contained"
              disabled={!Boolean(isStepComplete(activeStep))}
            >
              {activeStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </Button>
          </Box>

          {/* Progress Info */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Step {activeStep + 1} of {steps.length}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfileSetup;
