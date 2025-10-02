import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import {
  Shield,
  Home,
  Users,
  Star,
  CheckCircle,
  Phone,
  MapPin,
  Heart,
  Menu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield size={40} />,
      title: 'Verified & Safe',
      description: 'All properties are thoroughly verified with safety certifications',
      color: theme.palette.success.main,
    },
    {
      icon: <Home size={40} />,
      title: 'Quality Accommodation',
      description: 'Clean, hygienic rooms with modern amenities',
      color: theme.palette.primary.main,
    },
    {
      icon: <Users size={40} />,
      title: 'Community Support',
      description: 'Connect with verified students and build lasting friendships',
      color: theme.palette.secondary.main,
    },
    {
      icon: <Heart size={40} />,
      title: 'Women Safety Priority',
      description: 'Special safety features and women-only accommodations',
      color: theme.palette.error.main,
    },
  ];

  const safetyFeatures = [
    'CCTV Surveillance',
    'Gated Communities',
    'Female Landlords Available',
    '24/7 Emergency Support',
    'Verified Tenant Network',
    'Safe Area Index',
  ];

  const stats = [
    { number: '10,000+', label: 'Verified Properties' },
    { number: '50,000+', label: 'Happy Students' },
    { number: '100+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'Average Rating' },
  ];

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
            SafeStayHub
          </Typography>
          {!isMobile && (
            <Stack direction="row" spacing={2}>
              <Button color="primary">How it Works</Button>
              <Button color="primary">Safety</Button>
              <Button color="primary">For Landlords</Button>
              <Button variant="outlined" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button variant="contained" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </Stack>
          )}
          {isMobile && (
            <IconButton color="primary">
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: 8,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Box>
              <Typography variant="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Safe Stays + Healthy Meals
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 400, opacity: 0.9, mb: 4 }}>
                For Students & Interns
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 300, opacity: 0.8, mb: 4, lineHeight: 1.6 }}>
                Find verified, safe, and transparent accommodation with mess services. 
                Specially designed for women's safety and hygienic living conditions.
              </Typography>
              
              <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/auth')}
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    py: 2,
                    px: 4,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Find Your Safe Stay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    py: 2,
                    px: 4,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>

              <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                {safetyFeatures.slice(0, 3).map((feature, index) => (
                  <Chip
                    key={index}
                    icon={<CheckCircle size={16} />}
                    label={feature}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 500,
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" sx={{ opacity: 0.7 }}>
                  Hero Image / Video Preview
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Floating Stats */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 800,
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {stats.map((stat, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center',
                    py: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {stat.label}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Why Choose SafeStayHub?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            We understand the unique challenges students face when relocating. Our platform is built 
            with safety, transparency, and community at its core.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      backgroundColor: `${feature.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Onboarding Process */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Simple 3-Step Process
            </Typography>
            <Typography variant="h6" color="text.secondary">
              From search to move-in, we've made it incredibly simple and safe
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            <Box>
              <Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: 'white',
                  }}
                >
                  <MapPin size={40} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Find Verified Rooms Near You
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Search for safe, verified accommodations in your preferred location with advanced safety filters
                </Typography>
              </Card>
            </Box>

            <Box>
              <Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: 'white',
                  }}
                >
                  <Shield size={40} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Safe & Trusted for Students, Especially Women
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Every property is verified with special safety features designed for women's security and peace of mind
                </Typography>
              </Card>
            </Box>

            <Box>
              <Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.success.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: 'white',
                  }}
                >
                  <Home size={40} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Rooms + Mess in One Platform
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Book accommodation and mess services together, with transparent pricing and quality assurance
                </Typography>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          py: 10,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Ready to Find Your Safe Stay?
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students who have found their perfect accommodation through SafeStayHub
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth')}
            sx={{
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              fontWeight: 600,
              py: 2,
              px: 6,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: theme.palette.grey[900], color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                SafeStayHub
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Safe, verified, and transparent accommodation for students and interns.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                For Students
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Find Accommodation</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Safety Features</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Community</Typography>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Support
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Help Center</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Emergency: 112</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Contact Us</Typography>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Connect
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  <Phone size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  1800-SAFESTAY
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 SafeStayHub. All rights reserved. | Privacy Policy | Terms of Service
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
