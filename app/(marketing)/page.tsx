import Footer from './_components/footer';
import Heading from './_components/heading';
import Heroes from './_components/heroes';

const MarketingPage = () => {
  return (
    <section className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <Heading />
        <Heroes />
        <Footer />
      </div>
    </section>
  );
};

export default MarketingPage;
