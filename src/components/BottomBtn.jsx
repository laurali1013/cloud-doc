import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from 'prop-types';

const BottomBtn = ({ text,colorClass,onBtnClick,icon}) => {
    return (
      <button
        type="button"
        onClick={onBtnClick}
        className={`btn btn-block no-border ${colorClass}`}
      >
        <FontAwesomeIcon className="mr-2" icon={icon} size="lg" />
        {text}
      </button>
    );
}

BottomBtn.prototypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    icon: PropTypes.string,
    onBtnClick:PropTypes.func,
}

BottomBtn.defaultProps = {
    text: "新建"
}

export default BottomBtn;

