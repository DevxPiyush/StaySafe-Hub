import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Avatar,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tab,
  Tabs,
  Paper,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import {
  ArrowLeft,
  Star,
  Shield,
  MapPin,
  Users,
  Wifi,
  Car,
  Utensils,
  Camera,
  Heart,
  Share,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Eye,
  Bell,
  Home,
  Bath,
  Bed,
  Zap,
  Clock,
  User,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PropertyDetails: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [tabValue, setTabValue] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Sample property data
  const property = {
    id: '1',
    title: 'Sunrise Girls PG',
    description: 'Safe and secure accommodation for working women with all modern amenities.',
    location: 'Hinjewadi, Pune',
    address: 'Phase 1, Near IT Park, Hinjewadi, Pune - 411057',
    price: 8000,
    deposit: 8000,
    messCharges: 3500,
    rating: 4.5,
    reviewCount: 142,
    verified: true,
    girlsOnly: true,
    availability: { single: 2, double: 1, triple: 0 },
    landlord: {
      name: 'Mrs. Priya Sharma',
      gender: 'female',
      rating: 4.6,
      isVerified: true,
    },
  };

  const handleEmergency = () => {
    alert('Emergency services contacted!');
  };

  const handleBookNow = () => {
    navigate(`/booking/${property.id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* App Bar */}
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
            {property.title}
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => setIsSaved(!isSaved)}>
              <Heart size={20} color={isSaved ? theme.palette.error.main : 'currentColor'} />
            </IconButton>
            <IconButton>
              <Share size={20} />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main, ml: 1 }}>
              S
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Hero Section */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 4 }}>
            <Box>
              <Card>
                <Box
                  sx={{
                    height: 400,
                    backgroundColor: theme.palette.grey[200],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Property Images / 360° Tour
                  </Typography>
                  
                  {/* Badges */}
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ position: 'absolute', top: 16, left: 16 }}
                  >
                    {property.verified && (
                      <Chip
                        icon={<Shield size={14} />}
                        label="Verified"
                        size="small"
                        color="success"
                      />
                    )}
                    {property.girlsOnly && (
                      <Chip
                        label="Girls Only"
                        size="small"
                        sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}
                      />
                    )}
                  </Stack>

                  <Button
                    variant="contained"
                    startIcon={<Camera size={16} />}
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  >
                    View 360° Tour
                  </Button>
                </Box>
              </Card>
            </Box>

            <Box>
              <Card sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {property.title}
                </Typography>
                
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <MapPin size={16} color={theme.palette.text.secondary} />
                  <Typography variant="body2" color="text.secondary">
                    {property.location}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                  <Star size={16} color={theme.palette.warning.main} />
                  <Typography variant="body2">
                    {property.rating} ({property.reviewCount} reviews)
                  </Typography>
                </Stack>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    ₹{property.price.toLocaleString()}
                    <Typography component="span" variant="body2" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    + ₹{property.deposit.toLocaleString()} deposit
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    + ₹{property.messCharges.toLocaleString()} mess charges
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Availability
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {Object.entries(property.availability).map(([type, count]) => (
                      <Chip
                        key={type}
                        label={`${type}: ${count}`}
                        size="small"
                        color={count > 0 ? 'success' : 'default'}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleBookNow}
                    sx={{ mb: 2 }}
                  >
                    Book Now
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<MessageCircle size={16} />}
                  >
                    Chat with Landlord
                  </Button>
                </Box>
              </Card>
            </Box>
        </Box>

          {/* Content Tabs */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Property Details
            </Typography>
            <Typography variant="body1" paragraph>
              {property.description}
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Safety Features
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mb: 3 }}>
              {['CCTV Surveillance', 'Gated Community', 'Security Guard', 'Women Security'].map((feature) => (
                <Box key={feature}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircle size={20} color={theme.palette.success.main} />
                    <Typography variant="body2">{feature}</Typography>
                  </Stack>
                </Box>
              ))}
            </Box>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Landlord Information
            </Typography>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {property.landlord.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {property.landlord.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Star size={16} color={theme.palette.warning.main} />
                    <Typography variant="body2">{property.landlord.rating} rating</Typography>
                    {property.landlord.isVerified && (
                      <Chip icon={<Shield size={12} />} label="Verified" size="small" color="success" />
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Card>
          </Paper>
        </Container>
      </Box>

      {/* Emergency SOS Button */}
      <Fab
        color="error"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
        onClick={handleEmergency}
      >
        <Phone size={24} />
      </Fab>
    </Box>
  );
};

export default PropertyDetails;
