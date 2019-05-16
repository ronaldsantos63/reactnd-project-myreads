import React from 'react';
import PropTypes from 'prop-types';

const Highlight = ({ text = '', highlight = ''}) => {
  if(!highlight.trim()) {
    return <span>{text}</span>;
  }

  const re = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(re);
  
  return (
    <span>
      {parts.map((part, index) => (
        re.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>
      ))}
    </span>
  );
};

Highlight.propTypes = {
  text: PropTypes.string.isRequired,
  highlight: PropTypes.string
};

export default Highlight;
