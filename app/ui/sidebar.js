import SidebarContent from './SidebarContent';

export default function Sidebar() {
  return (
    <div className="w-[290px] bg-bg-sidebar h-screen hidden md:flex flex-col shrink-0 rounded-br-[20px] relative z-10 sticky top-0" style={{background: 'var(--bg-sidebar)'}}>
      <SidebarContent />
    </div>
  );
}