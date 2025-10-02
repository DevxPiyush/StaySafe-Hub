import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  InputAdornment,
  IconButton,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Phone, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setOtpSent(false);
    setFormData({ phone: '', email: '', password: '', otp: '' });
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSendOTP = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/profile-setup');
    }, 1000);
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/profile-setup');
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setLoading(false);
      navigate('/profile-setup');
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ position: 'absolute', top: 16, left: 16 }}
            >
              <ArrowLeft />
            </IconButton>
            
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              Welcome to SafeStayHub
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to find your perfect safe stay
            </Typography>
          </Box>

          {/* Auth Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Mobile OTP" />
              <Tab label="Email" />
              <Tab label="College Email" />
            </Tabs>
          </Box>

          {/* Mobile OTP Tab */}
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              {!otpSent ? (
                <>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleSendOTP}
                    disabled={!formData.phone || loading}
                    sx={{ py: 1.5 }}
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </>
              ) : (
                <>
                  <Alert severity="success">
                    OTP sent to {formData.phone}
                  </Alert>
                  <TextField
                    fullWidth
                    label="Enter OTP"
                    placeholder="6-digit OTP"
                    value={formData.otp}
                    onChange={handleInputChange('otp')}
                    inputProps={{ maxLength: 6 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleVerifyOTP}
                    disabled={formData.otp.length !== 6 || loading}
                    sx={{ py: 1.5 }}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setOtpSent(false)}
                    sx={{ textAlign: 'center' }}
                  >
                    Change Number
                  </Button>
                </>
              )}
            </Stack>
          </TabPanel>

          {/* Email Tab */}
          <TabPanel value={tabValue} index={1}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleEmailLogin}
                disabled={!formData.email || !formData.password || loading}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <Button variant="text" size="small">
                  Create Account
                </Button>
              </Typography>
            </Stack>
          </TabPanel>

          {/* College Email Tab */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              <Alert severity="info">
                Use your college/university email for verification
              </Alert>
              <TextField
                fullWidth
                label="College Email"
                type="email"
                placeholder="your.name@college.edu"
                value={formData.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleEmailLogin}
                disabled={!formData.email || !formData.password || loading}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Signing In...' : 'Sign In with College Email'}
              </Button>
            </Stack>
          </TabPanel>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

        {/* Google Sign In */}
<Button
  fullWidth
  variant="outlined"
  size="large"
  startIcon={<Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>G</Box>}
  onClick={handleGoogleLogin}
  disabled={loading}
  sx={{
    py: 1.5,
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgba(108, 92, 231, 0.04)',
    },
  }}
>
  Continue with Google
</Button>


          {/* Terms */}
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 3 }}>
            By continuing, you agree to our{' '}
            <Button variant="text" size="small" sx={{ p: 0, textDecoration: 'underline' }}>
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="text" size="small" sx={{ p: 0, textDecoration: 'underline' }}>
              Privacy Policy
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPage;
