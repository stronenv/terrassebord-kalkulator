import * as React from 'react';
import { useMemo } from 'react';
//import { styled } from '@mui/material/styles';

/* Import Material UI Components  */
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

//import Slider from '@mui/material/Slider';
//import MuiInput from '@mui/material/Input';

function App() {
  const [bredde, setBredde] = React.useState(120);
  const [kvm, setKvm] = React.useState(20);

  const avstad = 3;
  const cc = 600;

  /*const handleSliderChange = (event, newValue) => {
    setBredde(newValue);
  };
  
  const handleBlur = () => {
    if (bredde < 75) {
      setBredde(75);
    } else if (bredde > 250) {
      setBredde(250);
    }
  };*/

  const handleInputChange = (event) => {
    setBredde(event.target.value === '' ? '' : Number(event.target.value));
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
        {/*<Grid container spacing={2} alignItems="center">
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
            </Grid>*/}
        <Grid container>
          <Grid item s>
            <TextField
              name="bredde"
              label="Terrassebord bredde"
              variant="outlined"
              margin="normal"
              value={bredde}
              onChange={handleInputChange}
              style={{marginRight: '16px'}}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                }}
              /><br></br>
            <small>Den vanligste bredden er 120 mm.</small><br></br><br></br>
          </Grid>
          <Grid item s>
            <TextField
              name="kvadratmeter"
              label="Antall kvadratmeter"
              variant="outlined"
              margin="normal"
              value={kvm}
              onChange={handleTextInputChange}
              style={{marginRight: '16px'}}
              InputProps={{
                endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
                }}
              />
          </Grid>
        </Grid>
        <h2>Du trenger:</h2>
        <h3>
          {calculatedLopemeter} løpemeter terrassebord
        </h3>
        <h3>
          {calculatedSkruer} skruer
        </h3>
        <p><i>Kalkulatoren tar utgangspunkt i 60 cm senteravstand, 3 mm mellom hvert bord og 10% kappsvinn.</i></p>
        <hr></hr>
        <div>
        <p>Å bygge en terrasse er en flott måte å utvide bruksområdet på utendørsområdet ditt og skape et rom for avslapning og underholdning. Før du begynner byggeprosessen, er det viktig å planlegge og beregne hvor mye materiale du trenger. Terrassebord og skruer er to essensielle elementer som må tas i betraktning.</p>
        <h4>Beregne terassebord</h4>
        <p>Når det gjelder terrassebord, må du først bestemme hvilken type tre eller komposittmateriale du ønsker å bruke. Vanlige trevalg inkluderer trykkimpregnert furu, sedertre eller tropiske tresorter som teak eller ipe. Komposittmaterialer består av en blanding av trefiber og plast, og de er kjent for sin holdbarhet og lave vedlikeholdsbehov. Når du har valgt materialtypen, måler du arealet på terrassen og legger inn bredde på terassebordet og kvadratmeteren i kalkulatoren for å beregne hvor mange bord du trenger. Kalkulatoren tar høyde for avkapp og erstatningsbord.</p>
        <h4>Beregne skruer</h4>
        <p>Når det gjelder skruer, er det viktig å velge riktig type og størrelse for å sikre at terrassebordene er festet sikkert. Rustfrie skruer er sterke og motstandsdyktige mot korrosjon, og de er vanligvis det beste valget for utendørs prosjekter. En vanlig tommelfingerregel er å bruke omtrent 35 skruer per kvadratmeter, men det er noen variasjoner. Kalkulatoren regner ut det totale antallet skruer du trenger.</p>
        <h4>Planlegg byggeprosjektet</h4>
        <p>Ved å planlegge og beregne mengden terrassebord og skruer du trenger, kan du unngå unødvendig sløsing og sikre en jevn byggeprosess. Husk alltid å sjekke lokale bygningsforskrifter og konsultere fagfolk hvis du er usikker på noen av beregningene eller byggestegene. Med riktig forberedelse kan du bygge en ny terrasse som vil gi deg mange års glede og bruk.</p>
        </div>
        <hr></hr>
        <details>
          <summary>Cookies og Personvernerklæring / Cookies and Privacy Policy </summary>
          <h4>Privacy Policy for Terrassebordkalkulator.no - English</h4>

          <p>The privacy of our visitors to terrassebordkalkulator.no is important to us.</p>

          <p>At terrassebordkalkulator.no, we recognize that privacy of your personal information is important. Here is information on what types of personal information we receive and collect when you use and visit terrassebordkalkulator.no, and how we safeguard your information.  We never sell your personal information to third parties.</p>

          <p><b>Log Files</b><br></br>
          As with most other websites, we collect and use the data contained in log files. The information in the log files include  your IP address, your ISP, the browser you used to visit our site , the time you visited our site and which pages you visited throughout our site.</p>

          <p><b>Cookies and Web Beacons</b><br></br>
          We do use cookies to store information, such as your personal preferences when you visit our site.  This could include only showing you a popup once in your visit, or the ability to login to some of our features, such as forums.</p>

          <p>We also use third party advertisements on terrassebordkalkulator.no to support our site. Some of these advertisers may use technology such as cookies and web beacons when they advertise on our site, which will also send these advertisers (such as Google through the Google AdSense program) information including your IP address, your ISP , the browser you used to visit our site, and in some cases, whether you have Flash installed.  This is generally used for geotargeting purposes (showing New York real estate ads to someone in New York, for example) or showing certain ads based on specific sites visited (such as showing cooking ads to someone who frequents cooking sites).</p>

          <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Ads Settings</a>. (Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.)</p>

          <p><b>DoubleClick DART cookies</b><br></br>
          We also may use DART cookies for ad serving through Google's DoubleClick, which places a cookie on your computer when you are browsing the web and visit a site using DoubleClick advertising (including some Google AdSense advertisements).  This cookie is used to serve ads specific to you and your interests (”interest based targeting”).</p>

          <p>The ads served will be targeted based on your previous browsing history (For example, if you have been viewing sites about visiting Las Vegas, you may see Las Vegas hotel advertisements when viewing a non-related site, such as on a site about hockey).  DART uses “non personally identifiable information”.  It does NOT track personal information about you, such as your name, email address, physical address, telephone number, social security numbers, bank account numbers or credit card numbers.</p>

          <p>You can opt-out of this ad serving on all sites using this advertising by visiting http://www.doubleclick.com/privacy/dart_adserving.aspx</p>

          <p>You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings, or by managing preferences in programs such as Norton Internet Security.  However, this can affect how you are able to interact with our site as well as other websites.  This could include the inability to login to services or programs, such as logging into forums or accounts.</p>

          <p>Deleting cookies does not mean you are permanently opted out of any advertising program.  Unless you have settings that disallow cookies, the next time you visit a site running the advertisements, a new cookie will be added.</p>

          <h4>Personvernerklæring for Terrassebordkalkulator.no - Norsk</h4>

          <p>Personvernet til våre besøkende på terrassebordkalkulator.no er viktig for oss.</p>

          <p>På terrassebordkalkulator.no erkjenner vi at personvern for din personlige informasjon er viktig. Her er informasjon om hvilke typer personlig informasjon vi samler inn og lagrer når du bruker og besøker terrassebordkalkulator.no, og hvordan vi beskytter informasjonen din. Vi selger aldri din personlige informasjon til tredjeparter.</p>

          <p><b>Loggfiler</b><br></br>
          Som de fleste andre nettsteder samler vi inn og bruker dataene som finnes i loggfiler. Informasjonen i loggfiler inkluderer din IP-adresse, din internettleverandør , nettleseren du brukte for å besøke nettstedet vårt, tidspunktet du besøkte nettstedet vårt og hvilke sider du besøkte på nettstedet vårt.</p>

          <p><b>Informasjonskapsler og web beacons</b><br></br>
          Vi bruker informasjonskapsler for å lagre informasjon, for eksempel dine personlige preferanser når du besøker nettstedet vårt. Dette kan inkludere å vise deg en popup bare én gang i løpet av besøket ditt, eller muligheten til å logge inn på noen av funksjonene våre, for eksempel forum.</p>

          <p>Vi bruker også tredjepartsannonser på terrassebordkalkulator.no for å støtte nettstedet vårt. Noen av disse annonsørene kan bruke teknologi som informasjonskapsler og web beacons når de annonserer på nettstedet vårt, noe som også vil sende disse annonsørene (som for eksempel Google gjennom Google AdSense-programmet) informasjon, inkludert IP-adressen din, internettleverandøren din, nettleseren du brukte for å besøke nettstedet vårt, og i noen tilfeller om du har Flash installert. Dette brukes generelt for geografisk målretting (for eksempel å vise eiendomsannonser i New York til noen i New York) eller for å vise bestemte annonser basert på spesifikke besøkte nettsteder (for eksempel å vise matlagingsannonser til noen som besøker matlagingssider ofte).</p>

          <p>Brukere kan velge å deaktivere personlig tilpassede annonser ved å besøke <a href="https://google.com/settings/ads"  target="_blank" rel="noreferrer">Annonseinnstillinger</a>. (Alternativt kan du velge å deaktivere en tredjepartsleverandørs bruk av informasjonskapsler for personlig tilpasset annonsering ved å besøke www.aboutads.info.)</p>

          <p><b>DoubleClick DART-informasjonskapsler</b><br></br>
          Vi kan også bruke DART-informasjonskapsler for annonsevisning gjennom Googles DoubleClick, som plasserer en informasjonskapsel på datamaskinen din når du surfer på nettet og besøker et nettsted som bruker DoubleClick-annonsering (inkludert noen Google AdSense-annonser). Denne informasjonskapselen brukes til å vise annonser som er spesifikke</p>
      </details>
      <hr></hr>
    </Container>
  );
}

export default App;
