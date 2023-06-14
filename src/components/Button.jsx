function Button({ testid, text, event, classes, icon }) {
    return (
        <div data-testid={testid} onClick={event} className={classes}>{text}{icon}</div>
    );
}

export default Button;