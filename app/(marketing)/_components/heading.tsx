'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus,
        quaerat. Facere, tenetur unde?
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Lorem ipsum dolor sit, amet consectetur
      </h3>
      <Button>
        Enter Notion-Clone <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default Heading;
