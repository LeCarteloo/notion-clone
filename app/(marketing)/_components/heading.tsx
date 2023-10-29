'use client';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus,
        quaerat. Facere, tenetur unde?
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Lorem ipsum dolor sit, amet consectetur
      </h3>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Notion-Clone <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <div className="flex items-center justify-center">
            Get Notion-Clone
            <ArrowRight className="h-4 w-4 ml-2" />
          </div>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
