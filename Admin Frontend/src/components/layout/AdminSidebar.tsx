import React, {useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight, UserPlus, Users, Lock, Users2, UsersIcon, LucideUsers, UserSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {useAuth} from "@/contexts/AuthContext.tsx";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}


const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderTree, label: 'Categories', path: '/categories' },
    { icon: Package, label: 'Products', path: '/products' },
      ...(isSuperAdmin ? [
        { icon: Users, label: 'Customers', path: '/customers', adminOnly: true },
        { icon: Settings, label: 'Company Settings', path: '/settings', adminOnly: true },
        {icon: UserPlus, label: 'Role Create', path: '/role-create', adminOnly: true},
        {icon: UserSquare, label: 'View Admins', path: '/view-admins', adminOnly: true}
      ] : [
      ]),


  ];

  return (
      <aside
          className={cn(
              'fixed left-0 top-0 z-40 h-screen sidebar-gradient transition-all duration-300',
              collapsed ? 'w-20' : 'w-64'
          )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <span className="text-sidebar-primary-foreground font-bold text-lg">P</span>
                </div>
                <span className="font-semibold text-sidebar-foreground text-lg">
              Pickle Admin
            </span>
              </div>
          )}
          {collapsed && (
              <div className="mx-auto h-10 w-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-lg">P</span>
              </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const isLocked = item.adminOnly && !isSuperAdmin;

            if (isLocked) {
              return (
                  <div
                      key={item.path}
                      className="relative"
                      onMouseEnter={() => setHoveredPath(item.path)}
                      onMouseLeave={() => setHoveredPath(null)}
                  >
                    <div
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-3 cursor-not-allowed',
                            'text-sidebar-foreground/30'
                        )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                          <span className="font-medium">{item.label}</span>
                      )}
                      {!collapsed && (
                          <Lock className="h-3.5 w-3.5 ml-auto opacity-50" />
                      )}
                    </div>

                    {/* Hover tooltip */}
                    {hoveredPath === item.path && !collapsed && (
                        <div className="flex items-center gap-1.5 px-3 pb-1 -mt-1">
                          <Lock className="h-3 w-3 text-sidebar-foreground/40 flex-shrink-0" />
                          <span className="text-xs text-sidebar-foreground/40">
                            Only Super Admin can access this
                          </span>
                        </div>
                    )}

                    {/* Tooltip for collapsed state */}
                    {hoveredPath === item.path && collapsed && (
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-popover border border-border px-2.5 py-1.5 shadow-md">
                          <div className="flex items-center gap-1.5">
                            <Lock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Admin only</span>
                          </div>
                        </div>
                    )}
                  </div>
              );
            }

            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200',
                        'hover:bg-sidebar-accent',
                        isActive
                            ? 'bg-sidebar-accent text-sidebar-primary'
                            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                    )}
                >
                  <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-sidebar-primary')} />
                  {!collapsed && (
                      <span className={cn('font-medium', isActive && 'text-sidebar-primary')}>
                  {item.label}
                </span>
                  )}
                </NavLink>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent shadow-md"
        >
          {collapsed ? (
              <ChevronRight className="h-4 w-4" />
          ) : (
              <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>
  );
};

export default AdminSidebar;
