import App from '../app';
import Startup from '../startup';
import { useSigninCheck } from 'reactfire';

//Appwrapper -komponentin tarkoituksena on huolehtia siitä, että käyttäjä ohjataan
//joko sovelluksen etusivulle (App), jos käyttäjä on kirjautunut, muuten hänet 
//ohjataan kirjautumissivulle (Startup).
function Appwrapper() {
 const { status, data: signInCheckResult } = useSigninCheck();
 if (status === 'loading') {
 return <span>Odota, ladataan tietoja...</span>;
 }
 if (signInCheckResult.signedIn === true) {
 return <App />
 } else {
 return <Startup />
 }
}

export default Appwrapper; 