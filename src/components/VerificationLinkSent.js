import React from 'react';

import logo from '../images/logo.png';
import checkIcon from '../images/icons8-checked 1.png';

function VerificationLinkSent() {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <img
        src={logo}
        alt='logo'
        className='self-start mt-4 ml-6 md:mt-12 md:ml-0 md:self-center'
      />
      <div className='flex flex-col items-center justify-center  @if ($button) grow @else m-auto @endif'>
        <img src={checkIcon} alt='checked icon' className='mt-auto md:mt-0' />
        <p className='px-4 mt-6 text-center'>Verification Link Sent</p>
      </div>
    </div>
  );
}

export default VerificationLinkSent;
