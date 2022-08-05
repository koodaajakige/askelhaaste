import styles from './content.module.scss';

//Sivun sisällön skrollauksesta huolehtiva komponentti.
function Content(props) {
    return(
      <div className={styles.content}>
          {props.children}
      </div>
    );
}

export default Content;