'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import UserItem from './user-item';

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResetWidth = () => {
    if (!sidebarRef.current || !navbarRef.current) {
      return;
    }

    setIsCollapsed(false);
    setIsResetting(true);

    sidebarRef.current.style.width = isMobile ? '100%' : '240px';
    navbarRef.current.style.setProperty(
      'width',
      isMobile ? '0' : 'calc(100% - 240px)',
    );
    navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');

    setTimeout(() => setIsResetting(false), 300);
  };

  const handleCollapse = () => {
    if (!sidebarRef.current || !navbarRef.current) {
      return;
    }

    setIsCollapsed(true);
    setIsResetting(true);

    sidebarRef.current.style.width = '0';
    navbarRef.current.style.setProperty('width', '100%');
    navbarRef.current.style.setProperty('left', '0');

    setTimeout(() => setIsResetting(false), 300);
  };

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
      return;
    }

    handleResetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    }
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative w-60 flex-col z-[99999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0',
        )}
      >
        <button
          onClick={handleCollapse}
          className="h-6 w-6 text-muted-foreground absolute top-3 right-2"
        >
          <ChevronsLeft
            className={cn(
              `h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 
              opacity-0 group-hover/sidebar:opacity-100 transition`,
              isMobile && 'opacity-100',
            )}
          />
        </button>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={handleResetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transiation cursor-ew-resize absolute 
        h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full',
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <button onClick={handleResetWidth}>
              <MenuIcon className="h-6 w-6 text-muted-foreground" />
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
