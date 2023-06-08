import Feed from "@components/Feed";
import Footer from "@components/Footer";
import Image from "next/image";


const Home = () => (
  <section className='w-full flex-center flex-col'>
    <Image

      className="relative top-6 rotate-[1deg]"
      
      src={"/assets/images/whatthe.png"}
      width={300}
      height={150}
      alt="What The"
    />
    <div className="flex">

      <Image
      className="rotate-[-3deg]"
      src={"/assets/images/scratch_logo.png"}
      width={450}
      height={200}
      alt="Scratch Logo"
      />

      {/* <Image
      className="rotate-[-2deg] relative right-20 bottom-4"
      src={"/assets/images/exclamation.png"}
      width={140}
      height={120}
      alt="!"
      /> */}
    
    </div>
    <p className='desc text-center'>
      Discover, share and create scratch ideas and challenges with your fellow Scratchers!
    </p>

    <Feed />
  </section>
);

export default Home;
