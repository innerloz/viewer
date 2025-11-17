import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Popover,
  Paper,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { HexColorPicker } from 'react-colorful';
import { useCubeSettings, ColorScheme } from '../context/CubeSettingsContext';

export const SettingsMenu: React.FC = () => {
  const { settings, setCubeCount, setColorScheme, setSingleColor } = useCubeSettings();
  const [open, setOpen] = useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCubeCountChange = (_event: Event, newValue: number | number[]) => {
    setCubeCount(newValue as number);
  };

  const handleColorSchemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorScheme(event.target.value as ColorScheme);
  };

  const handleColorPickerOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
  };

  const colorPickerOpen = Boolean(colorPickerAnchor);

  const drawerContent = (
    <Box sx={{ width: isMobile ? '100vw' : 320, padding: isMobile ? 1.5 : 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: isMobile ? 2 : 3 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            color: 'white',
            fontWeight: 600,
          }}
        >
          Settings
        </Typography>
        <IconButton 
          onClick={() => setOpen(false)} 
          size="small" 
          aria-label="close settings menu"
          sx={{ 
            color: 'white',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: isMobile ? 2 : 3, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

      <Box sx={{ mb: isMobile ? 2.5 : 4 }}>
        <Typography 
          gutterBottom 
          sx={{ 
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'white',
          }}
        >
          Number of Cubes: {settings.cubeCount}
        </Typography>
        <Slider
          value={settings.cubeCount}
          onChange={handleCubeCountChange}
          min={1}
          max={50}
          step={1}
          marks={[
            { value: 1, label: '1' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
          ]}
          valueLabelDisplay="auto"
          aria-label="Number of cubes"
          sx={{
            color: '#fff',
            '& .MuiSlider-thumb': {
              backgroundColor: '#fff',
              border: '2px solid rgba(102, 126, 234, 0.9)',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: '#fff',
            },
            '& .MuiSlider-rail': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            '& .MuiSlider-mark': {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
            '& .MuiSlider-markLabel': {
              color: 'white',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'rgba(102, 126, 234, 0.9)',
              color: 'white',
            },
          }}
        />
      </Box>

      <Divider sx={{ mb: isMobile ? 2 : 3, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

      <FormControl component="fieldset" sx={{ mb: isMobile ? 2 : 3 }}>
        <FormLabel 
          component="legend" 
          sx={{ 
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'white',
          }}
        >
          Color Scheme
        </FormLabel>
        <RadioGroup
          value={settings.colorScheme}
          onChange={handleColorSchemeChange}
          aria-label="color scheme"
        >
          <FormControlLabel
            value="random"
            control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#fff' }, transition: 'all 0.2s ease' }} />}
            label={<Typography sx={{ color: 'white', fontSize: isMobile ? '0.9rem' : '1rem' }}>Random</Typography>}
          />
          <FormControlLabel
            value="rainbow"
            control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#fff' }, transition: 'all 0.2s ease' }} />}
            label={<Typography sx={{ color: 'white', fontSize: isMobile ? '0.9rem' : '1rem' }}>Rainbow</Typography>}
          />
          <FormControlLabel
            value="single"
            control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#fff' }, transition: 'all 0.2s ease' }} />}
            label={<Typography sx={{ color: 'white', fontSize: isMobile ? '0.9rem' : '1rem' }}>Single Color</Typography>}
          />
        </RadioGroup>
      </FormControl>

      {settings.colorScheme === 'single' && (
        <Box sx={{ mb: isMobile ? 2 : 3 }}>
          <FormControl fullWidth>
            <FormLabel 
              component="legend" 
              sx={{ 
                mb: 1, 
                fontSize: isMobile ? '0.9rem' : '1rem',
                color: 'white',
              }}
            >
              Choose Color
            </FormLabel>
            <Button
              variant="outlined"
              onClick={handleColorPickerOpen}
              sx={{
                width: '100%',
                height: isMobile ? 48 : 56,
                backgroundColor: settings.singleColor,
                borderColor: settings.singleColor,
                '&:hover': {
                  backgroundColor: settings.singleColor,
                  borderColor: settings.singleColor,
                  opacity: 0.9,
                },
              }}
            >
              <Typography
                sx={{
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  fontWeight: 500,
                  fontSize: isMobile ? '0.85rem' : '1rem',
                }}
              >
                {settings.singleColor.toUpperCase()}
              </Typography>
            </Button>
          </FormControl>
          <Popover
            open={colorPickerOpen}
            anchorEl={colorPickerAnchor}
            onClose={handleColorPickerClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Paper sx={{ p: 2 }}>
              <HexColorPicker
                color={settings.singleColor}
                onChange={setSingleColor}
              />
            </Paper>
          </Popover>
        </Box>
      )}

      <Divider sx={{ mb: isMobile ? 1 : 2, borderColor: isMobile ? 'rgba(255, 255, 255, 0.3)' : 'inherit' }} />
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          top: isMobile ? 16 : 24,
          right: isMobile ? 16 : 24,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'scale(1)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 100%)',
            transform: 'scale(1.1)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
          '@keyframes pulse': {
            '0%, 100%': {
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            },
            '50%': {
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.8)',
            },
          },
          animation: 'pulse 2s ease-in-out infinite',
        }}
        aria-label="open settings menu"
      >
        <MenuIcon sx={{ transition: 'transform 0.3s ease' }} />
      </IconButton>

      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            height: isMobile ? 'auto' : '100%',
            maxHeight: isMobile ? '38vh' : 'none',
            minHeight: isMobile ? 'auto' : 'none',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: isMobile 
              ? '0 -4px 20px rgba(0, 0, 0, 0.2)' 
              : '-4px 0 20px rgba(0, 0, 0, 0.2)',
            borderTopLeftRadius: isMobile ? '16px' : '0',
            borderTopRightRadius: isMobile ? '16px' : '0',
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

