import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Badge,
  Fab,
} from '@mui/material';
import {
  Search,
  Shield,
  Users,
  Utensils,
  UserPlus,
  Map,
  Bell,
  Settings,
  LogOut,
  MessageCircle,
  Phone,
  AlertCircle,
  Home,
  Star,
  MapPin,
  Filter,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const quickAccessCards = [
    {
      title: 'Verified Rooms',
      description: 'Browse safe, verified accommodations',
      icon: <Shield size={32} />,
      color: theme.palette.success.main,
      action: () => navigate('/search?type=verified'),
    },
    {
      title: 'Girls-Only PGs',
      description: 'Women-only accommodations with enhanced safety',
      icon: <Users size={32} />,
      color: theme.palette.secondary.main,
      action: () => navigate('/search?type=girls-only'),
    },
    {
      title: 'Mess Services',
      description: 'Hygienic meal services near you',
      icon: <Utensils size={32} />,
      color: theme.palette.warning.main,
      action: () => navigate('/search?type=mess'),
    },
    {
      title: 'Find Roommate',
      description: 'Connect with verified students',
      icon: <UserPlus size={32} />,
      color: theme.palette.primary.main,
      action: () => navigate('/search?type=roommate'),
    },
  ];

  const recentSearches = [
    'PG near Hinjewadi, Pune',
    'Girls hostel in Koramangala',
    'Mess services in Whitefield',
  ];

  const nearbyProperties = [
    {
      id: '1',
      title: 'Sunrise Girls PG',
      location: 'Hinjewadi, Pune',
      price: '₹8,000/month',
      rating: 4.5,
      verified: true,
      girlsOnly: true,
      image: 'https://via.placeholder.com/300x200',
      distance: '0.5 km',
    },
    {
      id: '2',
      title: 'Tech Hub Residency',
      location: 'Whitefield, Bangalore',
      price: '₹12,000/month',
      rating: 4.3,
      verified: true,
      girlsOnly: false,
      image: 'https://via.placeholder.com/300x200',
      distance: '1.2 km',
    },
    {
      id: '3',
      title: 'Green Valley PG',
      location: 'Gachibowli, Hyderabad',
      price: '₹9,500/month',
      rating: 4.7,
      verified: true,
      girlsOnly: true,
      image: 'https://via.placeholder.com/300x200',
      distance: '2.1 km',
    },
  ];

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleEmergency = () => {
    // Emergency SOS functionality
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // In a real app, this would:
        // 1. Call emergency services (112)
        // 2. Send SMS to emergency contacts
        // 3. Share live location
        alert('Emergency services contacted! Location shared with emergency contacts.');
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* App Bar */}
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
            SafeStayHub
          </Typography>
          
          {!isMobile && (
            <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <Bell size={20} />
                </Badge>
              </IconButton>
              <IconButton>
                <MessageCircle size={20} />
              </IconButton>
            </Stack>
          )}
          
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              S
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => navigate('/tenant')}>
              <Home size={16} style={{ marginRight: 8 }} />
              My Dashboard
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Settings size={16} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={() => navigate('/')}>
              <LogOut size={16} style={{ marginRight: 8 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Welcome Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome back, Sarah! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Find your perfect safe stay with verified properties and transparent pricing
            </Typography>
          </Box>

          {/* Search Bar */}
          <Card elevation={2} sx={{ mb: 4, p: 3 }}>
            <TextField
              fullWidth
              placeholder="Search Rooms, Mess, or Room + Mess..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton>
                        <Filter size={20} />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={() => handleSearch()}
                        sx={{ minWidth: 'auto', px: 3 }}
                      >
                        Search
                      </Button>
                    </Stack>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.1rem',
                },
              }}
            />
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Recent searches:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {recentSearches.map((search, index) => (
                    <Chip
                      key={index}
                      label={search}
                      variant="outlined"
                      size="small"
                      onClick={() => handleSearch(search)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Card>

          {/* Quick Access Cards */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Quick Access
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
              {quickAccessCards.map((card, index) => (
                <Box key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                    onClick={card.action}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          backgroundColor: `${card.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          color: card.color,
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Map View Button */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Map size={20} />}
              onClick={() => navigate('/search?view=map')}
              sx={{ px: 4 }}
            >
              View Properties on Map
            </Button>
          </Box>

          {/* Nearby Properties */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Properties Near You
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {nearbyProperties.map((property) => (
                <Box key={property.id}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    <Box
                      sx={{
                        height: 200,
                        backgroundColor: theme.palette.grey[200],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Property Image
                      </Typography>
                      
                      {/* Badges */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: 'absolute', top: 12, left: 12 }}
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
                    </Box>
                    
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {property.title}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                        <MapPin size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                          {property.location} • {property.distance}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                        <Star size={16} color={theme.palette.warning.main} />
                        <Typography variant="body2">
                          {property.rating}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                        {property.price}
                      </Typography>
                    </CardContent>
                    
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button size="small" variant="outlined" fullWidth>
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
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

      {/* Emergency SOS Info */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 90,
          right: 24,
          backgroundColor: theme.palette.error.main,
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: 2,
          fontSize: '0.75rem',
          fontWeight: 500,
          maxWidth: 120,
          textAlign: 'center',
          zIndex: 999,
        }}
      >
        Emergency SOS
      </Box>
    </Box>
  );
};

export default Dashboard;
