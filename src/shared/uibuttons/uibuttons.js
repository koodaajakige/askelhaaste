import './uibuttons.css';

//Komponenttikirjasto käyttöliittymän napeille.

//Apufunktio, joka saa parametrina taulukon, jonka alkiot se yhdistää välilyönnillä.
//Nappikomponentti ymmärtää apufunktion johdosta kaksi esimääriteltyä määritettä.
const classNames = classnames => classnames.join(" ");

//Perusnappi, jolle määritelty myös primary ja secondary -toiminnallisuudet.
const Button = ({ className = "", primary, secondary, ...props}) => {
    return (
        <button 
          type="button" 
          className={classNames([
              "uibutton",
              className,
              primary ? "uibutton--primary" : "",
              secondary ? "uibutton--secondary" : ""
             ])}
          {...props} 
        />
    );
}

//Kelluva toimintanappi, sovelluksessa käytetään uuden merkinnän lisäämiseen.
//Perusnapin toiminnallisuutta laajennettu kelluvalla ominaisuudella.
const FloatingButton = ({ className = "", ...props}) => {
    return (
        <Button
          className={classNames([
              "uibutton--floating",
              className
          ])}
          {...props}
          />
    );
}

//Apukomponentit ButtonContainer ja ButtonAppContainer, joiden avulla nappi saadaan sijoittumaan sivulle oikein.

//Apukomponentti, joka käärii koko sivun.
const ButtonContainer =({className = "", children, ...props}) => {
    return(
        <div
          className={classNames(["uibutton__container", className])}
          {...props}>
            {children}
        </div>
    )
}

//Apukomponentti, joka käärii koko sovelluksen.
const ButtonAppContainer =({className = "", children, ...props}) => {
    return(
        <div
          className={classNames(["uibutton__appcontainer", className])}
          {...props}>
            {children}
        </div>
    )
}

export { Button as default, Button, FloatingButton, ButtonContainer, ButtonAppContainer }