'use client';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import Logo from './logo';

const Navbar = () => {
  const isScrolled = useScrollTop();
  console.log(isScrolled);

  return (
    <div
      className={cn(
        'z-50 bg-background fixed top-0 items-center w-full p-6',
        isScrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2"></div>
    </div>
  );
};

export default Navbar;
