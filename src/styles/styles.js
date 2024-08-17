export const headerStyle = (config) => ({
    backgroundColor: config.headerColor,
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  });
  
  export const navLinkStyle = {
    color: 'white',
    marginRight: '1rem',
    textDecoration: 'none'
  };
  
  export const logoutButtonStyle = (config) => ({
    backgroundColor: 'white',
    color: config.headerColor,
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  });
  
  export const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
  };
  export const houseListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem'
  };
  export const houseCardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out',
    ':hover': {
      transform: 'scale(1.05)'
    }
  };
  
  export const houseImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };
  export const houseTextStyle = {
    color: 'black',
    margin: '0.5rem 0'
  };
  
  export const housePriceStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#4CAF50'
  };
  
  export const formStyle = {
    maxWidth: '300px',
    margin: '0 auto'
  };
  
  export const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };
  
  export const infoBannerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1.1rem'
  };
  
  export const infoBannerLinkStyle = {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'underline'
  };
  
  export const learnProcessStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };
  
  export const learnStepStyle = {
    marginBottom: '1rem'
  };
  
  export const houseDetailStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  };
  export const houseDetailImageStyle = {
    width: '100%',
    height: '400px', // Fixed height
    marginBottom: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
  };
  
  export const houseInfoStyle = {
    width: '100%',
    textAlign: 'left',
  };
  export const buttonStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  };
  

  
  export const userProfileStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '2rem'
  };