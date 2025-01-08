import React from 'react';

const Modal = ({ title, children, onClose, footer }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto  ">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end mt-4">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
