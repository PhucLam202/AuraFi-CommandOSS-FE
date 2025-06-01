import { Link, useLocation } from "wouter";

const MobileNavigation = () => {

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 z-10">
      <div className="flex items-center justify-between">
        <Link href="/">
        <div className="flex items-center justify-between">
        <i className="fas fa-home text-lg"></i>
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>

        <a href="#" className="flex flex-col items-center text-slate-400">
          <i className="fas fa-plus-circle text-lg"></i>
          <span className="text-xs mt-1">Create</span>
        </a>
        
        <a href="#" className="flex flex-col items-center text-slate-400">
          <i className="fas fa-user text-lg"></i>
          <span className="text-xs mt-1">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default MobileNavigation;
