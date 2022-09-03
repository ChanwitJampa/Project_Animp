import './index.scss'
const ProgressBar = (props) => {
    const { completed } = props;
    const fillerStyles = {
      height: '100%',
      width: `${completed}0%`,
      backgroundColor: "#1EC602",
      borderRadius: 'inherit',
      textAlign: 'right',
    }

    const labelStyles = {
        paddingTop:10,
      color: 'white',
      fontWeight: 'bold',
    }
  
    return (
      <div className="progress-container">
        <div style={fillerStyles}>
          <div style={labelStyles}>{`${completed}0%`}</div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;