import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tab,
  Tabs,
  Paper,
  Alert,
  useTheme,
  Fab,
} from '@mui/material';
import {
  Home,
  CreditCard,
  Users,
  Star,
  MessageCircle,
  Bell,
  Settings,
  Phone,
  MapPin,
  CheckCircle,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TenantPortal: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const tenantData = {
    currentStay: {
      propertyTitle: 'Sunrise Girls PG',
      location: 'Hinjewadi, Pune',
      roomType: 'double',
      planType: 'room-mess',
      monthlyRent: 8000,
      messCharges: 3500,
      landlord: { name: 'Mrs. Priya Sharma', rating: 4.6 },
      roommate: { name: 'Anita Desai', college: 'Pune University' },
    },
    payments: [
      { id: '1', type: 'Monthly Rent', amount: 8000, status: 'pending' },
      { id: '2', type: 'Mess Charges', amount: 3500, status: 'pending' },
    ],
  };

  const handleEmergency = () => {
    alert('🚨 EMERGENCY ACTIVATED!\n\n✅ Calling Women Helpline (112)\n✅ SMS sent to emergency contacts\n✅ Live location shared');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
            My Dashboard
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            <IconButton><MessageCircle size={20} /></IconButton>
            <IconButton><Settings size={20} /></IconButton>
          </Stack>
          <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>S</Avatar>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Welcome back, Sarah! 👋
          </Typography>

          {/* Current Stay Overview */}
          <Card sx={{ mb: 4, background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, color: 'white' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {tenantData.currentStay.propertyTitle}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <MapPin size={16} />
                    <Typography>{tenantData.currentStay.location}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Chip label={`${tenantData.currentStay.roomType} occupancy`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }} />
                    <Chip label={tenantData.currentStay.planType.replace('-', ' + ')} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }} />
                  </Stack>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    ₹{(tenantData.currentStay.monthlyRent + tenantData.currentStay.messCharges).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>Monthly Total</Typography>
                  <Button variant="contained" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                    View Agreement
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} textColor="primary" indicatorColor="primary">
              <Tab icon={<Home size={16} />} label="My Room" />
              <Tab icon={<CreditCard size={16} />} label="Payments" />
              <Tab icon={<Users size={16} />} label="Roommate" />
              <Tab icon={<Star size={16} />} label="Reviews" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Box>
                    <Card variant="outlined" sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Landlord Information
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <User size={20} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {tenantData.currentStay.landlord.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Star size={16} color={theme.palette.warning.main} />
                            <Typography variant="body2">{tenantData.currentStay.landlord.rating} rating</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  </Box>
                  <Box>
                    <Alert severity="info">
                      <strong>Safety Tip:</strong> Use the emergency SOS button for immediate help.
                    </Alert>
                  </Box>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Payment History</Typography>
                    <Stack spacing={2}>
                      {tenantData.payments.map((payment) => (
                        <Card key={payment.id} variant="outlined">
                          <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Box>
                                <Typography variant="h6">{payment.type}</Typography>
                                <Typography variant="h6" color="primary">₹{payment.amount.toLocaleString()}</Typography>
                              </Box>
                              <Chip label={payment.status.toUpperCase()} color={payment.status === 'pending' ? 'warning' : 'success'} />
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              )}

              {tabValue === 2 && (
                <Card variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Your Roommate</Typography>
                  <Stack direction="row" alignItems="center">
                    <Avatar sx={{ width: 60, height: 60, bgcolor: theme.palette.secondary.main }}>
                      {tenantData.currentStay.roommate.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {tenantData.currentStay.roommate.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tenantData.currentStay.roommate.college}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              )}

              {tabValue === 3 && (
                <Card variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Rate Your Stay</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Help other students by sharing your experience
                  </Typography>
                  <Button variant="contained" startIcon={<Star size={16} />}>Submit Review</Button>
                </Card>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      <Fab color="error" sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }} onClick={handleEmergency}>
        <Phone size={24} />
      </Fab>
    </Box>
  );
};

export default TenantPortal;
