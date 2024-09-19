import React from 'react';

const ContentSection = ({ selectedItem, isSidebarVisible }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case 'dashboard':
        return <div>Dashboard Content</div>;
      case 'students':
        return <div>Students Content</div>;
      case 'admins':
        return <div>Admins Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <div>Welcome</div>;
    }
  };

  return (
    <div
      className={p-8 flex-grow transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'}}
    >
      <h2 className="text-2xl font-bold">{selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}</h2>
      {renderContent()}
    </div>
  );
};

export default ContentSection;