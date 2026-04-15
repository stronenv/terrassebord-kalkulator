import * as React from 'react';
import { useMemo } from 'react';
import './App.css';

/* MD Content */
import ReactMarkdown from 'react-markdown';
import bodyText from './bodyText.md?raw';
import policiesText from './policiesText.md?raw';

/* Import Material UI Components  */
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function App() {
  const [bredde, setBredde] = React.useState(120);
  const [kvm, setKvm] = React.useState(30);

  const avstad = 3;
  const cc = 600;

  const handleInputChange = (event) => {
    setBredde(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleTextInputChange = (event) => {
    setKvm(event.target.value);
  };

  const calculatedLopemeter = useMemo(
    () => {
      const fullBredde = bredde + avstad;
      const lmprkvm = 1000 / fullBredde;
      const calcLopemeter = Math.round(kvm * lmprkvm * 1.1);
      if (Number.isNaN(calcLopemeter)) {
        return 0;
      }

      return calcLopemeter;
    },
    [kvm, bredde]
  );

  const calculatedSkruer = useMemo(
    () => {
      const fullBredde = bredde + avstad;
      const antallSkruerPrSpikerslag = (1000 / fullBredde) * 2;
      const antallSpikerslag = (1000 / cc) + 1;
      const calcSkruer = Math.round((antallSkruerPrSpikerslag * antallSpikerslag * kvm) / 10) * 10;
      if (Number.isNaN(calcSkruer)) {
        return 0;
      }

      return calcSkruer;
    },
    [kvm, bredde]
  );

  return (
    <Container maxWidth="sm">
      <Box component="header" sx={{ paddingTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>Terrassebordkalkulator</Typography>
        <Typography variant="subtitle" component="h2" gutterBottom>- så mye materialer trenger du</Typography>
        <Typography gutterBottom>Regn ut hvor mange løpemeter terrassebord, skruer og material du trenger.</Typography>
      </Box>
      <Card sx={{ marginTop: '2rem' }}>
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center" gutterBottom>Du trenger:</Typography>
          <Typography variant="subtitle" component="h3" textAlign="center" fontWeight="bold" mb={2} gutterBottom>{calculatedLopemeter} løpemeter terrassebord</Typography>
          <Typography variant="subtitle" component="h3" textAlign="center" fontWeight="bold" mb={4} gutterBottom>{calculatedSkruer} skruer</Typography>
          <Stack spacing={2} direction="column" sx={{ marginBottom: '2rem' }} alignItems="left">
            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Typography>Antall kvadratmeter: </Typography>
              <Typography>{kvm} m<sup>2</sup></Typography>
            </Stack>
            <Slider aria-label="Antall kvadratmeter" defaultValue={30} value={kvm} min={1} max={300} onChange={handleTextInputChange} />
          </Stack>
          <Stack spacing={2} direction="column" sx={{ marginBottom: '2rem' }} alignItems="left">
            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Typography>Terrassebord bredde</Typography>
              <Typography>{bredde} mm</Typography>
            </Stack>
            <Slider aria-label="Terrassebord bredde" defaultValue={120} value={bredde} min={10} max={300} onChange={handleInputChange} />
          </Stack>
          <Typography fontStyle="italic" fontSize="0.75rem">Kalkulatoren tar utgangspunkt i 60 cm senteravstand, 3 mm mellom hvert bord og 10% kappsvinn.</Typography>
        </CardContent>
      </Card>
      <Box sx={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <ReactMarkdown>{bodyText}</ReactMarkdown>
        <hr />
        <details>
          <summary>Cookies og Personvernerklæring / Cookies and Privacy Policy </summary>
          <ReactMarkdown>{policiesText}</ReactMarkdown>
        </details>
      </Box>
    </Container>
  );
}

export default App;
