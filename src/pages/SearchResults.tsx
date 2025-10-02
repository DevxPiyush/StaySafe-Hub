import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import {
  Filter,
  MapPin,
  Star,
  Shield,
  Users,
  Wifi,
  Car,
  Utensils,
  Camera,
  Heart,
  Share,
  Phone,
  Map,
  List,
  ArrowLeft,
  Bell,
  MessageCircle,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    priceRange: [5000, 20000],
    propertyType: [] as string[],
    roomType: [] as string[],
    amenities: [] as string[],
    safetyFeatures: [] as string[],
    verifiedOnly: true,
    girlsOnly: false,
    femaleLandlord: false,
    messIncluded: false,
    sortBy: 'relevance',
  });

  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || '';

  // Sample properties data
  const properties = [
    {
      id: '1',
      title: 'Sunrise Girls PG',
      description: 'Safe and secure accommodation for working women',
      location: 'Hinjewadi, Pune',
      address: 'Phase 1, Near IT Park',
      price: 8000,
      deposit: 8000,
      messCharges: 3500,
      rating: 4.5,
      reviewCount: 142,
      verified: true,
      girlsOnly: true,
      femaleLandlord: true,
      images: ['https://via.placeholder.com/300x200'],
      amenities: ['WiFi', 'AC', 'Laundry', 'Power Backup', 'CCTV'],
      safetyFeatures: ['CCTV Surveillance', 'Gated Community', 'Security Guard'],
      availability: { single: 2, double: 1, triple: 0 },
      distance: '0.5 km from IT Park',
      landlord: { name: 'Mrs. Priya Sharma', gender: 'female', rating: 4.6 },
    },
    {
      id: '2',
      title: 'Tech Hub Residency',
      description: 'Modern co-living space with all amenities',
      location: 'Whitefield, Bangalore',
      address: 'EPIP Zone, Near Forum Mall',
      price: 12000,
      deposit: 10000,
      messCharges: 4000,
      rating: 4.3,
      reviewCount: 89,
      verified: true,
      girlsOnly: false,
      femaleLandlord: false,
      images: ['https://via.placeholder.com/300x200'],
      amenities: ['WiFi', 'AC', 'Gym', 'Swimming Pool', 'Parking'],
      safetyFeatures: ['CCTV Surveillance', 'Biometric Entry', 'Fire Safety'],
      availability: { single: 5, double: 3, triple: 2 },
      distance: '1.2 km from Whitefield Metro',
      landlord: { name: 'Mr. Rajesh Kumar', gender: 'male', rating: 4.2 },
    },
    {
      id: '3',
      title: 'Green Valley PG',
      description: 'Peaceful environment with homely food',
      location: 'Gachibowli, Hyderabad',
      address: 'DLF Cyber City, Near Microsoft',
      price: 9500,
      deposit: 9500,
      messCharges: 3800,
      rating: 4.7,
      reviewCount: 203,
      verified: true,
      girlsOnly: true,
      femaleLandlord: true,
      images: ['https://via.placeholder.com/300x200'],
      amenities: ['WiFi', 'AC', 'Laundry', 'Study Room', 'Garden'],
      safetyFeatures: ['CCTV Surveillance', 'Gated Community', 'Women Security'],
      availability: { single: 1, double: 4, triple: 2 },
      distance: '2.1 km from Gachibowli Metro',
      landlord: { name: 'Mrs. Lakshmi Devi', gender: 'female', rating: 4.8 },
    },
    {
      id: '4',
      title: 'Urban Nest PG',
      description: 'Budget-friendly accommodation with basic amenities',
      location: 'Koramangala, Bangalore',
      address: '5th Block, Near Sony World',
      price: 7500,
      deposit: 7500,
      messCharges: 3200,
      rating: 4.1,
      reviewCount: 67,
      verified: true,
      girlsOnly: false,
      femaleLandlord: false,
      images: ['https://via.placeholder.com/300x200'],
      amenities: ['WiFi', 'Laundry', 'Common Kitchen', 'Study Area'],
      safetyFeatures: ['CCTV Surveillance', 'Security Guard'],
      availability: { single: 3, double: 6, triple: 4 },
      distance: '0.8 km from Koramangala Metro',
      landlord: { name: 'Mr. Suresh Reddy', gender: 'male', rating: 4.0 },
    },
  ];

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleEmergency = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        alert('Emergency services contacted! Location shared with emergency contacts.');
      });
    }
  };

  const filteredProperties = properties.filter(property => {
    // Apply filters
    if (filters.verifiedOnly && !property.verified) return false;
    if (filters.girlsOnly && !property.girlsOnly) return false;
    if (filters.femaleLandlord && property.landlord.gender !== 'female') return false;
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) return false;
    return true;
  });

  const FilterDrawer = () => (
    <Box sx={{ width: 300, p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Filters
      </Typography>

      {/* Safety Filters */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>
          🔒 Safety Features
        </Typography>
        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.verifiedOnly}
                onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
              />
            }
            label="Verified Only (Recommended)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.girlsOnly}
                onChange={(e) => handleFilterChange('girlsOnly', e.target.checked)}
              />
            }
            label="Girls-Only PG"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.femaleLandlord}
                onChange={(e) => handleFilterChange('femaleLandlord', e.target.checked)}
              />
            }
            label="Female Landlord"
          />
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          💰 Budget (per month)
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => handleFilterChange('priceRange', value)}
          valueLabelDisplay="auto"
          min={3000}
          max={25000}
          step={500}
          marks={[
            { value: 3000, label: '₹3K' },
            { value: 15000, label: '₹15K' },
            { value: 25000, label: '₹25K' },
          ]}
        />
        <Typography variant="body2" color="text.secondary">
          ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
        </Typography>
      </Box>

      {/* Property Type */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          🏠 Accommodation Type
        </Typography>
        <Stack spacing={1}>
          {['PG', 'Hostel', 'Apartment'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.propertyType.includes(type.toLowerCase())}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.propertyType, type.toLowerCase()]
                      : filters.propertyType.filter(t => t !== type.toLowerCase());
                    handleFilterChange('propertyType', newTypes);
                  }}
                />
              }
              label={type}
            />
          ))}
        </Stack>
      </Box>

      {/* Room Type */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          🛏️ Room Type
        </Typography>
        <Stack spacing={1}>
          {['Single', 'Double', 'Triple'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.roomType.includes(type.toLowerCase())}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.roomType, type.toLowerCase()]
                      : filters.roomType.filter(t => t !== type.toLowerCase());
                    handleFilterChange('roomType', newTypes);
                  }}
                />
              }
              label={type}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Mess Options */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          🍽️ Mess Options
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.messIncluded}
              onChange={(e) => handleFilterChange('messIncluded', e.target.checked)}
            />
          }
          label="Mess Included"
        />
      </Box>

      {/* Sort By */}
      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            label="Sort By"
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="price">Price: Low to High</MenuItem>
            <MenuItem value="rating">Rating: High to Low</MenuItem>
            <MenuItem value="distance">Distance</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* App Bar */}
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 1 }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
            Search Results
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
          
          <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
            S
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Search Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {query ? `Results for "${query}"` : type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Properties` : 'All Properties'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredProperties.length} properties found
            </Typography>
          </Box>

          {/* Controls */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Filter size={16} />}
              onClick={() => setFilterDrawerOpen(true)}
            >
              Filters
            </Button>
            
            <Stack direction="row" spacing={1}>
              <Button
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                startIcon={<List size={16} />}
                onClick={() => setViewMode('list')}
                size="small"
              >
                List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'contained' : 'outlined'}
                startIcon={<Map size={16} />}
                onClick={() => setViewMode('map')}
                size="small"
              >
                Map
              </Button>
            </Stack>
          </Box>

          {/* Results */}
          {viewMode === 'list' ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
              {filteredProperties.map((property) => (
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

                      {/* Action Icons */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: 'absolute', top: 12, right: 12 }}
                      >
                        <IconButton
                          size="small"
                          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to wishlist
                          }}
                        >
                          <Heart size={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Share property
                          }}
                        >
                          <Share size={16} />
                        </IconButton>
                      </Stack>
                    </Box>
                    
                    <CardContent sx={{ pb: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {property.title}
                      </Typography>
                      
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                        <MapPin size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                          {property.location}
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Star size={16} color={theme.palette.warning.main} />
                          <Typography variant="body2">
                            {property.rating} ({property.reviewCount} reviews)
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {property.distance}
                        </Typography>
                      </Stack>

                      {/* Amenities */}
                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                        {property.amenities.slice(0, 3).map((amenity) => (
                          <Chip
                            key={amenity}
                            label={amenity}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {property.amenities.length > 3 && (
                          <Chip
                            label={`+${property.amenities.length - 3} more`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                            ₹{property.price.toLocaleString()}/month
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            + ₹{property.deposit.toLocaleString()} deposit
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={`${Object.values(property.availability).reduce((a, b) => a + b, 0)} available`}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
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
          ) : (
            <Card sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Map View - Properties will be displayed on an interactive map
              </Typography>
            </Card>
          )}
        </Container>
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <FilterDrawer />
      </Drawer>

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

export default SearchResults;
