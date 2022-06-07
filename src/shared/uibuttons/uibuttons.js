import './uibuttons.css';

const classNames = classnames => classnames.join(" ");

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

export { Button as default, Button }