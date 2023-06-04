import Feed from "@components/Feed";
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
      className="rotate-[-3deg] relative left-12"
      src={"/assets/images/Scratch_Logo.svg"}
      width={450}
      height={200}
      alt="Scratch Logo"
      />

      <Image
      className="rotate-[-2deg] relative right-3 bottom-4"
      src={"/assets/images/exclamation.png"}
      width={120}
      height={300}
      alt="!"
      />
    
    </div>
    <p className='desc text-center'>
      Discover, share and create scratch ideas and challenges with your fellow Scratchers!
    </p>

    <Feed />
  </section>
);

export default Home;
