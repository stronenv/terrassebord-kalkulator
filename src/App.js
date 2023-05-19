import * as React from 'react';
import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

/* Import Material UI Components  */
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Input = styled(MuiInput)`
  width: 42px;
`;


function App() {
  const [bredde, setBredde] = React.useState(120);
  const [kvm, setKvm] = React.useState(20);

  const avstad = 3;
  const cc = 600;

  const handleSliderChange = (event, newValue) => {
    setBredde(newValue);
  };

  const handleInputChange = (event) => {
    setBredde(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (bredde < 75) {
      setBredde(75);
    } else if (bredde > 250) {
      setBredde(250);
    }
  };

  const handleTextInputChange = (event) => {
    setKvm(event.target.value);
  }

  const calculatedLopemeter = useMemo(
    () => {
      var fullBredde = bredde+avstad;
      var lmprkvm = 1000 / fullBredde;
      var calcLopemeter = Math.round(kvm * lmprkvm * 1.1);
      if(Number.isNaN(calcLopemeter)) {
        return 0;
      } else {
        return calcLopemeter;
      }
    },
    [kvm, bredde]
  )

  const calculatedSkruer = useMemo(
    () => {
      var fullBredde = bredde+avstad;
      var antallSkruerPrSpikerslag = 1000 / fullBredde * 2;
      var antallSpikerslag = (1000 / cc ) + 1;
      var calcSkruer = Math.round(antallSkruerPrSpikerslag * antallSpikerslag * kvm / 10) * 10;
      if(Number.isNaN(calcSkruer)) {
        return 0;
      } else {
        return calcSkruer;
      }
    },
    [kvm, bredde]
  )

  return (
    <Container maxWidth="sm" >
      <header className="App-header">
        <h1>Terrassebordkalkulator<br></br><small> - så mye materialer trenger du</small></h1>
        <p>
          Regn ut hvor mye terrassebord, skruer og material du trenger. 
        </p>
      </header>
      <Box>
        <FormLabel id="terrassebord-bredde-label">
              Terrassebord bredde (i mm)
              <Tooltip title="Velg bredde på terrassebord. Den mest vanlige bredden er 120mm." placement="right-start">
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
        </FormLabel>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={typeof bredde === 'number' ? bredde : 120}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              min={70} max={250}
            />
          </Grid>
          <Grid item>
            <Input
              value={bredde}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 5,
                min: 75,
                max: 250,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TextField
          name="kvadratmeter"
          label="Antall kvadratmeter"
          variant="outlined"
          margin="normal"
          value={kvm}
          onChange={handleTextInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
            }}
          />
      </Box>
      <Box>
        <h2>Du trenger:</h2>
        <h3>
          {calculatedLopemeter} løpemeter terrassebord
        </h3>
        <h3>
          {calculatedSkruer} skruer
        </h3>
        <p><i>Kalkulatoren tar utgangspunkt i 60 cm senteravstand, 3 mm mellom hvert bord og 10% kappsvinn.</i></p>
      </Box>
    </Container>
  );
}

export default App;
